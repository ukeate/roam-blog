- 初始化
    - systemctl start mariadb
    - mysql_secure_installation
    - etc/my.cnf文件
        - ```yaml
          [mysqld]
          default-storage-engine = innodb
          innodb_file_per_table
          max_connections = 4096
          collation-server = utf8_general_ci
          character-set-server = utf8
          [mysql]
          default-character-set=utf8
          ```
    - systemctl restart mariadb
- 移数据库
    - 同mysql版本, 新目录下替换(/var/lib/mysql/)ibdata1、数据库名目录
    - error: mysqld does not have the access rights to the directory. File name ./ibdata1
        - chcon -R --reference=/var/lib/mysql 新目录
        - 或
        - chcon -R -t mysqld_db_t -u system_u -r object_r 新目录
- 重初始化数据库
    - ```shell
      rm -r /var/lib/mysql/*
      mysql_install_db
      chown mysql:mysql -R /var/lib/mysql
      systemctl restart mariadb
      mysql -uroot mysql
      update user set password=password('a') where user='root';
      flush privileges;
      ```
- 授权远程登录
    - GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'pwd' WITH GRANT OPTION;
- 创建用户
    - CREATE USER 'username'@'host' IDENTIFIED BY 'password';
- 删除用户
    - DROP USER 'username'@'host';
- 免密登录
    - mysql_safe --user=mysql --skip-grant-tables --skip-networking
- 修改密码
    - 问题
        - error 1045(28000) access denied for user 'root'@'localhost' (using password:no)
    - 不能登录时
        - mysqld_safe方式
            - mysqld_safe --user=mysql --skip-grant-tables --skip-networking &
            - mysql -u root mysql
            - update user set password=password('newpassword') where user='root';
                - 新版中password改为authentication_string
            - flush privileges;
        - mysqld_safe方式2
            - 创建a.sql
                - update mysql.user set password=password('mysql') where user='修改用户';
                - flush privileges
            - mysqld_safe --defaults-file="a.sql"
        - 文件方式
            - 使用/etc/mysql/my.cnf中[client]下的user与password
    - 能登录时
        - mysqladmin方式
            - mysqladmin -uroot -p password 新密码
        - update方式
            - update mysql.user set password=password('root') where user='root';
            - flush privileges;
        - set方式
            - SET PASSWORD FOR 'username'@'host' = PASSWORD('newpassword');
            - flush privileges;
- 编码问题
    - 查询
        - show variables like "%colla%"       # 字符串排序规则
        - show variables like "%char%"
    - 修改
        - set character_set_client='utf8'
    - 创建db时指定
        - create database `db1` character set 'utf8' collate 'utf8_general_ci'
    - 创建表时指定
        - create table (...) engine=innodb default charset=utf8
    - 查看db和表编码
        - show database `db1`
        - show create table `tb1`
    - 修改db和表编码
        - alter database `db1` default character set utf8 collate utf8_general_ci
        - alter table `tb1` default character set utf8 collate utf8_general_ci
- 导库
    - 导出
        - mysqldump -uroot -p db1 > db1.sql
        - mysqldump -uroot -p db1 tb1 > db1_tb1.sql
    - 导入
        - mysql -uroot -p db1 < db1.sql
        - source db1.sql
- 主从复制
    - mysql配置文件my.cnf
    - [mysqld]
        - log-bin=mysql-bin
        - server-id=222
        - log-slave-updates =1
            - m-m-s结构中第二个m配置
    - 主服务器授权从服务器
        - GRANT REPLICATION SLAVE ON *.* to 'slave'@'%' identified by 'pwd';
    - 从服务器设置主服务器
        - change master to master_host='192.168.56.14', master_user='slave', master_password='pwd', master_log_file='mysql-bin.000001', master_log_pos=319;
    - 命令
        - 主服务器
            - flush tables with read lock;
            - grant replication slave on *.* to 'slave'@'%' identified by 'pwd'
            - show master status\G
            - unlock tables;
        - 从服务器
            - stop slave
            - change master to master_host='192.168.0.42', master_user='slave', master_passowrd='pwd', master_log_file='mysql-bin.000001', master_log_pos=120;
            - start slave
            - show slave status\G
    - 问题
        - The slave I/O thread stops because master and slave have equal MySQL server UUIDs; these UUIDs must be different for replication to work.
            - 随意修改data/auto.cnf中的uuid的值
        - 主A复制到主B后，主B不会把数据复制到主B的从
