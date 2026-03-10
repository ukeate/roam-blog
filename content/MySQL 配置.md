- my.cnf
    - ```yaml
      [client]
      port=3306
      socket=/tmp/mysql.sock
      
      [mysql]
      default-character-set=gbk
      
      [mysqld]
      character-set-server=utf8
      
      port=3306
      socket=/tmp/mysql.sock
      log-bin=mysql-bin
      server-id=1
      skip-name-resolve
          # 远程访问时非常慢解决
      innodb-flush-log-at-trx-commit=2
      innodb_log_file_size=268435456
      sync-binlog=1
          # 这两个配置为了使用事务的InnoDB在复制中最大的持久性和一致性
      master-connect-retry=60
          # 从服务器断开重连时间
      binlog-do-db=test
          # 主从都可以设置，复制的数据库
      binlog-ignore-db=mysql
          # 主从都可以设置，不复制的数据库
      lower_case_table_names=1
          # 设置大少写不敏感
      interactive_timeout=3600
      sql_mode=IGNORE_SPACE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
      ```
