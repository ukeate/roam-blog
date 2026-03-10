- 包                              # 路径引用，命名空间
    - 不能循环依赖
    - main包                      # 入口包, 产生可执行文件，也可当库导入
        - main()                  # 入口函数
    - 包名最好匹配目录名          # 导入路径的最后一段
    - import
        - 逐行import或import(多行)
        - import 别名 包路径
        - import "gopkg.in/yaml.v2" 忽略.v2, 包名为yaml
        - import _ "image/png" 空导入
        - 可导入相对目录，以.或..开头
    - var和const
        - 逐行或var(多行), const(多行)
    - 包文件函数
        - init                    # 文件在编译前排序，按依赖顺序和文件名，也是init的调用顺序。init不能调用和引用
    - 包依赖排序依次初始化
    - 工作空间
        - src
        - bin                     # 编译后的执行文件
        - pkg                     # 编译后的包, 重复使用加快编译
    - vendor目录放本地依赖
    - 文档注释影响编译
        - // +build linux darwin                  # linux和darwin才编译
        - // +build ignore                        # 任何时候都不编译
    - 内部包                      # 路径有internal的包, 只能被父目录导入
        - net/http/internal/chunked
- 注释
    - //或/**/
    - package前写文档注释，可出现在任何文件中，但一个包约定一个
    - doc.go约定为包的扩展文档注释
- 命名
    - 字母或下划线开头，区分大小写, 不能用关键字
    - 关键字: break, default, func, interface, select, case, defer, go, map, struct, chan, else
        - goto, package, switch, const, fallthrough, if, range, type, continue, for, import, return, var
    - 首字母大小写决定可见性，大写表示其是导出的
    - go倾向短名称, 驼峰式命名, 缩写全大写或小写
- 操作符
    - 优先级:
        - / % << >> & &^    # 可加=, 如*=
        - + - | ^             # 可加=, 如*=
        - == != < <= > >=     # 基本类型都可比较
        - &&
        - ||
        - + -                 # 一元取正负
    - %                       # 只能整数，符号与被除数一致
    - /                       # 整数除，去小数部分。溢出高位丢弃
    - & | ^ &^                # 按位独立
        - &^                  # and not(位清空)右边1清左边为0
        - &                   # and
        - |                   # or
        - ^                   # xor, 前缀表示取反或按位取补(逐位取反)
    - &lt;&lt; &gt;&gt;                   # 注意，有符号数右移按符号位填补空位- 声明定义
    - 不能有无用的声明变量
    - var s string            # 未初始化值默认零值，类型和表达式可省一个
    - var s string = ""       # 不推荐
    - var s = ""              # 不推荐
    - s := ""                 # 短变量声明
    - var i,j int             # 自动引申变量类型
    - i, j := 0, 1
    - i, j := true, "a"       # 类型可不一致
    - i, err := 0, e          # err声明过(只检测本词法块，外层不算)，声明i, 赋值err。:=要求至少一个声明
    - const                   # 编译时计算
        - 枚举
            - ```javascript
              type Weekday int
              const (
                  Sunday Weekday = iota               # 值为0
                  Monday
                  ...
              )
              const (
                  i T1 = 1 << iota                    # 值为1, 下值为 1<<1
                  ...
              )
              ```
        - 无类型常量
            - 只有常量可以无类型
            - 无类型常量存大数精度高于基本类型, 算术精度高于机器精度, 至少256位
            - 可用于更多表达式，无需转换类型
            - 分类
                - 布尔: true
                - 整数: 0
                - 文字符号: '\u0000'
                - 浮点数: 0.0
                - 复数: 0i
                - 字符串: ""
            - ```javascript
              const (
                  _ = 1 << (10 * iota)             # 下值为 1<<(10*1)
                  ...
              )
              ```
    - type                    # 类型声明
        - type A int          # 底层共类型, 可赋值性，可比较性。可重写String方法让fmt打印时个性化
        - a = A(i)            # 可赋值就可类型转换
    - func
    - 变量生命周期
        - 包级别是整个程序执行时间
        - 局部变量声明时创建，直到不可访问
    - 堆栈
        - 逃逸变量(函数外保存地址)在堆，局部变量在栈                   # 与变量创建方式无关(new与否), 逃逸需要一次额外内存分配。
