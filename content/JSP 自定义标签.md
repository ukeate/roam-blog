- 1、JspTag 接口（标记接口，类以Serializable）
- 2、Tag 接口（空标签，如<img/>）
    - 属性
        - static int EVAL_BODY_INCLUDE        通过流执行标签体
        - static int EVAL_PAGE              继续执行页面
        - static int SKIP_BODY            忽略执行标签体
        - static int SKIP_PAGE            忽略后面的JSP页面
    - 方法
        - 生命周期方法
            - int doEndTag()            当遇到标签结束的时候自动执行
            - int doStartTag()            当遇到标签开始的时候自动执行
        - 实现方法
            - Tag getParent()            获取当前标签的父标签处理类对象
            - void release()            当事件改变的时候自动执行
            - void setPageContext(PageContext pc)    设置当前的JSP上下文环境
            - void setParent(Tag t)        设置当前标签的父标签对象
- 3、TagSupport 类（有属性的标签，如<img src=""/>）
    - 实现了Tag接口并且提供处理标签属性的方法(set和get)。而且内部定义了一个PageContext变量并且已经初始化开发者可以直接使用this或者super直接方法该属性。
- 4、BodyTagSupport类（有属性有文本内容和标签，如<img src="">aaa</img>）
    - 新属性
        - protected  BodyContent bodyContent
    - 新方法
        - void setBodyContent(BodyContent b)
        - BodyContent getBodyContent()
        - BodyContent类
            - abstract String getString()    //获取标签体
    - 写Tag接口的标签库
        - 1、写Tag接口实现类
            - 写属性pageContext（getter 和setter），从setPageContext(PageContext pc)方法中获得该属性
            - 复写方法
        - 2、写tld文件，放到/META-INF文件夹中
            - ```html
              <?xml version="1.0" encoding="UTF-8"?>
              <taglib xmlns="http://java.sun.com/xml/ns/javaee"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-jsptaglibrary_2_1.xsd"
              version="2.1">
              
              <tlib-version>1.0</tlib-version>
              <short-name>ouru</short-name>    # 简称
              <uri>/outrun-tags</uri>    # 自定义引入标签时写的路径
              
              <tag>
              <name>testDate</name>
              <tag-class>outrun.util.jsp.taglib.test.DataImplTag</tag-class>
              <body-content>empty</body-content>
              </tag>
              
              </taglib>
              ```
        - 3、jsp 中引用它
            - &lt;%@ taglib prefix="ouru" uri="/META-INF/myUtil.tld" %&gt;    - 写TagSupport接口的实现类
        - pageContext已内置
        - 定义接收属性
        - tld文件中加入attribute属性
            - &lt;attribute&gt;        属性描述的开始            - &lt;name&gt;pattern&lt;/name&gt;    描述属性名            - &lt;required&gt;true&lt;/required&gt;    描述属性是否是必须的            - &lt;rtexprvalue&gt;true&lt;/rtexprvalue&gt;  描述属性值是否可以是输出表达式            - &lt;/attribute&gt;    - 写BodyTagSupport接口的实现类
        - BodyContent body = this.getBodyContent();
        - String desc = body.getString();
        - tld 文件中
            - &lt;body-content&gt;JSP&lt;/body-content&gt;    # 有标签体，可执行脚本表达式                - scriptless，有标签体，不执委脚本表达式
                - empty,没有标签体
- JSP2.0
    - JspTag — SimpleTag — SimpleTagSupport
    - SimpleTagSupport类
        - 该类可以直接进行操作标签的属性和标签体。
        - void doTag()                遇到标签的时候自动指定
        - protected  JspFragment getJspBody()          获取标签体对象
        - protected  JspContext getJspContext()      获取JSP上下文环境对象
        - JspTag getParent()            获取该标签的父标签处理类对象
            - JspFragment类
            - 该类代表的标签的标签体。
            - abstract  void invoke(Writer out)    输出数据到指定的流，null输出到JSP页面
        - 获得标签体的方法：
            - ```java
              Writer writer = new StringWriter();
              JspFragment jspFragment = getJspBody();
              jspFragment.invoke(writer);
              String text = writer.toString();
              ```
    - 例子：实现 if else 判断
        - ```java
          Choose.java
              private boolean tag = true;
          
              public boolean isTag() {
                  return tag;
              }
          
              public void setTag(boolean tag) {
                  this.tag = tag;
              }
          
              @Override
              public void doTag() throws JspException, IOException {
                  getJspBody().invoke(null);
                  super.doTag();
              }
          when.java 文件
              private boolean test = false;
              public boolean isTest() {
                  return test;
              }
          
              public void setTest(boolean test) {
                  this.test = test;
              }
              @Override
              public void doTag() throws JspException, IOException {
                  Choose parent = (Choose) getParent();
                  if(isTest() && parent.isTag()){
                  // 条件成立
                  getJspBody().invoke(null);
                  // 设置父的tag为false
                  parent.setTag(false);
                  }
                  super.doTag();
              }
          Otherwise.java 文件
              @Override
              public void doTag() throws JspException, IOException {
                  Choose parent = (Choose) getParent();
                  if(parent.isTag()){
                  // 条件成立
                  getJspBody().invoke(null);
                  parent.setTag(false);
                  }
                  super.doTag();
              }
          ```
    - tld文件
        - ```html
          <tag>
          <name>choose</name>
          <tag-class>outrun.util.jsp.taglib.ifelse.Choose</tag-class>
          <body-content>scriptless</body-content>    
            # 有标签体，可执行脚本表达式
            ## scriptless，有标签体，不执委脚本表达式
            ## empty,没有标签体
          
          </tag>
          
          <tag>
          <name>when</name>
          <tag-class>outrun.util.jsp.taglib.ifelse.When</tag-class>
          <body-content>scriptless</body-content>
          <attribute>
          <name>test</name>
          <required>true</required>
          <rtexprvalue>true</rtexprvalue>
          </attribute>
          </tag>
          
          <tag>
          <name>otherwise</name>
          <tag-class>outrun.util.jsp.taglib.ifelse.Otherwise</tag-class>
          <body-content>scriptless</body-content>
          </tag>
          ```
- 控件标签
    - 自定义函数库
        - 1 创建函数库类
            - ```java
              public class MyFunctions {
                public static String formatMyName(String name) {
                  return "your name is " + name;
                }
                public static int add(int a, int b) {
                  return a+b;
                }
              }
              ```
        - 2 在TLD文件中配置 (引用于目标1中的tld文件)
            - ```html
              <function>
              <name>formatMyName</name>
              <function-class>com.taglib.MyFunctions</function-class>
              <function-signature>java.lang.String formatMyName(java.lang.String)</function-signature>
              </function>
              
              <function>
              <name>add</name>
              <function-class>com.taglib.MyFunctions</function-class>
              <function-signature>java.lang.String add(int, int)</function-signature>
              </function>
              ```
        - 3 JSP中调用
            - ```java
              ${cc:formatMyName("wangfei") }
              ${cc:add(12, 34) }
              ```
