- 使用注意
    - 为什么不用Executors线程池
        - 用LinkedBlockingQueue超数量OOM
        - 拒绝策略
        - 线程命名
- 类
    - ```java
      Object
          wait()                              # 释放synchronized锁并加入等待队列，唤醒后执行需要得到synchronized锁
          notify()                            # 只唤醒，不释放当前synchronized锁
      Thread
          static currentThread()
          static sleep()
          static yield()                      # 让出CPU, 进Ready队列
          start()
          getState()
          join()                              # 等待结束
          setDaemon()                         # 是否后台
          setPriority(Thread.NORM_PRIORITY)   # 优先级，没有用
      
      
      interface Runnable
          void run()
      interface Callable
          V call() throws Exception
      interface Future
          get()
          get(long, TimeUnit)
          cancel(boolean)
          isCanceled()
          isDone()
          interface RunnableFuture
              class FutureTask
          interface CompletableFuture         # parallel
              static CompletableFuture<U> supplyAsync()
              static CompletableFuture<Void> allOf(CompletableFuture<U>...)
              static CompletableFuture<Void> anyOf(CompletableFuture<U>...)
              T join()
              CompletableFuture<U> thenApply()
              CompletableFuture<Void> thenAccept(Consumer<T>)
      
      interface ThreadFactory
          Thread newThread(Runnable)
          class DefaultThreadFactory
      interface Executor
          void execute()
          interface ExecutorService
              shutdown()
              shutdownNow()
              isShutdown()
              isTerminated()
              awaitTermination(long, TimeUnit)
              Future submit(Callable<T>)
              Future submit(Runnable, T)                     # 手动设个result
              submit(Runnable)
              invokeAll(Collection<Callable<T>>)
              invokeAll(Collection<Callable<T>>, long, TimeUnit)
              invokeAny(Collection<Callable<T>>)
              invokeAny(Collection<Callable<T>>, long, TimeUnit)
              abstract AbstractExecutorService
                  RunnableFuture<T> newTaskFor(Runnable, T)
                  RunnableFuture<T> newTaskFor(Callable<T>)
                  T doInvokeAny(Collection<Callable<T>>, boolean timed, long)
                  submit()
                  invokeAll(Collection<Callable<T>>)
                      # 忽略CancellationException, ExecutionException，其它异常抛出并取消未完成任务
                  invokeAll(Collection<Callable<T>>, long, TimeUnit)
                      # 忽略CancellationException, ExecutionException, TimeoutException，其它异常抛出并取消未完成任务
                  invokeAny(Collection<Callable<T>>)
                  invokeAny(Collection<Callable<T>>, long, TimeUnit)
                  class ThreadPoolExecutor                    # 线程池+任务队列
                      # 任务顺序: 核心线程, 任务队列，起新线程，拒绝策略
                      class ScheduledThreadPoolExecutor       # 用DelayedWorkQueue
                          scheduleAtFixedRate(()->{}, int initial, int period, TimeUnit)
                  class ForkJoinPool
                      execute(ForkJoinTask)
              interface ScheduledExecutorService
                      [class ScheduledThreadPoolExecutor]
      interface CompletionService                             # 不阻塞全部任务，已有结果入队列
          poll()
          class ExecutorCompletionService
      
      
      static class Executors
          newSingleThreadExecutor()                           # 为了用任务队列和生命周期管理
          newCachedThreadPool()                               # 超时60s, max为MAX_VALUE, 任务不堆积场景
          newFixedThreadPool()
          newScheduledThreadPool()                            # AbstractQueuedSynchronizer
          newWorkStealingPool()                               # ForkJoinPool, go的M,G,P
              # 每个线程单独队列, 尾部偷加尾部
      ```
- 创建线程
    - ```java
      # 继承
      class MyThread extendws Thread {
          @Override
          public void run(){}
      }
      new MyThread().start();
      
      # 组合
      class MyRun implements Runnable {
          @Override
          public void run(){}
      }
      new Thread(new MyRun()).start();
      
      # 返回值
      class myCall implements Callable<String> {
          @Override
          public String call(){}
      }
      FutureTask = ft = new FutureTask<String>(new MyCall())
      new Thread(ft).start();
      ft.get();
      
      # 线程池
      // execute无返回值
      ExecutorService service = Executors.newCachedThreadPool()
      service.execute(()->{});
      // submit有返回值 
      Future<String> f = service.submit(new MyCall());
      service.shutdown();
      ```
