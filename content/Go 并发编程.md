- 同步
    - func
    - channel                                 # 和调度器深度关联，控制goroutine的阻塞和唤醒
        - 缓冲区
            - 作用
                - 异步
                    - 发送接收解耦
                    - 让数据可并行处理(计数信号量)
                    - 消除goroutine间速率差异(速率大致相同, 某刻休息)
                        - 上下游速率差异大时无作用
                - 阻塞时同步
            - c := make(chan struct{})
            - c1 := make(chan struct{}, 1)
            - c ← struct{}{}                  # 阻塞
            - ← c                             # 阻塞
            - c1 ← struct{}{}                 # 不阻塞
            - c1 ← struct{}{}                 # 阻塞
            - ← c1                            # 不阻塞
            - ← c1                            # 阻塞
        - 方向
            - var c chan struct{}             # in和out
            - var cin <-chan struct{}         # in, 关闭时panic
                - v := <-cin
            - var cout chan<- struct{}        # out
                - cout <- v
            - cin = c
            - cout = c
            - c = cin                         # 编译错误
            - c = cout                        # 编译错误
        - nil                                 # 永远阻塞, 用于开启禁用情况
            - var c chan struct{}
            - c <- struct{}{}                 # 阻塞
        - 关闭                                 # 关闭不是必须的，不影响回收。只是用来通知和广播
            - c := make(chan struct{})
            - close(c)                        # 再关闭panic
            - c ← struct{}{}                  # panic
            - o, ok := ← c                    # o得到零值, ok是false
    - for range
        - c := make(chan struct{})
        - ...
        - for x := range c {}                 # close(c)时break
    - select
    - sync包
    - sync/atomic包
    - 并发三个业务, 一起结束
        - ```javascript
          cond := sync.NewCond(new(sync.Mutex))
          wg := sync.WaitGroup{}
          wg.Add(3)
          wg1 := sync.WaitGroup{}
          wg1.Add(3)
          for i := 0; i < 3; i++ {
              go func(i int) {
                  defer wg1.Done()
                  cond.L.Lock()
                  fmt.Println("wait", i)          # 业务预处理
                  wg.Done()
                  cond.Wait()                     # 阻塞
                  fmt.Println("done", i)          # 业务后续处理(要求所有业务预处理过)
                  cond.L.Unlock()
              }(i)
          }
          wg.Wait()                               # 业务预处理完成
          
          cond.L.Lock()
          cond.Broadcast()                        # 处理业务后续
          cond.L.Unlock()
          wg1.Wait()                              # goroutine完成
          ```
- 异步
    - 语句
        - 语句是串行一致的(sequentially consistent)
        - 串行一致基础上，语句会重排, 重排中可能穿插执行其它goroutine语句
            - ```javascript
              t := map[string]int{
                  "a": 1
                  "b": 2
              }
              重排为
              t := make(map[string]int)
              t["a"]=1
              t["b"]=2
              ```
    - goroutine
        - 语句
            - go f()
        - 泄漏
            - 阻塞不能自动结束                  # 如操作channel时
            - main中最后调panic(), 从崩溃转储信息判断资源释放情况
        - 死锁(deadlock)                      # 指没有可调度的goroutine
            - 所有goroutine阻塞或没有goroutine
        - 运行main的是主goroutine, main返回所有goroutine暴力终结
        - 无id(标识)
        - 不能中断
        - 无返回值
    - runtime
    - context
    - time
