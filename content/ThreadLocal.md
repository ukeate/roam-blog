- 线程内数据共享，线程隔离
- 内部类
    - ThreadLocalMap<ThreadLocal, Object>
        - 存在每个线程里。场景如声明式事务拿conn
        - key是弱引用指向ThreadLocal, value是强引用
        - ```java
          Entry extends WeakReference<ThreadLocal<?>> {
              Object value;
              Entry(ThreadLocal<?> k, Object v) {
                  super(k);
                  value = v;
              }
          }
          ```
- 方法
    - set(T t)
        - 向当前线程对象放入泛型对象
    - get()
        - 得到当前线程已放入的对象
    - `withInitial(() -> new SimpleDateFormat())`
        - 直接get()时返回调用结果
- 内存泄露问题
    - ThreadLocal<M> tl = new ThreadLocal();
    - tl.set(new M());
    - tl = null;
        - threadLocalMap中key弱引用回收, value不回收
    - tl.remove();
        - 必需remove()否则内存泄露, threadLocalMap中value强引用，tl回收了也一直存在
- InheritableThreadLocal<T>
    - 继承ThreadLocal, 子线程可使用父线程变量
