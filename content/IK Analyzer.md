- 介绍
    - elasticsearch-analysis-ik
- 安装
    - mvn package
    - unzip -d /elasticsearch/plugins/ik ./target/releases/elasticsearch-analysis-ik-1.8.0.zip
    - 重启elasticsearch
- 分词器
    - ik_max_word
        - curl -XGET 'http://localhost:9200/_analyze?pretty&analyzer=ik_max_word' -d '联想是全球最大的笔记本厂商'
    - ik_smart
        - curl -XGET 'http://localhost:9200/_analyze?pretty&analyzer=ik_smart' -d '联想是全球最大的笔记本厂商'
- mapping type
    - ```javascript
        {
          "properties": {
              "content": {
              "type": "text",
              "store": "no",
              "term_vector": "with_positions_offsets",
              "analyzer": "ik_smart",
              "search_analyzer": "ik_smart",
              "include_in_all": "true",
              "boost": 8
              }
          }
        }
      ```
- Java使用
    - 配置文件
        - src/IKAnalyzer.cfg.xml中配置
            - &lt;properties&gt;                - &lt;entry key="ext_dict"&gt;/mydict.dic&lt;/entry&gt;                 # 配置自己的字典（不分词）                - &lt;entry key="ext_stopwords"&gt;/ext_stopword.dic&lt;/entry&gt;                 # 配置跳过的字            - &lt;/properties&gt;    - Query query = IKQueryParser.parse("name",name);                # IKAnalyzer特有
