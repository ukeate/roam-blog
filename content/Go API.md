- golang.org/pkg 找到索引
- errors
    - New()
- testing
    - T
        - Error()
        - Errorf()
        - Fatal()
        - Fatalf()
    - B
- syscall                 # 执行其它语言
- syscall/js
- js/wasm                 # 1.11, webAssembly
- go/doc
- go/token
- runtime
    - Stack()                             # 调用栈
    - Gosched()                           # 让出执行权
    - Goexit()                            # 终止当前goroutine, 会执行defer
    - LockOSThread()                      # 绑定协程到当前线程
    - UnlockOSThread()
    - GOMAXPROCS()                        # 并发线程数
    - NumGoroutine()                      # 限制goroutine数
- runtime/debug
- os
    - Stdin                   # 输入流
    - Args                    # 运行参数
    - FileInfo
    - Open()                  # 打开文件
        - File
            - Read()
            - Write()
            - Close()
    - Exit(1)                 # 1异常退出
    - RemoveAll()
    - Stat()                  # 文件信息
- os/exec                     # 子进程
- io
    - EOF                     # 文件结束标志, 是一个error
    - Copy()
    - WriteString()
- io/ioutil
    - Discard                 # 丢弃
    - ReadFile()              # 读整个文件到内存
    - ReadAll()
    - WriteFile()
    - ReadDir()
- bufio                       # 带缓冲io
    - NewScanner()
        - Scanner             # 以行或单词断开
            - Scan()          # 有内容返回true
            - Text()
    - NewReader()
        - ReadRune()
- path                        # 文件路径
    - Base()                  # 获得最后文件名
- path/filepath               # 根据平台处理文件路径
- net
    - Conn
- net/http
    - poolServer(epoll/kqueue/iocp)
        - 支持多核大量并发连接fd
    - Get()
        - Header
            - Get()
        - Body
            - Close()
    - HandleFunc()
        - ResponseWriter
        - Request
            - RemoteAddr      # 客户ip:端口
            - Host
            - Method
            - Proto           # 网络协议
            - Header
            - Form            # 先ParseForm()
            - URL
                - Path
            - ParseForm()
    - ListenAndServe()
- net/http/httputil
- net/url
    - QueryEscape()           # url转义
- context                     # 线程安全, 树形结构
    - Cancel()
    - Deadline(Timeout)
    - Value()
    - TODO()
    - o-> ctx.Done()
        - ```javascript
          func f(ctx context.Context) (error) {
              errc := make(chan error, 1)
          
              go func() {
                  defer close(errc)
                  time.Sleep(2 * time.Second)
                  errc <- nil
              }()
          
              select {
              case <-ctx.Done():
                  <-errc
                  return ctx.Err()
              case err := <-errc:
                  return err
              }
          }
          ```
    - o-> WithTimeout
        - ```javascript
          ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)     # 调cancel提前结束
          defer cancel()
          return f(ctx)
          ```
- flag
    - Args                    # 非标识参数
    - Parse()                 # 出错调os.Exit(2)
    - o-> 输入'-s / a bc', 输出'a/bc'
        - ```javascript
          sep := flag.Strings("s", " ", "desc s")
          flag.Parse()
          println(strings.Join(flag.Args(), *sep))
          ```
- log
    - SetPrefix()
    - SetFlags()              # 格式标记
    - Fatal()                 # 加日期时间前缀
    - Fatalf()
- time
    - Time
        - Format()
    - Now()
    - Since()
        - Seconds()
    - After()
    - AfterFunc()
    - NewTicker()
        - ```javascript
          ticker := time.NewTicker(1 * time.Second)
          <- ticker.C
          ticker.Stop()
          ```
    - Tick()
        - ```javascript
          tick := time.Tick(1 * time.Second)
            # 无法中止, 用于全局，否则内部goroutine泄漏
          for {
              <-tick
          }
          ```
