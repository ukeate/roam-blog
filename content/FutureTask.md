- JDK5
- 有结果和异常
    - ```java
      FutureTask<String> future = new FutureTask(new Callable<String>(){
          @Override
          public String call() {
              return ""
          }
      })
      new Thread(future).start()
      future.get()
      ```
