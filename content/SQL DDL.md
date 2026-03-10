- 定义，data definition language
- ```sql
  create database db1             # create or replace
      default character set utf8          # 默认编码
      collate utf8_general_ci;    # 校对规则(排序), ci(case insensitive)大小写不敏感, cs(case sensitive)大小写敏感
  create table `tb1`(           # create or replace
      `id` int unsigned unique not null auto_increment,
          # `id` int unsigned not null primary key,
      `id2` int unsigned,
      `name` varchar(20),
      `age` int unsigned,
      `birthday` date,
      primary key(`id`),          # 主键
      key idx_tb1_name (`name`),   # 索引
      foreign key(`id2`) references `tb2`(id) on delete cascade on update cascade     # 外键、级联删除、级联更新, 不要用
      )character set utf8 collate utf8_general_ci
      engine=innodb default charset=utf8;
  create table person like student;           # 复制表结构
  create table emp1 as select * from emp;     # 复制内容
  create view tb1_v (a,b) as select a, b from tb1 #  create or replace
  create synonym tb2 for tb1;     # 同义词
  
  drop database db1;
  drop table tb1
      purge;              # 加purge不放入回收站
  drop synonym tb1;
  
  truncate table tbq;
  
  
  alter database db1
      character set gbk
      collate gbk_chinese_ci;        # 更改数据库的编码
  alter table tb1
      add column sex char(1);
  alter table tb1
      add constraint pr_id primary key (id);   # 添加主键
  alter table tb1
      add constraint fk_id2 foreign key (st_id) references tb2(id);  # 添加外键
  alter table tb1
      rename to tb2;
  alter table tb1
      change sex gender char(1);      # 只能改名，但类型必须写
  alter table tb1
      modify birthday varchar(20);    # 只能改类型
  alter table tb1
      convert to character set utf8 collate utf8_general_ci;  # 转换表编码
  alter table tb1
      drop column name;
  alter table field1
      auto_increment = 5;             # 更改自增长初始值
  
  
  rename table tb1 to tb2;
  
  desc tb1;
  
  
  mysql
      use db1
  
      source a.sql            # 批执行
  
      show status [from schema_name];         # 服务器状态
      show databases;
      show create database db1;
      show tables;
      show create table tb1;
      show processlist                        # 查看当前连接
      show VARIABLES LIKE "general_log%"      # 查看变量　
          "version"                           # 显示版本
          "autocommit"                        # 事务开启状态 0 off 1 on, set autocommit=off 或 0
      show character set                      # 显示所有字符集
  
  
  
      select @@sql_mode                       # 查看变量
      select @@tx_isolation                   # 查看事务隔离级别
      select
      select VERSION()                        # 显示版本
  
      set sql_mode = ''                       # sql_mode定义支持的sql语法，数据校验。
      set names 'gbk';                        # 设置终端编码, 等价character_set_client=gbk 与 character_set_results=gbk
      set global general_log = 'ON'           # 设置记录所有sql
  
  oracle
      create table tb1 (
          sex char(1) check(sex in (0, 1))        # check约束
      show user                   # 显示用户名
      show recyclebin             # 回收站
      purge recyclebin            # 闪回文件
      oracle表创建时自动添加伪列
          rowid       # 唯一，指向当前记录
          rownum      # 唯一，字段列名, 从1开始，永远连续。
              # 支持比较符号 <, <=(可以比较=1)。取别名后可以比较 >, =
  ```
