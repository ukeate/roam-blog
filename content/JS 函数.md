- 特点
    - js的函数是参数化的
        - 在js中，函数即对象，可以随意传递，可以设置属性和调用该函数的函数
        - 在js中，函数可以嵌套定义, 嵌套的函数可以访问被定义所处作域中的变量，这个作用域就是闭包(closure)
        - 函数是对象，但typeof经过处理，所以返回"function", 可以拥有静态属性和方法，可以用内部构造函数Function()创建
    - 形参 标识符列表(函数中定义的变量)，调用时为其提供实参值。
    - 初始化对象的函数是构造函数
    - return停止函数执行并返回它的表达式。没有表达式时返回undefined。没有return语句时返回undefined
    - this是关键字，不是变量或属性名，所以不允许赋值。
        - this没有作用域限制
    - 将函数绑定到Function.prototype上，以便所有函数对象都继承它
- 关键字
    - this
        - 除实参外，每次调用拥有一个调用上下文 this
        - 对象调用函数时, 此次调用上下文是该对象。
    - super
        - super()调用父类的构造方法, super相当与父类的实例，super同时部署了父类的静态属性
        - 对象总是继承其他对象，所以在任意对象中，都可以使用super, 如
            - var obj = {toString() {return 'a ' + super.toString() }}
    - new.target
        - 构造函数中使用, 返回调用该构造函数时new 命令作用的对象
        - 如果直接调用等, 则值为undefined
        - function Person() {new.target === Person}
        - class {constructor() {new.target}}                          # 子类继承父类调用super()时, 父类构造方法中new.target指向子类, 可以利用写出不能继承的类
- 定义                                              # 函数名通常是动词或以动词为前缀的词组，常用的写短
    - function a(){}
        - 声明和定义均提前
        - ECMA只允许它作为顶级语句，不能出现在循环、条件判断或者try/cache/finally及with语句中
            - 一些js实现并未严格遵守规则，比如firefox就可以在if中出现函数声明
    - var a = function(){}
        - 只声明提前。可作匿名函数
        - 此为函数定义表达式, 可以出现在js代码的任何地方
    - o.m = f
        - 给已有对象的属性引用方法
- 创建函数
    - function fun(){}
    - var fun = function {}
    - var fun = new Function("输入变量1","输入变量2","执行内容");        # 动态创建函数
    - var f = (a, b) => a + b
    - var f = n => n
    - var f = () => {return 1}
    - var f = () => ({a: 1})
    - 箭头函数特性:
        - 没有自己的this, this是外部的this, 所以不能用call, apply, bind改变this
        - 不能当作构造函数, 没有super, new.target
        - 没有arguments, arguments是外部的
        - 不能成为Generator
        - 大括号解释为代码块, 要返回对象时用圆括号括起来
        - ```javascript
          const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val)
          const plus1 = a => a + 1, mult2 = a => a * 2, addThenMult = pipeline(plus1, mult2);
          addThenMult(5)    // 12
          let insert = val => ({into: (arr) => ({after: (afterVal) => {
              arr.splice(arr.indexOf(afterVal) + 1, 0, val); return arr;
          }})})
          insert(2).into([1, 3]).after(1)    // [1, 2, 3]
          ```
- 参数
    - function f(x, y = 5)
        - f({x: 1, y: 2})可以模式匹配
        - 默认值可以是变量，作用域是函数内作用域。函数a默认值是函数b时, 函数b的作用域链不包含函数a
        - 默认值一般在最后, 可以一眼看出哪些参数可以省略，调用时也好看
    - function f(url, {method = 'GET'} = {})
    - function f({a, b}) {a, b}
        - f({a: 1, b: 2}) 对象匹配
    - function f(a = throwErr())
        - 设置不可省略的参数, 默认值是延迟计算的
    - function f(...rest)
        - 一定在末尾
- 嵌套函数
    - 特性    
        - 内部嵌套函数可以读写外部参数
        - this不会在嵌套函数中继承，函数调用和方法调用中this的规则不变。
            - 如果要在内部访问外部this, 需要将外部this保存到变量中(通常用self, [that 是传递this时使用的变量名])
- 调用
    - 方式
        - 作为函数
        - 作为方法
        - 作为构造函数
        - 通过它们的call()和apply()方法间接调用
    - 原理
        - 调用由函数对象，左圆括号，参数列表(逗号分隔)，右圆括号组成
        - 每个参数表达式都会计算出一个值作为实参传递给声明时定义的形参
            - 在函数体中存在一个形参的引用指向当前传入的实参列表
        - 函数表达式的值成为调用表达式的值
        - ECMAScritp 3和非严格ECMAScript 5中，函数调用上下文(this)是全局对象。严格模式下是undefined
            - 常用this判断是否严格模式
    - 调用表达式
        - f()                                     # 作为普通函数调用
        - o.m(x, y)                               # 函数表达式本身就是属性访问表达式, 此时函数作为一个方法调用, 方法调用的上下文是该调用对象o
        - o["m"](x, y)
        - a[0](z)                                 # 可以用方括号来方法调用
        - a.b.c()
        - f().m()                                 # 方法链, 链式调用, 返回this或构造对象