- 线程状态
    - NEW
    - RUNNABLE            # 可调度
        - READY
        - RUNNING
    - WAITING             # 等待唤醒，忙等待(一直占CPU)
        - o.wait()
        - t.join()
        - LockSupport.park()
        - Lock.lock()
        - o.notify()
        - o.notifyAll()
        - LockSupport.unpark()
        - Lock.unlock()
    - TIMED WAITING
        - Thread.sleep(time)
        - o.wait(time)
        - t.join(time)
        - LockSupport.parkNanos()
        - LockSupport.parkUntil()
    - BLOCKING            # 阻塞等待（不占CPU但经过OS调度)
        - synchronized
    - TERMINATED
- 线程打断
    - 方法 
        - interrupt()                 # 设置打断标记位
        - isInterrupted()             # 检查标记位
        - static interrupted()        # 检查当前线程标记位，并重置
    - 检测当前线程打断标记的方法      # 抛异常并重置
        - Thread.sleep()
        - o.wait();
        - o.join();
        - ReentrantLock
            - lockInterruptibly()
    - 不检测当前线程打断标记的方法
        - synchronized                # 不是代码实现检测不了
        - ReentrantLock
            - lock()
    - 强制打断
        - Thread
            - stop()                  # 已废弃, 立即释放所有锁
            - suspend()               # 已废弃，强制暂停，所有锁不释放容易死锁
            - resume()                # 已废弃，强制恢复
    - volatile
        - 判断数字不准，有同步的时间延迟, interrupt()也有延迟
        - 也需要代码中判断, 但interrupt()有wait()等系统方法支持
- 线程间通信
    - 通知
        - ```java
          # synchronized wait() notify(), CountDownLatch, LockSupport
          volatile List c = new ArrayList();
          final Object lock = new Object();
          new Thread(() -> {
              synchronized(lock) {
                  if (c.size() != 5) {
                      lock.wait();
                  }
                  lock.notify();              // 唤醒t1
              }
          }, "t2").start();
          
          TimeUnit.SECONDS.sleep(1);
          
          new Thread(() -> {
              synchronized(lock) {
                  for (int i = 0; i < 10; i++) {
                      c.add(new Object());
                      if (c.size() == 5) {
                          lock.notify();
                          lock.wait();        // 让出sychronized锁
                      }
                  }
              }
          }, "t1").start();
          ```
    - 生产消费
        - ```java
          # 优化count可以用CAS加(有ABA问题)
          class MyContainer<T> {
              final private List<T> list = new LinkedList<>();
              final private int MAX = 10;
              private int count = 0;
          
              public synchronized void put(T t) {
                  while(list.size() == MAX) {
                      this.wait();            // 期间可能有add() 
                  }
                  list.add(t);
                  count++;
                  this.notifyAll();           // 应该只唤醒消费者
              }
          
              public synchronized T get() {
                  T t = null;
                  while(list.size() == 0) {
                      this.wait();
                  }
                  t = list.removeFirst();
                  count--;
                  this.notifyAll();           // 应该只唤醒生产者
                  return t;
              }
          }
          
          # 同步容器, ReentrantLock Condition
          private Lock lock = new ReentrantLock();
          private Condition producer = lock.newCondition();
          private Condition consumer = lock.newCondition();
          
          public void put(T t) {
              try {
                  lock.lock();
                  while(list.size() == MAX) {
                      producer.await();
                  }
                  list.add(t);
                  count++;
                  consumer.signalAll();
              } finally {
                  lock.unlock();
              }
          }
          
          public T get() {
              T t = null;
              try {
                  lock.lock();
                  while(list.size() == 0) {
                      consumer.await();
                  }
                  t = list.removeFirst();
                  count--;
                  producer.signalAll();
              } finally {
                  lock.unlock();
              }
              return t;
          }
          ```
