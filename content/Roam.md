- 经验
    - 习惯
        - 晨间日记：心情，任务
    - 思想
        - 渐近式归纳（progressive summarization）
            - ![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Foutrun%2FX4j2GePUV-.png?alt=media&token=fccecd84-15c7-4f5f-8a41-45a2b4ada956)
    - 连接类型
        - [[]]页面: 适合人员、出版物、内联
        - tag用于检索而不分类
            - 标记、辅助连接
                - sorry, we couldn't generate an image for you. if this issue persists, please contact support@phonetonote.com
        - 别名: 隐藏在文本下
            - {{alias: [[]] a}}
            - []([[]])
        - 属性
            - Attr: 
    - 写技巧
        - ---
        - 插入模板：;;
- 帮助
    - 基础
        - {{table}}
            - 查找
                - ctrl + u
            - 快速命令
                - /
            - 新页
                - [[
            - 引用
                - ((
            - 新block
                - enter
            - 缩进block
                - tab/shift tab
            - 命令
                - ctrl + p
    - 格式
        - {{table}}
            - **加粗**
                - **
                    - ctrl + b
            - __斜体__
                - __
                    - ctrl + i
            - ~~删除线~~
                - ~~
                    - win + y
            - ^^高亮^^
                - ^^
                    - ctrl + h
            - [链接](/#/app/outrun/page/PqzvT5QRz)
                - []()
                    - ctrl + k
            - $$\LaTeX$$
                - $$
                    - $$
            - 标题1/2/3
                - #
                    - ctrl + alt + 1/2/3
    - 导航
        - {{table}}
            - 下个block
                - down
            - 上个block
                - up
            - 日记
                - alt + d
            - 缩in/out
                - alt + right/left
            - 页首/页末block(无选中时)
                - ctrl + enter / ctrl + shift + enter
            - 跳转/跳转右栏
                - ctrl + o / ctrl + shift + o
            - block内最左/右
                - ctrl + home/end
    - Block
        - {{table}}
            - 上移/下移
                - alt +shift + up / down
            - 块内换行
                - shift + enter
            - 展开/折叠
                - ctrl + down/up
            - 选中当前块
                - shift + up
            - 选中上面下面(选中模式时)
                - shift + up / down
            - 全选
                - ctrl + shift + a
            - 复制引用
                - ctrl + shift + c
            - 切换TODO状态
                - ctrl + enter
            - 块内搜索
                - ctrl + shift + 9
    - 侧边栏
        - {{table}}
            - 左/右边栏显隐
                - ctrl + \ 、ctrl + / 
            - 右边栏打开/打开引用
                - shift + click / ctrl + shift + click
            - 右边栏打开(搜索时)
                - shift + enter
    - 外观
        - {{table}}
            - 切换显隐双括号
                - ctrl + c + b
            - 切换显隐块引用
                - ctrl + c + r
            - 切换所有用户/其它用户圆点颜色
                - ctrl + c + s / ctrl + c + c + s
            - 切换block预览
                - ctrl + c + p
            - 切换命名空间显示
                - ctrl + c + l
    - 其它
        - {{table}}
            - 切换显示帮助
                - alt + shift + h
            - undo
                - ctrl + z
            - redo
                - ctrl + y
            - 插入youtube视频时间戳
                - ctrl + alt + t
    - 组件
        - 计算器
            - ```javascript
              {{calc: 4 + 5 }}
              {{calc: ((block)) + ((block)) * 2 }}
              ```
        - 块及子块计数
            - ```javascript
              {{word-count}}
              ```
        - 日期组件转化成日记引用
            - ```javascript
              {{date}}
              ```
        - 嵌入页/块
            - ```javascript
              {{embed: [[page]]}}
              {{embed: ((block))}}
              ```
        - 嵌入pdf
            - ```javascript
              {{pdf: https://a.link.to/a.pdf}}
              ```
        - 嵌入视频
            - ```javascript
              {{video: https://youtube.com/lOoMoRVImeo}}
              ```
        - 嵌入网页
            - ```javascript
              {{iframe: https://worrydream.com}}
              ```
        - 密文
            - ```javascript
              {{encrypt}}
              ```
        - 看板
            - ```javascript
              {{kanban}}
              ```
            - 移动光标: ctrl + 方向
            - 移动卡片：alt + shift + 方向
        - 显示引用
            - ```javascript
              {{mentions: [[Page]]}} {{mentions: ((block))}}
              ```
        - 番茄钟
            - ```javascript
              {{POMO: 25}}
              ```
        - 表格
            - ```javascript
              {{table}}
              ```
    - 匹配出block
        - and
            - ```javascript
              {{query: {and: [[articles]] ((block)) }}}
              ```
        - or
            - ```javascript
              {{query: {or: [[page A]] [[page B]] }}}
              ```
        - not
            - ```javascript
              {{query: {and: [[page A]] {not: [[page B]] }}}}
              ```
        - between(只适用于日记)
            - ```javascript
              {{query: {between: [[January 1st, 2021]] [[today]] }}}
              ```
    - 仓库
        - [[SmartBlocks]]
        - [[Workbench]]
        - [[Query Builder]]
        - [[Auto Tag Mode]]
        - [[Roam AI]]
- 插件
    - chrome
        - roam portal
    - JS
        - roam42
- 课程
    - [Cite to Write](https://learn.cortexfutura.com/p/cite-to-write-v2)
    - Roam Untangled
