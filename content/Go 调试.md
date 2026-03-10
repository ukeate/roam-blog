- [[Go 测试]]
- 环境变量
    - GODEBUG=gctrace=1
        - 打印GC信息 
- http
    - ```javascript
      import _ "net/http/pprof"
      func main() {
          log.Println(http.ListenAndServe("localhost:3999", nil))
      }
      go tool pprof http://localhost:3999/debug/pprof/profile
      go tool pprof http://localhost:3999/debug/pprof/heap
      go tool pprof http://localhost:3999/debug/pprof/block
      ```
- go tool pprof Xx.bin Xx.prof
    - inuse_space                # -inuse_space显示真正使用的内存
    - cpuprofile=cpu.prof
    - memprofile=mem.prof
    - blockprofile=block.prof
    - svg                        # 输出svg
- go build
    - toolexec="/usr/bin/time"   # -toolexec在每个命令加上前缀
    - toolexec="perf stat"
    - gcflags='-memprofile=m.p'
    - gcflags='-traceprofile=t.p'
- go test
    - blockprofile=b.p net/http
    - trace=t.p
- go tool trace Xx.bin t.p
