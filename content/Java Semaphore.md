- 信号量, 限流同时运行, 用于线程间同步。可设置公平
- ```java
  Semaphore s = new Semaphore(1, true)
  new Thread(() -> {
      s.acquire();
      s.release()
  })
  ```
