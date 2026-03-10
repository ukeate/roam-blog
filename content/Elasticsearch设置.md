- config/elasticsearch.yml
    - ```yaml
      action.auto_create_index: -l*, +z*
          # 自动创建，以z开头和非l开头的索引
      action.destructive_requires_name: true
          # 允许通配删index
      http.cors.enables: true
      http.cors.allow-origin: "*"
      cluster.name: c1
      node.name: n1
      node.master: true
      node.data: true
      transport.host: localhost
      transport.tcp.port: 9300
      network.host: 0.0.0.0
          # 修改es监听地址，别的机器也可以访问。同时设置bind_host和publish_host
          # 需要设置transport.host:localhost
      network.bind_host
          # 节点绑定ip
      network.publish_host
          # 发布地址，其它节点通过这个地址通信
      http.port: 9200
      transport.tcp.port
          # 通信端口，默认9300
      discovery.zen.minimum_master_nodes: 2
      ```
- 可用配置
    - ```yaml
      cluster.name: myES_Cluster
      node.name: ESNODE_CYR
      node.master: true
      node.data: true
      transport.host: localhost
      transport.tcp.port: 9300
      http.port: 9200
      network.host: 0.0.0.0
      discovery.zen.minimum_master_nodes: 2
      ```
