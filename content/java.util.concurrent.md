- [[java.util.concurrent.atomic]]
- [[java.util.concurrent.locks]]
- Executors   # 线程池工厂
    - 策略
        - 1 创建并设置
        - 2 execute()时
            - 1 线程数小于corePoolSize, 创建线程并执行
            - 2 线程数大于或等于corePoolSize, 任务入队列
            - 3 队列满，线程数小于maximumPoolSize, 创建线程并执行
            - 4 队列满，线程数大于maximumPoolSize, 抛出异常
        - 3 线程完成任务，从队列取任务执行
        - 4 线程空闲，超过keepAliveTime, 运行线程大于corePoolSize, 线程停掉
    - newFixedThreadPool(3)   # 固定数量
        - ExecutorService Pool = Executors.newFixedThreadPool(2);
        - pool.execute(new MyRunnable())
        - pool.shutdown()
    - newCachedThreadPool()   # 根据情况创建数量
    - newSingleThreadExecutor()   # 数量为1
    - newScheduledThreadPool(2)   # 延时
        - ScheduledExecutorService pool = Executors.newScheduledThreadPool(2);
        - Thread r1 = new MyRunnable();
        - pool.execute();
        - pool.schedule(r1, 10, TimeUnit.MILLISECONDS);    # t1在10秒后执行
        - pool.shutdown();
- &lt;&lt;ExecutorService&gt;&gt;    - execute(Runnable)
    - submit(Runnable)        # 返回Future
        - submit(Callable)
    - invokeAny()     # 返回执行最快的一个结果
    - invokeAll()     # 所有执行结束后返回
    - shutdown()  #   只interrupt()空闲线程
    - shutdownNow()   # interrupt()所有线程
- ThreadPoolExecutor
    - corePoolSize    # 最小数量
    - maximumPoolSize # 最大数量
    - keepAliveTime   # 线程空闲等待时间
- &lt;&lt;ScheduledExecutorService&gt;&gt;    - schedule(r1, 10, TimeUnit.MILLISECONDS) # 10秒后执行
    - scheduleAtFixedRate(r1, 1, 2, TimeUnit.MILLISECONDS)    # 1秒后执行，2秒一次，间隔计算开始时间。异常直接关闭
    - scheduleWithFixedDelay(r1, 1, 2, TimeUnit.MILLISECONDS)     # 同上，间隔计算结束时间
- ScheduledExecutorPoolService
- ForkJoinPool    # java7
    - ForJoinPool(4)  # 并行级别
    - invoke()
- RecursiveAction # 没返回值
    - ```java
      MyRecursiveAction extends RecursiveAction {
          @Override
          protected void compute() {
              new MyRecursiveAction().fork()
          }
      }
      ```
- RecursiveTask   # 有返回值
    - ```java
      MyRecursiveTask extends RecursiveTask<Long> {
          @Override
          protected Long Compute() {
              MyRecursiveTask t1 = new MyRecursiveTask()
              t1.fork()
              retrun t1.join()
          }
      }
      ```
- CopyOnWriteArrayList
    - 列表被修改时，使用旧副本(保护性复制)
- &lt;&lt;BlockingQueue&gt;&gt;   # 锁实现，插入和取值阻塞, 不能插入null    - add()   # 抛异常
    - offer() # 超时退出，返回特殊值
    - put()   # 阻塞
    - remove()    # 抛异常
    - poll()      # 超时退出，返回特殊值
    - take()      # 阻塞
    - element()   # 检查，抛异常
    - peek()      # 返回特殊值
- ArrayBlockingQueue  # 固定大小
    - size()
    - o->
    - queue.put(new PoisonPill())     # 毒丸, 标志数据取完
    - obj.isPoisonPill()
- LinkedBlockingQueue     # 链式
    - 两个ReentrantLock(可重入锁)分别控制元素入队和出队
    - tomcat用TaskQueue的父类，它重写offer方法减少创建多余线程
- PriorityBkockingQueue   # 无界，排序
    - 一个独占锁控制入队和出队, 通过cas(无锁算法)保证同时只有一个线程扩容成功
- DelayQueue  # 无界, 延迟期满才能提取。内部用PriorityQueue实现
- SynchronousQueue    # 单元素, cas实现
- ConcurrentQueue
    - add()
    - offer()
    - poll()
    - peek()
- ConcurrentLinkedQueue   # 无界队列, 使用cas
    - isEmpty()
    - size()
    - remove()
    - contains()
- ConcurrentHashMap
    - 并发集合通过复杂的策略提高效率, 用ReentrantLock
    - 加了concurrencyLevel属性，决定锁分段个数，取2的次幂。内部用分段锁技术，每段Segment中再存放Entity[]数组
- ConcurrentSkipListMap   # 非阻塞Hash跳表, 功能同TreeMap，线程安全，用跳表实现
