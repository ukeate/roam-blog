- [[亿级流量]]
- 两个体系
    - [[Spring Cloud Netflix]]
    - [[Spring Cloud Alibaba]]
- 基础
    - 介绍
        - [[Spring Boot]]基础上构建，快速构建分布式系统, 全家桶
        - 面向云环境架构(云原生) 
            - 适合在Docker和PaaS部署
    - 功能
        - 配置管理
        - 服务发现
        - 熔断
        - 智能路由
        - 微代理
        - 控制总线
        - 全局锁
        - 决策竞选
        - 分布式会话
        - 集群状态管理
    - 子项目
        - 基础
            - [[Spring Cloud Starters]]
            - Spring Cloud Commons
        - 服务
            - [[Spring Cloud Consul]]
            - [[Spring Cloud Cluster]]
            - [[Spring Cloud CloudFoundry]]
            - [[Spring Cloud AWS]]
            - [[Spring Cloud Zookeeper]]
            - [[Spring Cloud Cli]]
            - [[Spring Cloud Task]]
        - 配置
            - [[Spring Cloud Config]]
        - 消息
            - [[Spring Cloud Bus]]
            - [[Spring Cloud Stream]]
        - 监控
            - [[Spring Cloud Sleuth]]
        - 安全
            - [[Spring Cloud Security]]
        - 测试
            - spring cloud contract       # 契约测试, 可用groovy和yaml定义
        - Spring Cloud [[Eureka]]
        - Spring Cloud [[Ribbon]]
        - Spring Cloud [[Hystrix]]
        - [[Spring Cloud Turbine]]
        - Spring Cloud [[Feign]]
        - Spring Cloud [[Zuul]]
    - 版本
        - 用命名不用版本号，因为有多子项目版本，易混淆
        - 命名用伦敦地铁站用，字母表排序
    - 缺点
        - 难于追查框架问题
        - 非二进制通信协议
        - 适合中小团队
- 配置
    - ```yaml
      pom.xml
          <modules>
              <module>spring-cloud-common</module>
              <module>spring-cloud-provider-book</module>
              <module>spring-cloud-service-discovery</module>
              <module>spring-cloud-api-gateway</module>
              <module>spring-cloud-consumer-book</module>
              <module>spring-cloud-monitor-dashboard</module>
              <module>spring-cloud-aggregator</module>
              <module>spring-cloud-zipkin-server</module>
              <module>spring-cloud-admin-server</module>
              <module>spring-cloud-config-server</module>
          </modules>
          <parent>
              <groupId>org.springframework.boot</groupId>
              <artifactId>spring-boot-starter-parent</artifactId>
              <relativePath/>
          </parent>
          <dependencyManagement>
              <dependencies>
                  <dependency>
                      <groupId>org.springframework.cloud</groupId>
                      <artifactId>spring-cloud-dependencies</artifactId>
                      <version>Edgware.SR3</version>
                      <type>pom</type>
                      <scope>import</scope>
                  </dependency>
              </dependencies>
          </dependencyManagement>
          <repositories>
              <repository>
                  <id>spring-releases</id>
                  <url>https://repo.spring.io/libs-release</url>
              </repository>
          </repositories>
          <pluginRepositories>
              <pluginRepository>
                  <id>spring-releases</id>
                  <url>https://repo.spring.io/libs-release</url>
              </pluginRepository>
          </pluginRepositories>
      application.yml
          spring:
              profiles: peer1            
      ```
- 组件
    - dependencyManagement
        - spring-cloud-dependencies
