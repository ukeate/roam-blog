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
- 
