- 数量,类型匹配
- 前语句别名可用,后语句别名不可用
- ```sql
  select a, b from tb1
          union [all] select a, b from tb2    # 并集, all 允许重复
  ```
    - intersect 交集
    - minus 差集
