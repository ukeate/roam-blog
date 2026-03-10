- 介绍
    - Netflix，服务治理注册、发现，保证AP
- 使用
    - @EnableEurekaServer
    - application.properties
        - eureka.client.register-with-eureka=false                # 是否注册自己
        - eureka.client.fetch-registry=false                      # 是否拉取eureka
        - eureka.client.service-url.defaultZone=http://localhost:7900/eureka/         # 设置注册中心的URL
        - eureka.instance.hostname=euk1.com
        - spring.application.name=EurekeServer                    # Eureka集群中各节点要同名
- 行为
    - register                    # 注册
    - renew                       # 通过心跳, 默认30s。三次失败删除实例
    - fetch registry              # 拉注册的信息
    - cancel                      # 发取消请求，删除实例
    - time lag                    # 同步时间延迟
    - communication mechanism     # 通讯机制，默认jersey和jackson
- 功能
    - 唯一标识                        # service id
        - 主机名:application.name:端口
    - 提供RestAPI, 可多终端接入
- 问题
    - 一致性问题方案
        - Eureka间不同步，client向多个Eureka提交
        - Enreka间同步，Eureka强可用性弱一致性
- 原理
    - 生产者向Eureka注册, 周期发送心跳(默认30s)
    - Eureka服务间同步注册信息
    - 消费者请求地址，缓存本地
    - Eurake接收生产者心跳超时, 设置为down, 推送状态到消费者
    - Eurake短期down过多生产者，进入自我保护不再down
- 组件
    - spring-cloud-starter-[netflix-]eureka-server
- application.yml
    - ```yaml
      eureka:
              instance:
                  hostname: localhost                 # 实例主机名
              client:
                  registerWithEureka: false           # 当前服务不注册
                  fetchRegistry: false                # 不获取注册信息
                  serviceUrl:                         # server地址
                      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
      ```
- bootstrap.yml                                   # 基础配置, 待拉取config
- 注解
    - @EnableEurekaServer                         # 修饰Application类
