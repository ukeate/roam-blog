- [[Java Collection]]
- [[Java Object]]
- [[Java 包装类型]]
- [[Java String]]
- [[Java Math]]
- [[Java API 时间]]
- [[Java 数组]]
- [[Java 枚举]]
- [[Java Collection]]
- [[Java Stream]]
- [[Java API 并发]]
- [[Java 内省]]
- [[Java 反射]]
- [[Web Service]]
- [[CGLIB]]
- 系统相关
    - System
        - currentTimeMillis();
            - Clock.systemDefaultZone().millis()
                - JDK8
        - arraycopy()
    - File
        - String[] list()
            - 列出目录下的所有文件名
        - String[] list(FilenameFilter filter)
            - 列出目录下符合filter规范的文件名（filter用匿名内部类定义）
    - Scanner
        - next()
            - ```java
              Scanner input = new Scanner(System.in);
              int data = input.nextInt();
              System.out.println(data);
              ```
        - 得到继承结构
            - ```java
              StackTraceElement [] stackTraces = new Throwable().getStackTrace();
              for(StackTraceElement temp : stackTraces){
                  temp.getClassName()
                  temp.getFieldName();
                  temp.getMethodName();
              }
              ```
    - Cloneable接口
        - clone()
