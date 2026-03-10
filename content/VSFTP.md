- 介绍
    - 默认端口21
- 用户
    - 匿名用户
        - 默认为ftp或anonymous
        - 目录在/var/ftp
        - 只能下载不能上传
    - 本地用户
        - 用户名和密码与本地用户相同
        - 目录为该用户的登录目录
    - 虚拟用户
        - 文件配置名字和密码
        - 要生成认证文件
- 文件
    - /usr/sbin/vsftpd                    # 主程序
    - /etc
        - /rc.d/init.d/vsftpd             # initd启动脚本
        - /vsftpd.conf                    # 主配置
        - /vsftpd.ftpusers                # 用户黑名单, 一行一名字
        - /vsftpd.user_list               # 用户黑/白名单, 一行一名字
        - /pam.d/vsftpd                   # pam认证文件
    - /var
        - /ftp                            # 匿名用户主目录
        - /ftp/pub                        # 匿名用户的下载目录
- 默认用户与组
    - 用户
        - adduser -d /var/ftp -g ftp -s /sbin/nologin ftp
    - 组
        - ftp
- 命令
    - systemctl start vsftpd
- 最小可用配置
    - /etc/vsftpd.conf
        - ```yaml
          listen=YES
          local_enable=YES
          xferlog_enable=YES
          connect_from_port_20=YES
          pam_service_name=vsftpd
          seccomp_sandbox=NO
          
          # Enable upload by local user.
          write_enable=YES
          
          # Enable read by anonymous user (without username and password).
          secure_chroot_dir=/var/empty
          anonymous_enable=YES
          anon_root=/srv/ftp
          no_anon_password=YES
          ```
- 使用
    - /etc/vsftpd.conf
        - ```yaml
          anonymous_enable=YES            # 允许匿名用户
          local_enable=YES                # linux用户可登录, 虚拟用户可登录
          write_enable=YES                # 可写
          local_umask=022                 # user文件权限, 默认077
          dirmessage_enable=YES           # 显示目录信息
          xferlog_enable=NO               # 记录上传/下载日志
          connect_from_port_20=YES        # 确保用20端口传输
          ls_recurse_enable=NO            # 允许ls -R
          allow_writeable_chroot=NO
          listen=NO
          listen_ipv6=YES                 # 包含ipv4,和listen只能有一个YES
          
          pam_service_name=vsftpd
          local_root=/home/outrun/Downloads                       # linux用户默认目录。会先登录到用户目录，再切换到这里
          ftp_username=ftp                # 匿名用户名，默认ftp
          tcp_wrappers=NO                 # 结合tcp_wrapper限制ip登录
              /etc
                  /hosts.allow            # 允许地址
                  /hosts.deny             # 拒绝地址
          ```
    - useradd -d /home/ftp ftp
    - mkdir /home/ftp && chown ftp /home/ftp && chgrp ftp /home/ftp
    - systemctl restart vsftpd
    - 打开tcp, udp端口21, 20
- 用户
    - 匿名登录
        - /etc/vsftpd/vsftpd.conf
            - ```yaml
              anonymous_enable=YES
              anon_root=/home/outrun/Downloads                    # 匿名用户默认目录
              anon_upload_enable=YES      # 匿名可写，要求write_enable=YES
              anon_mkdir_write_enable=YES # 匿名创建文件夹
              anon_other_write_enable=YES # 匿名可删除、重命名
              anon_umask=000              # 如创建077文件，anon_umask=022时，则为055
              ```
        - chmod 777 dir1
    - 本地用户登录
        - /etc/vsftpd/vsftpd.conf
            - ```yaml
              anonymous_enable=NO
              userlist_enable=YES
              userlist_deny=YES           # YES时user_list为黑名单
              userlist_file=/etc/vsftpd/user_list
              
              chroot_local_user=YES       # 默认可以chroot到用户home。YES时, chroot_list_file指定黑名单
              chroot_list_enable=YES
              chroot_list_file=/etc/vsftpd/chroot_file            # 名单用户只能访问自己home
              allow_writeable_chroot=YES  # 不限制chroot目录可写
              ```
        - /etc/vsftpd/ftpusers
        - /etc/vsftpd/user_list
            - 注释root
    - 虚拟用户
