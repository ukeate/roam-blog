- 基础
    - 一种复合值。属性的无序集合，属性由名/值对组成，看作字符串到值的映射。
        - 这种数据结构叫做散列(hash), 散列表(hashtable), 字典(dictionary), 关联数组(associative array)
        - 常用来模拟静态对象或静态语言的结构体。也可以模拟json字符串
    - 可以基于原型(prototype)继承属性，称作原型式继承(prototypal inheritance)
    - 除了字符串、数字、true、false、null、undefined外，js中的值都是对象
        - 字符串、数字、布尔值可以自动包装为对象(构造函数的实例)
    - 对象操作通过引用(而非值)。
    - 常见属性操作
        - 创建(create)
        - 设置(set)
        - 查找(query)
        - 删除(delete)
        - 检测(test)
        - 枚举(enumerate)
- 组成
    - 属性的名/值对 + 属性特性(property attribute) + 对象特性(object attribute)
        - 属性名可以是空字符串，不能重名
        - 属性特性包括: 可写(writable attribute), 可枚举(enumerable attribute), 可配置(configurable attribute)
            - 可配置表明是否可以删除或修改该属性
            - 通过代码给对象创建的所有属性都是可写、可枚举、可配置的, ECMAScript 5 中可以改变
        - 对象特性包括
            - 对象原型(prototype)                     # 指向另外一个对象, 本对象继承它的原型
            - 对象的类(class)                         # 一个标识对象类型的字符串
            - 对象的扩展标记(extensible flag)          # ECMAScript 5中指明是否可以向该对象添加新属性
- 分类
    - 内置对象(native object)                         # 由ECMAScript定义的对象或类。如数组、函数、日期、正则表达式
    - 宿主对象(host object)                           # js解释器( 如web浏览器)嵌入的宿主环境,如 HTMLElement对象
        - 宿主环境定义的方法可当作普通js函数对象, 宿主对象可当作内置对象
    - 自定义对象(user-defined object)                  # 运行中的js代码创建的对象
    - 自有属性(own property)                          # 直接在对象中定义的属性
    - 继承属性(inherited property)                    # 对象的原型对象中定义的属性
- 原型
    - 每一个js对象(null除外)都与另一个对象(原型)关联，从原型继承属性。
    - 内容
        - 对象直接量创建的对象有同一个原型对象Object.prototype
        - new的对象原型是构造函数prototype的属性的值     # 于是new Object()创建的对象继承自Object.prototype
        - Object.prototype这个对象没有原型
        - 具体
            - 除Object.prototype的对象是普通对象，都有原型。
            - 所有内置构造函数都继承Object.prototype
                - 如, new Date()创建的对象同时继承Date.prototype和Object.prototype
                - 这一系列的链接的原型对象就是"原型链"(prototype chain)
- 创建对象
    - {}
        - ECMAScript 5中(ECMAScript3的部分实现), 保留字用作属性名可以不带引号
            - ECMAScript 3中保留字作属性名必须用引号
        - ECMAScript 3的IE中, 最后一个逗号不可以忽略
        - 每次计算对象直接量，都会计算它的每个属性的值
    - new            # 关键字创建
        - new后的函数是构造函数(constructor)。
    - Object.create()
        - ECMAScript 5中出现的静态函数
        - 参数1是原型对象, 参数2可选，对对象属性进一步描述
        - Object.create({x:2})
        - Object.create(null)
            - 传入参数null来创建没有原型的新对象。
            - 没有原型的对象没有toString等方法, 所有不能+运算
        - Object.create(Object.prototype)
            - 创建普通对象
- 对象序列化(serialization)                            # json(JavaScript Object Notation)
    - ECMAScript 5 api                                # stringify, parse的第二个参数可选，传入属性列表来定制序列化或还原操作
        - JSON.stringify()
            - 支持对象, 数组, 字符串, 无穷大数字, true, false, null。NaN, Infinity, -Infinity序列化结果是null
                - 日期stringify为日期字符串，parse不能还原成对象
                - 只序列化对象的可枚举自有属性。不能序列化的属性自动省略掉
            - 函数, RegExp, Error对象和undefined不能序列化和还原
        - JSON.parse()
- 创建对象                                            # 函数即对象，本身为构造方法
    - ```javascript
      var obj = {};
        # var obj = []是数组, 数组中Obj['aa']添加的是属性而非成员, 静态对象
      function Obj(a, b){};
          new Obj(a, b);
      function Obj(a, b){
          thisf = new Array();
          return new Object(a, b)
      };
      ```
        - Obj(a, b);
            - 只能返回Obj里定义的新对象的实例(不能返回本身的实例)
            - 内的变量函数静态。指向外部函数可动态
            - 内对象为动态
        - new Obj(a, b);                              # 内变量函数动态(内存浪费)
        - Obj.prototype.c = 'c'
        - Obj.prototype.d = function(){};
        - Obj.prototype.e = new Array();              # prototype函数为静态函数, prototype对象为静态
    - function Obj(a, b){ }                           # 内部prototype, 与外部完全相同
        - ```javascript
          if(typeof Obj._initialized == 'undefined'){
              Obj.prototype.c = function(){};
              Obj._initialized = true;
          }
          ```
    - 最好方式:
        - 内部定义变量和对象, prototype定义函数(防止new对象的函数动态)。
        - prototype定义函数可以在内部，也可以在外部。
    - 扩展对象
        - Obj.prototype.extend                        # 添加或重写当前对象的属性
        - Object.prototype.extend                     # 所有对象上添加属性
- [[JS 属性]]
- [[JS 数组]]
- [[JS 集合]]
- proxy
    - 介绍
        - 元编程(meta programming), 在对象外层进行代理
        - 在obj.proxy上设置Proxy对象，该对象的操作会变成对Proxy对象的操作
    - ```javascript
      var obj = new Proxy({}, {
          get: function (target, key, receiver) {
              return Reflect.get(target, key, receiver);
          },
          set: function (target, key, value, receiver) {
              return Reflect.set(target, key, value, receiver);
          }
      });
      ```
- reflect
    - 介绍
        - 将Object上一些明显属于语言内部的方法(如Object.defineProperty)放到Reflect上
        - 修改Object上原有方法，变得更合理, 如Object.defineProperty在无法定义属性时抛出异常, 而Reflect.definePropert则返回false
        - 让Object操作变成函数作为, 如name in obj, delete obj[name]变成Reflect.has, Reflect.deleteProperty
        - 让Proxy上方法与Reflect方法对应，让Proxy的对象操作默认行为在Reflect上执行
