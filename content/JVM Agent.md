- 例子
    - 打包 a.jar
        - MANIFEST.MF
            - Premain_Class: MyAgent
        - ```java
          public class MyAgent {
              public static Instrumentation inst;
              public static void premain(String agentArgs, Instrumentation _inst) {
                  inst = _inst;
              } 
          }
          ```
    - JVM参数 -javaagent: a.jar
    - 使用 MyAgent.inst
