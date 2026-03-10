- JS单元测试框架
- 命令
    - mocha
        - --reporters 查看所有报告样式, 默认dot, 常用spec, json, html-cov
        - -R <reporter>采用某报告样式
        - -t <ms>设置超时时间
- 使用
    - ```javascript
      npm install -g mocha
      // package.json
      {
          "scripts": {
              "test": "mocha test"
              "blanket": {
                  "pattern": "//^((?!(node_modules|test)).)*$/",
                  "data-cover-flags": {
                      "debug": false
                  }
              }
          }
      }
      mocha test
      ```
- bdd风格
    - ```javascript
      describe('Array', function() {
          before(function() {})
              # 钩子函数还有after, beforeEach, afterEach
          it('should return -1 when not present', function (done) {
              [1,2,3].indexOf(4).should.equal(-1)
              this.timeout(500)
                  # 500ms后超时
              done()
                  # 用done来测试异步
          })
      })
      ```
    - ```javascript
      suite('Array', function() {
          setup(function () {})
              # 钩子函数还有teardown
          suite('$indexOf()', function () {
              test('should return -1 when not present', function() {
                  assert.equal(-1, [1,2,3].indexOf(4))
              })
          })
      })
      ```
