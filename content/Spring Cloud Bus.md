- 消息总线，传播集群状态变化来触发动作，如刷新配置
- application.yml
    - ```yaml
      spring:
          rabbitmq:
              host: localhost
              port: 5672
              username: outrun
              password: pwd
              publisher-confirms: true
              virtual-host: /
      management:
          security:
              enabled: false
      ```
- 路径
    - POST /bus/refresh                       # 从新拉配置, 其它服务也触发同步
        - ?destination=appName:*.*            # 指定刷新服务名下实例
