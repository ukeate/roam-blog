- o-> 最好js和html用独立的引号风格，如
    - html双引号, js单引号
- o-> 始终用var之类来声明变量，不用未声明变量
- o-> let和const取代var, 全局常量使用const
- o-> 特意将变量声明放在函数体顶部, 而不是使用变量之外, 来反映真实的作用域声明提前
- o-> 多用解构
    - const [first, second] = arr                 # 数组取元素
    - function f({a, b}) {}                       # 对象解构给函数赋值
    - function f() {return {a, b}}, const {a, b} = f()                # 函数返回值解构
    - var arr2 = [...arr]                         # 扩展运算符拷贝数组
- o-> 单行定义对象不逗号结尾(以后不扩展), 多行时逗号结尾(以后可能会扩展), 尽量用简洁的写法
    - ```javascript
      {a: 1, b}
      {
          [getKey('a')],
      }
      ```
- o-> Array.from转换类数组到数组
- o-> 匿名函数 (() => {})(), 同时绑定了this为当前作用域
- o-> 不使用arguments, 使用rest运算符
- o-> 函数使用默认值 function f (opts = {})  {}
- o-> 用Map取代Object, 因为Map内建遍历机制, key可为对象。只能要数据转换时用Object
- o-> 总是用class取代需要的prototype操作, 因为class写法更简洁。extends也更简单, 不会有破坏instanceof运算的危险
- o-> 模块使用es6的机制, 模块只能一个输出时用export default, 多输出时用export, 不要export 和export default混合使用
- o-> 运算符
    - var t = o && o.a || ''                          # 有o时取o.a, 无o时取'', 因为&&的优先级比||高
    - var ifExist = !!o.a                             # 转换成布尔类型, 当然o.a = 0 什么的值时， 会判断失误，所以用来判断对象
- o-> 判断类型
    - ```javascript
      typeof a === "string"                           # 数组等其他Object类型通通是Object
      a instanceof Array                              # 判断Object类型的具体类型
      a.constructor == Array                          # 判断构造函数
      Object.prototype.toString.call(o) === '[object Array]'              # 用toString判断
      ```
- o-> 柯里化
    - ```javascript
      function currying (fn, n) {
          return function (m) {
              return fn.call(this, m, n);
          }
      }
      function tailFactorial(n, total) {              # 尾递归调用优化
          if(n === 1) return total;
          return tailFactorial (n - 1, n * total);
      }
      const factorial = currying(tailFactorial, 1);
      factorial(5)
      ```
- o-> 尾递归
    - ```javascript
      function factorial (n, total = 1) {
          if(n === 1) return total;
          return factorial(n - 1, n * total);
      }
      ```
