- 介绍
    - 包管理
- 目录
    - glide.yaml
    - glide.lock
    - main.go
    - subpackages
    - vendor
- 命令
    - glide
        - init
            - 扫描代码目录，创建glide.yaml文件，记录所有依赖
            - 删除glide.yaml中自己项目本身
        - get
            - 安装并更新glide.yaml
            - `-all-dependencies -s -v github.com/go-redis/redis#5.0.0`
                - --all-dependencies会更新subpackages
        - update
            - 下载和更新glide.yaml中的所有依赖，放到vendor下
            - 递归更新
        - install
            - 依据glide.lock与glide.yaml文件安装特定版本
            - glide.lock与glide.yaml不同步时，发出警告
        - up
            - 更新依赖树，重建glide.lock文件
        - name
            - 查看glide.yaml中依赖名称
        - list
            - 依赖列表
        - help
        - -version
- glide.yaml
    - ```yaml
      package: .
      import:
      package: github.com/go-redis/redis
      version: 5.0.0
      repo: git@github.com:go-redis/redis
      ```
- 常见问题
    - cannot detect vcs
        - glide.lock或vendor依赖旧版本
            - 清理glide.lock和vendor, 检查glide.yaml旧版本
        - glide.yaml子目录处理不完善
            - subpackages:
            - cloudsql
        - glide mirror找不到包
            - glide mirror set a a --vcs git
                - 改~/.glide/mirrors.yaml文件
    - does not appear to be a git repository
        - 加速服务没有项目
    - glide up依赖不是最新
        - ~/.glide/cache中缓存了旧版本
    - cannot find package "." in
        - glide对非git协议自有域名处理歧义，子目录分析不准确
            - 清理缓存
                - ~/.glide/cache/src/包名
                - ~/.glide/cache/info/包名
            - glide.yaml添加repo重定向及subpackages
                - ```yaml
                  package: github.com/grpc-ecosystem/grpc-gateway
                  repo: git@github.com:grpc-ecosystem/grpc-gateway.git
                  subpackages:
                  internal
                  ```