- 并发模式                                    # 避免goroutine泄漏，保证通信顺序
    - done/quit
        - ```javascript
          o-> done控制goroutine退出。         # 更快的响应要写更多的逻辑入侵，找到响应慢点写done逻辑
          func f(done <-chan struct{}) {
              select {
              case <-done:
                  for range ch{              # 耗尽通道, 其它goroutine不会卡在ch<-上而退出
                  }
                  return
              }
          }
          func cancelled()bool{
              select {
              case <-done:
                  return true
              default:
                  return false
              }
          }
          func f2(){                          # 轮循函数中入口检查, 避免创建新goroutine
              if cancelled() {
                  return
              }
          }
          
          done := make(chan struct{})
          defer close(done)
          f(done)
          ```
    - channels of channels
        - ```javascript
          o-> 循环处理请求
          func handle(reqs chan chan interface{}) {
              for req := range reqs {
                  req <- 0
              }
          }
          func server(req chan interface{}) {
              reqs := make(chan chan interface{})
              defer close(reqs)
              go handle(reqs)
              reqs <- req
          }
          func client() interface{} {
              req := make(chan interface{})
              defer close(req)
              go server(req)
              return <-req
          }
          fmt.Println(client())
          
          o-> 循环异常退出
          type S struct {
              closing chan chan error
          }
          func (s *S) close() error {
              errc := make(chan error)
              s.closing <- errc
              return <-errc
          }
          func (s *S) loop() {
              for {
                  select {
                  case errc := <-s.closing:
                      errc <- nil
                      return
                  }
              }
          }
          ```
    - pipeline(fan-in, fan-out)           # 传入传出channel来处理
        - ```javascript
          o->
          func gen(done <-chan struct{}, nums ...int) <-chan int {
              out := make(chan int)
              go func() {
                  defer close(out)
                  for _, n := range nums {
                      select {
                      case out <- n:
                      case <-done:
                          return
                      }
                  }
              }()
              return out
          }
          func sq(done <-chan struct{}, in <-chan int) <-chan int {
              out := make(chan int)
              go func() {
                  defer close(out)
                  for n := range in {
                      select {
                      case out <- n * n:
                      case <-done:
                          return
                      }
                  }
              }()
              return out
          }
          func merge(done <-chan struct{}, cs ...<-chan int) <-chan int {
              # wg等cs数目个协程合并数据到out后，关闭out
              var wg sync.WaitGroup
              out := make(chan int)
          
              output := func(c <-chan int) {
                  for n := range c {
                      select {
                      case out <- n:
                      case <-done:
                      }
                  }
                  wg.Done()
              }
          
              wg.Add(len(cs))
              for _, c := range cs {
                  go output(c)
              }
          
              go func() {
                  wg.Wait()
                  close(out)
              }()
              return out
          }
          
          func main() {
              done := make(chan struct{})
              defer close(done)
          
              for n := range sq(done, sq(done, gen(done, 2, 3))) {
                  # gen产生维护数字chan, sq产生维护平方chan。三个chan
                  # 三个goroutine done()时return, chan return时close()
                  fmt.Println(n)
              }
          
              // 扇出
              in := gen(done, 2, 3)
              c1 := sq(done, in)
              c2 := sq(done, in)
              // 扇进
              for n := range merge(done, c1, c2) {
                  fmt.Println(n)
              }
          }
          ```
    - timeout
        - ```javascript
          select {
          case <-ch:
              ...
          case <-time.After(time.Second)
              return
          }
          ```
    - 控制并发数
        - 并发写缓冲区channel
        - for循环产生并发数goroutine
- 常用
    - 中断
        - ```javascript
          # os.Exit()程序返回错误码
          
          done := make(chan struct{})
          go func() {
              defer close(done)
              c := make(chan os.Signal, 1)
              defer close(c)
              signal.Notify(c, os.Interrupt, os.Kill)
              defer signal.Stop(c)
              <-c
          }()
          ```
    - 并发压测
        - ```javascript
          func concurrent(done chan struct{}, fn func(), num int, ccu int, qps int) {     # num总数，ccu并行数，qps并发数
              interval := time.Duration(1e9/qps) * time.Nanosecond
              don := make(chan struct{}, 2)
              go func() {
                  <-done
                  for i := 0; i < ccu; i++ {
                      don <- struct{}{}
                  }
              }()
          
              //
              tasks := make(chan struct{})
              go func() {
                  var wg sync.WaitGroup
                  wg.Add(num)
                  for i := 0; i < num; i++ {
                      tasks <- struct{}{}
                      wg.Done()
                      time.Sleep(interval)
                  }
                  wg.Wait()
                  close(tasks)
              }()
          
              //
              var wg sync.WaitGroup
              wg.Add(ccu)
              for i := 0; i < ccu; i++ {
                  go func() {
                      defer wg.Done()
                      for range tasks {
                          select {
                          case <-don:
                              return
                          default:
                              fn()
                          }
                      }
                  }()
              }
              wg.Wait()
          }
          m := sync.Mutex{}
          count := 0
          do := func(){
              m.Lock()
              count++
              m.Unlock()
          }
          concurrent(done, do, 999, 100, 1e3)
          ```
