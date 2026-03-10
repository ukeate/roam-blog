- 风格
    - 使用缩进代替括号，但也可用括号
    - ```haskell
      point free style
          sum' xs = foldl (+) 0 xs
          sum' = foldl (+) 0
      ```
- 文件扩展名
    - 文件中不用let定义变量, 
    - 变量赋值两次会报错, 这意味着代码顺序不重要
    - hs
- 命令函数
    - :load
        - 加载模块
        - :load a.hs
    - :l
    - :cd
        - 切换工作目录
        - :cd c:\a
    - :reload
        - 重载所有模块
    - :r
    - :type
        - :type 'H'
    - :t
    - :info
        - 查看一个typeclass有哪些instance和subclass
        - 类型的信息、函数的类型声明
    - :k
        - 查看kind
        - :k Int
            - `Int :: *`
        - :k Maybe
            - `Maybe :: * -> *`
- 类型
    - 类型
        - Int
            - 有界整数
        - Integer
            - 无界整数
        - Float
            - 单精度浮点数
        - Double
        - Bool
        - Char
        - Maybe
        - []
        - ()
        - a
            - type variables
    - 类型约束
        - Eq
            - 可判断相等性的类型，可用 == 或 /= 判断
                - 只除函数
        - Ord
            - 可比较大小的类型, 必定是Eq
            - 只除函数
        - Ordering
            - 只有GT, EQ, LT
        - Show
            - 可用字符串表示的类型
            - 只除函数
        - Read
            - 与Show相反
        - Enum
            - 连续的类型，有后继子(successer)和前置子(predecesor), 分别通过succ函数和pred函数得到
            - 可以[1..2]构造list
            - 包含 (), Bool, Char, Ordering, Int, Integer, Float, Double
        - Bounded
            - 有上限和下限
            - 如果Tuple中都属于Bounded, 那么这个Tuple属于Bounded
        - Num
            - 数字特征
        - Integral
            - 整数
        - Floating
            - 浮点，包含Float和Double
    - 构造类型
        - data Bool = False | True deriving (Ord)
            - Bool是构造的类型, False为值构造子，值可以用:t查看其类型
            - 值构造子可以用于模式匹配
            - 这里值构造子是没有参数的，叫作nullary
            - False在True前，所以比较时True比False大
        - data Point = Point Float Float deriving (Show)
            - 值构造子可以与类型同名
        - data Shape = Circle Point Float | Rectangle  Point Point deriving (Show)
            - 派生自Show, 就可show值成字符串
        - ```haskell
          data Person = Person {firstName :: String
              , lastName :: String
              } deriving (Show)
                  # Record Syntax, 同 Person String String,  但自动生成同名的取值函数，show显示也改变
              let p = Person {firstName="aa", lastName="bb"}
          
              tellPerson :: Person -> String
              tellPerson (Person {firstName = a, lastName = b}) = a ++ b
          ```
        - `newtype CharList = CharList {getCharList :: [Char]} deriving {Eq, Show}`
            - newtype将现有类型包成新类型，只能定义单一值构造子，且其只能有一个字段。并将包裹和解开的成本都去掉
    - 类型构造子
        - data声明中不能加类型约束
        - ```haskell
          data Maybe a = Nothing | Just a
          data Car a b = Car { company :: a
              , year :: b
              } deriving (Show)
          tellCar :: (Show a) => Car String a -> String
          ```
    - 类型别名
        - type String = [Char]
        - type AssocList k v = [(k,v)]
            - 别名类型构造子
        - type IntMap = Map Int
            - 不全调用得到不全类型构造子, 同 type intMap v = Map Int v
    - infixr
        - infixr 5 :-:
            - 定义中缀构造子, 5是优先级, :-:是符号
            - 默认left-associative
        - ```haskell
          infixr 5 .++
          (.++) :: List a -> List a -> List a
          Empty .++ ys = ys
          (x :-: xs) .++ ys = x :-: (xs .++ ys)
          ```
    - recursive data structures
        - data List a = Empty | a :-: (List a) deriving (Show, Read, Eq, Ord)
    - typeclass
        - ```haskell
          class Eq a where
              (==) :: a -> a -> Bool
              (/=) :: a -> a -> Bool
              x == y = not (x /= y)
              x /= y = not (x == y)
                  # 只需要instance一个定义就好，这个定义叫minimal complete definition
          data TrafficLight = Red | Yellow | Green
          instance Eq TrafficLight where
              Red == Red = True
              Green == Green = True
              Yellow == Yellow = True
              _ == _ = False
          instance Show TrafficLight where
              show Red = "Red light"
              show Yellow = "Yellow light"
              show Green = "Green light"
          
          class (Eq a) => Num a where
              # Num 是 Eq  的 subclass, 要是Num必是Eq
          
          instance (Eq m) => Eq (Maybe m) where
              Just x == Just y = x == y
              Nothing == Nothing = True
              _ == _ = False
          ```
    - o-> Either
        - data Either a b = Left a | Right a deriving (Eq, Ord, Read, Show)
    - o-> Tree
        - data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq)
    - o-> YesNo
        - ```haskell
          class YesNo a where
              yesno :: a -> Bool
          instance YesNo Int where
              yesno 0 = False
              yesno _ = True
          ```
    - o-> Functor
        - ```haskell
          class Functor f where
              # map over
              fmap :: (a -> b) -> f a -> f b
          instance Functor Maybe where
              # 接收构造子而非类型
              fmap f (Just x) = Just (f x)
              fmap f Nothing = Nothing
          instance Functor (Either a) where
              # parital apply Either, Either a 是个类型构造子
              fmap f (Right x) = Right (f x)
              fmap f (Left x) = Left x
          instance Functor ((->) r) where
              # 对函数的functor
              fmap f g = (\x -> f (g x))
          ```
