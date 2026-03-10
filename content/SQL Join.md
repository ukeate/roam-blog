- [[内连接]](inner)
    - 带条件的交叉连接
    - 只查出符合条件的记录
        - ```javascript
          select * from tb1 a         # 显示
              inner join tb2 b
              on a.c_id=b.c_id
          select * from tb1 a, tb2 b  # 隐示
              where a.c_id=b.c_id
          ```
    - [[自连接]]
        - 表中有层次关系。自连接无中间表, 效率快
        - ```javascript
          select a.c, b.d from course as a, course as b
              where a.c=b.d
          ```
- 外连接(outer)
    - 以一表为基准，查另一表
    - 可查出不符合条件的记录(另一表无对应值，标记成null)
    - [[左外连接]]
        - 以左为基准
        - ```sql
          select * from tb1 as a
              left [outer] join tb2 as b
              on a.c_id=b.c_id
          
          select a.c_id       # oracle
          from tb1 a, tb2 b
          where a.c_id = b.c_id(+)
          ```
    - [[右外连接]]
        - right [outer] join
    - [[全外连接]]
        - full [outer] join, 只oracle支持
        - 先左连接再右连接，取的是交集
        - ```sql
          select * from a
              full join b
              on a.c_id=b.c_id
          ```
- [[交叉连接]](cross)
    - 笛卡尔积，有where条件时，会先生成where查出的两个表
        - ```javascript
          select * from tb1 a
              [cross] join tb2 b
              where a.c_id = b.c_id;
          ```
- [[自然连接]](natural)
    - 自动检查相同名称的列，类型会隐式转换，不能指定显示列(或用*)、不能用on语句
    - 每种连接名称前加natural都是自然连接
    - ```javascript
      select * from tb1 a
          natural innter join tb2 b
      ```
