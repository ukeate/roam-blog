- final类，不可继承
- length()
    - String length是方法, 数组length是属性
- isEmpty()
- indexOf()
- lastIndexOf()
- chatAt()
- substring()
- trim()
- toLowerCase()
- toUpperCase()
- split()
- getBytes()
- replaceAll()
    - String p = "A0A1A2".replaceAll("([A-Z]{1,1})([A-Z0-9]{1,1})?", "$1=$2 ");
    - A=0 A=1 A=2
        - $符是组的概念，与"([A-Z]{1,1})([A-Z0-9]{1,1})?"中的两对括号代表两组
        - {1,1}代表匹配1次, (从1次到1次)
    - replaceAll("[A_Z]", "_$0")            # 分组匹配被替换的值到替换字符串中
- 类
    - StringBuffer
        - 线程安全
        - append()
        - insert()
    - StringBuilder
        - 1.5引入
    - intern()
        - 返回常量池中的引用(String对象equals池中某对象为true)，没有时添加
- 正则
    - ```plain text
      Pattern
      [abc]
      [^abc]
      [a-zA-Z]
      [a-z&&[def]]
      [a-z&&[^bc]]    =    [ad-z]
      [a-z&&[^m-p]]    =    [a-lq-z]
      .除了换行符之外的任意字符
      \d    [0-9]
      \D    [^0-9]
      \s    [ \t\n\x0B\f\r]
      \S    [^\s]
      \w    [a-zA-Z_0-9]
      \W    [^\w]
      
      posix的字符
      \p{Lower}        [a-z]
      \p{Upper}        [A-Z]
      \p{ASCII}        [\x00-\x7F]
      \p{Alpha}        [\p{Lower}\p{Upper}]
      \p{Digit}        [0-9]
      \p{Alnum}        [\p{Alpha}\p{Digit}]
      \p{Punct}        !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~    之一
      \p{Graph}        [\p{Alnum}\p{Punct}]所有可见字符
      \p{Print}        [\p{Graph}\x20]    \x20为空格
      \p{Blank}        [ \t]    一个空格或tab
      \p{Cntrl}        [\x00-\x1f\x7f]    控制字符
      \p{XDigit}        [0-9a-fA-F]    十六进制符号
      \p{Space}        [ \t\n\x0B\f\r]
      
      代表边界的字符
      ^        行首
      $        行尾
      \b        A word boundary
      \B        A non-word boundary
      \A        input的开始
      \G        The end of the previous match
      \Z        The end of the input but for the final terminator,if any
      \z        The end of the input
      
      Greedy 定量
      X?        0或1个
      X*        0或多个
      X+        1或多个
      X{n}        n个
      X{n,}    最少n个
      X{n,m}    n到m，包含n,m
      
      Logical operators
      XY        XY
      X|Y        X或Y
      (X)        捕获的匹配
      \n        得到第n个捕获
      
      Quotation
      \        Nothing, but quotes the following character
      \Q        Nothing, but quotes all characters until \E
      \E        Nothing, but ends quoting started by \Q
      
      Special constructs (non-capturing)
      (?某某)
      
      * 方案
      * 任意字符
      
          [\S\s]        # 匹配空格或非空格，就是任意一个字符
              ## [\W\w] 相同
      
      * 匹配多个
          Pattern p1 = Pattern.compile("\\(.*?\\)");
              Matcher m1 = p1.matcher("kjdjdjj(738383)ddk(9999)ppp");
              while (m1.find()) {
                  System.out.println(m1.group().replaceAll("[()]", ""));
              }
      ```
