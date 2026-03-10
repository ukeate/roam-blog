- JSP表达式
- ${  }
- 11个内置对象
    - pageContext    // pageContext
    - page        // map （相当于pageScope，不过写法上省略了Scope）
    - requestScope    // map
    - sessionScope    // map
    - applicationScope    // map
    - param        // map        ,用${param.name}的形式得到传递的参数
    - paramValues    // map<String,String []>
    - header        // map
    - hearderValues    // map<String, String []>
    - cookie        // map
    - initParam        // map
- 语法
    - ```javascript
      ${list[0]}<br>
        ${map.mapteststring}<br>
        ${map[mapkey]}<br>
        ${map['mapteststring']}<br>
        ${request }
        ${pageContext.request.contextPath }<br>        # el表达式中访问内置对象
        ${requestScope.aaa }                # 访问内置对象requestScope，得到request作用域中的aaa元素
        ${pageContext.servletContext.contextPath }<br>
        ${param}<br>
        ${paramValues['a'] }<br>
        ${paramValues['a'][0] }
        ${paramValues['a'][1] }
        ${paramValues['a'][2] }<br>
        ${empty novalue}<br>
        ${1>2?"yes" : "no"}<br>
            #  . 与 [] 可以替换使用，但有两点需要注意
            1  .1不行，但是[1]可以
            2    1> map["key"]    是取map中"key"对应的值
                2> map[key]是先从作用域中取得key的字符串如"aaa",再取map中"aaa"对应的值
                3> .key    相当于1>中的介绍，是取map中"key"对应的值
                4> .是不能相当于2>中的介绍那样使用的
      ```
- 比较符${ }中使用
    - empty
    - not empty
    - 三元式（?:）
    - 简单的算术运算
