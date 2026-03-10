- claude 
    - --continue -c
    - --resume -r
    - --add-dir
    - --dangerously-skip-permissions
    - -p ""
        - -c -p 可连用
    - --output-format
        - text, json, stream-json
    - --input-format
        - text, stream-json
- claude mcp list
    - claude mcp add-from-claude-desktop -s user
        - /Users/runout/Library/Application Support/Claude/claude_desktop_config.json
    - claude mcp add playwright -- npx -y @playwright/mcp@latest
        - -s user
        - -e API_KEY=123
        - --user-data-dir ~/.cache/claude-playwright
        - claude mcp add -s user -t http web-search-prime https://open.bigmodel.cn/api/mcp/web_search_prime/mcp --header "Authorization: Bearer your_api_key"
    - claude mcp get aaa
    - claude mcp remove aaa
    - claude mcp add-json aaa '{}'
    - claude mcp serve
        - claud提供mcp服务
- plugin
    - /plugin install document-skills@anthropic-agent-skills
- skill
    - /plugin marketplace add anthropics/skills
        - anthropics/claude-code
    - .claude/skills中放User Skills
    - skill seeker创建skill
- input
    - /clear 
    - /compact 
    - # to memorize
- glm
    - ```javascript
      "env": {
        "ANTHROPIC_AUTH_TOKEN": "17258766b404417a8a31cba3e93299d4.P5QM03GQOzdWED6Z",
        "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic"
        //"ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
        //"ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.6",
        //"ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.6"
      }
      ```
    - /status
- 目录
    - .claude
    - .claude.json，mcp配置
