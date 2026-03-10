- ```java
  abstract class ForkJoinTask
      ForkJoinTask<V> fork()
      V join()
      abstract class RecursiveAction          # 无返回值
          void compute()
      abstract class RecursiveTask            # 有返回值
  例子
      class MyTask extends RecursiveTask<Long> {
          int start;
          int end;
          @Override
          Long compute() {
              if (end - start <= MAX_NUM) {
                  return sum
              }
              subTask1 = new MyTask(start, mid)
              subTask2 = new MyTask(mid, end)
              subTask1.fork()
              subTask2.fork()
              return subTask1.join() + subTask2.join();
          }
      }
      fjp = new ForkJoinPool()
      task = new MyTask(0, nums.length)
      fjp .execute(task)
      result = task.join()
  ```
