- 异步api
    - I/O操作api
    - setTimeout() setInterval()
        - 定时器插入观察者的红黑树中, tick时迭代定时器，如果超时就形成事件
            - 如果前一个tick耗时大，定时会拖后
            - 比较浪费性能
    - process.nextTick()
        - 回调放入队列，下tick全部执行, 位于idle观察者
    - setImmediate()
        - 回调放入链表, 每tick执行一个，位于check观察者，晚于idle
- 宿主对象
    - global
        - 全局对象
        - root
            - 指向自己
        - BLOBAL
            - 指向自己
        - setTimeout()
        - setInterval()
        - clearTimeout()
        - clearInterval()
    - process
        - 当前进程
        - argv
            - 获得命令行参数数组
            - title       # node
            - version     # v0.12.2
        - 事件
            - ```javascript
              process.on("uncaughtException",function(e){
                  console.log("error:"+e);
              });
              ```
    - buffer
        - 特点
            - node中buffer不属于v8, 使用c++扩展编写。所以可以使用高于1.4g的内存
            - 一个元素一字节
            - 8kb之内为小对象，slab机制分配内存, 先申请后分配。大于8kb的创建SlowBuffer对象
            - pool的实现方式
        - 字符编码类型
            - 默认编码UTF-8, 一个buffer只能有一个编码
            - ascii
            - utf-8
            - utf-16le/ucs-2
            - base64
            - binary
            - hex
        - length
        - write()
            - write(str, [offset], [length], [encoding])
        - toString()
            - toString([encoding], [start], [end])
        - isEncoding()
            - 指定编码是否支持转换
        - copy()
            - 复制自身到另一个buffer的某位置
            - buf.copy(buffer, 0)
        - concat()
            - concat(chunks, size)
                - chunks中为buffer数组, size为总大小
        - 使用
            - new Buffer(100)
            - new Buffer('a', 'UTF-8')
    - console
        - log('',obj)
            - console.log('[%s] listening on http://127.0.0.1:%d', app.setting.env, port)
    - module
        - Module.exports真正的接口，导出的是一个类型
        - exports是Module.exports的包装，导出的是Object类型的对象
    - promise     # 0.11.x后加入的全局对象
        - 使用
            - 复制
            - ```javascript
              var jadeTemplate = new Promise(function(resolve, reject) {
              fs.readFile(path.join(__dirname, 'views/article.jade'), function(err, data) {
                  if (err) {
                  reject(err.message);
                  } else {
                  resolve(data.toString());
                  }
              });
              });
              
              var localData = new Promise(function(resolve, reject) {
              fs.readFile(path.join(__dirname, 'static/shuffle.json'), function(err, data) {
                  if (err) {
                  reject(err.message);
                  } else {
                  resolve(JSON.parse(data.toString()));
                  }
              });
              });
              
              Promise
              .all([jadeTemplate, localData])
              .then(function(value) {
                  console.log(jade.compile(value[0])(value[1]));
              });
              ```
