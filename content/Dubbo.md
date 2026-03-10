- 介绍
    - 阿里开源，分布式服务框架，rpc方案，soa治理
- 功能
    - 远程通讯    # 多协议，多种长连接nio框架封装
    - 集群容错    # 负载均衡，容错，地址路由，动态配置
    - 自动发现    # 注册中心
- 节点
    - 容器(container)
    - 提供者(provider)
    - 消费者(consumer)
    - 注册中心(registry)
    - 监控中心(monitor)
    - 调用关系
        - 容器启动提供者
        - 提供者注册
        - 消费者订阅
        - 注册中心返回地址列表, 长连接更新
        - 消费者软负载均衡挑选列表中提供者
        - 提供者和消费者累计调用次数和时间，定时发送到监控中心
- 容错机制
    - failover    # 默认，失败自动切换
    - failfast    # 立即报错，用于幂等写操作
    - failsafe    # 忽略
    - failback    # 定时重发
    - forking     # 并行多个取最快(any)
    - broadcast   # 逐个多个，异常退出
- 连接方式
    - 广播      # 不需要中心节点，适用开发测试, 地址段224.0.0.0 - 239.255.255.255
        - 服务端配置 applicationContext-service.xml
            - ```plain text
              <dubbo:application name=”taotao-manager-service” />
              <dubbo:registry address=”multicast://224.5.6.7:1234” />
              <dubbo:protocol name=”dubbo” port=”20880” />
              <dubbo:service interface=”com.taotao.manager.service.TestService” ref=”testServiceImpl” />
              ```
        - 客户端配置 springMVC.xml
            - ```plain text
              <dubbp:application name=”taotao-manager-web” />
              <dubbo:registry address=”multicast://224.5.6.7:1234” />
              <dubbo:service interface=”com.taotao.manager.service.TestService” id=”testService”
              timeout=”10000000” />
              ```
    - 直连
        - 服务端配置
            - ```plain text
              <dubbo:application name=”taotao-manager-service” />
              <dubbo:registry address=”N/A” />
              <dubbo:protocol name=”dubbo” port=”20880” />
              <dubbo:service interface=”com.taotao.manager.service.TestService” ref=”testServiceImpl” />
              ```
        - 客户端配置 springMVC.xml
            - ```plain text
              <dubbp:application name=”taotao-manager-web” />
              <dubbo:service interface=”com.taotao.manager.service.TestService” id=”testService”
              timeout=”10000000” />
              ```
- 注册中心
    - zookeeper
