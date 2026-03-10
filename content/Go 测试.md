- 规则
    - 文件名以_test.go结尾
    - 汇报PASS或FAIL, 平均执行时间
    - 忽略main函数, 当作库测试
        - main特权函数 log.Fatal()和os.Exit()会阻止跟踪过程
    - 包测试循环依赖时，建立外部测试包
        - 导出内部成员用于测试的后门成员声明，放在export_test.go内
- 机制
    - 扫描*_test.go
    - 生成临时main包来调用，再编译、运行、汇报, 最后清空临时文件
- Test函数                          # t用于汇报结果和日志
    - func TestF(t *testing.T) {}
- benchmark函数                     # 基准测试，性能
    - b增加了成员N指定执行次数, 增加了性能检测方法
        - 开始指定小N, 再推断足够大的N检测稳定运行时间
    - 基准测试时初始化代码放循环外面，它的执行时间不加到每次迭代时间中。普通Test做不到
    - 用go test -bench=.运行
        - 报告中 f-8 1000000 1035 ns/op 分别代表GOMAXPROCS=8, 执行100000次，平均每次1035ns
    - 基本使用
        - ```javascript
          func BenchmarkF(b *testing.B) {
              for i := 0; i < b.N; i++{
                  f()
              }
          }
          ```
    - 相对比较, 如数量级、找最佳缓冲区大小、选算法策略
        - ```javascript
          func benchmark(b *testing.B, size int){}
          func Benchmark10(b *testing.B) {benchmark(b, 10)}
          func Benchmark100(b *testing.B) {benchmark(b, 100)}
          ```
- Example函数                       # 示例，无参无结果。
    - 用处
        - 可举例子作为文档
        - 结尾注释 // output: 验证终端输出
        - 实验代码
    - ```javascript
      func ExampleF()  {
          fmt.Print("a")
          // output: aa
      }
      ```
