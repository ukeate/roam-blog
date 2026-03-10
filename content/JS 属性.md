- 查询和设置
    - . []
        - ECMAScript 3中, 点运算符后的标识符不能是保留字。ECMAScript5(包括ECMAScript3的某些实现)中可以
        - []中必须返回可以转换为字符串的值
        - []的写法用了字符串索引，叫做关系数组(associative array), 散列或字典
    - 属性不存在时自动创建
- 描述对象
    - value
    - writable                                        # 可修改
    - enumerable                                      # 可枚举性
        - for...in, Object.keys(), JSON.stringify(), Object.assign(), Reflect.enumerate()会忽略不可枚举属性
        - for...in等价Reflect.enumerate(), 会返回继承的属性
    - configurable                                    # 可配置
- 遍历属性                                             # 先遍历属性名是数值的属性，再遍历字符串，再遍历Symbol
    - for ... in                                      # 自身和继承的可枚举属性
    - Object.keys                                     # 自身的可枚举属性(不含Symbol)
    - Object.getOwnPropertyNames                      # 自身所有属性(不含Symbol)
    - Object.getOwnPropertySymbols                    # 自身所有Symbol属性
    - Reflect.ownKeys                                 # 自身所有属性
    - Reflect.enumerate                               # 同for ... in
- 访问错误
    - 查询不存在的属性不报错, 返回undefined
    - 对象不存在，会查询null和undefined的属性，会报错
        - 建议写法: var len = book && book.subtitle && book.subtitle.length
    - 只读的设置不报错，如                              # ECMAScript 5的严格模式中会报错
        - Object.prototype = 0;        
- 设置属性失败的情况
    - o中属性p是只读的                                  # defineProperty()可以
    - o中属性p是继承属性，且它是只读的
    - o没有属性p, o没有使用p的setter方法, o可扩展性为false
- 删除属性
    - delete
        - 删除成功，属性不存在，不是属性访问表达式时，返回true
        - 属性可配置性为false，非严格模式下返回false, 严格模式下抛出异常
        - 全局对象可以不用属性访问表达式, 如 delete x;
            - 严格模式下, delete x; 会报语法错误, 必须delete this.x
        - 只是断开联系
        - 只删除自有属性，不能删除继承属性
            - 继承属性可以从原型对象上删除它
            - a = {p:{x:1}}; b= a.p; delete a.p; 执行后p.x还是1。因为属性的引用依然存在
                - 会内存泄漏，所以在销毁对象时，要遍历属性中的属性，依次删除
- 检测属性
    - in                                              # 检测自有属性和继承属性
        - "x" in o;
    - o.x !== undefined
        - 同in，但没法区分属性的值为undefined时的属性，in可以
        - !==可以区分null和undefined, 所以用!==
    - hasOwnProperty()                                # 只检测自有属性
        - o.hasOwnProperty("x");
    - propertyIsEnumerable()                          # 自有属性且可枚举
        - o.propertyIsEnumerable("x")
- 枚举属性                                             # ECMAScript 3 的不可枚举属性不能得到
    - for/in
        - ECMAScript 5之前, 工具库给Object.prototype添加的属性必须可枚举
        - 所以for/in会枚举出来，要用hasOwnProperty(p)来过滤
    - Object.keys()                                   # ECMAScript 5中定义，返回可枚举的自有属性名数组
    - Object.getOwnPropertyNames()                    # ECMAScript 5中定义，返回自有属性名数组
