- 参考1
    - 用户接口(user interface)
    - 应用(application)                   # 尽可能小。数据验证，事务。故事, 表达出操作的事情
        - application service
        - unit work
        - presentation model
    - 领域(domain)                        # 专注领域。准确定义业务对象
        - aggregate, entity, value object
        - domain service, domain event
    - 基础设施(infrastructure)            # 辅助层
        - repository
        - global support
    - 项目文件
        - [ui]
            - mall                            # 商城api
        - [saleDomain]
            - [application]
                - mall.application            # 分模块，讲述故事
                    - CartService
                        - GetCart()
                    - BuyService
                        - Buy()
                - mall.application.domainEventSubscribers         # 订阅domain事件
            - [domain]
                - mall.domain                 # 不大而全，要求刚好满足需求
                    - cartModule
                        - entity
                            - CartItem
                        - aggregate
                            - Cart
                    - valueObject
                        - Product
                        - SellingPriceCart
                    - IDomainServices
                    - IRemoteServices         # 访问远程资源接口
                        - IUserService
                        - ISellingPriceService
                    - IRepositories           # 仓储接口
                        - ICartRepository
                - mall.domain.events          # 领域事件, 用于实现最终一致性
                - mall.domainService          # 操作domain的无状态方法
                    - ConfirmUserCartExistedDomainService
        - [sellingPriceDomain]                # 与saleDomain合作关系, sale请求sellingPrice定价
            - [appication]
                - mall.application.SellingPrice
                    - dto
                        - CalculatedCartDTO
                    - mapper
                        - ValueObjectToDTO
            - [domain]
        - [infrastructure]
            - mall.infrastructure             # 通用类库
                - domainCore                  # mail.domain base方法
                    - AggregateRoot
                        - Cart
                    - Entity
                        - CartItem
                    - ValueObject
                        - Product
                    - IUnitOfWork             # 仓储事务
                - domainEventCore
                    - DomainEvent
                    - DomainEventBus
                    - DomainEventSubscriber
                    - IDomainEvent
                    - IDomainEventSubscriber
            - mall.infrastructure.repositories                # 仓储
                - CartSqlServerRepository
            - mall.infrastructure.translators                 # 防腐层, 访问远程资源实现
                - user
                    - UserAdapter             # 请求原始结果
                    - UserService
                    - UserTranslator          # 转换原始结果
    - 模块结构
        - api: controller
        - biz: 特异业务
            - manager
            - converter
        - core: 公用业务
            - model
                - entity
                - bo
            - service
                - repository
        - common
            - dal
                - dataobject
                    - do
                - dao
                - mapper
            - service
                - facade
                    - dto: facade和controller用
                    - service: 服务间api
                    - validate
                - integration
                    - service
            - shared
                - dto: 项目内部公用
- 参考2
    - ```javascript
      ├─com.mashibing.ddd
      │    │
      │    ├─apis   API接口层
      │    │    ├─model     视图模型,数据模型定义 vo/dto（大多数情況是一样的）
      │    │    ├─assembler    装配器，实现模型转换eg. apiModel&#x3c;=> domainModel
      │    │    └─controller   控制器，对外提供（Restful）接口
      │    │
      │    ├─application   应用层
      │    │    ├─service  应用服务，非核心服务
      │    │    ├─task     任务定义，协调领域模型
      │    │    └─***      others
      │    │
      │    ├─domain   领域层
      │    │    ├─common       公共代码抽取，限于领域层有效
      │    │    ├─events       领域事件
      │    │    ├─model        领域模型
      │    │    │    ├─dict    领域划分的模块，可理解为子域划分
      │    │    │    │    ├─DictVo.java       领域值对象
      │    │    │    │    ├─DictEntity.java   领域实体，充血的领域模型，如本身的CRUD操作在此处
      │    │    │    │    ├─DictAgg.java      领域聚合，通常表现为实体的聚合，需要有聚合根
      │    │    │    │    └─DictService.java  领域服务，不能归与上述模型，如分页条件查询等可写在此处
      │    │    │    ├─xxx
      │    │    │    │    ├─xxxEntity.java
      │    │    │    │    ├─bbbAgg.java
      │    │    │    │    └─cccAgg.java
      │    │    ├─service      领域服务类，一些不能归属某个具体领域模型的行为
      │    │    └─factory      工厂类，负责复杂领域对象创建，封装细节
      │    │
      │    ├─infrastructure  基础设施层
      │    │    ├─persistent   持久化机制
      │    │    │    ├─po           持久化对象
      │    │    │    └─repository   仓储类，持久化接口&实现，可与ORM映射框架结合
      │    │    ├─general      通用技术支持，向其他层输出通用服务
      │    │    │    ├─config       配置类
      │    │    │    ├─toolkit      工具类
      │    │    │    └─common       基础公共模块等
      │    │
      │    └─resources
      │        ├─statics  静态资源
      │        ├─template 系统页面
      │        └─application.yml   全局配置文件
      ```
    - 工程结构
        - 适配层
            - Controller
            - Events Listener
            - ACL(防腐层)
            - Repository Impl
        - 应用层
            - Application
            - DTO
        - 领域层
            - Entity
            - Value Object
            - Aggregate
            - Factory
            - Repository定义
        - 基本设施层
            - Repository实现
            - Error Code
            - Data
