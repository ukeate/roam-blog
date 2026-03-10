- 阶段批量执行过滤
- ```java
  class MyPhaser extends Phaser {
      @Override
      protected boolean onAdvance(int phase, int registeredParties) {
          switch(phase) {
              case 0:
                  print("arrived" + registeredParties);
                  return false;
              case 1:
                  print("eated" + registeredParties);
                  return false;
              case 2:
                  print("hugged" + registeredParties);
                  return true;
              default:
                  return true;
          }
      }
  }
  Person implements Runnable {
      private int i;
      public Person(int i) {
          this.i = i;
      }
      public void arrive() {
          phaser.arriveAndAwaitAdvance();
      }
      public void eat() {
          phaser.arriveAndAwaitAdvance();
      }
      public void hug() {
          if (i == 0 || i == 1) {
              phaser.arriveAndAwaitAdvance();
          } else {
              phaser.arriveAndDeregister();
          }
      }
  
      @Override
      public void run() {
          arrive();
          eat();
          hug();
      }
  }
  phaser = new MyPhaser();
  phaser.bulkRegister(5);
  for (int i = 0; i < 5; i++) {
      new Thread(new Person(i)).start()
  }
  ```
