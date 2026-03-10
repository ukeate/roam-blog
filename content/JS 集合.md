- Set
    - 数据唯一
    - Nan等于自身
- WeakSet
    - 成员只能是对象
    - 成员弱引用，垃圾回收不考虑其引用，所以不能引用其成员，所以WeakSet不可遍历，因为刚遍历出的成员可能已删除
    - 可用于储存dom节点，实时判断是否存在，且防止内存泄漏
- Map
    - 各种类型都可作为键, 键唯一覆盖, NaN等于自身, +0 等于 -0
- WeakMap
    - 只接受对象作key
    - 元素被回收后, 自动移除对应的键值对
    - 适用于dom节点作键名，部署关联外部的私有属性(外部对象删除后，私有属性同步删除)，不会内存泄漏
- 遍历器
    - 介绍
        - 默认三种结构支持, Array, Set, Map。Object不支持，因为不确定遍历顺序
        - 字符串是类数组，有原生的iterator接口
    - 内部调用方式
        - 解构
            - let [x, y] = new Set().add(1).add(2);
        - 扩展运算符
            - [...iterable]
        - yield* iterable
        - 参数
            - for ... of
            - Array.from()
            - Map(), Set(), WeakMap(), WeakSet()
            - Promise.all()
            - Promise.race()
    - 实现
        - ```javascript
          iterable[Symbol.iterator] = function* () {
              yield 1;
              yield 2;
          }
          iterable[Symbol.iterator] = function () {
              return {
                  next(){},
                  return () { return {done: true}}
                    # return 在for ... of 提前退出(出错, break, continue), 可以用于释放资源, return 方法必须返回一个对象，这是Generator规格规定的
                  throw() {}
                    # 配合Generator使用
              };
          
          }
          ```
    - 使用
        - var result = iterator.next()
        - while(!result.done) {
            - var x = result.value;
            - result = iterator.next();
        - }
