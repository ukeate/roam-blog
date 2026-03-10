- 介绍
    - 监视重启
- 命令
    - supervisord
        - # 启动后台服务
    - supervisorctl
        - status          # 查看所有
        - update          # 重载配置
        - reload          # 
        - start
        - stop
        - restart
        - start all
        - stop all
        - restart all
- 配置
    - /etc/supervisor/supervisord.conf
        - ```yaml
          [include]
          files = /etc/supervisor/conf.d/*.conf
          ```
    - /etc/supervisor/conf.d/app.conf
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