- getter和setter
    - 通常用来表示同一组数据的两种方法(如笛卡尔坐标系表示法和极坐标系表示法)
        - 也用于检测属性的写入和读取值
    - ECMAScript 5中属性值可以用方法替代，就是getter和setter, 叫做存取器属性(accessor property)
        - 是访问描述符，相对数据描述符(如writable)
        - 普通的属性叫做数据属性(data property), 只有一个简单的值
        - 存取器属性不具有可写性(writable attribute)
        - 作为替代, 只有getter, 则只读。只有setter, 则只写。同时拥有, 则可读写
            - 读取只写属性总是返回undefined
        - 存取器属性是可以继承的
    - 定义
        - ```javascript
          var o = {
              data_prop: 1,
              get accessor_prop(){},                  # 函数中的this表示当前对象o
              set accessor_prop(value){}
          };
          var descriptor = Object.getOwnPropertyDescriptor(o, 'accessor_prop');
          'get' in descriptor    // true
          'set' in descriptor    // true
          ```
    - 例子
        - ```javascript
          var p = {
              $x: 1.0, 
              $y: 1.0,
              get r () {return Math.sqrt(this.x * this.x + this.y * this.y);},
              set r (newvalue) {
                  var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
                  var ratio = newvalue/oldvalue;
                  this.x *= ratio;
                  this.y *= ratio;
              },
              get theta () {return Math.atan2(this.y, this.x); }
          }
          ```
    - 例子
        - ```javascript
          var serialnum = {                           # 序列
              $n: 0,                                  # $暗示私有属性
              get next(){return this.$n++;},
              set next(n){
                  if(n >= this.$n) this.$n = n;
                  else throw "序列号的值不能比当前值小";
              }
          }
          ```
    - 例子2
        - ```javascript
          var random = {                              # 返回不同数量范围的随机数
              get octet(){ return Math.floor(Math.random() * 256)},
              get uint16(){ return Math.floor(Math.random() * 65536)},
              get int16(){ return Math.floor(Math.random() * 65536) - 32768}
          };
          ```
- 属性的特性                                           # ECMAScrit 3这些特性不可以配置, ECMAScript 5中提供查询和设置的api
    - 作用
        - 给原型对象添加方法，设置该方法为不可枚举，看起来像内置方法
        - 给普通对象定义不能修改或删除的属性，实现"锁定"
    - 组成
        - 值(value), 可写性(writable)、可枚举性(enumerable)、可配置性(configurable)
            - 存取器特性是读取(get)、写入(set)、可枚举性、可配置性
    - 原理
        - ECMAScript 5定义了 属性描述符(property descriptor)对象, 代表4个特性
            - 该对象的属性有value, writable, enumerable, configurable, 代表4个特性
            - 存取器属性描述符用get和set代替value和writable
                - writable, enumerable, configurable是布尔值
                - get和set是函数值, value什么都可以
    - 调用                                             # 新建属性的默认特性对象为false或undefined
        - Object.getOwnPropertyDescriptor(o, p)
            - 获得对象o的p自有属性的 属性描述符对象
            - 要得到继承属性的特性, 要遍历原型链
        - ```javascript
          Object.defineProperty(o, "x", {
            # 新建或修改自有属性的特性, 传入对象和属性名与属性描述符对象
              value: 1,
              writable: true,
              enumerable: false,
              configurable: true
          });
          ```
        - Object.defineProperty(o, "x", {get: function(){ return 0; }});
            - 修改x为存取器属性
                - 返回修改后的对象
            - 不允许创建或修改的属性，抛出类型错误异常
                - 规则(违反则抛异常)
                    - 对象不可扩展，可以编辑已有属性, 不能添加
                    - 属性不可配置, 不能修改可配置性和可枚举性
                    - 存取器属性不可配置, 不能修改getter, setter方法, 不能转换为数据属性
                    - 数据属性不可配置，不能转换在存取器属性
                    - 数据属性不可配置，不能可写性从false修改为true
                    - 数据属性不可配置且不可写, 不能修改值。可配置但不可写时可以修改值
                        - 实际上自动标记为可写，再改值，再转换为可写
        - ```javascript
          Object.defineProperties({}, {
              x: {value: 1, writable: true, enumerable: true, configurable: true},
              y: {value: 1, writable: true, enumerable:true, configurable:true},
              r: {
                  get: function(){return Math.sqrt(this.x * this.x + this.y * this.y)},
                  enumerable: true,
                  configurable: true
              }
          })
          ```
            - 新建或修改多个属性及特性。第一个参数是修改对象，第二个参数是映射表
                - 返回修改后的对象
            - 不允许创建或修改的属性，抛出类型错误异常
    - 老式api(ECMAScript 5之前，非IE浏览器)
        - `__lookupGetter__()`
        - `__lookupSetter__()`                              # 返回一个属性的getter和setter
        - `__defineGetter__()`
        - `__defineSetter__()`                              # 定义getter和setter, 第一个参数是属性名, 第二个参数是getter或setter方法
