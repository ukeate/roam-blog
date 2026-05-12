import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, rmSync, mkdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import site from "../site.config.json" with { type: "json" }

const cwd = process.cwd()
const dataDir = join(cwd, "data", "roam")

function latest(dir, pattern) {
  if (!existsSync(dir)) return
  const files = readdirSync(dir)
    .filter((name) => pattern.test(name))
    .map((name) => ({ path: join(dir, name), name, mtimeMs: statSync(join(dir, name)).mtimeMs }))
  files.sort((a, b) => b.mtimeMs - a.mtimeMs || b.name.localeCompare(a.name))
  return files[0]?.path
}

function casefoldCollisions(zipFile) {
  const names = execFileSync("python3", [
    "-c",
    [
      "import zipfile, sys, collections",
      "zf=zipfile.ZipFile(sys.argv[1])",
      "c=collections.defaultdict(list)",
      "for n in zf.namelist():",
      "    if n.endswith('.md'): c[n.casefold()].append(n)",
      "for v in c.values():",
      "    if len(v) > 1: print(' | '.join(v))",
    ].join("\n"),
    zipFile,
  ], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean)
  return names
}

function sanitizeMarkdown(root) {
  execFileSync("python3", [
    "-c",
    [
      "import html, os, re, sys",
      "pat=re.compile(r'^(\\s*-\\s*)(<.*)$')",
      "for dirpath, _, filenames in os.walk(sys.argv[1]):",
      "  for name in filenames:",
      "    if not name.endswith('.md'): continue",
      "    path=os.path.join(dirpath, name)",
      "    with open(path, encoding='utf-8') as f: lines=f.readlines()",
      "    changed=False",
      "    out=[]",
      "    for line in lines:",
      "      m=pat.match(line)",
      "      if m and not m.group(2).startswith('&lt;'):",
      "        line=m.group(1)+html.escape(m.group(2), quote=False)",
      "        changed=True",
      "      out.append(line)",
      "    if changed:",
      "      with open(path, 'w', encoding='utf-8') as f: f.writelines(out)",
    ].join("\n"),
    root,
  ], { stdio: "inherit" })
}

function walkMarkdown(root) {
  const out = []
  for (const name of readdirSync(root)) {
    const path = join(root, name)
    const stat = statSync(path)
    if (stat.isDirectory()) {
      out.push(...walkMarkdown(path))
    } else if (name.endsWith(".md")) {
      out.push(path)
    }
  }
  return out
}

function spaces(line) {
  return line.match(/^\s*/)[0].length
}

function parseRows(lines, baseIndent) {
  const root = { indent: baseIndent, text: "", body: [], children: [] }
  const stack = [root]
  for (const raw of lines) {
    if (!raw.trim()) continue
    const bullet = raw.match(/^(\s*)-\s(.*)$/)
    if (bullet) {
      const indent = bullet[1].length
      const node = { indent, text: bullet[2].trimEnd(), body: [], children: [] }
      while (stack.at(-1).indent >= indent) stack.pop()
      stack.at(-1).children.push(node)
      stack.push(node)
      continue
    }
    const indent = spaces(raw)
    while (stack.length > 1 && stack.at(-1).indent >= indent) stack.pop()
    stack.at(-1).body.push(raw.trim())
  }
  return root.children
}

