- 在JSP中的动作行为包括：Include、 Forward、 UseBean、 GetProperty、 SetProperty、 Plugin。
- 一、Include行为
    - &lt;jsp:include&gt;标签表示动态包含一个静态的或者动态的文件。    - 语法：
        - &lt;jsp:include page="path" flush="true" /&gt;        - or
        - &lt;jsp:include page="path" flush="true"&gt;        - &lt;jsp:param name="paramName" value="paramValue" /&gt;        - &lt;/jsp:include&gt;    - 注：
        - 1、page="path" 为相对路径，或者代表相对路径的表达式。
        - 2、flush="true" 必须使用flush为true，它默认值是false。
        - 3、<jsp:param>子句能让你传递一个或多个参数给动态文件，也可在一个页面中使用多个<jsp:param>来传递多个参数给动态文件。
        - 4、<jsp:include page="" flush=""> 与<%@ include file=""%>的区别：
            - &lt;jsp:include &gt;是动态包含&lt;%@include%&gt;是静态包含。            - jsp页面是把include指令元素（<%@ include file=""%>）所指定的页面的实际内容（也就是代码段）加入到引入它的jsp页面中,合成一个文件后被jsp容器将它转化成servlet。
                - 可以看到这时会产生一个临时class文件和一个servlet源文件。
                - 而动作元素（<jsp:include page=""/>）是在请求处理阶段引入的，会被JSP容器生成两个临时class文件和两个servlet原文件。
                - 而引入的只是servlet的输出结果，即JspWriter对象的输出结果，而不是jsp的源代码。
- 二、Forward行为
    - &lt;jsp:forward&gt;标签表示重定向一个静态html/jsp的文件，或者是一个程序段。    - 语法
        - ```html
          <jsp:forward page="path"} />
          or
          <jsp:forward page="path"} >
          <jsp:param name="paramName" value="paramValue" />……
          </jsp:forward>
          ```
    - 注
        - 1、page="path" 为一个表达式，或者一个字符串。
        - 2、<jsp:param> name 指定参数名，value指定参数值。参数被发送到一个动态文件，参数可以是一个或多个值，而这个文件却必须是动态文件。要传递多个参数，则可以在一个JSP文件中使用多个<jsp:param>将多个参数发送到一个动态文件中。
- 三、UseBean行为
    - &lt;jsp:useBean&gt;标签表示用来在JSP页面中创建一个BEAN实例并指定它的名字以及作用范围。    - 语法
        - &lt;jsp:useBean id="name" scope="page | request | session | application" typeSpec /&gt;        - 其中typeSpec有以下几种可能的情况：
        - class="className" | class="className" type="typeName" | beanName="beanName" type="typeName" | type="typeName" |
    - 注
        - 你必须使用class或type，而不能同时使用class和beanName。beanName表示Bean的名字，其形式为“a.b.c”。
- 四、GetProperty行为
    - &lt;jsp:getProperty&gt;标签表示获取BEAN的属性的值并将之转化为一个字符串，然后将其插入到输出的页面中。    - 语法
        - &lt;jsp:getProperty name="name" property="propertyName" /&gt;    - 注：
        - 1、在使用<jsp:getProperty>之前，必须用<jsp:useBean>来创建它。
        - 2、不能使用<jsp:getProperty>来检索一个已经被索引了的属性。
        - 3、能够和JavaBeans组件一起使用<jsp:getProperty>，但是不能与Enterprise Java Bean一起使用。
- 五、SetProperty行为
    - &lt;jsp:setProperty&gt;标签表示用来设置Bean中的属性值。    - 语法
        - &lt;jsp:setProperty name="beanName" prop_expr /&gt;        - 其中prop_expr有以下几种可能的情形
            - property="*" | property="propertyName" | property="propertyName" param="parameterName" | property="propertyName" value="propertyValue"
    - 注
        - 使用 jsp:setProperty 来为一个Bean的属性赋值；可以使用两种方式来实现。
        - 1、在jsp:useBean后使用jsp:setProperty
            - ```html
              <jsp:useBean id="myUser" … />
              …
              <jsp:setProperty name="user" property="user" … />
              ```
            - 在这种方式中，jsp:setProperty将被执行。
        - 2、jsp:setProperty出现在jsp:useBean标签内
            - ```html
              <jsp:useBean id="myUser" … >
              …
              <jsp:setProperty name="user" property="user" … />
              </jsp:useBean>
              ```
            - 在这种方式中，jsp:setProperty只会在新的对象被实例化时才将被执行。
            - 在<jsp:setProperty>中的name值应当和<jsp:useBean>中的id值相同。
- 六、Plugin行为
    - &lt;jsp:plugin&gt;标签表示执行一个applet或Bean，有可能的话还要下载一个Java插件用于执行它。    - 语法
        - ```html
          <jsp:plugin
              type="bean | applet"
              code="classFileName"
              codebase="classFileDirectoryName"
              [ name="instanceName" ]
              [ archive="URIToArchive, ..." ]
              [ align="bottom | top | middle | left | right" ]
              [ height="displayPixels" ]
              [ width="displayPixels" ]
              [ hspace="leftRightPixels" ]
              [ vspace="topBottomPixels" ]
              [ jreversion="JREVersionNumber | 1.1" ]
              [ nspluginurl="URLToPlugin" ]
              [ iepluginurl="URLToPlugin" ] >
              [ <jsp:params>
              [ <jsp:param name="parameterName" value="{parameterValue | <％= expression ％>}" /> ]+
              </jsp:params> ]
              [ <jsp:fallback> text message for user </jsp:fallback> ]
              </jsp:plugin>
          ```
    - 注：
        - &lt;jsp:plugin&gt;元素用于在浏览器中播放或显示一个对象（典型的就是applet和Bean),而这种显示需要在浏览器的java插件。        - 当Jsp文件被编译，送往浏览器时，<jsp:plugin>元素将会根据浏览器的版本替换成<object>或者<embed>元素。注意，<object>用于HTML 4.0 ，<embed>用于HTML 3.2。
        - 一般来说，<jsp:plugin>元素会指定对象是Applet还是Bean,同样也会指定class的名字，还有位置，另外还会指定将从哪里下载这个Java插件。
