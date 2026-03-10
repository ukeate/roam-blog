- 安装
    - sudo yum -y install epel-release
    - sudo yum -y install python-pip
    - sudo pip install --upgrade pip
    - sudo pip install shadowsocks
- 服务器
    - server.json
        - ```javascript
          {
              "server":"0.0.0.0",
              "server_port":443,
              "local_address":"127.0.0.1",
              "local_port":1080,
              "password":"a",
              "timeout":300,
              "method":"aes-256-cfb",
              "fast_open":false,
              "workers":5
          }
          ```
    - ssserver -c server.json -d start
- 中继代理
    - client.json
        - ```javascript
          {
              "server":"1.1.1.1",
              "server_port":443,
              "local_address": "127.0.0.1",
              "local_port":1080,
              "password":"a",
              "timeout":300,
              "method":"aes-256-cfb"
          }
          ```
    - sslocal -c client.json
- 协议转换
    - 安装polipo
    - /etc/polipo/config
        - ```yaml
          logSyslog = false
          logFile = "/var/log/polipo/polipo.log"
          socksParentProxy = "127.0.0.1:1080"
          socksProxyType = socks5
          chunkHighMark = 50331648
          objectHighMark = 16384
          serverMaxSlots = 64
          serverSlots = 16
          serverSlots1 = 32
          proxyAddress = "0.0.0.0"
          proxyPort = 8123
          ```
    - polipo -c /etc/polipo/config
- 客户端
    - switchOmega
        - SOCKS5 127.0.0.1 1080
        - http 127.0.0.1 8123
    - 环境变量
        - export http_proxy=http://127.0.0.1:8123
        - export https_proxy=http://127.0.0.1:8123
