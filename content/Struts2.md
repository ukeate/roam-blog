- 基础
    - 介绍
        - struts1和WebWork的发展
        - 引入值栈的概念     # 一次请求的参数和处理数据放在一个map结构中
    - 原理
        - 基于拦截器, 解耦servlet, 再提供自己的拦截器(interceptor)操作数据, 反射调用业务类
        - FilterDispatcher通过配置文件来映射设置请求地址与处理类
            - ActionMapper判断请求是否struts处理
            - ActionProxy扩展实现方式(如web service)
            - ConfigurationManager对应struts.xml配置文件
            - ActionInvocation执行Action与拦截器
            - Action处理请求，封装数据
                - Action是非单例的，效率低
    - 过滤器与拦截器
        - 过滤器基于回调，拦截器基于反射
        - 过滤器依赖servlet, 拦截器在struts中处理action
- 思想
    - Action类中的无侵入设计（新技术中不出现旧技术）：map代替了作用域
        - ActionContext actionContext = actionContext.getContext()
        - actionContext.getApplication()
        - actionContext.getSession()
        - 好处
            - map是java中的api，不出现旧技术
            - 测试方便（ servlet不能测试，只能发布测试）
                - 注意：Action类中用到作用域map的方法也不能测试
- 结构
    - apps: 例子程序
    - docs:帮助文件
    - lib:程序包
    - src:源码
