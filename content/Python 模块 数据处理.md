- 处理
    - pickle
        - 持久化
- 计算
    - numpy
        - append()
        - arange()
        - 对象
            - random
                - shuffle()
                - rand()
                - seed()
    - math
    - random
    - scipy
        - 科学计算
- 可视化
    - [[Pandas]]
    - wordcloud
        - 词云
        - ```python
          filename = "Friends.txt"
          with open(filename, encoding="utf8") as f:
            mytext = f.read()
            
            from wordcloud import WordCloud
            # wordcloud = WordCloud().generate(mytext)
            wordcloud = WordCloud(font_path="simsun.ttf").generate(mytext)
          
            
            %pylab inline
            import matplotlib.pyplot as plt
            plt.imshow(wordcloud, interpolation='bilinear')
            plt.axis("off")
          ```
    - matplotlib
        - 图形
        - %matplotlib inline
        - %pylib
        - 对象
            - pyplot
                - plot()
                - title()
                - legend()
                - figure()
                - show()
                - scatter()
                - annotate()
                - savefig()
        - 魔法函数
            - %pylab
            - %ls
            - %run
            - %paste
    - seaborn
        - 数据可视化
    - plotnine
        - R的ggplot2移植
    - plotnine
        - 绘图表
    - ggplot
        - 从R语言移植
    - pyLDAvis
        - enable_notebook()
        - show()
        - 对象
            - sklearn
                - prepare()