function escapeCell(text) {
  return text.replaceAll("|", "\\|").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function flattenExtra(node, depth = 0) {
  const lines = []
  const indent = "&nbsp;".repeat(depth * 2)
  if (node.text.trim()) lines.push(`${indent}- ${node.text.trim()}`)
  for (const line of node.body) {
    if (line.trim()) lines.push(`${indent}&nbsp;&nbsp;${line.trim()}`)
  }
  for (const child of node.children) {
    lines.push(...flattenExtra(child, depth + 1))
  }
  return lines
}

function cell(node, next) {
  const lines = []
  if (node.text.trim()) lines.push(node.text.trim())
  for (const line of node.body) {
    if (line.trim()) lines.push(line.trim())
  }
  for (const child of node.children.slice(next ? 1 : 0)) {
    lines.push(...flattenExtra(child))
  }
  return lines.map(escapeCell).join("<br>")
}

function row(node) {
  const cells = []
  for (let cur = node; cur; cur = cur.children[0]) {
    cells.push(cell(cur, cur.children[0]))
  }
  return cells
}

function renderTable(rows, indent) {
  const table = rows.map(row)
  const cols = Math.max(...table.map((cells) => cells.length))
  for (const cells of table) {
    while (cells.length < cols) cells.push("")
  }
  const pad = " ".repeat(indent)
  return table.map((cells, i) => {
    const line = `${pad}| ${cells.join(" | ")} |`
    return i === 0 ? [line, `${pad}| ${Array(cols).fill("---").join(" | ")} |`] : [line]
  }).flat()
}

function convertTables(text) {
  const lines = text.split("\n")
  const out = []
  for (let i = 0; i < lines.length; ) {
    const marker = lines[i].match(/^(\s*)-\s(.*?)(?:\s*)\{\{table\}\}\s*$/)
    if (!marker) {
      out.push(lines[i++])
      continue
    }
    const indent = marker[1].length
    const title = marker[2].trimEnd()
    let j = i + 1
    while (j < lines.length) {
      if (!lines[j].trim()) {
        j += 1
        continue
      }
      if (spaces(lines[j]) <= indent) break
      j += 1
    }
    const rows = parseRows(lines.slice(i + 1, j), indent)
    if (!rows.length) {
      if (title) out.push(`${" ".repeat(indent)}- ${title}`)
      i = j
      continue
    }
    if (title) out.push(`${" ".repeat(indent)}- ${title}`)
    out.push(...renderTable(rows, title ? indent + 4 : indent))
    i = j
  }
  return out.join("\n")
}

function isListItem(line) {
  return /^\s*(?:[-+*]|\d+\.)\s+/.test(line)
}

function isTableStart(line, next) {
  const head = line.match(/^(\s*)\|.*\|\s*$/)
  if (!head) return false
  const sep = next.match(/^(\s*)\|(?:\s*:?-{3,}:?\s*\|)+\s*$/)
  return !!sep && head[1] === sep[1]
}

function normalizeTableBoundaries(text) {
  const lines = text.split("\n")
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (isTableStart(lines[i], lines[i + 1] ?? "")) {
      const prev = out.at(-1) ?? ""
      if (prev.trim() && isListItem(prev)) out.push("")
    }
    out.push(lines[i])
  }
  return out.join("\n")
}

function transformTables(root) {
  for (const path of walkMarkdown(root)) {
    const text = readFileSync(path, "utf8")
    const next = normalizeTableBoundaries(convertTables(text))
    if (next !== text) writeFileSync(path, next)
  }
}

const zipFile = latest(dataDir, /^Roam-Export-.*\.zip$/)
if (!zipFile) {
  throw new Error(`缺少 Roam Markdown 导出 ZIP: ${dataDir}`)
}

const collisions = casefoldCollisions(zipFile)
if (collisions.length) {
  console.error("发现大小写冲突文件，当前文件系统会丢失其中一部分页面：")
  for (const line of collisions) {
    console.error(`- ${line}`)
  }
}

const links = site.entryLinks.map(({ slug, title }) => `- [[${slug}|${title}]]`).join("\n")
rmSync(join(cwd, "content"), { recursive: true, force: true })
mkdirSync(join(cwd, "content"), { recursive: true })
execFileSync("ditto", ["-x", "-k", zipFile, "content"], { stdio: "inherit" })
sanitizeMarkdown("content")
transformTables("content")
writeFileSync(
  join(cwd, "content", "index.md"),
  `---\ntitle: ${site.homeTitle}\n---\n\n## 入口\n\n${links}\n`,
)

const mdCount = Number(
  execFileSync(
    "python3",
    [
      "-c",
      [
        "import os, sys",
        "n=0",
        "for root, _, files in os.walk(sys.argv[1]):",
        "  for f in files:",
        "    if f.endswith('.md'): n += 1",
        "print(n)",
      ].join("\n"),
      "content",
    ],
    { encoding: "utf8" },
  ).trim(),
)

console.log(`已刷新 content/，当前 Markdown 文件数: ${mdCount}`)
