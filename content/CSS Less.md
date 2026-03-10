- 介绍
    - less于css如jquery于js
- 安装使用
    - npm install -g less
- 命令
    - lessc styles.less > styles.css                # 编译
        - -x 压缩  --clean-css 更复杂的压缩
- 语法
- 模板
    - {% %}
- 变量
    - ```css
      @color: #4D926F;
      #header{
          color: @color
      }
      h2{
          color: @color
      }
      ```
- CSS模板
- @baseFontSize
    - @font-size-base
        - 全局font-size基准，计算出所有页面元素的margin, padding, line-height, 改变bootstrap默认样式
- @baseLineHeight
    - @line-height-base
        - 同上, line-height基准
