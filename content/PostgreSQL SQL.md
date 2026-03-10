- 元命令
    - \?                          # postgre命令
    - \h                          # sql命令
    - \l                          # 列出数据库
    - \q                          # 退出
    - \c 数据库名                 # 切换数据库
    - \d name                     # 查看序列、表、视图、索引
        - \dS+                    # 详情
    - \du                         # 查看角色
    - \dt                         # 查看所有表
        - \dtS+                   # 详情
    - \ds                         # 查看序列
    - \i a.sql                    # 执行sql文件
    - \o a.log                    # 日志文件
    - \password                   # 更换密码
    - \x                          # 开启/关闭竖排显示
    - [sql] \gdesc                # 快速显示结果列名和类型
- 约束
    - constraint user_id primary key (id)
    - constraint user_m_id unique(m_id)
    - constraint fk_b_id foreign key (b_id) references tbb(id)
        - MATCH SIMPLE
        - ON UPDATE NO ACTION
        - ON DELETE NO ACTION
- DCL语句
    - create database db1
        - owner outrun
    - create user 'outrun' with password 'pwd'
    - create role 用户名 with password '密码' login
        - 创建用户。role关键词可以省略
    - drop database db1
    - drop table tablename;
    - alter database abc RENAME TO cba;
    - alter database 数据库名 owner to 用户名
        - 更改数据库 owner
    - alter table tb 
        - add primary key (id)
        - add foreign key(b_id) references tb(id) on update cascade on delete cascade
        - add column c1 text
        - `alter column id type int using id::integer`
        - rename c1 to c2
            - drop constraint fk_b_id foreign key (b_id) references tbb(id)
        - drop [column] name
        - owner to outrun
            - 更改表 owner
    - alter role 用户名 with login                     # 添加权限
        - password 'pwd'                             # with password 'pwd', 修改密码
        - VALID UNTIL 'JUL 7 14:00:00 2012 +8'        # 设置角色有效期
        - login, superuser, createdb, createrole, replication, inherit
    - grant all privileges on database 数据库名 to 用户名
        - 授权数据库权限
- DDL语句
    - insert into tb("desc") values ('a'); 
- 模糊查询
    - ~                       # 匹配正则，大小写相关
        - 除'a$' '^a'的正则都只适合pg_trgm的gin索引
    - ~*                      # 匹配正则，大小写无关
    - !~                      # 不匹配该正则
    - !~*
    - ~ '^a'
        - like 'a%'
    - ~ 'a$'
    - ~ 'ab.c'
        - like '%ab_c%'
- 视图 
    - ```sql
      CREATE VIEW myview 
      AS 
      SELECT city, temp_lo, temp_hi, prcp, date, location 
      FROM weather, cities 
      WHERE city = name;
      ```
- 建表
    - ```sql
      create table dwh_timestamp_meta
      (
      "id" serial NOT NULL,
      "id" serial primary key,
      "c_id" serial references cities(id),
      "mongo_document_name" text default ''::text,
      "last_update_time" bigint default 0,
      "execute_time" timestamp with time zone,
      constraint pk_id primary key(id)
      )
      with (
      oids=false
      );
      ```
- 序列
    - ```sql
      create table a(
          id bigint primary key
      );
      create sequence a_id_seq
          start with 1
          increment by 1
          no minvalue
          no maxvalue
          cache 1;
      alter table a alter column id set default nextval('a_id_seq')
      ```
