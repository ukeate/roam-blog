- java赋值语句返回被赋值的对象
- & 与 &&
    - &是 按位与，逻辑与(后面会计算)
    - &&是 短路与
- | 与 ||
    - 同上
- lambda表达式
    - 为了便于并行编程, 提高语法的抽象级别
    - 字面量
        - ```javascript
          () -> o.f()
          () -> {
              o.f()
          }
          event -> o.f()
          (x, y) -> x + y
          (Long x, Long y) -> x + y
          f(O::f1)
            简化 f((o) -> o.f1())
          ```
    - 类型
        - Predicate<T>
            - Predicate<String> condition = (s) -> s.length() > 4);
            - if (condition.test(s)) {}
            - Predicate<String> a = (s) -> s.length() > 1; b = (s) -> s.length() > 2;
            - Predicate<String> c = a.and(b)
        - Consumer<T>
        - Function<T, R>
        - Supplier<T>
        - UnaryOperator<T>
        - BinaryOperator<T>
    - 特点
        - 参数类型推断
        - 作为匿名内部类
            - button.addListener(event -> o.f())
        - 引用外部变量时，不一定声明final, 但要是即成事实(effectively)的final变量(不能重复赋值)
        - 重载解析参数类型时，找最具体类型。
            - 无法推断时报错, 如                                    # 重定义方法名或传入时做强转
                - f(Predicate<Integer> p)
                - f(IntPredicate p)
