import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, rmSync, mkdirSync, statSync, writeFileSync } from "node:fs"
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
writeFileSync(
  join(cwd, "content", "index.md"),
  `---\ntitle: ${site.homeTitle}\n---\n\n## 入口\n\n${links}\n\n![[${site.homeTransclude}]]\n`,
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
