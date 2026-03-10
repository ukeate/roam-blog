- 发音"sparkle"
- 被[[CQL]]借鉴
- 三元组存储，面向RDF模型的查询语言
- 语法
    - ```sparql
      PREFIX : <urn:example:>
      SELECT ?personName WHERE {
        ?person :name ?personName.
        ?person :bornIn / :within* / :name "United States".
      }
      ```
    - 变量
        - 以?开头
    - 
