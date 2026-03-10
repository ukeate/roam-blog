- collection
    - 增
        - save
            - 不存在时插入，存在时更新
            - {$ref: 'user', $id: 1} 来保存引用
        - insert
    - 删
        - remove('id': 'bar')
            - 删除一条数据
            - remove()删除所有数据
        - drop()
            - 删除persons collection, 不释放文件空间
        - dropIndexes()
            - 删除所有索引
    - 改
        - update(finder, updater, options或upser, multi)
            - $set
            - {age: {$gt: 18}, $isolated : 1} $isolated事务隔离该字段到本语句执行结束, does not work with sharded clusters
        - findAndModify
    - 查
        - findOne()
        - find(finder, filter)
            - limit(3).skip(10).sort({name: -1, age: 1})
                - sort({$natural: 1}) 固定集合排序
            - explain() 返回带统计信息的文档
                - 是否用到索引，耗时，需要扫描多少文件
            - hint({}) 强制使用某索引查询
            - null可以匹配null, 也可以匹配{$exists: false}        
            - 正则可以匹配自身，也可以模式字符串
        - count()
            - document的条数
        - aggregate
- db
    - 默认存在的数据库admin, config, local
    - sources
        - 从节点中设置的源collection
    - help()
    - persons.help()
        - 显示某集合的帮助
    - auth('username', 'pwd')
        - 切换用户
    - addUser()
        - addUser('admin', 'pwd')
        - addUser('readonly', 'pwd', true)
    - listCommands()
    - shutdownServer()
    - eval()
        - 执行
    - stats()                                        
        - 当前数据库的状态
            - 包括名称，collection数，索引数等
    - createCollection()
        - {'user', {capped: true, size: 100, max: 10}} 
            - 创建固定集合, 100字节, 文档数上限为10
            - 固定集合插入快，不能删除，无_id, 有尾部游标
    - getCollection("persons").text
        - 同db.persons        
    - dropDatabase()
        - 删除当前数据库        
    - repairDatabase()
        - 释放空间
    - serverStatus()
        - 返回数据库的metrics 数据
    - serverStatus().metrics.cursor
        - 返回指针信息
    - ensureIndex({x: 1, y: -1}, {name: 'xy'})
        - 建立x的升序, y的降序联合索引
        - 只使用索引的前部, 即对x的查询可以用该索引
        - {"gps": '2d'} {'gps': '2dsphere'}
            - 支持gps写成 [0, 0] {x: 0, y: 0} {latitude: 0, longitude: 0} 格式
        - 可以索引内嵌文档
        - {unique: true} 来建立唯一索引
        - {dropDups: true} 将唯一索引中重复的文档都删掉
    - dropIndexes
    - system
        - indexes
            - 保留集合，索引
        - namespaces
            - 也包含索引信息
        - js
            - insert({_id: 'fn', value: function() {}})
                - 用db.eval('fn()') 执行
    - runCommand()
        - {'dropIndexes': 'col', 'index': 'ind'}
        - 可以返回命名执行的状态信息
        - {buildInfo: 1}
        - {collStats: 'user'}
        - {distinct: 'user', key: a, query: {b: 0}}
        - {drop: 'user'}
        - {dropDatabase: 1}
        - {dropIndexes: 'user', index: 'ind'}
        - {getLastError: 1}
            - 上次更新的作用信息
            - {getLastError: 1, w: 3}
                - 阻塞复制，有3个节点
        - {isMaster: 1}
        - {findAndModify: 'user', query: {a: 0}, sort: {a: 1}, update: {$set: {a: 1}}}
        - {listCommands: 1}
        - {listDatabases: 1}
        - {ping: 1}
        - {renameCollection: 'user', to: 'user1'}
        - {repairDatabase: 1}
            - 修复并压缩当前数据库
        - {serverStatus: 1}
            - globalLock: 全局写入锁占用了多少时间
            - mem: 内存映射了多少数据
            - indexCounters: B树磁盘检索(misses)和内存检索(hits)的次数
            - backgroundFluhing: 后台做了多少次fsync及用的时间
            - opcounters: 每种主要操作的次数
            - asserts: 断言的次数
        - {convertToCapped: 'user', size: 100}
            - 转为固定集合
        - {fsync: 1, lock: 1}
            - 缓冲写入磁盘，并加写入锁。后可以直接复制磁盘数据来备份
            - db.$cmd.sys.unlock.findOne() 解锁
            - db.currentOp() 查看为空时已解锁
        - {resync: 1}
            - 从节点重新同步
        - {collMod: 'users', usePowerOf2Sizes: true}
            - 每次增大空间总是2的倍数，适用于常写的集合
- rs
    - isMaster
    - slaveOk
- dcl
    - help                                        # 显示帮助
    - show dbs                                # 显示所有数据库
    - use mydb                                # 选择数据库(默认为test)
        - 如果没有该数据库，则创建(插入第一条数据时实际创建)
    - db                                        # 显示当前数据库名
    - show collections                        # 查看当前数据库的collections
    - db.eval()                                # 执行shell语法字符串
    - 用户管理命令
        - use test                                # 选择需要添加用户的数据库
        - db.addUser('name','pwd')                # 第三个参数代表是否只读 true代表是 ,  false代表否
            - db 代表本数据库，也就是test
        - db.system.users.find()                        # 查看用户列表
        - db.auth('name','pwd')                # 用户认证，反回１代表认证成功
        - db.removeUser('name')
        - show users                                # 查看所有用户
            - 权限生效需要mongod　以　-auth参数启动
            - admin数据库中的user是超级管理员 , 其他数据库中的user只限于本数据库
