- 目录结构
    - bin
        - mycat                        # 服务器启动等
    - conf
        - wrapper.conf                # jvm配置参数(如分配系统资源)
        - server.xml                # 服务器参数，用户授权
        - schema.xml                # 逻辑库，表，分片的定义．修改后要重启
        - log4j.xml                # 配置输出到logs/mycat.log的日志
    - logs
        - mycat.log                # 日志（每天一个日志文件）， 可调整输出级别
- 默认值
    - 默认数据端口: 8066
    - 默认管理端口: 9066
- 配置
    - wrapper.conf                # jvm配置参数(如分配系统资源)
    - server.xml                # 服务器参数，用户授权
    - schema.xml                # 逻辑库，表，分片的定义．修改后要重启
    - log4j.xml                        # 配置输出到logs/mycat.log的日志
    - mysql
        - linux版数据库设置大小写不敏感，否则会发生表找不到的问题
            - my.cnf
                - [mysqld]
                - lower_case_table_names = 1
- 例子
    - server.xml
        - ```plain text
          <mycat>
          <user name="test">
                  <property name="password">test</property>
                  <property name="schemas">TESTDB</property>
          </user>
          </mycat>
          ```
    - schema.xml
        - ```plain text
          <mycat>
          <schema name="TESTDB" checkSQLschema="false" sqlMaxLimit="100">
                  <table name="travelrecord" dataNode="dn1,dn2,dn3" rule="auto-sharding-long" />
                  <table name="employee" primaryKey="ID" dataNode="dn1,dn2" rule="sharding-by-intfile" />
                  <table name="company" primaryKey="ID" type="global" dataNode="dn1,dn2,dn3" />
                  <table name="goods" primaryKey="ID" type="global" dataNode="dn1,dn2" />
                      <table name="hotnews" primaryKey="ID" dataNode="dn1,dn2,dn3" rule="mod-long" />
                          <table name="customer" primaryKey="ID" dataNode="dn1,dn2" rule="sharding-by-intfile">
                                          <childTable name="orders" primaryKey="ID" joinKey="customer_id" parentKey="id">
                                                  <childTable name="order_items" joinKey="order_id" parentKey="id" />
                                          </childTable>
                                          <childTable name="customer_addr" primaryKey="ID" joinKey="customer_id" parentKey="id" />
                          </table>
          </schema>
          <dataNode name="dn1" dataHost="localhost1" database="db1" />
          <dataNode name="dn2" dataHost="localhost1" database="db2" />
          <dataNode name="dn3" dataHost="localhost1" database="db3" />
          <dataHost name="localhost1" maxCon="1000" minCon="10" balance="0"
                  writeType="0" dbType="mysql" dbDriver="native">
                  <heartbeat>select user()</heartbeat>
                  <writeHost host="hostM1" url="centos6.5_1:3306" user="root" password="a">
                  </writeHost>
          </dataHost>
          </mycat>
          ```
    - rules.xml
        - ```plain text
          <mycat>
                  <tableRule name="sharding-by-intfile">
                  <rule>
                          <columns>sharding_id</columns>
                          <algorithm>hash-int</algorithm>
                  </rule>
                  </tableRule>
                  <tableRule name="mod-long">
                  <rule>
                          <columns>id</columns>
                          <algorithm>mod-long</algorithm>
                  </rule>
                  </tableRule>
                  <function name="hash-int" class="org.opencloudb.route.function.PartitionByFileMap">
                          <property name="mapFile">partition-hash-int.txt</property>
                  </function>
                  <function name="mod-long" class="org.opencloudb.route.function.PartionByMod">
                          <property name="count">3</property>
                  </function>
          </mycat>
          ```
    - partition-hash-int.txt
        - 10000=0
        - 10010=1
    - SQL
        - ```sql
          ```
- 经验
    - 数据库上的数据修改(权限修改)立即生效
    - 支持跨库事务，且等待主从复制完成后完成事务(如全局表的复制)
    - virtualbox4.3下配置的mycat节点不能子表插入
    - 可以配置jdbc数据库进行远程数据调用
    - childTable中的joinKey与parentKey是必须字段, childTable不能配置dataNode
    - 同一个childTable出现在多个主表时(相当于mysql的多个外键)，会出错，提示该childTable重复创建
    - childTable不能配置dataNode, 默认和主表存的dataNode相同
    - 虽然childTable只能配一个，但mysql里可以配置多个外键，但要求外键关联的表配置>在相同的dataNode上
    - o配置在两个dataHost中的表, show tables 时表名会显示两遍
    - table不配置rule默认数据每个dataNode存一份，但是mycat查询时显示同id的两份数据，此方法不可用
    - table不配置，不可以创建
    - 全局序列号名称必需大写
    - 不同dataNode中的普通表不可以关联查询
    - 同样配置dn1, dn2 的两个普通外键关系表之间数据插入可能会出错(如: 表2数据在dn1中, 其外键关联表2在dn2中的数据时)