- 构造函数调用
    - 方法名前带有new, 就是构造函数的调用
    - 与普通的函数调用及方法调用在实参处理、调用上下文、返回值方面都不同
    - 定义一类(class)对象，创建对象继承构造函数的prototype属性
        - class看作是对象类型的子类型
    - 使用新对象作为调用上下文, 如new o.m()中，this不是o
    - 如果return一个对象，则构造的就是这个对象，如果返回原始值或没有值，则忽略返回值
    - 原理
        - 计算实参表达式，传入函数内。没有形参，允许省略实参列表和圆括号，如
            - var o = new Object()                # 无参时圆括号可以省略
        - 创建空对象，继承构造函数的prototype, 试图初始化该对象，并将该对象作为调用上下文
            - 尽管构造函数看起来像方法调用，但它用新对象作为调用上下文
            - 所以 new o.m()看起来是方法调用，但它的调用上下文并不是o
        - 通常不使用return关键字，显式返回构造的新对象
            - 显式使用return时，如果没有值或是原始值，就忽略return。如果是对象，就返回return的对象
- 间接调用
    - call和apply
        - 可以显式指定调用上下文，这样任何函数都可以作为任何对象的方法来调用
        - call使用自有的实参列表作为函数实参，apply以数组形式传入参数
- 实参和形参
    - 不检查传入的参数类型和参数个数，所以要手动做参数检查
        - 传入参数少时，剩下的形参都设置为undefined
            - 所以在参数检查时，要给省略的参数赋默认值。如 a = a || []
            - a = a || [] 是习惯用法，用来代替if语句，前提是a必须预先声明
        - 前面的参数可选且不传时，传入占位符null(也可以传undefined)
        - 函数定义中使用/*optional*/来强调形参可选, 如
            - function f(o, /*optional*/ a)
    - 可变长实参列表(实参对象)
        - arguments
            - 是类数组对象，可以通过数字下标访问传入的实参值
            - 这种可以接收任意个数实参的函数    称为 不定实参函数(varargs function)
            - 非严格模式下, 实参对象的数组元素是函数形参对应实参的别名，改变实参值时，实参对象中的值也改变
                - ECMAScript 5中移除了别名这个特性(实测没有移除)
            - 非严格模式中, arguments是一个标识符，严格模式中，它是一个保留字
            - arguments的callee和caller属性
                - ECMAScript 5 严格模式中，对这两个属性的读写操作都会产生类型错误
            - 非严格模式中, callee指代当前正在执行的函数，caller是非标准的，但大多数浏览器都实现了这个属性，指代调用callee的函数。
                - 通过caller属性可以访问调用栈
            - 可通过callee递归调用自身
                - ```javascript
                  var factorial = function(x){
                      if( x <= 1) return 1;
                      return x * arguments.callee(x-1)
                  }
                  ```
    - 对象属性作实参，如
        - ```javascript
          easycopy({from: a, to: b, length: 4})
          function easycopy(args){
              args.from;
              args.from_start || 0;
          }
          ```
    - 类型注释
        - ```javascript
          function max(/*number*/a, /*optional*/b, /*array*/c, /*integer*/d, /*index*/e){
              if(isArrayLike(c)){
                  if(isFinite(a));
              }
          }
          ```
- 函数作为值
    - function a(){}                              # 定义创建函数对象，赋值给a。函数对象的名字是看不见
    - o.f = f                                     # 将函数赋值给对象的属性，就称为方法
    - var a = [function() {}, 20]                 # 没有名字的函数，放在数组直接量中
- 函数的自定义属性
    - 如当函数需要专属常量时，可在上面定义静态属性
    - 如要求函数返回唯一整数，可以定义静态属性做个计数器，
    - 如果要做缓存，也可以定义多个静态属性来缓存返回过的结果，属性名就是传入过的值
- 作命名空间
    - 无法声明只在一个代码块中可见的变量。所以定义一个函数做临时命名空间
    - 有些js扩展中(如mozilla的java script 1.7)可以使用let声明语句块内的变量, 如
        - let(x = 1){ print(x)}
    - (function(){}());
        - 匿名函数不会定义全局函数变量并运行, 定义了内部的局部变量
        - 最外层圆括号是习惯写法，尽管有些时候没必要也不应当省略
- [[JS 闭包]]
- 可调用对象
    - 如"类数组对象"不是真正的数组，"可调用对象"不是函数，但所有函数都是可调用的
    - 可调用对象使用越来越少
    - 例如
        - ie8及之前的版本window.alert()和document.getElementById()使用了可调用的宿主对象
        - RegExp对象可以直接调用(如RegExp()), 是非标准特性, Netscape提出后被后续浏览器兼容
            - typeof RegExp可能是"function"也可以是"object"
            - 最好不要对可调用RegExp对象有太多依赖，其可调用特性将来可能被删除
- [[JS generator]]
- [[JS promise]]
- [[JS async]]
- [[JS class]]
- [[JS decorator]]
