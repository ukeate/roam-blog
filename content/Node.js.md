- [[Node.js API]]
- 基础
    - 特点
        - commonJS规范
        - javascript书写(v8引擎)
            - js设计之初就可以运行在后端
            - v8
                - 成熟的事件驱动模式
                - 没有i/o库, 没有历史包袱
                - v8性能好
        - 单线程
            - 不用在意多线程状态同步(没有死锁, 没有上下文切换)
            - 无法利用多核, 错误时应用退出，计算密集时无法调度   # child_process解决
        - 事件驱动(event-driven), 回调
            - event loop
                - [while(true)] -> watcher -> handles
                - watcher产生事件后, event loop取到并执行其handle(回调函数)
                - event loop每一周询问多个watcher是否有事件
                - event loop中没有watcher时进程退出
            - http模块就是启动了一个watcher,所以执行后进程不结束
                - 其它watcher有 timer, fs, udp/req, process
            - 不同操作系统中event driven的实现:
                - windows: IOCP
                - Linux: epoll
                - Mac:kqueue
        - 非阻塞io(non-blocking i/o model)
            - io与数据处理分离（所以必须异步）
            - 线程池结合event-driven实现
        - 异步io
            - go语言有协程(coroutine)而node.js没有，协程可以同步式编程
                - 有第三方协程模块
            - promise(commonJs的规范, 其实现有whenJs, Q)
                - 书写难度降低
            - eventProxy      # 朴灵
            - async/step
    - commonJS
        - 模块
            - var math = require('math')  # 缓存优先，核心模块优先。依次找.js, .node, .json
            - exports.add = function(){}
        - 二进制
        - Buffer
        - 字符集编码
        - I/O流
        - 进程环境
        - 文件
        - 套接字
        - 单元测试
        - web网关
        - 包管理
            - package.json
            - bin
            - lib
            - doc
            - test
    - 实现技术
        - libev的windows与linux接口实现
        - c++扩展
    - 事件循环    # 生产者消费者模型
        - 执行一次称为Tick
        - 询问观察者(文件、网络等)是否有待处理事件, 有关联回调执行回调
            - 观察者先idle, 再io, 再check
            - 通过请求对象实现，绑定回调、运行参数、执行标志
    - 层次
        - javascript
        - v8
        - node
        - libuv
        - nix/ windows                # 分别编译
    - 应用
        - I/O密集服务
        - cpu密集用c/c++扩展，用子进程
- 工具
    - node --v8-options | grep harmony
        - 查看支持的es6特性
    - [[NPM]]
    - [[Vite]]
    - n
    - node-gyp    # 编译c/c++模块
    - nvm
    - [[CNPM]]
    - 调试
        - o-> 代码中插入断点
            - debugger;
        - o-> 以debug模式运行
            - debug模式运行时, help查看可用命令
            - node debug app.js
- 配置
    - package.json
        - name                # 包名
        - description         # 简介
        - version             # 版本
        - keywords            # 搜索关键词
        - maintainers         # 维护者
        - contributors        # 代码贡献者
        - bugs                # 反馈bug的地址
        - licenses            # 许可证
        - repositories        # 托管代码地址
        - dependencies        # 依赖包
        - homepage            # 该包网站
        - os                  # 操作系统支持列表
        - cpu                 # cpu架构支持列表
        - engine              # 支持的js引擎, 如ejs
        - builtin             # 内建在底层系统的哪些组件上
        - directories         # 目录说明
        - implements          # 实现了commonJS哪些规范
        - scripts             # 脚本命令
            - preinstall
            - install
            - uninstall
            - test
        - author              # 包作者
        - bin                 # 全局安装时，命令安装的位置
        - main                # require()包时入口，默认找index
        - devDependencies     # 开发时需要的依赖
        - ```javascript
          {
              "name": "test",
              "version": "0.1.0",
              "keywords": ["a", "b"],                     # npm search时用
              "description": "A testing package",
              "os": ["linux", "darwin"],
              "author": "outrun<outrun@mail.com>",
              "dependencies": {
                  "express": "^1.0.0",
                  "redis": ">= 0.6.7"
              },
              "devDependencies": {
                  "grunt": "^0.4.5"
              },
              "main": "index",
              "bin": {
                  "test": "./bin/test.js"
              },
              "scripts": {
                  "start": "node server.js",
                  "test": "vows test/*.js",               # "grunt test" "mocha test" "make test" "make test-all"
                  "preinstall": "./configure",
                  "install": "make && make install",
                  "uninstall": ""
              },
              "engines": {
                  "node": "5.0.0"
              }
          }
          ```
- 方案
    - 异常捕获
        - ```javascript
          process.on("uncaughtException",function(e){
              logger.error("error:"+e);
          });
          process.on('unhandledRejection', function (err, p) {
              console.error(err.stack)
          });
          ```
