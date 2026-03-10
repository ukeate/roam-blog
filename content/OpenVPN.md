- 安装
    - yum install openvpn easy-rsa lzo lzo-devel openssl openssl-devel -y
    - 或编译安装openvpn
        - mkdir –p /usr/local/openvpn && cd /usr/local/openvpn/
        - ./configure --with-lzo-headers=/usr/local/include --with-lzo-lib=/usr/local/lib
        - make
        - make install
- 生成证书
    - 目标
        - 服务器: ca.crt、server.key、server.crt、dh.pem
        - 客户端: ca.crt、client.key、client.crt
    - 查找模板
        - find / -name "vars.example" -type f                         # vars文件
        - find / -name "server.conf" -type f                          # server.conf文件
    - 进入目录easy-rsa
        - cd /usr/local/openvpn/openvpn-2.0.9/easy-rsa/2.0/
        - cd /usr/share/easy-rsa/3.0.3/
    - 设置vars
        - cp vars.example vars
        - vars文件
            - set_var KEY_COUNTRY="CN"
            - set_var KEY_PROVINCE="BJ"
            - set_var KEY_CITY="Beijing"
            - set_var KEY_ORG="linux"
            - set_var KEY_EMAIL="test@example.net"
            - set_var EASYRSA_NS_SUPPORT "yes"                      # 客户端配置ns-cert-type server时配置
    - 生成server文件
        - 配置文件在/etc/easy-rsa或 .../openvpn/easy-rsa
        - rm -rf pki
        - ./easyrsa init-pki                                          # pki目录
        - ./easyrsa build-ca  nopass                                  # 回车过, 生成ca.crt
        - ./easyrsa gen-req vpnserver nopass                          # 回车过, 生成vpnserver.key, vpnserver.req(密钥对、证书请求文件)
        - ./easyrsa sign server vpnserver                             # 生成vpnserver.crt(ca.crt与vpnserver.req签名)
        - ./easyrsa gen-dh                                            # 生成dh.pem(diffie hellman)
        - cp -r ../3.0.3/ ~
    - 生成client文件
        - rm -rf pki
        - ./easyrsa init-pki
        - ./easyrsa gen-req client nopass                             # 回车过, 生成client.key, client.req
        - cp pki/reqs/client.req ~/3.0.3/pki/reqs/
        - cp pki/private/client.key ~/3.0.3/pki/private/
        - cd ~/3.0.3
        - ./easyrsa sign client client                                # 生成client.crt(ca.crt与client.req签名)
    - 移动server文件到openvpn配置目录
        - cp pki/{ca.crt,dh.pem} /etc/openvpn/server/
        - cp pki/private/vpnserver.key /etc/openvpn/server/
        - cp pki/issued/vpnserver.crt /etc/openvpn/server/
        - cp server.conf /etc/openvpn/server
    - 下载client文件
        - pki/ca.crt
        - pki/private/client.key
        - pki/issued/client.crt
- server.conf
    - cp -p ../../sample-config-files/server.conf /etc/openvpn
    - o-> server.conf
        - ```yaml
          ;local 172.21.223.196
          port 1194
          proto udp
          dev tun
          
          ca /etc/openvpn/ca.crt
          cert /etc/openvpn/server.crt
          key /etc/openvpn/server.key
          dh /etc/openvpn/dh1024.pem
          
          server 192.168.200.0 255.255.255.0
          ifconfig-pool-persist ipp.txt
          ;client-config-dir "C:\\Program Files\\OpenVPN\\ccd"        # 支持TLS client
          push "route 0.0.0.0 0.0.0.0"
          keepalive 10 120
          
          cipher AES-256-CBC
          comp-lzo                                                    # 减少带宽
          persist-key
          persist-tun
          
          status openvpn-status.log
          log /var/log/openvpn.log
          
          verb 3
          explicit-exit-notify 1
          ```
    - sudo openvpn --config /etc/openvpn/server.conf --daemon
    - netstat -anulp | grep 1194
