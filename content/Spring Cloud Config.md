- 应用配置外部化, 推送客户端配置, 支持git存储
- config-server
    - application.yml
        - ```yaml
          server:
                      port: 9012
                  spring:
                      application:
                          name: erp-config-server
                      cloud:
                          config:
                          server:
                              native:
                                  search-locations: classpath:/shared             # 读取路径
                      profiles:
                          active: native
          ```
    - shared/config-client-dev.yml                                        # 文件名为 [客户端服务名]-[profile变量]
        - ```yaml
          server:
              port: 9013
          foo: foo version 1
          ```
    - 地址
        - localhost:9012/config-client/dev                                # 查看分发给服务的配置
- config-client
    - ```yaml
      spring:
        application:
            name: erp-config-client
        cloud:
            config:
                uri: http://localhost:9012
                fail-fast: true
        profiles:
            active: dev
      ```
- 注解
    - @RefreshScope                           # 热更新
