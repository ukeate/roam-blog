- clone()
    - 开始与new相同分配内存, 然后填充对象的域。是浅拷贝
    - 深拷贝
        - ```java
          class Body implements Cloneable {
              @Override
              protected Object clone() throws CloneNotSupportedException {
                  body = (Body) super.clone()
                  body.head = (Head)head.clone()
                  return body
              }
          }
          ```
- equals()
    - 具有自反性、对称性、传递性、一致性
    - 先确定hashCode一致，equals相等的对象hashCode一定相等
    - 没重写时比较地址
    - 重写equals
        - 1 == 检查是否引用
        - 2 instanceof 检查类型
        - 3 属性是否匹配
        - 4 是否满足对称性、传递性、一致性
        - 5 总要重写hashCode
- finalize()
    - 垃圾收集时调用
- valueOf()   # 转换成自己类型
- wait()
- notify()
- notifyAll()
