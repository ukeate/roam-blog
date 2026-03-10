- 函数        
    - o-> 模式匹配
        - case的语法糖
        - 对构造子匹配，如 8 'a' : []
        - ```haskell
          factorial :: (Integral a) => a -> a
          factorial 0 = 1
          factorial n = n * factorial (n - 1)
          
          addVectors :: (Num a) => (a, a) -> (a, a) -> (a, a)
          addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
          
          first :: (a, b, c) -> a
          first (x, _, _) = x
          
          tell :: (Show a) => [a] -> String
          tell [] = ""
          tell [x: []] = ""
          tell [x:y:[]] = ""
          tell [x:y:_] = "too long, the first is " ++ show x ++ " and the second is " ++ show y
          
          length' :: (Num b) => [a] -> b
          length' [] = 0
          length' (_:xs) = 1 + length' xs
          
          capital :: String -> String
          capital "" = ""
          capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]
              # @是as模式
          ```
    - o-> guard
        - ```haskell
          bmiTell :: (RealFloat a) => a -> String
          bmiTell weight height
              | bmi <= skinny = "You're underweight"
              | bmi <= normal = "You're supposedly normal"
              | bmi <= fat = "You're fat"
              | otherwise = "You're a whale"
              where bmi = weight / height ^ 2
              (skinny, normal, fat) = (18.5, 25.0, 30.0)
                  # where是语法结构，不是表达式
          calcBmis :: (RealFloat a) => [(a, a)] -> [a]
          calcBmis xs = [bmi w h | (w, h) <- xs, let bmi = w / h ^ 2]
          
          myCompare :: (Ord a) => a -> a -> Ordering
          a `myCompare` b
              | a > b = GT
              | a == b = EQ
              | otherwise = LT
          ```
    - o-> quicksort
        - ```haskell
          quicksort :: (Ord a) => [a] -> [a]
          quicksort [] = []
          quicksort (x:xs) = 
              let smallerSorted = quicksort (filter (<=x) xs)
                  biggerSorted = quicksort [a | a <- xs, a > x]
              in smallerSorted ++ [x] ++ biggerSorted
          ```
    - o-> curry
        - ```haskell
          compareWithHundred :: (Num a, ord a) => a -> Ordering
          compareWithHundred = compare 100
          
          divideByTen :: (Floating a) => a -> a
          divideByTen = (/10)
              # 中缀函数用括号来不完全调用
              # 但(-4)表示负4, (substract 4)来表示减4函数
          ```
    - o-> 高阶函数
        - ```haskell
          applyTwice :: (a -> a) -> a -> a
          applyTwice f x = f (f x)
          ```
    - o-> lambda
        - ```haskell
          addThree :: (Num a) => a -> a -> a -> a
          addThree = \x -> \y -> \z -> x + y + z
          ```
    - o-> $ 做数据函数
        - ```haskell
          map ($ 3) [(4+), (10*), (^2), sqrt]
          ```
