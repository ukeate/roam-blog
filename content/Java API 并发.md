- [[Java Stream]]
- [[ThreadLocal]]
- [[PipedStream]]
- [[JMH]]
- [[Disruptor]]
- [[FutureTask]]
- [[java.util.concurrent]]
- 线程通信
    - 共享变量
    - wait(), notify()实现生产和消费通知
- 同步线程
    - wait(), sleep(), notify(), notifyAll()
- Timer
    - ```java
      class MyTask extends java.util.TimerTask{
          @Override
          public void run() {
              // TODO Auto-generated method stub
              System.out.println("________");
          }
      }
      Timer timer = new Timer()
      timer.schedule(new MyTask(), 1000, 2000)    // 1秒后执行，每两秒执行一次
      timer.cancel();     // 停止任务
      ```
- Thread
    - currentThread().getContextClassLoader().getResource("/").getPath()  # 静态路径
    - run()
    - start()
    - sleep() # 占有锁
    - 异常抛出不到父线程
        - ```java
          new Thread(){
              @Override
              public void run(){
                  while(count > 0){
                      synchronized(AboutThread.class){
                          count--;
                      }
                  }
              }
          }.start();
          ```
    - 异常抛出不到父线程
        - ```java
          new Thread(new Runnable() {
              @Override
              public void run() {
                  while(count > 0){
                      synchronized(AboutThread.class){
                          count--;
                      }
                  }
              }
          }).start();
          ```
