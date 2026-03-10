- 事件
    - blur
    - change
    - click
    - dblclick
    - focus
    - keydown
    - keypress
    - keyup
    - load
    - mousedown
    - mousemove
    - mouseout
    - mouseover
    - mouseup
    - reset
    - select
    - submit
    - unload
    - Abort
        - 中断图片下载时激发
    - AfterPrint
        - 打印文档后激发
    - AfterUpdate
        - 传送完数据
    - BeforeCopy
        - 复制到剪贴板前
    - BeforeCut
        - 剪切到剪贴板前
    - BeforeEditFocus
    - BeforePaste
    - BeforePrint
    - BeforeUnload
    - BeforeUpdate
    - Bounce
    - CellChange
    - CtextMenu
    - Copy
    - Cut
    - DataAvailable
    - DatasetChanged
    - DatasetComplete
    - Drag
    - DragDrop
    - DragEnd
    - DragEnter
    - DragLeave
    - DragOver
    - DragStart
    - Drop
    - Error
    - ErrorUpdate
    - FilterChange
    - Finish
    - Help
    - LoseCapture
    - Move
    - Paste
    - PropertyChange
    - ReadyStateChange
    - Resize
    - RowEnter
    - RowExit
    - RowsDelete
    - RowsInserted
    - Scroll
    - SelectStart
    - Start
    - Stop
- 标签
    - &lt;var&gt;               # 标识常量    - &lt;samp&gt;              # 标识输出内容的样式    - &lt;pre&gt;               # 代码块    - &lt;code&gt;              # 一段代码- 属性
    - 全局属性
        - 配置所有元素共有行为
        - accesskey
            - 快捷键
                - 需要按alt + 指定的键
        - class
        - contenteditable
            - 内容是否可修改, 如p标签
        - contextmenu
            - 定义右键菜单，未实现
        - dir
            - 文字对齐方式
        - draggable
        - dropzone
        - hidden
        - id
        - lang
        - spellcheck
        - style
        - tabindex
            - tab键切换元素的顺序
        - title
- 浏览器特性            
    - 视频播放 
        - 支持vaapi, chrome 加上--enable-vaapi参数可以开启硬件加速解码
