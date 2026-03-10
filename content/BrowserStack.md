- 介绍
    - 前端测试工具
    - 内建webdriver的api
- 使用
    - ```javascript
      npm install browserstack-runner --save-dev
      ./node_modules/.bin/browserstack-runner init
      // browserstack.json
          "test_framework": "mocha",
          "timeout": 60,
          "test_path": "public/index.html"
      https://www.browserstack.com/accounts/automate
          得到username 和 access key
          复制到browserstack.json中的username和key
      browserstack-runner
      https://www.browserstack.com/automate 查看结果
      ```
