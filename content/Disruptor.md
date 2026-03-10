- 介绍
    - CAS, 环形数组Buffer
        - 数组用sequence定位修改快,也避免了头尾加锁
        - 直接覆盖降低GC
            - 覆盖前有等待策略
    - 单机MQ
        - 发布订阅模式
        - 观察者模式
    - EventFactory
        - 会调工厂提前分配内存, 使用时不new而是修改值，提高效率, 降低GC
- 使用
    - ```java
      class MyEvent {}
      class MyEventFactory implements EventFactory<MyEvent> {
          @Override
          public MyEvent newInstance() {}
      }
      class MyEventHandler implements EventHandler<MyEvent> {
          @Override
          void onEvent(MyEvent, long sequence, boolean endOfBatch) {}
      }
      class MyExceptionHandler implements ExceptionHandler<MyEvent> {
          @Override
          void handleEventException()
          @Override
          void handleOnStartException()
          @Override
          void handleOnShutdownException()
      }
      disruptor = new Disruptor<>(factory, 1024, Executors,defaultThreadFactory())
      disruptor = new Disruptor<>(MyEvent::new, 1024, Executors,defaultThreadFactory())
      disruptor = new Disruptor<>(factory, 1024, Executors,defaultThreadFactory(), 
          ProducerType.SINGLE, new BlockingWaitStrategy())
          # 默认ProducerType.MULTI, SINGLE可提高性能不用加锁
      // 消费
      disruptor.handleEventsWith(handler1, handler2)
      disruptor.handleEventsWith((event,seq,end)->{})
      disruptor.handleExceptionsFor(handler1).with(excptionHandler1)
      
      disruptor.start()
      
      // 生产
      ringBuffer = disruptor.getRingBuffer()
      sequence = ringBuffer.next()
      event = ringBuffer.get(sequence)
      event.set("")
      ringBuffer.publish(sequence)
      translator = new EventTranslator<>() {
          @Override
          void translateTo(event, sequence) {
              event.set("")
          }
      }
      ringBuffer.publishEvent(translator)
      ringBuffer.publishEvent((event,seq, "") -> event.set(l), "")
      ```
- 等待策略
    - BlockingWaitStrategy                # 阻塞直到再次唤醒
    - BusySpinWaitStrategy                # 自旋等待
    - SleepingWaitStrategy                # sleep等待
    - LiteBlockingWaitStrategy            # 同BlockingWaitStrategy减少加锁次数                
    - LiteTimeoutBlockingWaitStrategy     # 同LiteBlockingWaitStrategy加超时            
    - PhasedBackoffWaitStrategy
    - TimeoutBlockingWaitStrategy         # 同BlockingWaitStrategy加超时                
    - YieldingWaitStrategy                # 尝试100然后Thread.yield()