- 赋值
    - x = 1
    - p = 1
    - p.name = ""
    - m[key] = 1
    - +=
    - i++和i--                # 只能自成一行, 且不能++i, --i
    - _                       # 忽略变量
    - a, b = b, a             # 多重赋值
    - v, err = f()
    - v, ok = m[key]          # map查询
    - v, ok = x.(T)           # 类型断言
    - v, ok = <-ch            # 通道接收
    - 可赋值性：类型精准匹配，nil赋值任何接口变量或引用变量, 常量更易隐式转换赋值
        - ==和!= 比较，两边要求是可赋值的
- 指针                         # 不能运算
    - &获取地址
    - 获取指针
- 语句
    - 变长参数
        - f(s...)
    - for
        - for i, j := 0, 1; i < n; i++ {}
        - for i < n {}
        - for {}
        - for index, value := range slice1{}
        - for key, value := range map1 {}
        - for range s{}
    - if
        - if i < n {} else if i < m {} else {}
        - if err := f(); err != nil {}
    - switch
        - ```javascript
          switch {
            无标签(tagless), 相当于switch true,
            case x > 0:
              fallthrough可贯穿, 可用控制流标签
          }
          ```
        - switch i := 0 {}        # switch true
        - switch i++ { }          # switch true
        - switch f() {}           # switch true
        - ```javascript
          switch i {
          case 0:
          case 1:
          default:                # default可在任何地方
          }
          ```
        - ```javascript
          switch t.(type) {
            类型匹配, 无匹配类型会panic, 不能用fallthrough
            case nil:
            case int, uint;
            case bool:
            case string:
            default:
          }
          ```
        - switch x := x.(type) {}
    - select
        - channel用select, 值用switch。一直等待直到匹配(default会直接匹配)。多情况匹配随机选择。不能用fallthrough
        - ```javascript
          select {
          case <-ch1:
          case x := <-ch2:
          case ch3 <- y:
          default:
          }
          ```
        - 超时
            - ```javascript
              select {
              case <-time.After(10*time.Second):
              case <-ch:
              }
              ```
        - 自发自接
            - ```javascript
              for i := 0; i < 10; i++{
                  select {
                  case x := <-ch:
                  case ch <- i:
                  }
              }
              ```
        - 标签
            - ```javascript
              c := make(chan struct{},2)
              label1:
              for {
                  select {
                  case c<- struct{}{}:
                      fmt.Println(1)
                  case <-c:
                      fmt.Println(2)
                      break                       # 无标签break跳出当前select块
                          # break label
                          # goto label2
                          # return
                  default:
                      fmt.Println(3)
                  }
              }
              label2:
              ...
              ```
    - 控制流标签
        - break, continue, goto   # 可标签化, 如break Label1
- 作用域
    - 词法块：语法块(block)(大括号), 隐式块(未在大括号中的声明, 如if中)
        - 全局块                   # 内置
        - 包级别                   # 函数外的声明
        - 文件级别                  # 导入的包
        - 局部
    - 控制流标签作用域是外层函数
    - 覆盖
        - ```javascript
          x := 1
          for {
              x := x+1
              if .. {
                  x := x+1        # 这里值的x是最外层x
              }
          }
          ```
    - if声明的变量(隐式词法块)，else中可见
        - ```javascript
          if v, err := f(); err != nil {      # else中处理非err逻辑
              return err
          } else {
              v.close()
          }
          ```
    - 包中声明作用域无顺序，可递归    # 常量、变量不可以引用自己
    - 函数
        - 字面量
            - var func()                   # 声明
            - func f(i int) int {}
            - func f(i, j int) (int, error){}
            - func f() (r int){}
            - func f(vals ...int) {}       # 变长函数, 只放最后, vals是slice
                - f(vals...)
        - 一等公民
        - 函数签名，即函数类型，包括形参列表和返回列表, 命名不影响
        - 未定义时为nil, 不可比较
        - 值传递, 不能指定默认值
        - 函数返回多值, 可return, 可做传入参数
        - 返回值有命名，可祼返回(不在return后写参数)
        - 错误
            - ```javascript
              v, ok := f()
                # 错误只一种情况
              v, err := f()
                # 错误信息会串联，避免首字母大写和换行
              if err != nil {
                  return nil, err
              }
              ```
        - 匿名函数用字面量定义，包含外层词法环境(闭包)
            - 递归要先声明，再赋值定义
            - 重定义变量
            - ```javascript
              for _, dir := range dirs() {
                  dir := dir
                    # for块作用域变量共享位置，重定义dir每次一个位置
                  dirs = append(dirs, func(){
                    # 匿名函数引用外层变量，却不一定同步执行
                      os.RemoveAll(dir)
                  })
              }
              ```
