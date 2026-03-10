- 优点
    - 减少代码量
    - 安全
        - 无空指针问题
    - 与Java库互操作性
- 命令
    - kotlinc
        - -include-runtime 编译进kotlin运行库，从而可以直接运行
    - kotlinc-jvm
        - REPL
    - 场景
        - 编译java执行
            - kotlinc hello.kt -include-runtime -d hello.jar
            - java -jar hello.jar
        - 编译kotlin执行
            - kotlinc hello.kt -d hello.jar
            - kotlin -classpath hello.jar HelloKt
        - 脚本语言使用
            - kotlinc -script a.kts
- 数据类型
    - Double
        - 64bit
    - Float
        - 32bit
    - Long
        - 64bit
    - Int
        - 32bit
    - Short
        - 16bit
    - Byte
        - 8bit
- 类
    - ```kotlin
      class Runoob() {
        // 构造函数
        init {
          println("FirstName is $firstName")
        }
        // 次构造函数
        constructor(parent: Person) {
            parent.children.add(this) 
        }
        var no: Int = 100
              get() = field
              set(value) {
              }
        fun foo() { print("Foo") }
          
      }
      ```
- 语法
    - NULL检查
        - var age: String? = "23" 
            - 类型后面加?表示可为空
        - val ages = age!!.toInt()
            - 抛出空指针异常
        - val ages1 = age?.toInt()
            - 不做处理返回 null
        - val ages2 = age?.toInt() ?: -1
            - age为空返回-1
