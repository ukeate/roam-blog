- AbstractQueueSynchronizer, CLH(Craig, Landin, and Hagersten)队列锁的变种
- 实现方式: CAS，volatile, 模板方法
- 类图
    - AbstractQueueSynchronizer
        - Sync
            - NonfairSync
- 方法
    - AbstractQueueSynchronizer
        - 一个state和一个双向链表，双向链表看前一结点状态(如持有时等待)
        - Node
            - volatile Node prev
            - volatile Node next
            - volatile Thread thread
        - VarHandle
            - JDK1.9，保存引用，普通属性原子操作。
            - 相比反射，直接操作二进制码
            - get()
            - set()
            - compareAndSet()         # 原子性
            - getAndAdd()             # 原子性
            - ```java
              class C {
                  int x = 0;
                  private static VarHandle handle;
                  static {
                      handle = MethodHandles.lookup().findVarHandle(C.class, "x", int.class)
                      handle.compareAndSet(c, 0, 1);
              
                  }
              }
              ```
        - volatile state              # 多态实现
        - acquire()
        - tryAcquire()                # 模板方法
        - acquireQueued()             # 获得
        - addWaiter(Node.EXCLUSIVE)   # 放入队列，排他锁或共享锁, CAS设置tail(从前锁整表)
        - cancelAcquire()             # status CANCELLED, tail时设置null, 非tail时unpark下一节点
    - NonfairSync
        - nonfairTryAcquire()