- fmt                         # string类型会调对象的String()方法
    - Stringer                # 接口，有String()方法可匹配
    - Printf()                # 可以用转义序列(\t等)表示不可见字符
        - %d                  # 十进制整数
        - %x, %o, %b          # 十六进制、八进制、二进制整数
            - %X
            - % x             # 十六进制输出，两数一空格
        - %f, %g, %e          # 浮点数6位小数、15位小数并自动精度与表示方式、6位小数e表示
            - "%8.3f"         # 输出8字符宽度，保留3位小数
        - %t                  # 布尔
        - %c                  # unicode字符
        - %s                  # 字符串
            - %*s             # 缩进后面指定数字个空格
        - %q                  # 带引号字符串("abc")，或字符('c')
        - %v                  # 内置格式的任何值
            - %v             # 包含结构体成员名字
        - %T                  # 类型
        - %[1]c               # 重复利用第一个参数
            - Printf("%d %[1]c %[1]q", 'a')
        - %%                  # %本身
        - 特殊数字
            - var z float64
            - fmt.Println(z,-z,1/z,-1/z,z/z)              # "0 -0 +Inf -Inf NaN"
    - Fprintf()
    - Scanf()                 # 格式化输入
    - Errorf()                # 产生一个error
- strconv                     # 类型转换
    - ParseFloat()
    - ParseInt()
    - ParseUint()
    - Itoa()                  # 整数转字符串
    - FormatInt(int64(1a), 2)
    - FormatUint()
- unicode                 # 单符号
    - ToUpper()
    - ToLower()
    - IsDigit()
    - IsLetter()
- unicode/utf8            # 逐个处理
    - RuneCountInString()                 # 字符数
    - DecodeRuneInString()                # 解码, string类型默认调用
- bytes                       # 操作byte数组
    - Buffer
        - WriteByte()
        - WriteRune()
        - WriteString()
        - String()
    - Index()
    - Contains()
    - Count()
    - Fields()
    - HasPrefix()
    - Join()
    - Equal()
- strings                     # 处理UTF-8或位序列
    - Index()
    - Split()
    - HasPrefix()
    - HasSuffix()
    - Contains()
    - Count()
    - Fields()
    - Join()
- regexp
    - MustCompile()           # 检查
    - Compile()               # 编译表达式
- text/template
    - Must()                  # 检查，有错panic
    - ```javascript
      {{.Name}}               # .代表当前值
      {{range .Items}}
          {{.Title | printf "%.64s"}}
          {{.CreateAt | daysAgo}}
      {{end}}
      template.New("report").
          Funcs(template.FuncMap{"daysAgo": daysAgo}).
          Parse(templ)
      ```
- text/tabwriter              # 生成表格
    - Flush()
- html/template               # 对html, js, css, url中原字符转义, 避免对输出页面注入控制
    - Html                    # 字符串转成该类型，受信任，不用转义
    - Parse()                 # 解析html
- encoding/json               # unicode
    - Marshal()               # 转成json, 不可导出不可见
    - MarshalIndent()         # 格式化转成json
    - Unmarshal()
    - NewDecoder()            # 流式解码
        - Decode()
- encoding/xml
- encoding/gob
- encoding/asn1
- compress/gzip               # DEFLATE算法
    - NewWriter()
    - NewReader()
- compress/bzip2              # Burrows-Wheeler变换, 压缩高，慢
- sort
    - IntSlice
        - sort.Sort(sort.IntSlice(ints))
    - Sort()
    - Reverse()
        - sort.Sort(sort.Reverse(values))
    - IsSorted()
    - Strings()
    - Ints()
    - IntsAreSorted()
    - ```javascript
      type StringSlice []string
      func (p StringSlice) Len()int {return len(p)}
      func (p StringSlice) Less(i, j int)bool {return p[i] < p[j]}
      func (p StringSlice) Swap(i, j int) {p[i], p[j] = p[j], p[i]}
      sort.Sort(StringSlice(names))
      ```