- ttl(time to live)
    - mongodb每1分钟检查一次数据删除
        - ```javascript
          db.log_events.ensureIndex({"createdAt": 1}, {expireAfterSeconds: 3600 })
          db.log_events.insert({
              "createdAt": new Date(),
              "logEvent": 2,
              "logMessage": "Success!"
          })
          # 插入的这条数据在1小时后删除
          ```
        - ```javascript
          db.log_events.ensureIndex({"expireAt": 1}, {expireAfterSeconds: 0})        
          db.log_events.insert({
              "expireAt": new Date('July 22, 2013 14:00:00'),
              "logEvent": 2,
              "logMessage": "Success!"
          })
          # 插入的这条数据在July 22, 2013 14:00:00删除
          ```
- aggregate
    - mapReduce()
        - ```javascript
          mapReduce(
              function() {emit(this.cust_id, this.amount);},
                  # map
              function(key, values) {return Array.sum(values)},
                  # reduce
              {
                  query: {status: 'A'},
                      # query
                  out: 'order_totals'
                      # output
              } 
          )
          ```
    - distinct()
    - count()
    - group()
        - ```javascript
          group({
              key: {a: 1},
                  # $keyf: function(x) {return x.category} 定义分组函数
              cond: {a: {$lt: 3}}.
              $reduce: function(cur, result) {result.count += cur.count},
              initial: {count: 0},
              finalize: function (prev) {}
          })
          # 返回的文档 {retval: [], count: 0, keys: 0, ok: 0}
          ```
    - aggregate()
        - ```javascript
          aggregate([
              {$redact: {$cond: {
                  if: {$eq: ['$level', 5]},
                  then: '$$PRUNE',
                  else: '$$DESCEND'
              }}}
              {$match: {status: 'A'}},
              {$geoNear: {...}},
              {$project: {name: {$toUpper: '$_id'}, _id: 0}},
              {$unwind: '$sizes'},
              {$group: {_id: '$state', totalPop: {$sum: '$pop'}}},
              {$skip: 10},
              {$limit: 5},
              {$sort: {age: -1}},
              {$out: 'authors'}
          ])
          ```
    - 例子
        - 得到tags数组的长度
            - ```javascript
              db.users.aggregate([{
                  $group: {
                      _id: '$username',
                      tags_count: {$first: {$size: '$tags'}}
                  }
              }])
              db.users.aggregate([{
                  $project: {
                      tags_count: {$size: '$tags'}
                  }
              }])
              ```
- expressions            
    - $and
    - $or
    - $not
    - $setEquals
    - $setIntersection
    - $setUnion
    - $setDefference
    - $setIsSubset
    - $anyElementTrue
    - $allElementsTrue
    - $cmp
    - $eq
    - $gt
    - $gte
    - $lt
    - $lte
    - $ne
    - $add
    - $subtract
    - $multiply
    - $divide
    - $mod
    - $concat
    - $substr
    - $toLower
    - $toUpper
    - $strcasecmp
    - $meta
    - $size
    - $map
    - $let
    - $literal
    - $dayOfYear
    - $dayOfMonth
    - $dayOfWeek
    - $year
    - $month
    - $week
    - $hour
    - $minute
    - $second
    - $millisecond
    - $dateToString
    - $cond
    - $ifNull
    - $sum
    - $avg
    - $first
    - $last
    - $max
    - $min
    - $push
    - $addToSet
    - $near
    - $within
    - $box
    - $center
- 对象
    - 全局函数
        - printjson
        - connect('localhost:27017/mydb')
            - 连接另一个服务器
        - runProgram
    - 对象类型
        - cursor
            - hasNext()
                - 立即返回前100个数据与4Mb数据的较小者。取数据时直接读缓存
            - next()
            - forEach
- 复制
    - 复制
        - mongod --master --oplogSize 100
        - mongod --slave --source localhost:27017
            - --source指定主节点
            - --only 指定只复制特定的数据库
            - --slavedelay 主从复制时的延时
            - --fastsync 从节点是主节点快照时，加这个选项，同步速度快
            - --autoresync 重新同步
            - --oplogSize 主节点oplog的大小
        - db.sources.insert({host: 'localhost:27017'})
            - 从节点设置主节点
    - 副本集
        - 没有主节点，集群自己选举主节点
        - 数据太多从节点会自动停止同步
        - mongod --dbpath '/var/local/mongo1' --port 27017 --replSet rs0
            - 三个实例replSet 名必叫 rs0
        - use admin
            - ```javascript
              use admin
              rs.initiate({
                  _id: 'a',
                  members: [{
                      _id: 1,
                      host: 'localhost1:27017'
                  }, {
                      _id: 2,
                      host: 'localhost1:27018'
                  }]
              })
                  # 其中一台执行初始化
              ```
        - rs.add('localhost:27019')
        - rs.status()
        - db.getMongo().setSlaveOk()
        - rs.isMaster()
        - rs.conf()
        - db.getReplicationInfo()
        - db.printReplicationInfo()
        - db.printSlaveReplicationInfo()
        - use local        
        - db.addUser('name', 'pwd')
            - 复制认证时用
- 分片 
    - mongods --port 3000 --configdb localhost:27017
        - 多个地址用,隔开
        - 每个片都就是副本集
    - mongo localhost:3000/admin
    - db.runCommand({addshard: 'localhost:27017‘, allowLocal: true})
        - 在localhost上运行时, 要设allowLocal
        - 'a/localhost:27017' 让mongo知道这个片所在的副本集
    - db.runCommand({enablesharding: 'db1'})
    - db.runCommand({shardcollection: 'db1.user', key: {_id: 1}})
    - db.printShardingStatus()
    - db.runCommand({removeshard: 'localhost:27017'})
