- 介绍
    - 监控内存leak, stats,leak在连续5次垃圾回收后内存没释放时触发, stats事件在垃圾回收时触发
- 堆内存比较
    - ```javascript
      var memwatch = require('memwatch')
      var leakArray = []
      var leak = function () {
          leakArray.push('leak' + Math.random())
      }
      var hd = new memwatch.HeapDiff()
      for (var i = 0; i < 10000; i++) {
          leak()
      }
      
      var diff = hd.end()
      console.log(JSON.stringify(diff, null, 2))
      ```
