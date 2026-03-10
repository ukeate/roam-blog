- 函数流特点
    - Iterator是外部迭代，串行化操作。Stream是内部迭代, 自动并行处理
    - 方法分惰性和及早执行
    - 有序集合有序处理，无序集合无序处理
- Stream
    - of()                                                            # 静态方法，产生流
    - forEach()
    - collect()                                                       # 用收集器, 转出结构化数据
        - collect(Collectors.toList())                                # 转出List
    - map()
        - map(s -> s.toUpperCase())
    - reduce()
        - reduce(0, (acc, element) -> acc + element)                  # acc是累加器
    - filter()
        - filter(s -> isDigit(s.charAt(0)))
    - flatMap()                                                       # 平铺多stream
        - flatMap(numbers -> numbers.stream())
    - min()
        - min(Comparator.comparing(track -> track.getLength()))
    - max()
    - peek()
    - get()                                                           # 执行得到结果
    - count()
    - mapToInt()                                                      # IntStream, LongStream, DoubleStream, 对基本类型做特殊优化(如不装箱占内存)
    - parallelStream()                    # ForkJoinPool
- IntStream
    - range(0, N)
    - sequential()                                                    # 串行
    - parallel()                                                      # 并行, fork-join结构。注意数据结构(arrayList快于linkedList)。有状态操作会线程通信, 如sorted, distinct, limit
    - mapToObj()
    - summaryStatistics()
- IntSummaryStatistics
    - getAverage()
- Optional
    - of("a")
    - ofNullable(null)
    - empty()
    - get()                                                           # 空时抛异常
    - isPresent()
    - ifPresent((s) -> {})
    - orElse("b")                                                     # 空返回b
    - orElseGet(() -> "b")
    - `orElseThrow(ValuesAsentException::new)`
    - map((s) -> s + "b")                                             # map非空值，返回Optional
    - flatMap((s) -> Optinal.of(s + "b"))
    - filter((s) -> s.length() > 6)
- Collectors
    - toList()
    - toSet()
    - `toCollection(TreeSet::new)`
    - minBy()
    - maxBy()
    - averagingInt()
    - summingInt()
    - partitioningBy()                                                # 按true, false分两组
    - groupingBy()                                                    # 分多组
    - joining(",", "[", "]")                                          # 拼字符串, 传参是分隔符、前缀、后缀
    - o-> 自定义收集器
        - ```java
          public class StringCombiner {
              public StringCombiner add(String element) {
                  if (atStart()) {
                      builder.append(prefix);
                  } else {
                      builder.append(delim);
                  }
                  builder.append(element);
                  return this;
              }
              public StringCombiner merge(StringCombiner other) {
                  builder.append(other.builder);
                  return this;
              }
          }
          public class StringCollector implements Collector<String, StringCombiner, String> {
              public Supplier<StringCombiner> supplier(){
                  return () -> new StringCombiner(delim, prefix, suffix);
              }
              public BiConsumer<StringCombiner, String> accumulator(){
                  return StringCombiner::add;
              }
              public BinaryOperator<StringCombiner> combiner(){
                  return StringCombiner::merge;
              }
              public Function<StringCombiner, String> finisher(){
                  return StringCombiner::toString;
              }
              characteristics()                                           # 描述特征
          }
          ```
    - o-> predicate
        - void filter(list list, Predicate condition)
        - list1.stream().filter((s) -> (condition.test(s))).forEach((s) -> { System.out.println(s)})
- io流分类
    - 输入、输出
    - 节点流(如FileReader)、处理流(抽象处理方法)
    - 字节流(InputStream)、字符流(InputStreamReader)
        - 字节流处理一个字节，字符流包装字节流，设置编码类型映射成字符，处理字符
- InputStream
    - BufferedInputStream
    - FileInputStream
- OutputStream
    - BufferedOutputStream
    - FileOutputStream
- Reader
    - InputStreamReader
        - FilerReader
    - BufferedReader
        - readLine()
- Writer
    - OutputStreamWriter
        - FileWriter
    - BufferedWriter
        - newLine()
        - write(String)
- Serializable接口
    - 对象流化
    - 需求例如
        - spring中配置的bean
        - session中用到的类
    - 为什么实现序列化接口
        - 为了注册序列化序号（不显式注册会自动注册）来标识java类，区分相同类名不同包名的类
- 实现深拷贝
    - ```java
      public static <T extends Serializable> T clone(T obj) throws Exception {
          // 不必调close(), 因为gc时流对象释放
          ByteArrayOutputStream bout = new ByteArrayOutputStream()
      
          ObjectOutputStream oos = new ObjectOutputStream(bout)
          oos.writeObject(obj)
      
          ByteArrayInputStream bin = new ByteArrayInputStream(bout.toByteArray())
          ObjectInputStream ois = new ObjectInputStream(bin)
      
          return (T)ois.readObject()
      }
      ```