- math
    - Sin()
    - NaN()               # 返回NaN, NaN值比较总false(除!=), NaN用作信号量
- math/rand
    - Seed(time.Now().UTC().UnixNano())
    - Float64()
- math/cmplx              # 复数运算
    - Sqrt(-1)            # 0 + 1i
- math/bits
- image
    - Rect()
    - NewPaletted()
        - SetColorIndex()
    - Decode()
    - Encode()
- image/color
    - Color
    - White
    - Black
- image/gif
    - GIF
- image/jpeg              # 空导入注册解码器
- image/png               # 空导入注册解码器
- sync
    - Mutex
        - Lock()
        - Unlock()
    - RWMutex
        - Lock()
        - Unlock()
        - RLock()
        - RUnlock()
    - Once                                # 单例资源初始化，解决了多线程下读检查，防重写的问题
        - Do()
    - WaitGroup
    - Cond
        - Wait()                          # 计数加1, 进入阻塞
        - Signal()                        # 解除一个阻塞，计数减1
        - Broadcast()                     # 解除所有阻塞
    - Map
    - Pool
- reflect                 # 非导出字段反射可见, 不可更新
    - Type                # 类型
        - String()        # 类型描述, fmt.Printf()中的"%T" 内部调用
        - Field()         # 结构体成员, 返回StructField
            - Name
        - Method()
    - Value               # 值
        - String()        # 值描述，如"<int Value>"
        - Type()
        - Interface()     # 返回接口具体值
            - x := v.Interface()
            - i := x.(int)
        - Kind()          # 得到类型，Bool, String, 各种数字, Array, Struct, Chan, Func, Ptr, Slice, Map, Interface, Invalid(零值), Func
        - Index()         # 数组
        - NumField()      # 结构体成员数
        - FieldByName()
        - MapKeys()       # map
        - MapIndex()      # map
        - IsValid()
        - IsNil()         # 指针
        - Elem()          # 指针指向元素
        - CanAddr()       # 是否可寻址，如指针元素取Elem()的值，数组元素
        - Addr()          # 取地址
            - v.Addr().Interface().(*int)
        - CanSet()        # 检查CanAddr()和是否非导出字段
        - Set()           # 要求可寻址, 类型一致。可Set()interface{}类型
            - SetInt(), SetUint(), SetString(), SetFloat()            # 相对Set()有容错性,不可SetXx()interface{}类型
            - SetMapIndex()
        - NumMethod()     # 方法数
        - Method()        # 取方法
            - Name
        - Call()          # 执行Func类型Value
    - StructField
        - Tag
    - StructTag
        - Get()           # 字段标签中key的值
    - Method
    - TypeOf()
    - ValueOf()
    - Zero()              # 零值
    - Append()
    - MakeMap()
    - New()               # 类型新对象地址
    - DeepEqual()         # 深度比较，基本类型用==, 组合类型逐层比较。
        - 判断武断，不认为值为nil的map和值不为nil的空map相等。slice同理
            - ```javascript
              var c, d map[string]int = nil, make(map[string]int)
              var a, b []string = nil, []string{}
              ```
- unsafe                  # 由编译器实现，暴露了内存布局。
    - Pointer             # 任何地址，可比较，可比较nil。无类型向内存写任意值。
        - 可转成uintptr对地址计算
            - 问题
                - 移动垃圾回收器(目前未用)在移变量时地址改变使地址出错。
                - goroutine增长栈时旧栈地址重新分配
            - 解决
                - Pointer转uintptr再转回来在一条语句中实现
            - 应用
                - 深度比较时，防止循环引用，每次比较存两个抽象的指针(即Pointer)和类型(y和y[0]地址一样)
        - ```javascript
          var f float64
          i := *(*uint64)unsafe.Pointer(&f)
          ```
    - Sizeof()            # 表达式占字节长度, 不计算表达式，由编译器推断
    - Alignof             # 报告类型对齐方式
    - Offsetof()          # 成员相对起始偏移量, 计算空位
