- 读锁是共享锁，不能写，悲观锁
- 写锁是排他锁，不能读写
- ```java
  ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
  Lock readLock = readWriteLock.readLock();
  Lock writeLock = readWriteLock.writeLock();
  void read(Lock lock) {
      lock.lock()
      lock.unlock()
  }
  void write(Lock lock) {
      lock.lock()
      lock.unlock()
  }
  for (int i =0; i<10;i++) {
      new Thread(()->read(readLock)).start();
  }
  for (int i =0; i<2; i++) {
      new Thread(()->write(writeLock)).start();
  }
  ```
