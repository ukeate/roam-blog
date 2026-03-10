- 介绍
    - 比jscover更好的测试工具
- 使用
    - ```javascript
      package.json中
          "scripts": {
              "blanket": {
                  "pattern": "eventproxy/lib"
                      # 要测试的源码目录
              }
          }
      mocha --require blanket -R html-cov > coverage.html
      ```