- linux配置
    - iptables
        - vim /etc/sysctl.conf
            - net.ipv4.ip_forward = 1     # 开启路由转发
        - sysctl -p
        - iptables -t nat -A POSTROUTING -s 192.168.200.0/24 -j SNAT --to-source 45.55.56.16
    - firewall
        - firewall-cmd  --add-service=openvpn --zone=public --permanent
        - firewall-cmd --reload
- client配置
    - o-> client.ovpn
        - ```yaml
          client
          dev tun
          proto udp
          remote 45.55.56.16 1194
          resolv-retry infinite
          nobind
          ca ca.crt
          cert client.crt
          key client.key
          ;ns-cert-type server
          cipher AES-256-CBC
          comp-lzo
          persist-key
          persist-tun
          verb 3
          mute 20
          ```
    - sudo openvpn --config client.ovpn
        - --user outrun
        - --auth-nocache
        - askpass pass.txt 放密码到文件
    - o-> 免密码连接
        - ```shell
          #!/usr/bin/expect -f
          spawn sudo openvpn --config /home/outrun/.openvpn/a-vpn-ldap.ovpn
          # match_max 100000
          expect "*?assword*:*"
          send -- "1234\n"
          expect "*Username:*"
          send -- "outrun\n"
          expect "*Password:*"
          expect "#"
          ```
- 案例
    - 代理http上网                                                     # tcp连接国内服务器会被reset
        - server.conf
            - ```yaml
              dev tap
              proto tcp
              
              push "redirect-gateway def1 bypass-dhcp"
              push "dhcp-option DNS 114.114.114.114"
              push "dhcp-option DNS 8.8.8.8"
              
              client-to-client
              ;explicit-exit-notify 1
              ```
        - client.ovpn
            - ```yaml
              dev tap
              proto tcp
              ```
    - 改成用户名密码认证
        - 服务器
            - server.conf
                - ```yaml
                  auth-user-pass-verify /etc/openvpn/server/checkpsw.sh via-env
                  verify-client-cert none
                  username-as-common-name
                  tls-auth /etc/openvpn/server/ta.key 0
                  script-security 3
                  ```
            - checkpsw.sh
                - ```shell
                  #!/bin/sh
                                PASSFILE="/etc/openvpn/server/user/psw-file"
                                  LOG_FILE="/etc/openvpn/server/log/openvpn-password.log"
                  TIME_STAMP=`date "+%Y-%m-%d %T"`
                  
                  if [ ! -r "${PASSFILE}" ]; then
                    echo "${TIME_STAMP}: Could not open password file \"${PASSFILE}\" for reading." >> ${LOG_FILE}
                    exit 1
                  fi
                  
                  CORRECT_PASSWORD=`awk '!/^;/&&!/^#/&&$1=="'${username}'"{print $2;exit}' ${PASSFILE}`
                  
                  if [ "${CORRECT_PASSWORD}" = "" ]; then
                    echo "${TIME_STAMP}: User does not exist: username=\"${username}\", password=\"${password}\"." >> ${LOG_FILE}
                    exit 1
                  fi
                  
                  if [ "${password}" = "${CORRECT_PASSWORD}" ]; then
                    echo "${TIME_STAMP}: Successful authentication: username=\"${username}\"." >> ${LOG_FILE}
                    exit 0
                  fi
                  
                  echo "${TIME_STAMP}: Incorrect password: username=\"${username}\", password=\"${password}\"." >> ${LOG_FILE}
                  exit 1
                  ```
            - chmod 645 checkpsw.sh
            - mkdir user
            - mkdir log
            - user/psw-file
                - outrun a
            - openvpn --genkey --secret ta.key
        - 客户端
            - 下载ta.key
            - client.ovpn
                - ```yaml
                  ;cert client.crt
                  ;key client.key
                  auth-user-pass
                  tls-auth ta.key 1
                  ```