- 对象三个属性
    - 包括
        - 原型(prototype)
        - 类(class)
        - 可扩展性(extensible attribute)
    - 原型
        - api
            - Object.getPrototypeOf()                     # ECMAScript 5出现, 传入对象返回原型
            - o.constructor.prototype                     # 得到对的原型，对于Object.create()创建的对象常不是这样
            - p.isPrototypeof(o)                          # 检测p是否是o的原型(或牌原型链中)，与instanceof运算符类似
            - __proto__                                   # Mozilla实现的js有的属性, safari和chrome也支持
    - 类属性
        - 表示对象类型信息的字符串, 用toString()方法可以得到
        - ECMAScript 3和5 都不能设置这个属性，只能间接查询
        - js内置构造函数创建的对象类属性与函数名称相匹配
            - 对象直接量、Object.create、自定义构造函数 创建的对象类属性是"Object"
            - 对于自定义类来说，没办法通过类属性来区分对象的类
        - api
            - toString()
                - # 返回如 [object class], 提取class, 很多对象的toString方法重写了, 要间接调用Function.call()方法
            - ```javascript
              function classof(o){
                  if(o === null) return "Null";
                  if(o === undefined) return "Undefined"; # ECMAScript 5中不需要对null和undefined作处理
                  return Object.prototype.toString.call(o).slice(8, -1);
              }
              ```
    - 可扩展性
        - 表示是否可以给对象添加新属性。ECMAScript 5中 内置对象和自定义对象都显式可扩展
        - 宿主对象可扩展性由js引擎定义
        - api
            - preventExtensions, seal, freeze 都返回传入的对象
            - Object.esExtensible()                       # 判断对象是否可扩展
            - Object.preventExtensions()                  # 转换对象为不可扩展, 参数为待转换对象, 对象转换不可扩展后，无法再转换回来, 给不可扩展对象原型添加属性, 对象同样会继承新属性
            - Object.seal()                               # 对象设置不可扩展, 同时对象自有属性不可配置, 已有属性标记为可写的依然可配置, seal后的对象不能解封
            - Object.isSealed()                           # 检测对象是否封闭
            - Object.freeze()                             # 除了seal外，将自有数据属性设置为只读, setter方法不受影响
            - Object.isFrozen()                           # 检测是否冻结
- 继承
    - 介绍
        - js对象有自有属性(own property)，有从原型继承来的属性
    - 原型链(prototype chain)                              # 原型，原型的原型 ...
        - 属性的查询先找自有属性，再找原型链
        - 属性修改时, 先检查属性是否允许赋值。
            - 总在自有属性修改或创建，不修改原型链上的对象。这就是属性的覆盖(override)
                - 继承的对象有setter方法且是accessor属性时，修改属性时会由当前对象(非原型对象)调用setter方法。
                - 由当前对象调用，所以还是不会修改原型链
                - setter方法如setTitle()
    - inherit(p)函数
        - ```javascript
          function inherit(p){
              if(p == null) throw TypeError();
              if(Object.create) return Object.create(p);
              var t = typeof p;
              if(t !== "object" && t !== "function") throw TypeError();
              function f(){};
              f.prototype = p;
              return new f();
          }
          var o = {x: "don't change this value"};
          library_function(inherit(o));                   # 可以防止对o的意外修改
          ```