- 方法
    - 字面量
        - func (t T) f(){}                    # t值传递, 方法名唯一, 方法名不能用字段名
        - func (t *T) f(){}                   # t引用传递
        - type Path []Point                   # 别名赋方法(不能是指针和接口), 可覆盖原类型方法
        - func (p *Path)f(){}
    - 方法可在任何类型(除指针和接口), 如函数
    - 变量与变量指针都可直接调方法，编译器隐式取地址或取指针
        - P{1}.f()                            # 编译器不报错但运行出错, f()声明成引用传递, 但P{1}.时, 内存地址还未分配, 即还没有*P, 就无法调f()
    - 有引用传递方法时，避免值传递方法，会产生多例
    - 值为nil时可调方法
    - 方法可赋值
        - f := t.f
        - f(t.f)
    - 组合
        - 结构体匿名成员方法可如属性般直接调用
        - 匿名成员是引用时，多结构体可组合同一成员对象
        - 多匿名成员方法冲突时，调用时编译报错
        - 可给未命名结构体加方法
            - ```javascript
              t = struct{
                  sync.Mutex
                  v int
              }
              t.Lock(); t.v++; t.Unlock()
              ```
- 接口
    - 字面量
        - ```javascript
          type I interface {
              f()
          }
          type I2 interface {                  # 接口组合
              I
          }
          
          v := t.(T)                           # 断言，失败panic
          v, ok := t.(T)                       # 失败不panic, ok=false
          ```
    - 隐式实现，方法匹配即可(接口即约定)           # 鸭子
    - 指针方法匹配接口，对接口赋值时要传指针
    - interface{}为空接口类型，可赋值任何类型
    - 实现
        - 除了接口的定义类型，还包含动态类型(Type) + 动态值(Value)               # 编译时不知道，生成代码在运行时动态分发
            - 零值，是动态类型和动态值都是nil
                - 动态类型是nil, 指的是它为接口本身类型
                - i = nil会设置接口为零值
            - ==和!=比较
                - 动态值都为nil相等
                - 动态类型和动态值都相等，才相等
                    - i = new(T); i != nil
                - 动态类型一致，动态值不可比较(如slice), 则panic                # 非平凡
                - 格式化输出%T拿到动态类型
    - 断言
        - 变定义类型, 动态类型和动态值不变
        - 空接口断言总失败
        - 断言成接口，使用公共功能
            - v := t.(I)
            - v.Common()
    - 风格
        - 强调功能相似性                         # 子类型多态(subtype polymorphism)
        - 联合再断言区分                         # 可识别联合(discriminated union), 特设多态(ad hoc polymorhpism)
            - switch t.(type) {}
- 关键字
    - defer fn                                 # 后进先出, return或panic后调用
        - defer func(i){...}(1)
        - return、出参赋值、defer顺序
            - 先赋值，再defer，再return
            - ```javascript
              func f() (i int) {
                  defer func(){
                      i++
                  }
                  return 0          # 相当于 i=0; i++; return
              }
              ```
    - go fn
    - 异常
        - panic()
            - 日志包括值(interface{}), 调用栈
                - 用interface{}自定义异常类型
                - runtime.Stack()查看栈，利用defer函数在栈清理前调用, 所以栈存在
            - 终止当前goroutine, 外层goroutine不捕获
            - 按函数调用栈依次中止函数并调defer, 最上层后程序异常退出
            - panic之后定义的defer不执行(声明不提前)
        - recover()
            - 中止panic
            - 在defer中(panic时只调defer)捕获panic对象，没有时为nil
            - 捕获panic对象后, 捕获函数正常返回。要上抛就再手动panic()
        - ```javascript
          func Try(fn func(), handler func(interface{})) {
              defer func() {
                  if err := recover(); err != nil {
                      handler(err)
                  }
              }()
              fn()
          }
          
          func main() {／
              Try(func() {
                  panic("a")
              }, func(e interface{}) {
                  print(e)
              })
          }
          ```
