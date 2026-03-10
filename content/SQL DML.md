- 操作，data manipulation language，和[[SQL DQL]],
- ```sql
  insert into tb1
      values (3, 'a', null);
  insert into tb1
      select * from tb2;
  insert into tb1(name)
      values ('a'),('b');
  insert into tb1(a, b)
      select c, d from tb2
  
  update tb1
      set name='a'
  
  delete from tb1
  
  
  select * from outrun.employee;      # 限定数据库名
  select field1 as f1 from tb1 as t1
  select a, b into tb2 from tb1;
  select distinct (a+b) as c from tb1
      # select distinct sum(price) as s
  子查询
      # 要求数量和类型匹配
      # 不能利用索引(join可以), 不形成笛卡尔积
  
      where a < (select max(a) from tb2)
          # 单行符号 =、<、>
      where a in ()
          # 多行符号 in、any、all
          where a < any ()    # 小于一个就true
          where a < all ()    # 小于所有才true
  
  
  
  where a=1 and b=2                   # where后不能出现列的别名，可以出现表的别名
      a=1 or b=2
          # <>表示!=
          # =可设置日期
      a in (1,2)
          # a not in (1,2)
      a between 1 and 2
          # a not between 1 and 2
      a like 'a%'
          # 不能用*
          # % 匹配任意个字符
          # _ 匹配一个字符
          # \ 转义 _ 或 %
      a regexp '^.*d.*$'
          # 匹配正则
      a is null
  order by    # null看作最大值
      a asc   # 升序
      a desc  # 降序
  group by
      select a, count(b), avg(c) from tb1     # group by的select元素都是聚合函数
          where b > 0
          group by a
          having count(b) > 2                 # having使用聚合函数条件
      select a from tb1                       # 子查询
          where b in (select b from tb2 where c='c')
          group by a
          having count(distinct b) = (select count(*) from tb2 where c='c')
  
  
  select执行过程
      # 每步都产生虚拟表
      from 组装数据
          join
          on
      where 筛选
      group by 划分
      # with,  with是sql server的语法
      计算聚合函数
      having 筛选
      计算表达式
      select 字段
          distinct
      order by 排序
      top
  
  oracle
      insert into tb1 values(&id, '&s')                   # &是占位符，字符型数据加''
      alter table tb1 rename column field1 to field2
  
  常用
      分页
          select * from tb1 limit 0,1         # mysql, 从0开始，查找1条
    
    
          select * from                       # oracle
              (select rownum r, a from tb1 where rownum<=20)
          where r > 10
    
          select * from                       # oracle,  效率低
              (select  rownum rn, a from tb1)
          where rn between 21 and 40
    
    
          select rownum,emp.* from emp        # oracle, 效率低
              where rownum <=4
          minus
          select rownum,emp.* from emp
              where rownum <=2;
  ```
