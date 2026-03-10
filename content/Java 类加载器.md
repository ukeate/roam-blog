- [[JVM 类加载]]
- 父亲委派机制
    - 介绍
        - Java1.2引入
        - 常用类不被替代
        - 先试上层类加载器
    - 过程
        - 类名一层层向上找
        - 找不到时，一层层找再向下委派找
        - 都不能加载时, 抛ClassNotFound
    - 为什么
        - 安全, 自定义类不能覆盖
        - 已加载不用重复加载
    - 父加载器
        - 不是类加载器的加载器
        - 不是父类
        - 是组合的parent对象
    - 打破
        - 为什么                    
            - JDK1.2之前都重写loadClass()
            - thread.setContextClassLoader()指定线程上下文classLoader
            - 热启动/热部署(OSGi tomcat)加载同一类不同版本
        - 做法
            - 重写loadClass(), new多个ClassLoader
- 4种类加载器(加载类文件位置不同)
    - 层级关系
        - 父级类加载器向下加载子加载
        - BootStrap
            - ExtClassLoader
                - AppClassLoader
                    - 自己的类加载器
    - 优先级
        - 只加载层级关系靠前面的同名类
    - 加载路径环境变量
        - 来自Launcher源码
        - Bootstrap.ClassLoader   sun.boot.class.path
        - ExtensionClassLoader    java.ext.dirs
        - AppClassLoader          java.class.path
    - BootStrap
        - C++写的二进制代码，jvm中启动时创建,无法获得引用对象
        - C++实现所以get时为null
        - 位置
            - JRE/lib/rt.jar
                - java9后为jrt-fs.jar
                - 如加载String
            - charset.jar
            - 参数-Xbootclasspath指定
        - 代码
            - System.class.getClassLoader()
                - null
                    - 说明是BootStrap类加载器加载的，不能得到该类加载器
    - ExtClassLoader(sun.misc.Launcher$ExtClassLoader)
        - 位置
            - JRE/lib/ext/*.jar
            - 参数-Djava.ext.dirs指定
    - AppClassLoader(sun.misc.Launcher$AppClassLoader)
        - 位置
            - 环境变量CLASSPATH 或 系统属性java.class.path
            - 参数-cp覆盖
        - 代码
            - ClassLoaderText.class.getClassLoader().getClass().getName()
                - AppClassLoader
    - 自定义
        - 如tomcat的StandardClassLoader
        - 继承ClassLoader
        - ```java
          class MyClassLoader extends ClassLoader {
              @Override
              Class findClass(String) {
                  return defineClass()
              }
          }
          ```
        - 挂在AppClassLoader下面
            - 加载指定的目录
                - 该目录下的class加密后，自己的类加载器解密
            - 写法
                - 覆盖findClass(String name)
            - 例子
                - ```javascript
                  public class MyClassLoader extends ClassLoader{
                      private String classDir;
                      @Override
                      protected Class<?> findClass(String name) throws ClassNotFoundException{
                          // 传入的name是全限定名
                          String classFileName = classDir + "\\" + name.substring(name.lastIndexOf('.') + 1) + ".class";
                          // 处理异常
                          FileInputStream fis = new FileInputStream(classFileName);
                          ByteArayOutputStream bos = new ByteArraOutputStream();
                          cypher(fis, bos);
                          fis.close();
                          byte[] bytes = bos.toByteArray();
                          return defineClass(bytes, 0, bytes.length);
                          // 抛出异常时 return super.findClass(name);
                      }
                      public MyClassLoader(){}
                      public MyClassLoader(String classDir){this.classDir = classDir;}
                      private static void cypher(InputStream ips, OutputStream ops){...}
                  }
                  // 删掉父类的ClassLoaderAttachment.class
                  // new 的MyClassLoader挂在了AppClassLoader这个类加载器上
                  Class clazz = new MyClassLoader("itcastLib").loadClass("cn.itcast.day2.ClassLoaderAttachment");
                  // 错误写法。因为这样写 jvm编译器要加载ClassLoaderAttachment类，但是该类已经加密
                  ClassLoaderAttachment d1 = (ClassLoaderAttachment)clazz.newInstance();
                  // 正确写法。用该加密类继承的父类来引用它的实例
                  Date d1 = (Date)clazz.newInstance();
                  ```
- API
    - Class
        - getClassLoader()
    - ClassLoader             # findInCache() -> parent.loadClass() -> findClass()
        - private final ClassLoader parent
        - loadClass           # 热加载
    - Launcher
        - $AppClassLoader
        - $ExtClassLoader
    - TestClass.class.getClassLoader()
        - getParent()
            - 得到加载该类加载器的类加载器
        - loadClass(String name)
            - 找parent委托，没有加载时执行findClass(String name)
            - 模板方法的设计模式，见 note-> 设计模式
        - findClass(String name) 
            - 自己加载
        - defineClass(..) 
            - 将二进制数据转换为class
    - 线程
        - 该线程类加载器加载线程中的第一个类
        - 线程.setContextClassLoader(ClassLoader cl)
            - 指定一个线程的类加载器
- Servlet部署
    - tomcat类加载器
        - AppClassLoader
            - StandardClassLoader
                - WebappClassLoader
    - 输出Servlet.class的jar与servlet-api.jar到jdk/lib/ext
        - 因为servlet.class加载的时候需要HttpServlet类，该类在tomcat提供的servlet-api.jar
