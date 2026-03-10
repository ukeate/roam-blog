- 介绍
    - 语句以分号结束
    - 表达式计算出值，语句来执行。
        - 有副作用的表达式也会执行，叫作表达式语句(expression statement)
        - 声明语句(declaration statement), 来声明新变量或定义新函数
    - js解释器依照语句编写顺序执行
        - 控制结构(control structure)改变顺序
            - 条件conditional
                - switch
            - 循环loop
                - while, for
            - 跳转jump
                - break, return, throw
- 表达式语句
    - 赋值语句，如 greeting = "Hello" + name;
    - ++, --
    - delete
    - 函数调用，如 alert(greeting);                 # Math.cos(x)不是表达式语句，它没有对浏览器造成影响
- 复合语句和空语句
    - {}括起来当作单独语句
        - 内部语句必须分号
        - 内部声明的变量作用域在外部(es6之前)
        - ```javascript
          {
              x = Math.PI;
              cx = Math.cos(x);
          }
          ```
    - 空语句
        - ;
        - 如
            - if(){....}
            - if();
- 块作用域(es6之后)                                 # 内部使用严格模式
    - {}
- 声明语句
    - 特点
        - 声明语句创建的变量无法删除，但不是只读的，可以重写
        - 函数声明常出现在代码最顶层
        - 函数声明并没有归类为真正的语句
        - 函数声明不能出现在if, while等语句中
    - var, function
    - 如
        - var f = function(){}                    # 变量名指向函数对象，声明提前。初始化要在执行到时进行, 不可以在代码之前调用
        - function f(){}                          # 函数声明和定义均提前，可以在代码之前调用
- 条件语句
    - if(expression1) statement1
        - else if(expression2) statement2
        - else statement3
    - switch(expression){ statements}
        - 特点
            - 不重复计算表达式
            - 无break向下执行，如c语言
            - ECMAScript规定case可跟随任意表达式
                - case是恒等比较, 所以不会作类型转换
                - case是运行时(run-time)计算的, 灵活但效率低。
                - c, c++, java中case是编译时(compile-time)常量
            - 编译时常量形成跳转表(jump table), 执行非常高效
            - 避免使用函数表达式和赋值表达式，建议常量表达式
            - default标签可以在switch语句内的任何地方
        - ```javascript
          switch(typeof x){
              case 'number': break;
              default: break;
          }
          ```
    - while(expression) statement
    - do statement while(expression);             # 代码至少执行一次
    - for(initialize; test; increment) statement                      # for(;;)比while(true)高效
    - for(variable in object)                     # 遍历对象属性成员, 遍历出的数组key(如0, 1, 2)是字符串
        - for(a[i++] in o)
        - for(i in [1,2,3])
        - 原理
            - 计算object表达式
                - 为null或undefined 则跳过         # ECMAScript3的实现可能会抛出一个类型错误异常
                - 为原始值, 则包装对象
                - 否则就一定是对象，枚举对象属性(或数组索引)
                    - 只有可枚举(enumerable)属性才会遍历到
                        - 代码中所有属性和方法可枚举
                        - ECMAScript 5可以特殊手段变为不可枚举
                        - js语言核心定义的内置方法不可枚举(nonenumerable)，如toString()
                        - 很多内置属性不可枚举
                        - 继承的自定义属性也可以枚举出来
                    - prototype上有多个原型(原型链上多个对象), 每个都遍历
                    - for/in中提前删除的未枚举属性不会枚举到
                        - 定义的新属性不会枚举到(有些实现是可以枚举到的)
                    - 每次循环计算variable表达式的值，以它为左值赋值
        - 顺序
            - 通常实现按照定义先后顺序
            - 原型链多继承对象有特定顺序
            - 数组依照数字顺序                    # 不是全部实现, 索引非数字或不连续时，按照特定顺序
    - for(let c of s)                           # 会正确识别4字节字符
- 跳转语句(jump statement)
    - break, continue, return, throw            # throw是复杂的跳转语句，跳转到最近闭合异常处理程序, 处理程序可以在同函数中或高层调用栈中
- 标签语句
    - identifier: statement
        - identifier不能是保留字。与变量或函数命名空间不同，可以使用同一个标识符作标签和函数名
        - 外层语句标签不能和它内部的重名。不嵌套下是可重名的
        - break, continue是唯一可以使用语句标签的语句
    - ```javascript
      mainloop: while(token != null){
          continue mainloop;
          // break mainloop;
      }
      ```
- break语句
    - 特点
        - break后面无内容自动补分号
        - 不可以跳出函数边界，只在一个函数中起作用
        - for中不会计算自增表达式, 直接退出
    - break;
    - break labelname;
- continue语句
    - 特点
        - continue后面无内容自动补分号
        - while中跳到开头检测expression, do/while跳到结尾
        - for中先计算自增表达式，再检测expression, for/in中遍历下一个属性名，赋给变量
    - continue;
    - continue labelname;
- return语句
    - 特点
        - return后面无内容自动补分号
        - 函数调用是表达式，return返回函数表达式的值并跳过后续结果。无return时, 函数表达式结果为undefined
        - 只在函数中出现
- throw语句
    - 特点
        - js解释器立即停止当前执行的逻辑，并跳转到就近异常处理程序
        - try/catch/finally语句的catch编写异常处理程序
        - 没有异常处理程序, js把异常当作程序错误处理，报告给用户
    - throw expression;
    - throw new Error('x不能是负数');              # Error对象, name属性表示错误类型, message属性存放传递给构造函数的错误信息
- try/catch/finally语句                           # catch可选, finally可选, try finally一起, finally用于清理代码
    - finally中常写的逻辑                          # finally中return, continue, break, throw跳转，忽略已有返回值或异常，以finally中的为准
        - 正常终止, 收尾语句
        - break, continue或return终止
        - 抛出异常，被catch捕获。抛出异常未被捕获, 继续向上传播
    - 模拟for(initialize; test; increment)body;
    - initialize;
    - ```javascript
      while(test){
          try{body;}
            # body中有break时, 这里相比for循环有一次额外的自增运算, 所以while不能完全模拟for
          finally{increment;}
      }
      ```
- with语句
    - with(object) statement
    - with语句用于临时扩展作用域链, 将对象添加到作用域链的头部
    - with下创建未声明变量不会添加到with对应对象作属性，而是和平时一样
        - with执行完后把作用域链恢复到原始状态
        - 作用域链(scope chain)
            - 按序检索的对象列表, 通过它进行变量名解析
        - 严格模式下禁止使用with语句。非严格模式不擒获with, 因为运行慢且非常难于优化
            - 对象嵌套层很深时使用with来简化代码编写
- debugger语句
    - debugger;
        - 产生一个断点(breakpoint)，在解释器调试模式运行时使用
        - ECMAScript 5中加入的debugger语句。但从前主流浏览器已经实现了
- [[use strict]]
- tag函数
    - 用于过滤html字符串, 嵌入其他语言执行或filter出特定的值
    - ```javascript
      tag`hello ${1} world ${2}`
      function tag(strArr, ...values){}
        # ['hello ', ' world ', ''] , 1, 2
      ```
- 数组推导                                        # 支持iterator接口, 即也支持字符串。惰性求值, 可以替代filter方法
    - var a1 = [1, 2, 3]
    - var a2 = [for (i of a1) i * 2]
    - var a3 = [for (i of a1) if(i < 3) i]
    - var b1 = [1, 2]
    - var b2 = ['a', 'b']
    - [for (s of b1) for (w of b2) s+w]    // ['1a', '1b', '2a', '2b']
    - let c = (for (n of generator()) n * n)
- [[JS 模式匹配]]