- 内置lib
    - http
        - 介绍
            - 继承自net模块
            - EventEmitter实例
        - 事件
            - 服务端
                - connection
                - request
                - close
                - checkContinue
                    - 发送较大数据时，先发送Expect: 100-continue请求头，此时触发
                - connect
                - upgrade
                    - 要求升级连接协议时
                - clientError
                    - 客户端触发error事件时触发
            - 客户端
                - response
                - socket
                    - 建立连接时触发
                - connect
                    - 响应200时触发
                - upgrade
                - continue
        - globalAgent     # 重用http长连接，实际是个连接池，默认有5个并发
            - sockets
                - 连接数
            - requests
                - 处于等待状态的请求数
        - createServer(onRequest).listen(8888, func);                # 创建服务器并启动
            - request
                - ```javascript
                  req.setEncoding("utf8")
                  var postData = "";
                  req.addListener("data", function(postDataChunk){
                      postData += postDataChunk;
                  });
                  req.addListener("end", function(){
                      route(handle, pathname, res, postData);
                  });                                # 拼接post请求数据
                  req.rawBody
                      # post来的原生数据
                  req.destroy()
                      # 放弃请求，停止招收
                  ```
            - response
                - ```javascript
                  res.setHeader('WWW-Authenticate', 'Basic realm=\"Tomcat Manager Application\"')
                  res.writeHead(200, {"Content-Type": "text/html"});
                      # 调用setHeader多次，调用writeHead后才写入
                  res.write("");
                  res.write(file,?"binary");?
                  res.end();
                  ```
        - request(options, fn)        # 发起客户端请求
            - options中有 host, hostname, port, localAddress(使用本地的哪个网卡), socketPath(本地套接字文件路径), method, path, headers, auth(被计算成请求头的Authorization部分), agent(并发连接数，默认5)
    - https
        - 介绍
            - nodejs
            - 申请ca证书
            - 访问端口为443
        - 使用
            - express -e nodejs-https
            - cd nodejs-https && npm install
            - git --version
            - openssl version -a
            - openssl genrsa -out privatekey.pem 1024
                - 生成证书文件
            - openssl req -new -key privatekey.pem -out certrequest.csr
                - 通过私钥生成CSR证书签名
            - openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
                - 通过私钥和证书签名生成证书文件
                    - 这时生成了三个文件: certificate.pem, certrequest.csr, privatekey.pem
                        - 分别是: 证书文件, CSR证书签名, 私钥
                    - 由于证书是自己创建的，没有经过第三方机构验证，用户访问时会出现警告提示
            - 服务器
                - ```javascript
                  var https = require('https')
                      , fs = require('fs');
                  var options = {
                      key: fs.readFileSync('./privatekey.pem'),
                      cert: fs.readFileSync('./certificate.pem')
                  };
                  https.createServer(options, app).listen(3011, function(){
                      console.log('Https server listening on port: ' + 3011);
                  });
                  ```
            - 客户端
                - ```javascript
                  var options = {
                      hostname: 'localhost',
                      port: 8000,
                      path: '/',
                      method: 'GET',
                      key: fs.readFileSync('./keys/client.key'),
                      cert: fs.readFileSync('./keys/client.crt'),
                      ca: [fs.readFileSync('./keys/ca.crt')]
                          # 设置rejectUnauthorized: false 来忽略ca验证
                  }
                  options.agent = new https.Agent(options)
                  
                  var req = https.request(options, function (res) {
                      res.setEncoding('utf-8')
                      res.on('data', function (d) {
                          console.log(d)
                      })
                  })
                  req.end()
                  
                  req.on('error', function(e){
                      console.log(e)
                  })
                  ```
    - net
        - 介绍
            - 处理tcp请求
            - socket是EventEmitter的Stream实例
        - 注意
            - 默认开启Nagle, 会合并小数据成一个数据包延迟发送
                - socket.setNoDelay(true)关闭Nagle
            - 并不是每次write都触发data事件, 关掉Nagle后，可能接收到多个小数据包后触发一次data
        - 服务器事件
            - listening
            - connection
            - close
            - error
        - 连接事件
            - data
            - end
            - connect
            - drain
                - 任意一端调用write时触发
            - error
            - close
            - timeout
        - o-> 基本服务
        - telnet来测试
            - ```javascript
              var net = require('net')
              
              var server = net.createServer(function (socket) {
                  socket.on('data', function (data) {
                      socket.write('a')
                  })
              
                  socket.on('end', function () {
                      console.log('disconnected.')
                  })
              
                  socket.write('welcome')
              })
              
              server.listen(8124, function () {
                  console.log('server bound')
              })
              ```
        - o-> 基本服务2
            - ```javascript
              var server = net.createServer()
              server.on('connection', function (socket) {})
              server.listen(8124)
              ```
        - o-> 监听
            - ```javascript
              server.listen('/tmp/echo.sock')
                  # nc -U /tmp/echo.sock 来测试
              ```
        - o-> 客户端
            - ```javascript
              var client = net.connect({port: 8124}, function () {
                  console.log('client connected')
                  client.write('a')
              })
              
              client.on('data', function (data) {
                  console.log(data.toString())
                  client.end()
              })
              
              client.on('end', function() {
                  console.log('disconnected.')
              })
              ```
        - o-> 客户端
            - ```javascript
              var client = net.connect({path: '/tmp/echo.sock'})
              ```
        - o-> 管道
            - ```javascript
              var server = net.createServer(function (socket) {
                  socket.write('a')
                  socket.pipe(socket)
              })
              ```
    - dgram
        - 介绍
            - 处理udp
            - socket是EventEmitter实例
        - o-> 服务
            - ```javascript
              var dgram = require('dgram')
              
              var server = dgram.createSocket('udp4')
              
              server.on('message', function (msg, rinfo) {
                  console.log(msg + 'from' + rinfo.address + ':' +)
              })
              
              server.on('listening', function () {
                  var address = server.address()
                  console.log('listening ' + address.address + ':' + address.port)
              })
              
              server.bind(41234)
              ```
        - o-> 客户端
            - ```javascript
              var message = new Buffer('a')
              var client = dgram.createSocket('udp4')
              client.send(message, 0, message.length, 41234, 'localhost', function (err, bytes) {
                  client.close()
              })
              ```
    - events
        - 介绍
            - 几乎所有对象的父类
        - 使用
            - ```javascript
              var events = require('events')
                  , util = require('util');
              function Obj(){events.EventEmitter.cal(this);}
              util.inherits(Obj, events.EventEmitter);
                  # Obj.prototype.__proto__ = events.EventEmitter.prototype;
              Obj.prototype.write = function (data) {this.emit('data', data);};
              
              var obj = new Obj();
              obj.on('data', function (data) {console.log('Received data', data);})
                  # obj.once
              obj.write('hello');
              ```
        - setMaxListeners(0)
            - 侦听器过多不警告
    - path
    - os
        - 方法
            - totalmem
            - freemem
    - fs
        - ```javascript
          fs.readFile("tmp/test.png", "binary", function(error, file){
          });
          fs.writeFile('target.png', 'binary', function(err){
          })
          fs.exists(filePath, function(exists){
                  if(exists){}
          })
          fs.unlink(filePath, function(err){
          })
          fs.renameSync(files.upload.path,?"/tmp/test.png");                # 写入文件(阻塞)
          ```
        - o-> 流读写
            - ```javascript
              var reader = fs.createReadStream('in.txt')
                      # 第二个参数为设置, highWaterMark: 每次读取的size, encoding: 编码
              var writer = fs.createWriteStream('out.txt')
              reader.on('data', function (chunk) {
                      writer.write(chunk)
              })
              reader.on('end', function() {
                      writer.end()
              })
              
              var reader = fs.createReadStream('in.txt')
              var writer = fs.createWriteStream('out.txt')
              reader.pipe(writer)
              ```
    - sys
    - process
        - argv
            - 启动时参数
        - pid
            - 当前进程的pid
        - once()
            - once('SIGINT', function () {})
                - ctrl + c
        - memoryUsage()
            - 查看v8内存使用量
            - 其中rrs是resident set size, 是常驻内存的部分，其他在swap或文件系统中
        - kill()
            - process.kill(pid[, signal])
        - on()
            - 事件触发
        - o->
            - ```javascript
              process.on('SIGTERM', function () {
                  console.log('Got a SIGTERM, exiting...')
                  process.exit(1)
              })
              ```
        - o->
            - ```javascript
              process.on('uncaughtException', function () {
                  logger.error(err)
                  process.send({act: 'suicide'})
                      # 向主进程发送信号
                  worker.close(function () {
                      process.exit(1)
                  })
              
                  setTimeout(function () {
                      # 长连接断开需要时间较久, 超时自动退出
                      process.exit(1)
                  }, 5000)
              })
              ```
    - module
        - exports
        - parent
    - stream                
        - 介绍
            - 继承EventEmitter, 处理文件之类的流
    - tls
        - 介绍
            - 建立在tls/ssl上的加密tcp
            - 使用openssl来构建证书和测试
        - o-> 服务器
            - ```javascript
              var tls = require('tls')
              var fs = require('fs')
              
              var options = {
                      key: fs.readFileSync('./keys/server.key'),
                      cert: fs.readFileSync('./keys/server.crt'),
                      requestCert: true,
                      ca: [fs.readFileSync('./keys/ca.crt')]
              }
              
              var server = tls.createServer(options, function (stream) {
                      console.log('server connected', stream.authorized ? 'authorized' : 'unauthorized')
                      stream.write('welcome!\n')
                      stream.setEncoding('utf8')
                      stream.pipe(stream)
              })
              server.listen(8000, function () {
                      console.log('server bound')
              })
              ```
        - o-> 客户端
            - ```javascript
              var options = {
                      key: fs.readFileSync('./keys/client.key'),
                      cert: fs.readFileSync('./keys/client.crt'),
                      ca: [fs.readFileSync('./keys/ca.crt')]
              }
              
              var stream = tls.connect(8000, options, function () {
                      console.log('client connected', stream.authorized ? 'authorized' : 'unauthorized')
                              # 证书是否通过
                      process.stdin.pipe(stream)
              })
              
              stream.setEncoding('utf8')
              stream.on('data', function (data) {
                      console.log(data)
              })
              stream.on('end', function () {
                      server.close()
              })
              ```
    - child_process
        - 介绍
            - 可以创建新的node进程
        - spawn(command[, args][a options])
            - command执行的命令
            - args参数列表
            - options 环境变量对象, 包括7个属性
                - cwd 子进程当前工作目录
                - env 环境变量键值对
                - stdio 子进程stdio配置
                - customFds 子进程stdio使用的文件标示符
                - detached 进程组的主控制
                - uid 用户进程id
                - 进程组id
            - ```javascript
              var du = child.spawn('du', ['-sh', '/disk1']);
                  du.stdout.on('data', function(data){})
                  du.stderr.on('data', function(data){})
                  du.on('exit', function(code){})
              ```
        - exec('')
            - 对spawn的友好封装, 增加了shell命令解析
            - child.exec('cat *.js | ws', function(error, stdout, stderr){})
        - execFile(command[, args])
            - 执行可执行文件，不解析args,防止了exec参数注入的风险
            - child.execFile('/bin/ls', ['-l', '.'], function(err, result){})
        - fork()
            - 同spawn, 但建立ipc(进程通信, inter-process communication)
            - ```javascript
              var n = child.fork('./son.js');
              n.on('message', function(){
                  console.log('Main listen: ', m);
              });
              n.send({hello: 'i am parent'});
              // son.js
              process.on('message', function(m){
                  console.log('Son listen: ', m);
              });
              process.send({hello: 'i am child
              ```
        - 子进程对象
            - send()
                - 发送消息和句柄，句柄可以是
                    - net.Socket, net.Server, net.Native(c++层面的tcp套接字或IPC管道), dgram.Socket, dgram.Native
            - kill()
                - 向子进程发送SIGTERM信号
            - 事件
                - message
                - error
                - exit
                - close
                - disconnect
        - o-> cpu核数worker
            - o-> master.js
                - ```javascript
                  var fork = require('child_process').fork
                  var cpus = require('os').cpus()
                  for (var i = 0; i < cpus.length; i++){
                      fork('./worker.js')
                  }
                  ```
            - o-> worker.js
                - ```javascript
                  var http = require('http')
                  http.createServer(function(req, res){...}).listen(Math.round((1+Math.random()) * 1000), '127.0.0.1')
                  ```
        - o-> spawn
            - ```javascript
              var spawn = require('child_process').spawn
              free = spawn('free', ['-m'])
              free.stdout.on('data', function (data) {})
              free.stderr.on('data', function (data) {})
              free.on('exit', function (code, signal) {})
              ```
        - o-> fork
            - 需要至少30ms, 10M启动一个v8实例
            - ```javascript
              var fork = require('child_process').fork
              var cpus = require('os').cpus()
              for (var i = 0; i < cpus.length; i++) {
                      fork('./worker.js')
              }
              ```
        - o-> 通信
            - 只有子进程是node进程时才可以通信
            - ```javascript
              var cp = require('child_process')
              var n = cp.fork(__dirname + '/sub.js')
              
              n.on('message', function (m) {
                  console.log('PARENT got message: ', m)
              })
              n.send({a: 1})
              
              process.on('message', function (m) {
                  console.log('CHILD got message:', m)
              })
              process.send({b: 2})
              ```
        - o-> 句柄通信
            - 节省了代理建立socket浪费的文件描述符
            - ```javascript
              var child = require('child_process').fork('child.js')
              var server = require('net').createServer()
              server.on('connection', function (socket) {
                  socket.end('handled by parent \n')
              })
              server.listen(1337, function () {
                  child.send('server', server)
              })
              // child.js
              process.on('message', function (m, server) {
                  if (m === 'server') {
                      server.on('connection', function (socket) {
                          socket.end('handled by child \n')
                      })
                  }
              })
              ```
        - o-> 句柄负载http
            - 对描述符是抢占式的
            - ```javascript
              var cp = require('child_process')
              var child1 = cp.fork('child.js')
              var child2 = cp.fork('child.js')
              
              var server = require('net').createServer()
              server.listen(1337, function () {
                  child1.send('server', server)
                  child2.send('server', server)
                  server.close()
              })
              // child.js
              var http = require('http')
              var server = http.createServer(function (req, res) {
                  res.writeHead(200, {'Content-Type': 'text/plain'})
                  res.end('handled by child, pid is ' + process.pid + '\n')
              })
              process.on('message', function (m, tcp) {
                  if (m === 'server') {
                      tcp.on('connection', function (socket) {
                          server.emit('connection', socket)
                      })
                  }
              })
              ```
    - cluster
        - 介绍
            - child_process和net模块的组合
                - cluster启动时，内部启动tcp服务器
                - fork()时，将tcp服务器socket文件描述符发给worker, 实现共享端口
        - isWorker
            - 判断process.env是否值为NODE_UNIQUE_ID
        - isMaster
            - 判断cluster.isWorker
        - 事件
            - fork            # fork时
            - online          # 工作进程创建好后
            - listening       # 工作进程调listen()后
            - disconnect      # 主进程和工作进程IPC通道断开后
            - exit            # 所有工作进程退出后
            - setup           # cluster.setupMaster()执行后
        - o-> cpu核数worker
            - ```javascript
              var cluster = require('cluster')
              cluster.setupMaster({
                  exec: "worker.js"
              })
              
              var cpus = require('os').cpus()
              for (var i = 0; i < cpus.length; i++) {
                  cluster.fork()
              }
              ```
    - domain
        - 介绍
            - 用于异步异常捕获
            - 绑定方式
                - 隐式绑定: 把domain上下文中定义的变量，自动绑定到domain对象
                - 显式绑定: 把不是domain上下文中定义的变量，以代码的方式绑定到domain对象
        - members     # 已加入domain对象的域定时器和事件发射器的数组
        - create()                # 返回一个domain对象
        - run(fn)                 # 在domain上下文中执行一个函数，并隐式绑定所有事件、定时器和低级请求
        - add(emitter)            # 显式的增加事件
        - remove(emitter)         # 删除事件
        - bind(callback)          # 以return为封闭callback函数　
        - intercept(callback)     # 同bind, 但返回第一个参数
        - enter()                 # 进入一个异步调用的上下文，绑定到domain
        - exit()                  # 退出当前的domain, 切换到不同的链的异步调用的上下文中，对应domain.enter()
        - dispose()               # 释放一个domain对象，让node进程回收这部分资源
        - 使用
            - ```javascript
              var domain = require('domain');
              function async_error(){
                  setTimeout(function(){
                      var r = Math.random() * 10;
                      console.log('random num is ' + r);
                      if(r > 5)
                          throw new Error('Error: random num ' + r + ' > 5');
                  }, 10);
              }
              var d = domain.create();
              d.on('error', function(err){
                  console.log(err);
              });
              setInterval(function(){
                  d.run(async_err);
              }, 1000);
              ```
        - 未绑定不捕获
            - 代码
                - ```javascript
                  var domain = require('domain');
                  var EventEmitter = require('events').EventEmitter;
                  
                  var e = new EventEmitter();
                  
                  var timer = setTimeout(function(){
                      e.emit('data');
                  }, 10);
                  
                  function next(){
                      e.once('data', function(){
                          throw new Error('Receive data error!');
                      });
                  }
                  
                  var d = domain.create();
                  d.on('error', function(err){
                      console.log(err);
                  });
                  d.run(next);
                  ```
            - 原因
                - timer和e两个关键对象在初始化时都没有在domain范围内。当next函数中抛出异常时, 没有处于domain的包裹中
            - 修改
                - ...
                - d.add(e);
                - d.add(timer);
                - d.run(next);
