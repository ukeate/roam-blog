- List of blocks changed by last Find & Replace operation on [[November 12th, 2025]], 15:39
    - 锁屏：Ctrl + Cmd + q 
    - 注销：Shift + Cmd + q 
    - 睡眠：option + Cmd + 关机
    - 强退：Ctrl + Cmd + 关机
    - 程序坞： option + Cmd + d
    - 切换：Cmd + tab
    - 程序内切换：Cmd + `
    - 关闭：Cmd + w
    - 退出：Cmd + q
    - 强制退出：option + Cmd + esc
    - 隐藏：Cmd + h
    - 最大化: Ctrl + Cmd + f
    - 最小化：Cmd + m
    - 放大、缩小：Cmd + +和-
    - 新标签：Cmd + t
    - 新建: Cmd + n
    - 打开：Cmd + o
    - 保存：Cmd + s
    - 另存为：Shift + Cmd + s
    - 刷新：Cmd + r
    - 打印：Cmd + p
    - 搜索：Cmd + f
    - 全选、复制、剪切、粘贴、撤销: Cmd + a c x v z 
    - 粘贴移到: option + Cmd + v
    - 删除: Cmd + return
    - 简介：Cmd + i
    - 清空：Shift + Cmd + return
    - 整屏存文件：Shift + Cmd + 3
    - 区域存文件：Shift + Cmd + 4
    - 窗口区域：Shift + Cmd + 4 + 空格
    - 录屏：Shift + Cmd + 5
- Matching blocks for search on: `command`[[November 12th, 2025]], 15:37
    - But with special "Smart" commands
    - https://roamjs.com/extensions/smartblocks/command_reference
    - Ex command
    - :!command                       # 执行shell命令，如 :!ls
    - 搜索：Cmd + f
    - 粘贴移到: option + Cmd + v
    - 关闭：Cmd + w
    - 锁屏：Ctrl + Cmd + q 
    - 注销：Shift + Cmd + q 
    - 区域存文件：Shift + Cmd + 4
    - 退出：Cmd + q
    - 打开：Cmd + o
    - 睡眠：option + Cmd + 关机
    - 强退：Ctrl + Cmd + 关机
    - 程序坞： option + Cmd + d
    - 删除: Cmd + return
    - 保存：Cmd + s
    - 另存为：Shift + Cmd + s
    - 刷新：Cmd + r
    - 新标签：Cmd + t
    - 窗口区域：Shift + Cmd + 4 + 空格
    - 隐藏：Cmd + h
    - 新建: Cmd + n
    - 打印：Cmd + p
    - 清空：Shift + Cmd + return
    - 最小化：Cmd + m
    - 切换：Cmd + tab
    - 录屏：Shift + Cmd + 5
    - 全选、复制、剪切、粘贴、撤销: Cmd + a c x v z 
    - 最大化: Ctrl + Cmd + f
    - 简介：Cmd + i
    - 放大、缩小：Cmd + +和-
    - 程序内切换：Cmd + `
    - 强制退出：option + Cmd + esc
    - 整屏存文件：Shift + Cmd + 3
    - r!command 执行结果插入当前位置
    - :! command                      # 执行某shell命令(CR返回)
    - Ex command                          # 可视模式下选中行, : 时前面有'<,'> 表示对选中的行执行操作
    - w!command 当前文件作为输入执行
    - 命令(command)
    - mucommander             # 跨平台文件管理软件
    - 显示事项            command + r
    - 详情                command + i
    - 切换全屏视图        command + shift + f
    - 新建                command + n
    - 设置                command + ,
    - 搜索                command + f
    - 保存                command + s
    - 定位到今天          command + t
    - 删除                command + d
    - 切换日程/待办事项   command + k
    - commander
    - 下游给上游command/event, 上游触发
    - 命令(command, 不可变)
    - 与responsible的边界entity是rpc虚拟表, 请求command, 返回event
    - git [command] --help
    - ```yaml
      [program:tri]
      command=/data/apps/tri/bin/tri --config /data/apps/tri/conf/config.tri.toml
      directory=/data/apps/tri
      autostart=true
      autorestart=true
      startsecs=10
      startretries=3
      stdout_logfile=/data/logs/supervisor/tri/access.log
      stdout_logfile_maxbytes=100MB
      stdout_logfile_backups=20
      stderr_logfile=/data/logs/supervisor/tri/stderr.log
      stderr_logfile_maxbytes=100MB
      stderr_logfile_backups=2
      environment=ASPNETCORE_ENVIRONMENT=Production       # 环境变量
      user=root                                           # 执行的用户
      ```
    - Ex command
    - command                     # 执行命令
    - ansible '*' -m command -a 'uptime'
    - kubectl run -it --rm test --image=a:0.1.0 --command -- /bin/bash
    - g                               # :[range]global/{pattern}/{command}
    - ex command
    - global命令在[range]指定的文本范围内（缺省为整个文件）查找{pattern}，然后对匹配到的行执行命令{command}，如果希望对没匹配上的行执行命令，则使用global!或vglobal命令。
    - v/text/command 查找到行不执行命令,其它行执行
    - Ex command
    - :[range]normal{commands}        # 指定范围执行命令
    - 流程
      ```javascript
      "workflow3": {
        "command": "npx",
        "args": [
          "-y",
          "workflow3"
        ]
      },
      "sequential-thinking": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-sequential-thinking"
        ]
      },
      "vibedev-specs": {
        "command": "npx",
        "args": [
          "vibedev-specs-mcp@latest"
        ]
      },
      ```
    - 网页工具
      ```javascript
      "chrome-devtools": {
        "command": "npx",
        "args": [
          "-y",
          "chrome-devtools-mcp@latest"
        ]
      },
      "markitdown": {
        "command": "docker",
        "args": ["run", "--rm", "-i", "markitdown-mcp:latest"]
      },
      "puppeteer": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-puppeteer"
        ]
      },
      "playwright": {
        "command": "npx",
        "args": [
          "@playwright/mcp@latest"
        ]
      },
      "stagewise": {
        "command": "npx",
        "args": [
          "stagewise@latest"
        ]
      },
      ```
    - 发散
      ```javascript
      "zen": {
        "command": "sh",
        "args": [
          "-c",
          "exec $(which uvx || echo uvx) --from git+https://github.com/BeehiveInnovations/zen-mcp-server.git zen-mcp-server"
        ],
        "env": {
          "PATH": "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:~/.local/bin"
        }
      },
      "promptx": {
        "command": "npx",
        "args": [
          "-y",
          "-f",
          "--registry",
          "https://registry.npmjs.org",
          "dpml-prompt@beta",
          "mcp-server"
        ]
      },
      ```
    - 知识工具
      ```javascript
      "context7": {
        "command": "npx",
        "args": [
          "-y",
          "@upstash/context7-mcp@latest"
        ],
        "env": {
          "DEFAULT_MINIMUM_TOKENS": "10000"
        }
      },
      "deepwiki": {
         "url": "https://mcp.deepwiki.com/mcp"
      },
      // 拿key: https://ref.tools/activity
      "ref": {
        "type": "http",
        "url": "https://api.ref.tools/mcp?apiKey="
      },
      // 拿key：https://dashboard.exa.ai/api-keys
      "exa": {
        "type": "http",
        "url": "https://mcp.exa.ai/mcp?tools=web_search_exa,get_code_context_exa&exaApiKey=YOUR_EXA_API_KEY"
      },
      // 拿key：https://app.tavily.com/
      "tavily": {
        "command": "npx",
        "args": ["-y", "tavily-mcp@latest"],
        "env": {
          "TAVILY_API_KEY": "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"
        }
      }
      ```
    - 特定功能
      ```javascript
      "graphiti": {
        "command": "npx",
        "args": [
          "mcp-remote",
          "http://localhost:8000/sse"
        ]
      },
      "postgres": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-postgres",
          "postgresql://moments8-devops.pg.rds.aliyuncs.com:5432/sandbox"
        ]
      },
      // Serverless PostgreSQL 
      "neon": {
        "name": "Neon (Serverless PostgreSQL)",
        "id": "neon",
        "provider": "Neon",
        "command": "npx",
        "args": ["-y", "@neondatabase/mcp-server-neon", "start", ""],
        "env": {
          "NEON_API_KEY": "${process.env.NEON_API_KEY}"
        }
      },
      // Serverless服务
      "supabase": {
        "name": "Supabase (Database Platform)",
        "id": "supabase",
        "provider": "Supabase",
        "url": "https://mcp.supabase.com/mcp"
      },
      // Serverless 静态部署
      "vercel": {
        "name": "Vercel (Deployment Platform)",
        "id": "vercel",
        "provider": "Vercel",
        "url": "https://mcp.vercel.com"
      },
      // pages、kv、r2存储、D1存储等
      "cloudflare": {
        "name": "Cloudflare (Cloud Platform)",
        "id": "cloudflare",
        "provider": "Cloudflare",
        "url": "https://docs.mcp.cloudflare.com/mcp"
      },
      "github": {
        "name": "GitHub (Repo Management)",
        "id": "github",
        "provider": "GitHub",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_PERSONAL_ACCESS_TOKEN": "${process.env.GITHUB_TOKEN}"
        }
      },
      // 代码安全扫描工具
      "semgrep": {
        "name": "Semgrep (Code Analysis)",
        "id": "semgrep",
        "provider": "Semgrep",
        "command": "npx",
        "args": ["-y", "semgrep-mcp"]
      },
      // 多模型模态推理
      "replicate": {
        "name": "Replicate (ML Models)",
        "id": "replicate",
        "provider": "Replicate",
        "command": "npx",
        "args": ["-y", "replicate-mcp"],
        "env": {
          "REPLICATE_API_TOKEN": "${process.env.REPLICATE_API_TOKEN}"
        }
      },
      // 自定义 MCP 服务示例
      "mcp_sdk": {
        "name": "Custom MCP Server (via SDK)",
        "id": "mcp_sdk",
        "provider": "MCP SDK",
        "command": "node",
        "args": ["./my-mcp-server.js"]
      },
      ```
    - command执行的命令
    - execFile(command[, args])
    - spawn(command[, args][a options])
