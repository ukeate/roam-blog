- 介绍
    - es6中模块化思想是尽量静态化，编译时确定模块依赖关系与输入输出
    - CommonJS(CMD)与AMD都只能在运行时确定
    - UMD模式只是加了CMD和AMD的切换
- [[ECMAScript 6]]
    - 特点
        - import, export可以出现在顶层的任何位置
        - import
            - 会变量提升, 会执行import的模块
            - 引入的变量是只读的，修改会报错。但可以修改引入变量的内部属性
            - 只加载3个方法，编译时加载，可能静态分析。但不能引用fs模块本身
            - 使引入宏(macro)和类型检查(type system)成为可能
        - 模块自动采用严格模式
        - 输出/引入的是值的只读引用, 值在运行时计算
    - import
        - import {stat, exists, readFile} from 'fs'                   # 多引用
        - import {a as b} from './profile'                            # b 作为 a 的别名
        - import 'lodash'                                             # 只运行模块
        - import * as circle from './circle'                          # 引入模块到对象
            - circle.area
        - import a from './export-default'                            # 引入模块中默认的导出, a可以起任意名，不用大括号
            - import {default as xxx} from './'                       # 本质是输出名字为default变量
        - import def, {a} from './module'                             # 同时引入default和其它变量
    - export
        - export var a = 1;
        - export function f () {}
        - var b = 1, c = 1;
        - export {b, c}                                               # 用于统一输出
        - export {v1 as sv1}
        - export {a as b} from './someModule'                         # 导入同时导出
        - export v from 'mod'                                         # 导入同时导出, es7提案可省略大括号
        - export default function() {}                                # export default命令来配置默认导出, 本质是输出名字为default的变量，系统允许它取任意名
            - export default foo 导出的foo名在模块外部是无效
    - 继承
        - export * from 'circle'
        - export var e = 2.7
        - export default function() {}                                # 输出了circle模块的所有方法(忽略default), 又输出了自定义属性
- 循环引用
    - CommonJS会输出已执行的部分
        - 写法问题
            - var foo = require('a').foo
                - a在别处循环引用时, 得到的foo可能是执行到一半的值
                - 而var a = require('a'), a.foo就会得到执行完后的值
        - 例子
            - ```javascript
              a.js
                  exports.done = false;
                  var b = require('./b.js');
                  console.log('a.js => b.done : ', b.done)
                  exports.done = true;
                  console.log('a.js done')
              b.js
                  exports.doen = false;
                  var a = require('./a.js')
                  console.log('b.js => a.done : ', a.done);
                  exports.done = true;
                  console.log('a.js done')
                  main.js
                  var a = require('./a.js'), b = require('./b.js')
                  console.log('main.js => a.done: ', a.done, ' b.done: ', b.done)
              执行
                  b.js => a.done: false
                  b.js done
                  a.js => b.done: true
                  a.js done
                  main.js => a.done: true b.done: true
              
                  a.js中require('./b.js')阻塞, 执行b.js
                  b.js中require('./a.js'), 加载已执行的a.js
                  执行完b.js回到a.js, 执行完a.js
                  main.js加载已执行的a.js b.js
              ```
    - [[ES6]] import时不执行代码，而是引用
        - ```javascript
          例子
            CommonJS中不能执行, a加载b, b加载a, a没有输出, foo不存在, es6中可以执行
          a.js
              import {bar} from './b.js';
              export function foo() {
                  bar();
                  console.log('a.js done')
              }
          b.js
              import {foo} from './a.js';
              export function bar() {
                  if(Math.random() > 0.5) {foo()}
              }
          babel-node a.js
          
          例子
          even.js
              import {odd} from './odd'
              export var counter = 0;
              export function even(n) {
                  counter++;
                  return n == 0 || odd(n - 1);
              }
          odd.js
              import {even} from './even';
              export function odd(n) {
                  return n != 0 && even(n - 1);
              }
          main.js
              import * as m from './even.js'
              m.even(10)  // true
              m.counter    // 6                       # 10 变到 0 even执行了6次
              m.even(20)    // true                   # 20 变到 0 even执行了11次
              m.counter    // 17                      ＃es6中引用加载机制保证even, odd函数能加载，所以可执行。而CommonJS中循环引用，even和odd函数都不会加载
          ```
