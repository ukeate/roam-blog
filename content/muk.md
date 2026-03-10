- JS Mock
- ```javascript
  var muk = require('muk')
  before(function () {
      muk(fs, 'readFileSync', function (path, encoding) {
          throw new Error('mock readFileSync error')
      })
      muk(fs, 'readFile', function (path, encoding, callback) {
          process.nextTick(function () {
              # 模拟异步
              callback(new Error('mock readFile error'))
          })
      })
  })
  
  after(function () {
      muk.restore()
  })
  ```