- 内置
    - 零值                              # 保障变量良好定义，没有未初始化变量
        - 数字0, 布尔false, 字符串""
        - 接口和引用类型(slice, 指针, map, channel, 函数)nil
        - 复合类型其所有元素或成员零值
    - 常量
        - true
        - false
        - iota
        - nil
            - 比较
                - var s []int         # 未初始化比较, ==nil
                - s = []int(nil)      # 强转, ==nil
                - s = []int{}         # 初始化比较, !=nil
    - 基本类型
        - 字面量
            - 06                      # 8进制
            - 0x0a                    # 16进制
            - .1或1.                   # 小数点前后可省略
            - 2.2e10                  # 科学计数法
            - 1 + 2i                  # 复数
            - 字符串
                - "\\"                # 转义
                - "\r"                # 光标退到行首
                - "\b"                # 光标退一字符
                - "\x1a"              # 16进制表示位数据, 必2位，无法识别成unicode
                - "\212"              # 8进制表示位数据, 必3位, 无法识别成unicode
                - "\u1234"            # unicode, 16进制数字, 共4x4=16位
                - "\u12345678"        # unicode, 16进制数字, 共4x8=32位
                - ``                  # 原生字符串, 回车被删除(换行符保留)
        - 注意
            - 会自动截断，如int i=127; i+1=-128; i*i=1
        - int                         # 平台原生整数大小，或该平台运算效率最高值, 多是int32
        - int8                        # -128-127
        - int16
        - int32
        - int64
        - uint                        # 平台决定大小。无符号极少用于表示非负值，往往用于位运算或特定算术运算符，如位集，解析二进制，散列，加密
        - uint8                       # 0-255
        - uint16
        - uint32
        - uint64
        - uintptr                     # 存放指针，大小不明确，底层编程
        - float32                     # 运算会迅速累积误差, 正整数范围有限
        - float64
        - complex64                   # float32构成
        - complex128                  # float64构成
            - var x complex128 = complex(1,2)
            - x := 1 + 2i
        - bool
        - byte                        # uint8别名, 强调是原始数据
        - rune                        # int32别名, unicode码点(UTF-8), 下标取字符(非字节)
        - string                      # 认为是UTF-8编码的unicode, 不合理字节替换成方块(\uFFFD)。不可变(安全截取、共用), 下标取字节，越界宕机异常
            - 和数组和slice一样操作
            - []byte和string元素操作一致，只类型不同
            - 互换
                - []byte, []rune, string                  # 转换产生副本
        - error
    - 聚合类型
        - 数组
            - 字面量
                - var q [3]int
                - q := [3]int{1,2,3}
                - q := [...]int{1,2,3}                        # 长度由元素个数决定
                - q := [...]int{0: 1, 3:2}                    # 指定索引元素值
            - 数组是值传递
            - 数组元素不可包含自己
            - 默认元素为零值
            - 不同长度不同类型，不能赋值
            - 如果元素可比较，数组就可比较     # 深度比较
                - q1 < q2                   # 字符串比较按字节字典排序
        - slice
            - 字面量
                - q := []int{1,2,3}                           # 这里创建了slice, 指向了隐式创建的数组
                - q[0:1]                                      # 左闭右开
                - q[:1]; q[1:]; q[:]
            - 轻量级数据结构，用来访问数组的部分
            - 零值是nil, 行为和slice一样，不用特殊判断
            - slice后标访问越界时，会自动扩展，越界超过数组长度+1时，会panic
                - append(arr[:i], arr[i+1:]...)删除元素, i为最后元素时, i+1不越界
            - 不可比较, 只有写函数实现。只能和nil比较
                - 因为slice的元素不是直接的
                    - 有可能包含它自身
                    - 同slice不同时间会拥有不同元素
                        - 如果slice可比较来做map键, map只对key做浅拷贝, slice需要深度比较, 所以要求slice元素不变
            - 三元素                         # 有自己的属性，不是纯引用类型，是聚合类型
                - 指针: 指向slice在数组上起始位置
                - 长度: slice长度
                - 容量: 指针到数组结尾元素个数
        - map                                # key可nil, 取不存在key时, 得到value类型的零值。随机无序遍历
            - 字面量
                - m := map[string]int{
                    - "a":1,
                - }
                - a["b"]=2
            - 不能获得地址，如&m["a"]          # 因为map增长时，已有元素可能重新散列
            - 迭代顺序随机                     # key用维护排序, 散列算法健壮
            - 零值是nil, 向nil map设置元素会panic
            - map[key1]没有时，获得零值
                - v, ok := m["a"]             # 判断有无key
            - 不可比较，只能和nil比较
            - key要求可比较，可以数组,不可以slice,可以自己映射成可比较类型
                - q := [2]int{}
                - m := map[[2]int]int{}
                - m[q] = 1
        - 结构体
            - 字面量
                - ```javascript
                  type T struct {
                    # 结构体,
                      Name string `json:"name0,omitempty"`
                        # 成员标签定义, opmitempty在零值时忽略
                      I1, I2 int
                  }
                  
                  t := &T{"a"}
                    # 顺序易出错, 用于明显的小结构。未指定成员为零值
                  t := &T{
                      Name: "a",
                  }
                  (*t).Name = "a"
                  t.Name = "a"
                    # .可以用于指针
                  
                  struct{}
                    # 空结构体，没有长度，无信息。
                  
                  type T1 struct{
                    # 匿名成员
                      T
                      T2
                      *T3
                      Name1 string
                  }
                  t1 := T1{
                      T: {
                          Name: "a"
                      }
                  }
                  ```
            - 首字母大写可导出
            - 属性类型不可自己，但可自己指针
            - 结构体零值由成员零值组成            # 希望结构体方法中处理零值成一个自然的值，如sync.Mutex
            - 成员可比较，结构体实例可比较, 可作map key
            - 匿名成员(组合)
                - 点号访问可跨入(语法糖)，访问匿名成员属性和方法
                    - t1.Name; t1.T.Name
                - 不能有相同类型的匿名成员
                - 不可导出类型的匿名成员，内部成员不影响，但匿名成员本身不可见
    - 引用类型
        - Type
        - IntegerType
        - FloatType
        - ComplexType
        - chan
            - ch := make(chan string)
            - var cin chan<- string
            - var cout <-chan string
            - ch <- ""
            - &lt;-ch    - 接口类型
        - error
            - Error()
    - 命名类型
        - type
        - 结构体
            - ```javascript
              type Point struct {
                  X, Y int
              }
              ```
    - 函数
        - make()
            - make([]int)
            - make(map[string]int)
            - make(chan int)
        - delete()
            - delete(m, "a")          # 删除map元素, 没key不报错返回零值
        - len()
            - len(ch)                 # 当前缓冲个数
        - cap()
            - cap(ch)                 # 缓冲区容量
        - new()                       # 创建指定类型变量，初始化为零值，返回地址。不带任何信息且是零值(struct{}和[0]int)的类型, new出的地址不同(从前相同)
            - t := new(T)
        - append()                    # 操作slice
            - 先检查原容量，容量够修改原数组元素，不够创建新数组(容量扩一倍)复制元素, 返回新slice
            - 所以append()最好赋值给原slice
            - s1 := append(s1, s2...)
        - copy()                      # slice或string元素复制
        - close()                     # channel中用
        - complex()                   # 创建复数对象
        - real()                      # 获取复数的实部
        - imag()                      # 获取复数的虚部
        - panic()
        - recover()
    - 反射
        - 谨慎使用
            - 脆弱，能导致编译报错的写法，反射中都对应panic，执行时才知道
            - 降低自动重构和分析工具的安全性与准确度，反射对类型操作无法静态检查
            - 反射慢1-2个数量级(实测20位左右), 适合测试用，不适合关键路径上用
    - unsafe
        - 值在内存中对齐，计算更高效。结构体用内存间隙来对齐，占空间比元素之和更大
        - 结构体成员内存中重新排列可省内存，但目前不是
    - cgo
        - ```javascript
          ```
        - 注释
            - `#cgo` 指令指定C工具链选项
        - import "c"
            - 编译时促使go build用cgo预处理其上注释
            - 产生临时包包含c函数对应声明
                - 包含类型，函数，预处理宏对象
                - 这里用了C.bz_stream和C.BZ2_bzCompressInit
        - go也可编译成静态库链接进C, 或编译成动态库通过C加载和共享
