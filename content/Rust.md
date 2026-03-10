- [[Rust 工具]]
- 介绍
    - mozilla开发的,注重安全, 性能, 并发的系统编程语言
    - JS之父Brendan Eich设计
- 特点
    - 高性能
    - 没有GC
        - 所有权机制，编译时加GC代码
    - 能编译通过，即并发安全
    - 语言层面的数据加锁
- 概念
    - 所有权
        - 一个时刻只有一个引用
        - 避免了野指针
    - 智能指针
        - Box
            - 分配到堆上，只能有一个引用
            - ```rust
              let p1 = Box::new(Point {x:25, y:25});
              println!("{}", (*p).x);
              println!("{}", p.x);  // Box指针自动解引用
              ```
        - Rc
            - Reference Count, 可以有多个引用
                - 内部做引用计数
                - 只能单线程只读使用
            - ```rust
              let p = Rc::new(Point {x:25, y:25});
              let p1 = Rc::clone(&p);
              ```
        - Arc
            - A是Atomic, 多线程只读
            - ```rust
              let p = Arc::new(Point {x:25, y:25});
              let p1 = Arc::clone(&p);
              ```
        - Mutex
            - 保证数据修改时只有一个线程
            - ```rust
              let mut p_mutex = Mutex::new(Point {x:0, y:0});
              let mut p = p_mutex.lock().unwrap();
              p.x += 1;
              ```
    - 内存安全
    - 线程安全
- 语法
    - Trait
        - 接口
    - 所有权
        - ```rust
          struct Point {
            x: i32,
            y: i32
          }
          
          fn mutable() {
            let mut p1 = Point {x: 25, y: 25};  // 可变
            p1.x = 30;
            println!("{} {}", p1.x, p2.y);
          }
          
          fn simple_borrow() {
            let p1 = Point {x: 25, y: 25};
            f(p1);
            println!("{}", p1.x); // 报错，p1所有权在f()
          }
          
          // 需求声明 &Point 只读借用所有权，结束时归还
          fn f(p : Point){ 
          }
          
          fn main() {
            mutable()
          }
          ```
        - 可变借用
            - 初始化时加mut
            - 函数传参时加&mut
            - 函数变量声明加&mut
    - 线程安全
        - join
            - ```rust
              use std::thread;
              use std::time::Duration;
              
              fn main() {
                let p1 = Point {x:0, y:0}；
                // 加move转移p1所有权，不加时是借用
                let h = thread::spawn(move ||{
                  for i : i32 in 0..10 {
                    println!("{}", i);
                    thread::sleep(Duration::from_millis(100));
                  }
                });
                h.join();
              }
              ```
        - 共享不可变，可变不共享
            - ```rust
              fn main() {
                let mut p_arc_mutex = Arc::new(Mutex::new(Point {x:0, y:0}));
              
                let p1 = Arc::clone(&P_arc_mutex);
                let h = thread::spawn(move ||{
                  let mut p = p1.lock().unwrap();
                  p.x += 1;
                });
                
                h.join();
              }
              ```
        - ```rust
          fn main() {
            let mut p_arc_mutex = Arc::new(Mutex::new(Point {x:0, y:0}));
            for _ in 0..10 {
              let pp = Arc::clone(&p_arc_mutex);
              let h = thread::spawn(move || {
                let mut p = pp.lock().unwrap();
                p.x += 1;
              });
              h.join();
            }
          }
          ```
