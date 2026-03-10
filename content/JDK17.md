- LTS
- 14个JEP
- 去掉AOT、GraalVM的JIT
- switch模式匹配(preview)
    - ```java
      switch(a) {
          case B b -> b.b();
          case null -> ;
      }
      ```
- 伪随机数增加interface, 用于使用stream
    - RandomGeneratorFactory
    - RandomGenerator, 由Random和ThreadLocalRandom继承
- 正式版: sealed类
