- 介绍
    - 测试代码执行性能
- 使用
    - ```javascript
      var Benchmark = require('benchmark');
      var suite = new Benchmark.Suite;
      
      var int1 = function(str){
              return +str;
      };
      var int2 = function(str){
              return parseInt(str, 10);
      };
      var int3 = function(str){
              return Number(str);
      };
      // 开始测试
      var number = '100';
      suite
      .add('+', function(){
              int1(number);
      });
      .add('parseInt', function(){
              int2(number);
      });
      .add('Number', function(){
              int3(number);
      });
      .on('cycle', function(event){        // 每个测试跑完后输出信息
              console.log(String(event.target));
      })
      .on('complete', function(){
              console.log('Fastest is' + this.filter('fastest').pluck('name'));
      })
      .run({'async': true});                    // 这里async与时间计算有关，默认为true
      ```
