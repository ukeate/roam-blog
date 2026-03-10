- 用synchronized性能差不多，volatile一般不用
- 作用
    - 没有原子性，可能写同一值
    - 变量在线程见可见性
        - 依靠CPU缓存一致性协议
    - 禁止指令重排序                  # 用JVM的读写屏障
- 修饰引用类型，内部属性不监控
- DCL(Double Check Lock)单例volatile问题
- ```java
  private static volatile C c;    // 禁止了创建c指令重排序
  private C(){}
  public static C getInstance() {
      if (c == null) {
          synchronized (C.class) {
              if (c == null) {
                  // 申请内存(半初始化状态默认0)，成员变量初始化，赋值
                  // 先赋值未初始化时，线程2判断非空，返回了半初始化状态的对象
                  c = new C();    
              }
          }
      }
      return c;
  }
  ```