- 使用
    - 要求
        - jdk5
        - jsp2
        - servlet api2.4
    - 导入核心的8个包
        - struts2-core-2.3.1.1.jar        # struts的过滤器
        - xwork-core-2.3.1.1.jar                # 验证工具
        - freemarker-2.3.18.jar                # 标签
        - javassist-3.11.0.GA.jar                # 动态代理
        - commons-fileupload-1.2.2.jar
        - commons-io-2.0.1.jar                # 文件处理
        - commons-lang-2.5.jar                # 基础包
        - ognl-3.0.3.jar                                # 表达式语言
    - web.xml文件中配置过滤器
        - &lt;filter&gt;            - &lt;filter-name&gt;struts&lt;/filter-name&gt;            - &lt;filter-class&gt;org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter&lt;/filter-class&gt;        - &lt;/filter&gt;        - &lt;filter-mapping&gt;            - &lt;filter-name&gt;struts&lt;/filter-name&gt;            - &lt;url-pattern&gt;/*&lt;/url-pattern&gt;        - &lt;/filter-mapping&gt;    - 写jsp页面，get或post路径为struts2的名称空间、扩展名，被配置的struts2过滤器处理
    - 写Action类（继承ActionSupport类）
    - 配置src/struts.xml文件与src/struts.properties文件，映射类、方法等到请求路径，映射返回字符串到任何方式
- 核心包：8个
    - struts2-core-2.3.1.1.jar        # struts的过滤器
    - xwork-core-2.3.1.1.jar                # 验证工具
    - freemarker-2.3.18.jar                # 标签
    - javassist-3.11.0.GA.jar                # 动态代理
    - commons-fileupload-1.2.2.jar
    - commons-io-2.0.1.jar                # 文件处理
    - commons-lang-2.5.jar                # 基础包
    - ognl-3.0.3.jar                                # 表达式语言
- 配置
    - struts2以包的形式管理action 包名必须唯一，包里的每个action唯一
    - 使用步骤
        - 导入lib包
        - 写jsp
        - 编写Action方法
        - web.xml中配置
            - &lt;filter-class&gt;org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter            - &lt;url-pattern&gt;/*        - ../xx_struts.xml中配置请求响应
        - src/struts.xml 中引入配置文件
            - &lt;include file="cn/itcast/javaee/cal/cal_struts.xml"/&gt;    - 配置文件（配置包）路径
        - 重要路径：4个
            - 1./struts-default.xml[框架]
                - 是框架自带的abstract包（包括上传，下载，验证等），继承它以后可以用其中的功能
            - 2./org/apache/struts2/default.properties[框架]
            - 3.src/struts.xml # 必有
            - 4.src/struts.properties # 可选
        - 验证返回消息的配置文件
            - struts2-core-2.3.1.1.jar包中的
                - /org/apache/struts2/struts-messages.properties文件
    - xml 中配置的简化
        - 
            - o-> 只能在name 中写*_* 等
            - o-> 引用第一个* 用{1}        引用第二个用{2} 以此类推
    - 类路径
        - com.opensymphony.xwork2.ActionSupport  默认关联到的类
    - 处理请求的扩展名配置
        - 扩展名配置只有一个会生效
        - 1./org/apache/struts2/default.properties
            - struts.action.extension=action,,
            - 框架中初始的默认扩展名，最后的','代表了无扩展名
        - 2.src/struts.xml中
            - &lt;constant name="struts.action.extension" value="do,,"&gt;                - 必需配置
        - 3.src/struts.properties中
            - struts.action.extension=xx,yy
            - 选择配置，优先级高
    - 默认配置
        - struts2内置了请求字符串与基本类型的相互转换，不用手工转换
        - /org/apache/struts2/default.properties文件中
            - struts.i18n.encoding=UTF-8        # post方式请求响应的编码方式
                - get方式的没有默认值，需要自己转码
            - struts.action.extension=action,,  # 框架中初始的默认扩展名,最后的','代表了无扩展名
        - 每个<package>标签中配置
        - &lt;interceptor-ref name="defaultStack"&gt;&lt;/interceptor-ref&gt; 为默认的拦截器    - src/struts.xml配置文件
    - src/struts.properties配置文件
- 原理流程
    - ```yaml
      请求/qq.action -> StrutsPreparedAndExecuteFilter（核心过滤器）-> 匹配扩展名 -> 匹配命名空间
        #（ 全限定名：org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter.class）
            -> src/struts.xml                -> name
                class
                method
            -> name
                type
                内容
            -> 响应
            -> 拦截器 -> ConfigAction类
      
        # 1.部署时读取src/struts.xml和src/struts.properties文件，形成JavaBean对象
                # 两个文件同时存在时src/struts.properties文件为准
        ## 2.请求/*路径时，StrutsPreparedAndExecuteFilter过滤
        ## 3.获取JavaBean中的actionName ,actionClass, actionMethod, 执行方法
        ## 4.执行的返回值与resultName, resultType, resultContent进行比较
        ## 5.按resultType类型返回resultContent（路径和内容）
      ```
- 缺点
    - 8个jar包，慢，servlet 快
    - 配置繁琐
- 编码
    - struts2默认编码方式:utf-8
    - 返回的图片相对路径中有中文时设置tomcat
        - tomcat/conf/server.xml
            - &lt;Connector port="8080" .. URIEncoding="utf-8"/&gt;        - 这时点击下载的请求路径中有中文时在以post方式提交 ,struts自动转码。若以get方式提交，需要在Action类的相应的get方法中转换url编码（iso8859-1）到u8
        - 原理
            - 改了tomcat的内部编码以后，struts中的编码是u8，放在session 中，jsp支持u8,解释后发送的html中的编码没问题，查看没问题。
            - 下载post发送请求，浏览器请求的是url编码的u8,struts中也是u8执行下载
            - 如果不改编码，struts 中是u8,如果以List方式放入session的话,session存储的是u8
            - 如果直接放入数据的话,session中存储的是8859-1,jsp取出数据需要转码为u8并设置自己的编码是u8,再发送给浏览器。
            - 浏览器这时获取图片正常,post方式提交的是u8,经过tomcat转换为8859-1,struts中自动转换编码到u8
            - 如果是以get方式提交请求，get中的中文在浏览器时进行url编码到8859-1,经过tomcat，再到struts,struts不对get方式的请自动进行转码
            - 向action类中注入参数时是8859-1编码,需要手动在action类中的属性的get方法中进行8859-1到u8的转码操作
- 内置对象
    - struts中的6个内置对象
        - request请求进入struts中时创建，request请求结束时销毁。
        - requestMap
        - sessionMap
        - applicationMap
        - parameters
        - attr                        # page -> request -> session -> application 的顺序查找
        - valueStack                # 定义实例变量，直接放入valueStack的 list（栈） 中,map（值）很少向内存储数据
            - 定义的实例变量必须提供相应的get方法,否则ognl标签中取其数据时没有方法调用，就得不到它的值
            - list 中的值优先访问 ，但是map 中的值起决定作用
            - map中存放着一个大map,其中注入了所有页面的请求信息
                - requestMap sessionMap applicationMap 并不是真正的域对象，但最后通过拦截器放入到域对象中
- 异常处理
    - 配置src/strut.xml 文件
        - &lt;global-results&gt; 全局结果（用来跳转全局异常等）        - &lt;global-exception-mappings&gt; 全局异常        - &lt;exception-mapping result="nullJsp"        exception="java.lang.NullPointerException" /&gt;            - &lt;action&gt;标签中的局部异常            - &lt;action&gt;捕获标签中的实例运行抛出的异常,然后改为 返回执行结果为"nullJsp"的字符串交给本&lt;action&gt;标签中相应的&lt;result&gt;标签来处理    - 处理机制
        - o-> 多个异常时走子异常，父异常被忽略
        - o-> 先处理小范围异常，大范围忽略
        - o->  如果异常没有处理，抛出到web服务器处理,web.xml的<error-page><error-code><location>
    - 全局异常
        - xml文件中
            - &lt;global-results&gt;                - &lt;result name="error"&gt;                    - /error.jsp
                - &lt;/result&gt;            - &lt;/global-results&gt;            - &lt;global-exception-mappings&gt;                - &lt;exception-mapping result="error" exception="java.lang.Exception"/&gt;            - &lt;/global-exception-mappings&gt;        - error.jsp页面中
            - &lt;%@ taglib prefix="s" uri="/struts-tags" %&gt;            - 异常信息：<s:property value="exception.message"/><br/>
            - 详细信息：<s:property value="exceptionStack"/><br/>
- 转递方式
    - chain                        # action类之间转发
    - dispatcher                # 转发到jsp
    - freemarker
    - httpheader
    - redirect                # 重定向到页面
    - redirectAction        # action 类之间重定向
    - stream                        # 返回 InputStream流
    - velocity
    - xslt
    - plainText
- Action类
    - 注意
        - 1.所有Action类都要继承ActionSupport类，否则execute方法返回的字符串不会回到struts拦截器再根据xml文件的配置进行转发
        - 2.action类是非单例的。        # 所有多实例的对象全部是因为有私有属性，否则全部应该是单例的
        - 3.action类放在栈的顶端，用于注入数据
    - 传统方式得到request,response,servletContext,pageContext
        - ServletActionContext.getPageContext()
        - HttpServletRequest request = ServletActionContext.getRequest()
        - ServletActionContext.getResponse()
        - ServletActionContext.getServletContext();
    - 优势
        - 实现与servlet的解耦
    - 验证
        - 验证分类
            - 前台验证：javascript等
            - 后台验证：服务器
        - struts2验证
            - 后台验证
            - 1.代码式验证
            - 2.声明式验证:xml文件
    - ActionContext类
        - 调用方法
        - ActionContext actionContext = ActionContext.getContext();
        - 得到内置对象        # 这几种得到作用域的方法均可以得到作用域中原有的值，也可以放入值
        - request
            - actionContext.put("","");
        - application
            - Map<String,Object> applicationMap = actionContext.getApplication();
        - session
            - Map<String,Object> sessionMap = actionContext.getSession();
                - 或 actionContext.get("session")得到，因为actionContext中存储着大map
        - parameters
            - Map<String,Object> parametersMap = actionContext.getParameters();
        - valueStack
            - ValueStack valueStack = actionContext.getValueStack()
            - valueStack.getRoot()                        # 得到当前值栈的顺序
    - 参数
        - 1.action类中可以直接创建属性与其get方法得到客户端get方法或post表单请求的参数(由struts2自动注入)
        - 2.action类中可以创建 JavaBean的属性来接收struts注入的参数，这时用户请求的参数名字要写成JavaBean名.JavaBean中的属性名（这样struts2会自动调用JavaBean的set方法来注入其中相应的参数 ）
    - BaseAction
        - 作用
            - 权限管理
            - 存放常驻内存数据
            - 抽取常用的方法
- web.xml配置
    - &lt;filter&gt;        - &lt;filter-name&gt;struts2&lt;/filter-name&gt;        - &lt;filter-class&gt; org.apache.struts2.dispatcher.FilterDispatcher &lt;/filter-class&gt;        - &lt;init-param&gt;            - &lt;param-name&gt;struts.action.extension&lt;/param-name&gt;            - &lt;param-value&gt;do&lt;/param-value&gt;        - &lt;/init-param&gt;    - &lt;/filter&gt;    - &lt;filter-mapping&gt;        - &lt;filter-name&gt;struts2&lt;/filter-name&gt;        - &lt;url-pattern&gt;*.json&lt;/url-pattern&gt;    - &lt;/filter-mapping&gt;        - 设置全局过滤器，并且修改过滤扩展名
- default.properties
    - src/struts.properties配置文件
        - struts.custom.i18n.resources=struts    # 使自己的普通配置生效。如：/org/apache/struts2/struts-messages.properties文件的
            - struts.messages.error.content.type.not.allowed=Content-Type not allowed: {0} "{1}" "{2}" {3}  属性，"{1}" "{2}" "{3}"是显示消息的占位符
            - struts.action.extension=action,,可以不配置
            - 由于只加载properties文件，所以省略.properties
            - =后面的是相对于src目录的文件
- [[OGNL]]
- strut.xml配置
    - ```yaml
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE struts PUBLIC
              "-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"
              "http://struts.apache.org/dtds/struts-2.0.dtd">
      
      <struts>
          <constant name="" value=""></constant>
          <include file=""></include>
          <package name="">
                  <interceptors>
                          <interceptor name="" class=""></interceptor>
                          <interceptor-stack name="">
                                  <interceptor-ref name=""></interceptor-ref>
                          </interceptor-stack>
                  </interceptors>
                  <default-interceptor-ref name=""></default-interceptor-ref>
                  <global-results>
                          <result name=""></result>
                  </global-results>
                  <global-exception-mappings>
                          <exception-mapping result="" exception=""/>
                  </global-exception-mappings>
                  <action name="">
                          <param name=""></param>
                          <result></result>
                          <result name="input"></result>
                          <exception-mapping result="" exception=""/>
                          <interceptor-ref name=""></interceptor-ref>
                  </action>
          </package>
      </struts>
      
      设置
          <constant name="struts.devMode" value="true"/>                # 开启debug模式
                                                                  # debug模式，不用重启调试(添加新的方法要重启，方法中改代码不用重启)
          <constant name="struts.i18n.encoding" value="utf-8"/>
                                                                  # 配置struts的编码
          <constant name="struts.configuration.xml.reload" value="true"/>
                                                                  # 配置本属性，可以使得改动struts配置文件不用重启应用服务器
          <constant name="struts.multipart.saveDir" value="/upload"/>
                                                                  # 配置上传存储路径
          <constant name="struts.action.extension" value="action,do" />
                                                                      # 配置过滤路径
      详细解释
          o-> 存放路径src/
          o-> 可以在struts-2.3.15.1的src\apps\blank\src\main\resources\struts.xml中参考配置文件
          o-> <include file="struts2/cal/cal_struts.xml"/>标签包含其它路径的xml配置文件
                          #　被include的文件不能再include其它文件
          o-> <constant name="struts.action.extension" value="do,,">
                  默认值
                          default.properties中配置了默扩展名：struts.action.extension=action,,
                  # 配置匹配到框架处理的扩展名，空逗号代表匹配没有扩展名
          o-> <package name="xxPackage" extends="struts-default" namespace="/xx/">
                  默认值
                          namespace="/"
                          extends="struts-default"        # 不可省略
                  # name是包的唯一标识，不可以写路径
                  ## namespace 访问路径如/xx/a.do会匹配到该包执行其中的映射，按照域命名空间链的方式匹配，如：
                                                          /xx/yy/a.do也会匹配到该包，但是它优先匹配到/xx/yy的命名空间
                                                          /a.do 不会匹配到该包
                          注意：匹配/sys/*的名称空间是/sys 而非 /sys/
                  ## struts的包有抽象包，普通包两种，通过继承可以加入包内容，相当于复制、粘贴
                  ## 继承的包是struts-default，其路径是/struts-default.xml
                  ## ，它定义了核心的bean和拦截器
          o-> <interceptors>
                          <interceptor name="" class=""/>
                          <interceptor-stack name="">
                                  <interceptor-ref name="/">
                                  # 定义拦截器、定义拦截器栈（加入拦截器）
                                  ## 拦截器栈中可以加栈
          o-> <default-interceptor-ref name=""> 默认拦截器（可以用于验证用户登录）
          o-> <global-results> 全局结果（用来跳转全局异常等）
          o-> <global-exception-mappings> 全局异常
          o-> <action name="" class="" method="">
                  默认值
                          class="com.opensymphony.xwork2.ActionSupport"
                          method="execute"
                  # name="aa"时 .../aa.do的请求匹配到该方法执行
                  ## class 是类字节码路径，method是其中的方法名
          o-> <param name="aaa">bbb</param>
                  调用 <action>标签中对象的实例的方法：setAaa("bbb");
          o-> <result name="" type="">/ok.jsp
                  默认值
                          name="success"
                          type="dispatcher"
                  # name="success"时，映射的method返回"success"时进入该result处理
                  ## type是返回方式 ，如dispatcher redirect等
                          type的返回类型
                                  dispatcher : 转发到jsp页面
                                  redirect : 重定向到 jsp html 等页面
                                  chain : Action 类之间的转发
                                  redirectAction : Action 类之间的重定向
                                  stream : 以 inputStream 的数据类型返回
                                          stream的参数                        # 可以从struts-default.xml文件中对应的stream参数对应的类的源码中查看其中的set方法找到要写参数的名称
                                                  <param name="contentType">image/pjpeg</param>                # 下载文件的类型                  另外如text/html; charset=utf-8返回给ajax异步数据
                                                  <param name="bufferSize">2048</param>                # 缓冲byte[]的大小，单位字节
                                                  <param name="contentDisposition">attachment;filename=${uuidFileName}</param>                # 设置下载响应头，只的下载时才设置。${uuidFileName}是一个OGNL表达式
                                                  <param name="inputName">imageStream</param>        # 框架调用传递给result标签结果字符串的对象中的getImageStream()方法，来获取InputStream流对象
                                                  # 返回stream类型不指定返回的路径
                  ## 标签间的内容：/ok.jsp 是响应的路径
          o-> <result name="input" type="">/ok.jsp
                  type中的参数                        # 可以从struts-default.xml配置文件中查到
                          dispatcher        # 转发
                          redirect        # 重定向
                          chain                # Action类之间转发，需要加参数，参数的名字
                                                  ## ：struts-default.xml文件中找到"chain"对应的类，按快捷键ctrl + shift + T 关联类的源码文件，查找set方法改名即可
                                  <param name="actionName">to</param>
                                          # action标签的 name属性值
                                  <param name="namespace">/</param>
                                          # action的名称空间
                          redirectAction                # Action类之间重定向
      
                  # 各种拦截器不通过时默认的返回input，同时向request作用域中加入了相关错误信息供struts2的jsp标签进行显示
                  ## 处理 返回值是input的返回信息跳转，就是处理拦截器拦截后的信息跳转
          o-> <exception-mapping result="nullJsp"        exception="java.lang.NullPointerException" />
                  # <action>标签中的局部异常
                  ## <action>捕获标签中的实例运行抛出的异常,然后改为 返回执行结果为"nullJsp"的字符串交给本<action>标签中相应的<result>标签来处理
          o-> <interceptor-ref name="loginInterceptor"/>
                  默认值
                          name="defaultStack"
                  # 指定在本<action>标签中使用的拦截器或拦截器栈
                  ## 当指定了拦截器或拦截器栈以后，默认的defaultStack将会没有,此时defaultStack中的18个拦截器将不再执行
      ```
    - 使用：OGNL对象图导航语言对标签中的路径进行动态设置
- 验证
    - struts2验证
        - 1.代码式: validate(),validateXxx()方法
            - 单个验证与全部验证都存在时先单个验证，再全部验证，验证信息都加入验证信息集合
        - 2.声明式: Action类名-validation.xml
            - Action类名-<action标签的name属性>-validation.xml
            - 单个验证与全部验证都存在时先全部验证，再单个验证，验证信息都加入验证信息集合
            - 先声明验证，后代码验证
    - 参数驱动
        - 1.属性驱动: action中用属性收集表单参数
        - 2.模型驱动: javaBean收集参数
    - 代码式（属性驱动）：
        - 步骤
        - 1.需要验证的Action类  继承 ActionSupport 类
            - ActionSupport 类 实现了Validateable接口，该接口是验证接口
        - 2.写验证方法
            - 1> public void validate()
                - 方法重写（通用验证方法，本类中的所有其它方法执行前都执行）
            - 2> public void validateXxxMethod()
                - 或者自定义专用验证方法 xxxMethod为要验证的方法名，首字母要大写
                - 注意，通用、专用验证方法同时存在时，先执行专用验证方法，再执行通用验证方法，但是通用验证方法的错误消息无法加入到返回的错误集合中
            - 3> this.addFieldError("password","密码必填");
                - 验证方法中添加错误信息到错误信息集合
                - addFieldError("","")是从ActionSupport父类中继承的方法
        - 3.jsp文件中通过验证标签：
            - &lt;%@ taglib uri="/struts-tags" prefix="s"%&gt;            - &lt;s:fielderror/&gt;                # 显示所有错误信息            - &lt;s:fielderror fieldName="password"/&gt;            - 显示验证出错信息
        - 4.xml配置
            - &lt;!-- 验证错误信息处理 --&gt;                - &lt;result name="input" type="dispatcher"&gt;                    - /error.jsp
                - &lt;/result&gt;                    - 写在需要验证的方法对应的标签中，验证错误时验证方法会优先返回"input"字符串
    - 声明式（属性驱动）：
        - 1.验证Action类继承ActionSupport
        - 2.验证Action类目录下配置文件
            - Action类名-validation.xml
            - Action类名-<action标签的name属性>-validation.xml
                - 放入此名字的配置文件就相当于加了验证，不需要做其它事情，相当于分别向Actioin类中加入了validate()validateXxx()方法进行了相应验证
                - 文件内容
                - &lt;?xml version="1.0" encoding="UTF-8"?&gt;                    - &lt;!DOCTYPE validators PUBLIC                    - "-//Apache Struts//XWork Validator 1.0.3//EN"
                    - "http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
                    - &lt;validators&gt;                        - &lt;field name="username"&gt;                # 要验证的属性                            - &lt;field-validator type="requiredstring"&gt;                                - &lt;message&gt;用户名必填&lt;/message&gt;                            - &lt;/field-validator&gt;                        - &lt;/field&gt;                        - &lt;field-validator type="regex"&gt;                            - &lt;param name="expression"&gt;^[\u3447-\uFA29]+$&lt;/param&gt;                            - &lt;message&gt;UserAction2-validation==&gt;必须写中文&lt;/message&gt;                        - &lt;/field-validator&gt;                    - &lt;/validators&gt;                        - xml文件的头在 xwork-core-2.3.1.1.jar包的
                            - xwork-validator-1.0.3.dtd中复制
                        - 关联约束在
                            - \struts-2.3.15.1\src\xwork-core\src\main\resources\xwork-validator-1.0.3.dtd文件
                        - &lt;field-validator type=""&gt;的约束类型在xwork-core-2.3.1.1.jar包的                            - /com/opensymphony/xwork2/validator/validators/default.xml文件中
                                - 16个规则
                                - type="regex"相当于调用了default.xml文件中配置的
                                    - RegexFieldValidator类的 setExpression方法
        - 3.jsp文件中通过验证标签（同上）
        - 4.xml配置（同上）
            - 出错信息
                - 1.验证文件名写错，无提示，不验证
                - 2.<field-validator type="">写错，有明显提示
                - 2.<field name="salaryy">写错，获取的salaryy为空。
    - 声明式（模型驱动）
        - 1.创建bean对象，bean对象中封装属性
        - 2.验证Action类继承ActionSupport类，声明bean对象实例
        - 3.action类同目录 中  ：Action类名-<action标签的name属性>-validation.xml
            - &lt;field-validator type="visitor"&gt;            - bean类同目录中：bean类名-validation.xml配置验证文件
        - 4.jsp文件请求参数改为：action类中bean对象名.bean对象封装的属性名。用<s:fielderror/>标签得到返回的错误信息
        - 5.xml配置（同上）
    - 原理
    - StrutsPreparedAndExecuteFilter
        - 1.注入参数
            - setUsername()
            - setPassword()
        - 2.验证方法：validate()或validateXxx()
            - 验证配置文件中验证：Action类名-validation.xml
        - 3.转发：根据验证成功或失败返回消息
            - 验证集合无错误消息成功Action --> execute或同签名的方法
            - 验证集合有错误消息失败<result name = "input" type="dispatcher"
                - register.jsp/login.jsp
- 过滤器
    - StrutsPrepareAndExecuteFilter
        - 中查看Dispathcer类，从中找到配置struts-default.xml,struts-plugin.xml,struts.xml值的属性DEFAULT_CONFIGURATION_PATHS
        - 查找引用该属性的方法为init_TraditionalXmlConfigurations
        - 查看引用该方法的方法为init
        - 回头看StrutsPrepareAndExecuteFilter中初始化dispatcher对象的方法initDispatcher
            - 其中调用了dispatcher.init();方法来配置dispatcher
        - 由此可以知道struts在启动时加载了struts-default.xml,struts-plugin.xml,struts.xml配置文件
- 拦截器
    - struts-core-2.3.1.1.jar包中的
        - struts-default.xml文件中
            - 定义了32个interceptor（拦截器）
                - i18n    # 国际化
            - token  # 表单重复提交
            - validation  # 验证
            - params  # 参数拦截器,向Action类中注入参数
            - cookie
        - interceptor-tack    # 拦截栈
            - 拦截栈中的拦截器的先后顺序有影响
            - basicStack
            - defaultStack    # 每个http请求都会经过该拦截栈
                - 其中的18个拦截器, <default-interceptor-ref>中定义
    - 原理
        - 拦截器仿照过滤器建立，内部实现原理是完全相同的
    - 执行流程
        - 拦截器构构造函数 -> action构造函数 -> 拦截器1 in -> 拦截器2 in -> demo -> 拦截器2 out -> 拦截器1 out
        - exception拦截器最先进，最后出
    - 自定义拦截器
        - 1.定义Action类，继承Interceptor接口，重写生命周期方法
            - public LoginInterceptor() {
            - }
            - public void destroy() {
            - }
            - public void init() {
            - }
            - public String intercept(ActionInvocation invocation)  {
            - }
        - 2.配置struts.xml文件
            - 1> 定义拦截器、拦截器栈
                - &lt;interceptors&gt;                    - &lt;interceptor name="loginInterceptor" class="interceptor.LoginInterceptor"/&gt;                    - &lt;interceptor name="roleInterceptor" class="interceptor.RoleInterceptor"/&gt;                    - &lt;interceptor-stack name="crmStack"&gt;                        - &lt;interceptor-ref name="loginInterceptor"&gt;&lt;/interceptor-ref&gt;                        - &lt;interceptor-ref name="roleInterceptor"&gt;&lt;/interceptor-ref&gt;                    - &lt;/interceptor-stack&gt;                - &lt;/interceptors&gt;            - 2> <action>标签中声明用到的拦截器或拦截器栈
                - &lt;interceptor-ref name="loginInterceptor" /&gt;                # 此时默认的defaultStack拦截器栈会被替代掉    - 自定义方法过滤拦截器
        - MethodFilterInterceptor继承AbstractInterceptor继承Interceptor，前两个是struts自己实现的自己的包装类
        - 原理：自己实现intercept方法，实现对方法名的过滤。如果符合通过条件，则执行自己的doIntercept方法。所以要求用户重写doIntercept方法实现业务逻辑
        - &lt;interceptor name="aloginInterceptor" class="cn.it.shop.interceptor.AloginInterceptor"&gt;            - &lt;param name="excludeMethods"&gt;*$&lt;/param&gt;                # 除了*$匹配的方法都执行此拦截器                - includeMethods为包含匹配的方法执行拦截器
        - &lt;/interceptor&gt;    - 生命周期
        - 部署时初始化，每次符合<action>的请求时，执行拦截器
    - 拦截器Action 类
        - o-> 继承Interceptor 接口
        - o-> 重写生命周期方法
            - String intercept(ActionInvocation invocation)方法中调用
                - invocation.invoke() 放行
                - invocation.getAction()得到当前的Action类
                - invocation.getStack()得到值栈中的栈
                    - invocation用于调试18个拦截器
    - 具体拦截器
        - struts-default.xml 文件中定义了32种拦截器
            - alias
        - autowiring
        - chain
        - conversionError
        - cookie
        - clearSession
        - createSession
        - debugging
        - execAndWait
        - exception
        - fileUpload                                # 只用来验证已经注入的文件是否合格，合格则通过，不合格则不执行action类中对应请求的方法
        - i18n
        - logger
        - modelDriven                                # 用于检查action类是否实现ModelDriven<T>接口，然后调用getModel()方法注入得到的对象到栈的项端。
        - scopedModelDriven
        - params                                        # 注入参数用，包括注入文件（级联注入文件的ContentType与FileName）
        - actionMappingParams
        - prepare
        - staticParams
        - scope
        - servletConfig                                # 向自定义的实现RequestAware等接口的Action类（一般是BaseAction类）中注入request等相应的map对象
        - timer
        - token                                                # 防止重复提交
        - tokenSession
        - validation                                # 验证
        - workflow
        - store
        - checkbox
        - profiling
        - roles
        - annotationWorkflow
        - multiselect
    - 数据传递
        - o-> 拦截器不会向其它拦截器中注入参数，所以自定义拦截器中了参数要从request中获取
        - o-> 如果想 显式的引用了自己的拦截栈，默认的拦截栈就不引用了，要自己引用，其中的注入参数拦截器向action类中注入参数
    - 技巧
        - &lt;interceptor-stack name="defaultStack"&gt;    # 对defaultStack进行替换，在它前面添加自定义的拦截器        - &lt;interceptor-ref name="aloginInterceptor"/&gt;        - &lt;interceptor-ref name="defaultStack"/&gt;    - 拦截器中的ActionInvocation对象
        - 可以得到ActionContext
- 文件处理
    - 上传
        - struts2文件上传步骤
            - 1.编写jsp文件
                - 1> post方式提交
                - 2> <input type="file" name="file1"/> 要添加name属性
                - 3> post表单上传的编码方式是enctype="multipart/formdata"
            - 2.创建Action类，不必继承任何类(但是如果不继承ActionSupport类的话，拦截器将不会返回提示消息)
                - 1> 定义参数        # 如果不接收上传文件名字符串数组而从文件对象中获取文件名的话，得到的文件名将会是乱码
                    - private File[] image;                                                # 字段名
                    - private String[] imageContentType;                        # 文件类型
                    - private String[] imageFileName;                                # 文件名
                    - private String uploadPath;
                        - 前三个参数可以不是数组，在 struts-default.xml配置文件fileUpload拦截器对应的源码中可以找到定义规则：
                            - &lt;li&gt;[File Name] : File - the actual File&lt;/li&gt;                            - &lt;p/&gt; &lt;li&gt;[FileName]ContentType : String - the content type of the file&lt;/li&gt;                            - &lt;p/&gt;&lt;li&gt;[File Name]FileName : String - the actual name of the file uploaded(not the HTML name)&lt;/li&gt;                        - uploadPath是我们自定义的配置文件中注入过来的文件存储位置
                - 2> 写execute方法保存文件到路径，返回成功消息
            - 3.Action类的配置文件，include到src/struts.xml文件中
                - 1> <action>标签中配置name="input"的标签<result>来返回出错消息
                - 2> <action>标签中用param标签注入文件存储路径：uploadPath 底层执行setUploadPath()方法
                - 3> <action>标签中通过<interceptor-ref name="fileUpload">标签对上传文件进行参数上的限定
                    - 1> <param name="maximumSize"> 单个文件的最大尺寸(字节)
                    - 2> <param name="allowedExtensions"> 文件扩展名
                    - 3> <param name="allowedTypes"> 文件实际类型，如image/jpeg，可从tomcat配置文件web.xml中查找
            - 4.配置返回消息的信息
                - ：src/struts.properties文件中
                    - struts.custom.i18n.resources=struts                # 解锁自/org/apache/struts2/default.properties总配置文件
                        - 加载自己，=后面是参照src/目录的相对路径 ，省略掉.properties扩展名
                    - struts.multipart.maxSize=2097152                #  解锁自/org/apache/struts2/default.properties总配置文件
                        - 设置上传文件总量的大小
                    - struts.messages.error.file.too.large=\u6587\u4EF6\u592A\u5927\: {0} "{1}" "{2}" {3}
                    - struts.messages.error.content.type.not.allowed=\u6587\u4EF6\u7C7B\u578B\u4E0D\u6B63\u786E\: {0} "{1}" "{2}" {3}
                    - struts.messages.error.file.extension.not.allowed=\u6269\u5C55\u540D\u4E0D\u6B63\u786E\: {0} "{1}" "{2}" {3}
                        - 覆盖/org/apache/struts2/default.properties总配置文件的响应消息,=后面是中文的unicode编码的iso8859-1的表示形式，通过视图可以直接配置，也可以用java/bin目录下的native2ascii.exe工具进行转码
        - 多文件上传
            - 出现有多个文件共同上传时，文件拦截器会出现一错全错的情况，这时我们利用struts的一个
                - 小bug---文件拦截不成功也调用action类的setXxx方法传入文件，从set函数中对文件进行筛选和转存
                - 这时文件拦截器已经形同虚设，一点作用也不起了。
        - 原理过程
            - 1.上传请求经过struts2的过滤器匹配扩展名
            - 2.按src/struts.xml文件中声明的配置包映射的名称空间映射到配置包
            - 3.根据action标签的name属性匹配名称空间与扩展名之间的“文件名”,映射到该action标签
                - 1> 经过多层拦截器
                - 2> 用param标签注入文件存储路径
                - 3> 通过<interceptor-ref name="fileUpload">标签对上传文件进行参数上的限定
                - 2> 执行action标签对应类的方法，该方法返回的返回的字符串进行响应
        - 默认配置
            - 1.defaultStack拦截栈中的fileUpload拦截器进行处理
            - 2.default.properties配置文件中 对multipart的上传方式进行了配置
                - struts.multipart.parser=jakarta                  # struts使用了第三方的jakerta来给上传文件解码
                - struts.multipart.saveDir=                      # 缓存文件的临时目录，不填默认是
                    - work/catalina/localhost/web工程名/upload_.....00000..tmp
                - struts.multipart.maxSize=2097152      # 默认支持的上传文件的大小 (字节，2m)，是总大小
            - 3.多数服务器自己删除缓存文件
- 下载
    - 用传递类型为stream 来返回要下载的文件
    - 写法
        - &lt;result name="success" type="stream"&gt;            - &lt;!-- 下载文件的类型 --&gt;            - &lt;param name="contentType"&gt;image/pjpeg&lt;/param&gt;            - &lt;!-- byte[]的大小，单位字节 --&gt;            - &lt;param name="bufferSize"&gt;2048&lt;/param&gt;            - &lt;!-- 设置下载响应头，${uuidFileName}是一个OGNL表达式，不是EL表达式 --&gt;            - &lt;param name="contentDisposition"&gt;attachment;filename=${uuidFileName}&lt;/param&gt;            - &lt;!-- 框架调用getXxx()方法，来获取InputStream流对象 --&gt;            - &lt;param name="inputName"&gt;imageStream&lt;/param&gt;        - &lt;/result&gt;            - 与其它同样，要注入的参数从stream类型对应的类中可以进行查看
    - 显示与下载的编码问题
        - o-> 设置tomcat/conf/server.xml
            - &lt;Connector port="8080" .. URIEncoding="utf-8"/&gt;        - o-> 提交下载请求用post方式，struts框架自动给post请求编码解码
