- 初始化时，尽量指定大小
- hashCode与equals
    - 同时重写
    - Set存的对象与Map的键，要重写hashCode与equals
- sublist只是个视图，不能转ArrayList
    - sublist修改原集合个数，会引起之后使用的CuncurrentModificationException异常
- 集合转数组要用toArray(T[])
- Arrays.asList返回的集合不要add/remove/clear
    - 只是适配器，内部还是数组
- &lt;? extends T&gt;接收的对象，不能用add方法- remove/add用Iterator，并发要加锁，不能foreach
- JDK7以上版本，Comparator要满足3个条件，不然Arrays.sort和Collections.sort会报异常
    - x,y比较结果和y,x相反
    - x>y, y>z, 则x>z
    - x=y则x, z比较结果与y, z比较结果相同
- 使用entrySet遍历Map, 而不是KeySet, JDK8使用Map.foreach
    - KeySet遍历了2次，一次转为Iterator对象，一次从hashMap取key的value
- null情况
    - 集合类                 Key      Value     Super       说明
    - Hashtable           非null       非null   Dictionary  线程安全
    - ConcurrentHashMap   非null       非null   AbstractMap 分段锁技术
    - TreeMap             非null       可null   AbstractMap 线程不安全
    - HashMap             可null       可null   AbstractMap 线程不安全
- 稳定性和有序性
    - ArrayList   order/unsort
    - HashMap     unorder/unsort
    - TreeSet     order/sort
- 基础
    - 物理容器
        - 数组
        - 链表
    - Java容器
        - Collection
            - List
                - ArrayList
                - Vector                          # JDK1.0，所有方法加synchronized
                    - Stack
                - LinkedList
                - CopyOnWriteList                 # 写时复制整个list, 写加锁读无锁, 无fail-fast
            - Set
                - HashSet
                    - LinkedHashSet
                - SortedSet
                    - TreeSet
                - EnumSet
                - CopyOnWriteArraySet
                - ConcurrentSkipListSet
            - Queue                               # 相比List添加线程友好API
                - Deque                           # 双端队列
                    - ArrayDeque
                    - BlockingDeque
                        - LinkedBlockingDeque
                - BlockingQueue                   # LockSupport实现, channel, 生产者消费者
                    - SynchronousQueue            # 锁实现, 无缓冲区channel
                    - TransferQueue               # CAS, 生产者带队列阻塞
                        - LinkedTransferQueue
                    - ArrayBlockingQueue          # 有缓冲区channel
                    - DelayQueue                  # 内部维护按时间排序队列
                    - PriorityBlockingQueue
                    - LinkedBlockingQueue         # 最大数量Integer.MAX_VALUE
                - PriorityQueue                   # 堆排序实现
                - ConcurrentLinkedQueue           # CAS
        - Map
            - HashMap
                - LinkedHashMap                   # 双向链表，按插入或访问顺序遍历
            - Hashtable                           # JDK1.0，所有方法加synchronized
            - ConcurrentHashMap                   # CAS, 写慢、读快
            - ConcurrentSkipListMap               # 有序, 没有concurrentTreeMap因为CAS红黑树难实现
            - TreeMap                             # 有序，红黑树, 查找效率高。
            - WeakHashMap
            - IdentityHashMap
    - 工具类
        - Collections
            - synchronizedMap(Map)                # 内部mutex加synchronized
- Queue
    - 方法
        - add()                                   # 满了报异常
        - boolean offer()                         # 返回是否成功
        - boolean offer(long, TimeUnit)           # 返回是否成功
        - poll()
        - peek()
        - element()                               # 同peek(), 但空时报错
        - remove()
- BlockingQueue
    - 方法
        - put()                                   # 阻塞
        - take()                                  # 阻塞
    - TransferQueue
        - transfer()
        - take()
        - getWaitingConsumerCount()               # 阻塞的消费者长度
