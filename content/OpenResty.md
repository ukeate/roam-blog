- 淘宝改的Nginx, Lua工具
- 安装
    - ```shell
      yum install -y gcc gcc-c++ kernel-devel readline-devel pcre-devel openssl-devel openssl zlib zlib-devel pcre-devel
      wget openresty-1.9.15.1.tar.gz
      ./configure --prefix=/opt/openresty --with-pcre-jit --with-ipv6 --without-http_redis2_module --with-http_iconv_module -j2
      make && make install
      ln -s /opt/openresty/nginx/sbin/nginx /usr/sbin
      /opt/openresty/nginx/conf/nginx.conf
      ```
- 客户端
    - DNS
    - HTTP
    - WebSocket
    - Redis
    - MySQL
- 功能
    - 共享内存
    - 定时器
    - 进程、线程