- 变量
    - let pi = 3.14
        - 变量不可变，但可重复定义
    - (-1)
        - 负数一般加小括号
        - `let r = 25 :: Double`
            - 默认猜测是Integer
            - monomorphish restriction(单一同态限定)原理，可以指定polymorphic(多态)
                - `let r = 25 :: Num a => a`
    - True, False
        - 类型为 Bool
    - "abc"
        - 类型为[char], 与'a':'b':'c':[]
        - `a = "aaa" :: String`
            - 得到一个String, 与[char]同样使用
    - LT, GT, EQ
- 操作符
    - %
        - 分号
    - &&
    - ||
    - ++    
        - 字符串拼接
    - /=
        - 不等
    - do
        - 动作的combine, do 是>>=的语法糖, 用来连接一系列动作
    - &lt;-        - name <- getLine, 存到变量
        - 除了程序的最后一行用来作返回值，其它语句都可以用 <-
- 表达式
    - 表达式可以随处安放
    - if x < 0 then
        - 1
    - else if x > 0 then
        - 1
    - else
        - 0
    - case x of
        - 0 -> 1
        - 1 -> 5
        - _ -> (-1)
    - let a = 1
        - 局部绑定, in可省略则定义到全局
        - twice_a = 2 * a
    - in (a + twice_a, a - twice_a)
    - let boot x  y z = x * y + z in boot 3 4 2
- 类型表示
    - Eq a => a -> a -> Bool
        - => 前面是类型约束, 后面表示传入两个同类型参数，返回Bool类型
- 元组
    - 类型可不同，不能单元素。2元组叫pairs, 3元组叫triples, n元组叫n-tuple
    - 元组不可变
    - 元组的类型由长度和其中的类型决定, ("a", 1)与(1, "a")是不同的类型，所以[("a", 1), (2, "b")]是错误的
    - (True, 1)
    - ((1,2), True)
- 列表
    - 列表，类型必须相同。
    - 列表都由[]追加得到，逗号是语法糖
    - let n = [1, 2]
    - [1..20]
        - range浮点数不精确
    - take 20 [1,2..]
    - [2,4..20]
    - ['a'..'z']
    - 0:n
        - 得到追加列表[0, 1, 2]， 头部追加叫作consing, cons是constructor
        - -1:0:n
    - `[[1], [2]]`
    - n !! 1
        - 取元素
    - l1 > l2
        - 元素依次比较
    - [x*2 | x <- [1..10], x*2 >= 12]
        - list comprehension
        - ```haskell
          boomBangs xs = [if x < 10 then "BOOM!" else "BANG!" | x <-xs, odd x]
          [x*y | x <-[1,2], y <-[3,4]]
              # 聚合得[3,4,6,8]
          length' xs = sum [1 | _ <- xs]
          
          xxs = [[1,2], [3,4]]
          [[x | x <- xs, even x] | xs <- xxs]
          
          [(a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 = c ^2]
          
          [a + b | (a,b) <- xs]
              # list comprehension中的模式匹配
          ```
    - 模式匹配
        - x:xs
        - x:y:z:xs
- 函数
    - 函数名与参数，参数与参数之间有空格隔开
    - 函数比运算符先结合
    - let area r = pi * r ^ 2
        - 定义函数
    - area 2
    - area (-2)
    - let area2 r = area r
    - let first (x, y) = x
        - 接收元组
    - `uppercase, lowercase :: String -> String`
        - 指定函数类型
    - 分段定义
        - 编译成case语句
        - f 0 = 1
        - f 1 = 5
        - f _ = -1
    - 函数合成调用
        - square (f 1)
        - (square . f) 1
    - (\xs -> length xs > 15)
        - lambda表达式
        - lambda可以用模式匹配，但使用不了多个模式
- I/O action
    - 在main中 I/O action才被执行
    - return () 语句产生I/O action, do接着执行
    - 执行后会打印结果，结果为()时不打印
    - ```haskell
      main = do
          _ <- putStrLn "a"
          name <- getLine
          putStrLn (name)
      ```
- monad
    - o-> do
        - ```haskell
          doGuessing num = do
              putStrLn "Enter your guess:"
              guess <- getLine
              if (read guess) < num
              then do putStrLn "Too low"
                  doGuessing num
              else if (read guess) > num
              then do putStrLn "Too high"
                  doGuessing num
              else putStrLn "You Win"
                  # 只有一个动作时，可省略do
          ```
    - o-> do
        - ```haskell
          doGuessing num = do
              putStrLn "Enter your guess:"
              guess <- getLine
              case compare (read guess) num of
                  LT -> do putStrLn "Too low"
                  GT -> do putStrLn "Too high"
                  EQ -> putStrLn "You Win"
          ```
    - o-> functor applicative monad
        - ```haskell
          class Functor f where
          fmap :: (a -> b) -> f a -> f b
          class Functor f => Applicative f where
          pure :: a -> f a
          () :: f (a -> b) -> f a -> f b
          class Applicative m => Monad m where
          return :: a -> m a
          (>>=) :: m a -> (a -> m b) -> m b
          (>>) :: m a -> m b -> m b
          x >> y = x >>= \_ -> y
          fail :: String -> m a
          fail msg = error msg
          instance Functor Maybe where
          fmap func (Just x) = Just (func x)
          fmap func Nothing  = Nothing
          instance Applicative Maybe where
          pure = Just
          Nothing  _ = Nothing
          (Just func)  something = fmap func something
          instance Monad Maybe where
          return = Just
          Nothing >>= func = Nothing
          Just x >>= func  = func x
          ```
