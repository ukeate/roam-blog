- ==
    - 基础类型比较数值，引用类型比较地址
- +1 与 += 1
    - short s1 = 1; s1 = s1 + 1   # 出错，类型变为int
    - s1 += 1     # 相当于 s1 = (short)(s1 + 1)
- + ""
    - 编译成StringBuilder实现
- goto和const是保留字但没有使用
- 标签
    - ```java
      label1:
      for(; true; ) {
          break lable1;
          // continue lable1;
      }
      ```
- 增强for循环(1.5)
    - ```java
      for(int i : args){
          sum += i;
      }
      ```
- 同步
    - public synchronized void synMethod(){}
    - synchronized(a1){}
- switch
    - expr类型
        - 1.5前只能byte, short, char, int
        - 1.5可以枚举
        - 1.7可以String
        - long目前不可以