- 外部lib
    - url
        - parse()
            - pathname
            - url.parse(req.url)
            - url.parse(req.url, true) 会parse出query对象
    - querystring
        - parse()
            - querystring.parse(url.parse(req.url).query)
    - crypto
        - 介绍
            - 加密并生成各种散列
            - 利用openssl库来实现，提供openssl中一系列哈希方法，包括hmac, cipher, decipher, 签名和验证等方法的封装
        - 使用
            - ```javascript
              var crypto = require('crypto');
              console.log(crypto.getHashes());
              ```
    - node-gyp
        - 编译C++模块的编译工具
    - util
        - 使用
            - var util = require('util');
        - 方法
            - inherits(Sub, Base)                # 对象间原型继承，Sub 仅继承Base原型中定义 的函数
            - inspect(obj)                # 任意对象转换为字符串
            - log(string)                        # 带时间戳的log
            - format('%s:%s', 'a', 'b', 'c')                // 'a:b c'
                - format('%s:%s', 'a')                // 'a:%s'
                - format(1, 2, 3)                        // '1 2 3'
            - is系列
                - isArray(obj)
                - isRegExp(obj)
                - isDate(obj)
                - isError(obj)
                - isBoolean(obj)
                - isNull(obj)
                - isNullOrUndefined(obj)
                - isNumber(obj)
                - isString(obj)
                - isSymbol(obj)
                - isUndefined(obj)
                - isObject(obj)
                - isFunction(obj)
                - isPrimitive(obj)
                    - 是否基本类型
                - isBuffer(obj)
                - deprecate(foo, 'foo() is deprecated, use bar() instead');
                    - 标记为过时, 调用foo()时显示后面的话
    - zlib
        - 介绍
            - 提供压缩方法，如gzip
- 全局属性
    - 介绍
        - 并非挂在global下的属性，但可以直接使用
    - __dirname
        - 在任何模块内获取当前模块文件的绝对路径
    - __filename
        - 当前在执行的js文件路径