- API
    - 继承结构
        - &lt;&lt;Collection&gt;&gt;            - &lt;&lt;Queue&gt;&gt;                - PriorityQueue
                - &lt;&lt;Deque&gt;&gt;                    - ArrayDeque
            - &lt;&lt;List&gt;&gt;                - ArrayList
                - LinkedList  # 实现<<Deque>>
                - Vector
                    - Stack
            - Set
                - HashSet
                - EnumSet
                - &lt;&lt;SortedSet&gt;&gt;                    - TreeSet
        - &lt;&lt;Map&gt;&gt;            - HashMap
            - LinkedHashMap
            - &lt;&lt;SortedMap&gt;&gt;                - TreeMap
    - Arrays
        - fill()                      # 赋初值
        - asList()                    # 数组转List
        - sort()
        - binarySearch()
        - equals()                    # 数组比较
        - parallelPrefix()            # 前值和，如0, 1, 2, 3 处理后为 0, 1, 3, 6。
        - parallelSetAll()            # 修改值
        - parallelSort()
    - ArrayList
        - 用数组实现，查询快，增删慢
        - toArray() # 返回list中的所有元素作为一个Object []
        - toArray(T[] a)  # 返回泛型类型的list中的所有元素
        - trimToSize()    # 优化掉删除出现的空位
        - stream()
        - parallelStream()  # 并行流
        - 实现
            - ```java
              public ArrayList() {
                  array = EmptyArray.OBJECT;
              }
              public ArrayList(int capacity) {
                  if (capacity < 0) {
                      throw new IllegalArgumentException("capacity < 0:" + capacity);
                  }
                  array = (capacity == 0 ? EmptyArray.OBJECT : new Object[capacity]);
              }
              public ArrayList(Collection<? extends E> collection) {
                  if (collection == null) {
                      throw new NullPointerException("collection == null");
                  }
              
                  Object[] a = collection.toArray();
                  if (a.getClass() != Object[].class) {
                      Object[] newArray = new Object[a.length];
                      System.arraycopy(a, 0, newArray, 0, a.length);
                      a = newArray;
                  }
                  array = a;
                  size = a.length;
              }
              @Override
              public boolean add(E object) {
                  Object[] a = array;
                  int s = size;
                  if (s == a.length) {
                      Object[] newArray = new Object[s +
                      (s < (MIN_CAPACITY_INCREMENT / 2) ?
                      MIN_CAPACITY_INCREMENT : s >> 1)];
                  System.arraycopy(a, 0, newArray, 0, s)
                  array = a = newArray;
                  }
                  a[s] = object;
                  size = s + 1;
                  modCount++;     // 修改次数
                  return true;
              }
              @Override
              public E remove(int index){
                  Object[] a = array;
                  int s = size;
                  if (index >= s) {
                      throwIndexOutOfBoundsException(index, s);
                  }
                  @SuppressWarnings("unchecked")
                  E result = (E) a[index];
                  System.arraycopy(a, index + 1, a, index, --s - index);
                  a[s] = null;
                  size = s;
                  modCount++;
                  return result;
              }
              @Override
              public void clear() {
                  if (size != 0) {
                      Arrays.fill(array, 0, size, null);
                      size = 0;
                      modCount++;
                  }
              }
              ```
    - LinkedList
        - 循环双向链表实现，增删快，查询慢
        - 类
            - Entry
    - Vector
        - 数组实现，线程安全，增删慢，查询慢
    - HashMap
        - hash表实现，支持null的键和值
        - 实现
            - 数组存Entry, 位置称为bucket
            - Entry为元素，单链表拉链解决碰撞
            - hashcode(key)得到bucket索引
            - 扩容要rehash
        - 类
            - Entry
        - computeIfAbsent()                                               # 无值时用计算新值
        - forEach()
    - LinkedHashMap
        - 继承HashMap，hash表和链表实现，保存了插入顺序
    - HashTable
        - 线程安全，不支持null的键和值
    - TreeMap
        - 红黑树实现，有序，实现SortedMap接口
    - HashSet
        - HashMap实现，有时需要重写equals()和hashCode()
        - HashSet先按hashCode分区, 后比较equals的值再存放。修改参与hashCode值运算的属性后, 该元素删除会因无法定位,导致内存泄漏
    - LinkedHashSet
        - 继承HashSet。LinkedHashMap实现
    - List、Map、Set区别
        - List、Set单列，Map双列
        - List有序可重复, 可索引, Map无序，键不重复，值可重复，Set无序，不重复
    - Queue
        - Queue<String> queue = new LinkedList<String>();
        - queue.offer("a");            # 添加
        - queue.poll();                # 返回第一个元素并删除
        - queue.element();            # 返回第一个元素, empty时抛异常
        - queue.peek();                # 同element(), 但empty时返回null
    - Collections
        - sort(List, Comparator)
        - synchronizedCollection()
            - 线程不安全集合方法调用前加锁
        - synchronizedList()
        - synchronizedMap()
        - synchronizedSet()
