- 介绍
    - 本身是GNU的一个开源软件
    - 用于统计分析、绘图
    - 是S语言的一个分支(实现)
- 特点
    - 数据存储和处理
    - 数组运算(向量、矩阵运算强大)
- 语法
    - %>%
        - 管道
- 函数
    - install.packages('')
        - 安装
    - library('')
        - 引入
    - inner_join()
    - arrange(desc(n))
        - 排序
    - head(10)
    - count()
    - mutate()
        - 合并行
    - filter()
    - bind_rows()
        - 追加行
- 包
    - tidyverse
        - __Hadley Wickham推动开发__
    - summarytools
        - __概览数据__
        - ```r
          install.packages('tidyverse')
          install.packages('summarytools')
          library(tidyverse)
          library(summarytools)
          flights<-read_csv("https://gitlab.com/wshuyi/demo-data-flights/raw/master/flights.csv")
          view((dfSummary(flights)))
          ```
    - biblioshiny
        - __文献分析，Bibliometrix + shiny界面__
        - ```javascript
          install.packages('bibliometrix', dependencies=TRUE)
          library(bibliometrix)
          biblioshiny()
          ```
    - dplyr
    - tidytext
        - unnest_tokens()
            - 句子拆分单词
        - nrc
            - 情绪分析词数据集
            - get_sentiments("nrc")
        - anti_join()
            - 设置停用词
    - tidyr
    - ggplot2
        - ggplot(aes(x=index,y=n,color=sentiment))
        - geom_col()
            - 柱状图
        - facet_wrap()
            - 分开数据集
