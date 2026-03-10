import { execFileSync } from "node:child_process"
import { existsSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const src = join(process.cwd(), "public/")
const dst = "/Users/runout/op/loc/code/ukeate/ukeate.github.io/"

for (const [label, path] of [
  ["构建输出目录", src],
  ["GitHub Pages 仓库", dst],
]) {
  if (!existsSync(path) || !statSync(path).isDirectory()) {
    throw new Error(`${label}不存在: ${path}`)
  }
}

execFileSync(
  "rsync",
  ["-a", "--delete", "--exclude", ".git", "--exclude", "CNAME", src, dst],
  { stdio: "inherit" },
)
writeFileSync(join(dst, ".nojekyll"), "")

console.log(`已同步到 ${dst}`)
