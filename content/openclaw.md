- 文件
    - .clawdbot/clawdbot.json
        - agents.defaults.model.primary
        - agents.defaults.model.fallbacks
        - agents.defaults.thinkingDefault，思考强度
- tui连接
    - openclaw tui --url ws://192.168.7.24:18789 --token '' --deliver
    - openclaw devices list
    - openclaw devices approve id1，批准配对
- 配置
    - clawdbot configure --section model，选模型
    - clawdbot config set agents.defaults.model.primary "zai/glm-4.7"
    - clawdbot config set agents.defaults.model.primary "openai-codex/gpt-5.2-codex"
- 启动
    - clawdbot gateway run --port 18889 --bind loopback --verbose，前台启动
    - clawdbot gateway restart
        - 先安装clawdbot gateway install
        - 同systemctl --user restart clawdbot-gateway.service
    - clawdbot gateway status
- tui bug
    - ```javascript
      原因找到了：网关在处理 reply_to 标签时，流式事件只发出了 [[reply_to: ... 前缀，真正的回复文本只在
        message_end 写入会话文件，没有再补发到 chat 事件里，所以 TUI 实时看不到，重连后读历史才出现。
      
        我已经在网关主机上打了最小补丁并重启服务：
      
        - 改动文件：/home/outrun/.npm-global/lib/node_modules/openclaw/dist/agents/pi-embedded-
          subscribe.handlers.messages.js
        - 做法：在 handleMessageEnd 里把完整 assistant 文本补发成 agent 事件（避免只写会话、不发事件）
        - 已执行：openclaw gateway restart
      
        我本机用 GatewayClient 验证过：chat final 现在会带完整回复文本，不再只有 reply_to 前缀，说明实时事件已修复。
      ```
