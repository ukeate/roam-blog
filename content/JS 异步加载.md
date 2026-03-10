- AMD
    - 介绍
        - 模块化标准
        - 异步加载, 预执行
    - 使用
        - ```javascript
          require(['math'], functioni (math){
              math.add(2, 3);
          });
            # 加载成功后进行回调
          ```
- CMD
    - 介绍
        - sea.js提出
        - 懒执行
    - 使用
        - define(function(require, exports, module){ ... })
