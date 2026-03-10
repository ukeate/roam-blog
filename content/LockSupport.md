- 线程间通信，非锁阻塞，指定线程唤醒
- 线程启动后，unpark()可以在park()前调用生效, make(chan struct{}, 1)
- ```java
  Thread t = new Thread(() -> {
      for (int i = 0; i < 10; i++) {
          if (i == 5) {
              LockSupport.park();
          }
      }
  })
  t.start();
  TimeUnit.SECONDS.sleep(1);
  LockSupport.unpark(t);
  ```