- 方案
    - 标签
        - &lt;input&gt;表单            - 单选框
                - ```html
                  <input type="radio" name="name" checked value="1">
                  <input type="radio" name="name" value="1">
                  ```
            - 下拉框
                - ```html
                  <select id="mySelect" size=10 multiple>    # 长度等于10 ，多选
                      <option selected="selected">Apple</option>
                      <option>Orange</option>
                  </select>
                  ```
            - 勾选框
                - ```html
                  <input type="checkbox" name="" />
                  ```
            - 按钮
                - ```html
                  <input type="button"/>
                  <button>                # <button><img src="">搜索</button>
                  ```
        - &lt;table&gt;表格            - ```html
              <caption> # 标题
                  <thead>
                      <th>
                          <td><td>
                      </th>
                  <tbody>
                      <tr>
                          <td><td>
                      </tr>
                  <tfoot>
                      属性
                          <tr style="display: none;">                # 设置属性为隐藏
              ```
        - &lt;form&gt;表单            - enctype属性
                - application/x-www-form-urlencoded(默认)                # 在发送编码所有字符（空格转换为 "+" 加号，特殊符号转换为 ASCII HEX 值）
                - multipart/form-data                                                        # 不对字符进行编码，在上传文件时使用
                - text/plain                                                                        # 空格转换为+，但是不对特殊字符进行编码
        - &lt;hr&gt;分割线        - 字体
            - ```html
              <h1></h1>  ...  <h6><h6>标题标签对
              
              <b>粗体</b><i>斜体</i><u>下划线</u><tt>打字机风格</tt><cite>引用</cite><em>强调（斜体粗体）</em><strong>重要（黑体加粗体）</strong>
              
              <sub>下标</sub><sup>上标</sup>
              
              <font size =-7到+7  coler = 颜色></font>
              ```
        - &lt;img src=""/&gt;图片            - 属性
                - alt                # 规定图像的替代文本
                - border
                - width
                - height
        - &lt;span&gt;与 &lt;div&gt;            - &lt;span&gt; 在CSS定义中属于一个行内元素,在行内定义一个区域，也就是一行内可以被 &lt;span&gt; 划分成好几个区域，从而实现某种特定效果。 &lt;span&gt; 本身没有任何属性。            - &lt;div&gt; 在CSS定义中属于一个块级元素 &lt;div&gt; 可以包含段落、标题、表格甚至其它部分。这使DIV便于建立不同集成的类，如章节、摘要或备注。在页面效果上，使用 &lt;div&gt; 会自动换行，使用 &lt;span&gt; 就会保持同行。            - &lt;span&gt;没有内边距        - &lt;label&gt;标签            - 标记通常以下面两种方式中的一种来和表单控件相联系：将表单控件作为标记标签的内容，这样的就是隐式形式，或者为 <label> 标签下的 for 属性命名一个目标表单 id，这样就是显式形式。
            - 例如，在 XHTML 中：
                - 显式的联系
                    - ```html
                      <label for="SSN">Social Security Number:</label>
                      <input type="text" name="SocSecNum" id="SSn" />
                      ```
                - 隐式的联系
                    - ```html
                      <label>Date of Birth: <input type="text" name="DofB" /></label>
                      ```
        - &lt;head&gt;标签            - ```html
              <base> 标签为页面上的所有链接规定默认地址或默认目标。
              <meta http-equiv="pragma" content="no-cache">        定义响应信息头
              <meta name="keywrods" content="keyword1,keyword2">        关键字
              ＜meta name="description" content="This page is about the meaning of science, education,culture."＞        网站主要内容
              ＜meta name="robots" content="none"＞        机器人索引 content的参数有all,none,index,noindex,follow,nofollow。默认是all。 
              ＜meta name="author" content="outrun"＞                作者
              ```
        - &lt;marquee behavior = "alternate"&gt;  文字行为                # alternate为来回滚动            - ```html
              <font size = 30 color = "red">www.it315.org</font></marquee>
              <marquee behavior = "slide" "scroll" "alternate" direction="up""down""left""right">你好</marquee>
              ```
        - &lt;nobr&gt; 标签之间的文字在浏览器中不换行显示            - &lt;NOBR&gt;这里是一行不该换行的文本 . . .            - 这是文本行的结尾。</NOBR>
        - &lt;pre&gt;&lt;/pre&gt;        标签之间的文字在浏览器中换行显示        - &lt;blockquote&gt;&lt;/blockquote&gt;缩进        - 条目标签
            - ```html
              <dl>
                  <dt>
                      <dd>
                      </dd>
                  </dt>
              </dl>显示条目
              
              <ol>
                  <li>
                  </li>
              </ol>数字标签列表
              
              <ul>
                  <li>
                  </li>
              </ul>圆点标签列表
              ```
        - &lt;a&gt;标签            - 发送邮件
            - &lt;a href = "mailto:admin@it315.org?subject=咨询"&gt;我要留言&lt;/a&gt;                - 如：mailto:zxx@it315.org?cc=dreamdu@sina.com&subject=Feedback&body=how%20are%20you  # subject body cc 等用url参数拼接的方式拼接
                    - %20代表空格 
                    - subject= 是标题
                    - body= 是邮件内容
                    - CC=是抄送  
                    - BCC=是暗送
            - 新窗口
                - &lt;a target="_blank" href=""&gt;&lt;img src=""/&gt;&lt;/a&gt;打开新窗口            - 属性
                - ```html
                  <a name ="mark1"/>
                  <a href="text.html#mark1"></a>定位
                  <a href="#"></a>打开自己
                  <a href=""></a>打开目录
                  ```
        - &lt;map&gt;&lt;/map&gt;定义热点映射4            - ```html
              <area></area>来说明 属性shape形状，coords坐标，href或nohref，target赖志明浏览器的哪个窗口或帧中显示
              <img>标签中增加名为usemap的属性来指定图像被用做图像地图，其设置值为图像热点名称 如<img src="" usemap="#mymap">
              <img src="logo.gir" border=0 usemap="#mymap">
              <map name=mymap>
              <area shape="rect" coords="0,0,50,50" href="">  左上和右下坐标 shape的属性值 rect poly circle
              </map>
              ```
        - &lt;embed&gt;&lt;/embed&gt;标签 添加swf类型flash元素            - scale="noscale"                # 没有比例缩放
            - wmode="transparent"                # 背景透明
    - 样式
        - 小图标
            - ```html
              <link rel="Shortcut Icon" href="../imgs/favicon48.ico">  # 网页小图标
              <link rel="Bookmark" href="../imgs/favicon48.ico">
              ```
    - 行为
        - url标准
            - 基准url + 相对 url = 完整url
                - http://www.it315.org/index.html#section2%E5%AE%9A%E4%BD%8D%E5%88%B0section2
            - url中空格必须转换为+
            - url中用字符的当前字符集编码在内存中的十六进制格式表示，并在每个字节前加上%
            - 如果确信特殊字符不会引起冲突，也可以直接传递给服务器，如汉字。也可以一部分编码，一部分不编码，如中&国 就是 中%26国
        - 文件下载
            - 超链接post提交
                - ```html
                  <form action="${pageContext.request.contextPath }/downloadFile"        method="post" enctype="application/x-www-form-urlencoded">
                      <input type="hidden" name="uuidFileName" value="" />
                      <a href="#" onclick="download('${fileName}')"></a>
                  </form>                
                  <script type="text/javascript">
                      function download(fileName) {
                          $(":hidden").val(fileName);
                          document.forms[0].submit();
                      }
                  </script>
                  ```
        - 根目录
            - ```html
              <head>
              <base href="http://www.w3school.com.cn/i/" target="_blank" />                # href必选, target可选
                                                                                              ## js中的相对目录也起作用
              </head>
              ```
        - frameset
            - frameset的例子
                - ```html
                  <frameset rows="70,*" cols="*" frameborder="no" border="0" framespacing="0">
                  <frame src="head.html" name="topFrame" scrolling="No" noresize="noresize" id="topFrame" />
                  <frameset cols="193,*" frameborder="no" border="0" framespacing="0">
                      <frame src="left.html" scrolling="No" noresize="noresize" id="leftFrame" />
                      <frame src="main.html" name="mainFrame" id="mainFrame" />
                  </frameset>
                  </frameset>
                  ```
                - 在head.html 中的标签中添加链接
                    - &lt;a href="/a.html" target="mainFrame"&gt;Frame main.html&lt;/a&gt;                    - 就可以使name 为 mainFrame的<frame>窗体刷新
                - 在src属性后面添加#name，可以跳转到指定名子的框架
                    - &lt;frame src="/example/html/link.htmlC10"&gt;跳转到link.html页面的：&lt;a name="C10"&gt;&lt;h2&gt;Chapter 10&lt;/h2&gt;&lt;/a&gt;位置                    - 也可以在a标签中设置跳转<a href="/example/html/link.htmlC10" target="showframe">带有锚的链接</a>
            - 内联框架：iframe 的例子
                - ```html
                  <script type="text/javascript">
                      function changeUrl(vPageName){
                      var vIfr=document.getElementById("ifrObj");
                          vIfr.src=vPageName+".asp";
                      }
                  </script>
                  <iframe id="ifrObj"></iframe>
                  <a href="javascript:changeUrl('2')">a</a>
                  <a href="javascript:changeUrl('3')">b</a>
                  ```
- SVG
    - 介绍
        - scalable vector graphics, 可缩放矢量图形
        - 使用xml格式定义图像
        - 由w3c定制
    - 例子
        - ```html
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <rect width="300" height="100" style="fill:rgb(0, 0, 255); stroke-width:1; stroke:rgb(0, 0, 0)"></rect>
                  # 矩形
          </svg>
          ```
    - 滤镜
