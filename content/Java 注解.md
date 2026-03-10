- __annotation (1.5特性)__
- @FunctionalInterface
    - 检查是否符合函数接口标准
- jdk的注解
    - @SuppressWarnings("deprecation")
        - 压制警告
        - 不是一个标记注解。它有一个类型为String[]的成员，
        - 参数
            - ```plain text
              all to suppress all warnings
              boxing to suppress warnings relative to boxing/unboxing operations
              cast to suppress warnings relative to cast operations
              dep-ann to suppress warnings relative to deprecated annotation
              deprecation to suppress warnings relative to deprecation
              fallthrough to suppress warnings relative to missing breaks in switch statements
              finally to suppress warnings relative to finally block that don’t return
              hiding to suppress warnings relative to locals that hide variable
              incomplete-switch to suppress warnings relative to missing entries in a switch statement (enum case)
              nls to suppress warnings relative to non-nls string literals
              null to suppress warnings relative to null analysis
              rawtypes to suppress warnings relative to un-specific types when using generics on class params
              restriction to suppress warnings relative to usage of discouraged or forbidden references
              serial to suppress warnings relative to missing serialVersionUID field for a serializable class
              static-access to suppress warnings relative to incorrect static access
              synthetic-access to suppress warnings relative to unoptimized access from inner classes
              unchecked to suppress warnings relative to unchecked operations
              unqualified-field-access to suppress warnings relative to field access unqualified
              unused to suppress warnings relative to unused code
              ```
    - @Deprecated
        - 标记过时
    - @Override
- 元注解(metadata)
    - @Retention(RetentionPolicy.RUNTIME)
        - 保留策略 CLASS、RUNTIME和SOURCE这三种，分别表示注解保存在类文件、JVM运行时刻和源代码阶段
        - 只有当声明为RUNTIME的时候，才能够在运行时刻通过反射API来获取到注解的信息。
    - @Target用来声明注解作用目标，如类型、方法和域等。如
        - @Target(ElementType.TYPE)
            - 接口、类、枚举、注解
        - @Target(ElementType.FIELD)
            - 字段、枚举的常量
        - @Target(ElementType.METHOD)
            - 方法
        - @Target(ElementType.PARAMETER)
            - 方法参数
        - @Target(ElementType.CONSTRUCTOR) 
            - 构造函数
        - @Target(ElementType.LOCAL_VARIABLE)
            - 局部变量
        - @Target(ElementType.ANNOTATION_TYPE)
            - 注解
        - @Target(ElementType.PACKAGE)
            - 包
    - @Document：说明该注解将被包含在javadoc中
    - @Inherited：说明子类可以继承父类中的该注解
- 自定义注解
    - @interface用来声明一个注解
        - 其中的每一个方法实际上是声明了一个配置参数。方法的名称就是参数的名称，返回值类型就是参数的类型。可以通过default来声明参数的默认值。
    - ```java
      @Retention(RetentionPolicy.RUNTIME)
      @Target(ElementType.TYPE)
      public @interface Assignment {
          String assignee();
          int effort();
          double finished() default 0;
      }
      ```
