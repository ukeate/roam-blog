- Cypher Query Language，Neo4j用，Cypher取名于黑客帝国的Cypher角色名
- [Neo4j备忘单](https://www.w3cschool.cn/neo4j/neo4j-inrb3kfu.html)
- 特点
    - 声明性模式匹配语言
    - 遵循SQL语法
- 数据类型
    - boolean
    - byte
        - 8位整数
    - short
        - 16位整数
    - int
        - 32位整数
    - long
        - 64位整数
    - float
        - 32位浮点数
    - double
        - 64位浮点数
    - char
        - 16位字符
    - string
- 命令
    - CREATE
        - 创建节点
            - 自动生成节点<id>属性, 最大约为35亿
            - ```javascript
              CREATE (
                 <node-name>:<label-name>
                 { 	
                    <Property1-name>:<Property1-Value>
                    ........
                    <Propertyn-name>:<Propertyn-Value>
                 }
              )
              ```
                - CREATE(emp:Employee)
                - CREATE (dept:Dept:Dept2 { deptno:1,name:"a"})
        - 创建关系
            - CREATE (p1:Profile1)-[r1:LIKES]->(p2:Profile2)
                - 节点-关系->节点
            - CREATE (cust)-[r:Do{a:1}]->(dept)
                - 创建MATCH出节点间的关系
    - CREATE INDEX
        - CREATE INDEX ON :Customer (name)
            - 建索引, 标签(属性)
    - DROP INDEX
        - DROP INDEX ON :Customer (name)
            - 删除索引
    - CREATE CONSTRAINT
        - ```sql
          CREATE CONSTRAINT ON (cc:CreditCard)
          ASSERT cc.number IS UNIQUE
          ```
    - DROP CONSTRAINT
        - ```sql
          DROP CONSTRAINT ON (cc:CreditCard)
          ASSERT cc.number IS UNIQUE
          ```
    - MERGE
        - 标签存在并节点重复时不创建
        - MERGE (gp2:GoogleProfile2{ Id: 201402,Name:"Nokia"})
    - SET
        - 更新
        - ```sql
          MATCH (dc:DebitCard)
          SET dc.atm_pin = 3456
          RETURN dc
          ```
    - DELETE
        - 删除节点、关系
        - MATCH (cc: CreditCard)-[rel]-(c:Customer)
            - DELETE cc,c,rel
    - REMOVE
        - 删除属性
        - ```sql
          MATCH (dept:Dept)
          REMOVE dept.a,dept.b
          RETURN dept
          ```
    - MATCH
        - 查询
        - ```javascript
          MATCH 
          (
             <node-name>:<label-name>
            { 	
                <Property1-name>:<Property1-Value>
                ........
                <Propertyn-name>:<Propertyn-Value>
             }
          )
          ```
            - MATCH (dept: Dept)
            - MATCH (cust:Customer),(dept:Dept)
                - RETURN dept
                    - 形成图
            - MATCH (dept: Dept)
                - RETURN dept.deptno,dept.dname
                    - 形成表
            - MATCH ( cc: CreditCard)-[r]-()
                - RETURN r
                    - 全集
    - RETURN
        - ```javascript
          RETURN 
             <node-name>.<property1-name>,
             ........
             <node-name>.<propertyn-name>
          ```
            - RETURN dept
            - RETURN dept.deptno,dept.dname as dname
    - WHERE
        - WHERE emp.name = 'Abc' OR emp.name = 'Xyz'
        - WHERE cust.id = "1001" AND cc.id= "5001" 
        - WHERE e.id IS NOT NULL
        - WHERE e.id IN [1,2]
        - ```javascript
          MATCH (emp:Employee) 
          WHERE emp.name = 'Abc' OR emp.name = 'Xyz'
          RETURN emp
          ```
    - ORDER BY
        - ```javascript
          MATCH (emp:Employee)
          RETURN emp.empid,emp.name
          ORDER BY emp.name DESC
          ```
    - UNION
        - 合并去重复行
        - ```javascript
          MATCH (cc:CreditCard) RETURN cc.id as id,cc.number as number
          UNION
          MATCH (dc:DebitCard) RETURN dc.id as id,dc.number as number
          ```
    - UNION ALL
        - 合并不去重复行
    - LIMIT和SKIP
        - ```javascript
          MATCH (emp:Employee) 
          RETURN emp
          LIMIT 2
          SKIP 2
          ```
- 函数
    - 关系函数
        - ID(r1)
            - 显示ID
        - TYPE(r1)
            - 标签
    - 字符串
        - UPPER(e.name)
        - LOWER(e.name)
        - SUBSTRING(e.name,0,2)
    - 聚合
        - COUNT(*)
        - MAX(e.sal)
        - MIN(e.sal)
        - AVG(e.sal)
        - SUM(e.sal)
    - 关系
        - STARTNODE(r)
            - 返回开始节点
        - ENDNODE(r)
