- 对历史版本的增强
- instanceof模式匹配(preview)
    - ```java
      if (o instanceof Integer i){
          i++;
      }
      ```
- 空指针定位到对象        # a().b().c的情况
    - XX:+ShowCodeDetailsInExceptionMessages
- record类型(preview)
    - public record User(String name, Integer age){}
- jpackage
