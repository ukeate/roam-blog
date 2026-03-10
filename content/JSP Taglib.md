- JSP标签库
- [[JSTL]]标签库1.1 或1.2
    - 标签库1.1中需要    jstl.jar 与 standard.jar 库
- 可放入域scope的类型
    - page
    - request
    - session
    - application
    - functions
- el表达式级使用，其它都标签级使用
- functions
    - ```javascript
      <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
      ${fn:contains("gzitcast", "itcast") }  <br>
      ${fn:containsIgnoreCase("gzitcast", "ITCAST") }  <br>
      ${fn:endsWith("gzitcast", "st") } <br>
      ${fn:indexOf("gzitcsat", "cs") } <br>
      ${fn:join(arr, "-") } <br>
      ${fn:length("gzitcast") } <br>
      ${fn:replace("gzitcast", "gz", "广州") } <br>
      ${fn:split("gz,it,cast", ",") } <br>
      ${fn:startsWith("gzitcsat", "gz") } <br>
      ${fn:substring("gzitcsat", 3, 8) } <br>
      ${fn:substringAfter("gzitcsat", "cs") } <br>
      ${fn:substringBefore("gzitcsat", "cs") } <br>
      ${fn:toLowerCase("gziTCsat") } <br>
      ${fn:toUpperCase("gziTCsat") } <br>
      ${fn:trim("  gzitcsat  ") } <br>
      <%-- 对字符串中进行转义处理，如：会把"<"替换为"&lt;"，把">"替换为"&gt;" --%>
      ${fn:escapeXml("<h3>gzitcsat</h3>") } <br>
      ```
- core
    - 所有标签：
        - out
        - set
        - remove
        - catch
        - if
        - choose
        - when
        - otherwise
        - forEach
        - url
        - param
        - redirect
        - forTokens
        - import
    - ```html
      <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/cores"%>
      <c:out var=""    default=""    escapeXml="true">    <%--    放过xml过滤，让它显示，默认不显示    --%>
      -------------------------------------
      scope方式
      <c:set    var=""    value=""    scope="">
      target方式    <%--    这个放入page作用域中的map值    --%>
      <%  Map map = new HashMap();  %>
      <c:set    property="key1"    value="key1value"    target="<%=map%>"
      <%  pageContext.setAttribute("map", map);  %>
      <c:out    value="${map[key2]}"
      
      -------------------------------------
      <c:catch var="e"></c:catch>
      <c:out value='<%= ((Exception)pageContext.getAttribute("e",PageContext.PAGE_SCOPE)).getMessage() %>'></c:out>
      -------------------------------------
      <c:remove    var=""    scope="">
      -------------------------------------
      <c:if test="${not empty    }" scope=""    var="">
      -------------------------------------
      <%--    if...else标签    --%>
      <c:choose>
      <c:when test="">
      <c:otherwise>
      -------------------------------------
      <c:forEach  begin=""    end=""    step=""    items=""    var=""    varStatus="state">          <%--    varStatus中的函数有first last count begin end    --%>
      <tr bgcolor='${state.count%2 == 0? "red" : "pink"}' >
      </c:forEach>
      ```
    - varStatus可用的函数
        - current    // 当前这次迭代的项
        - index    // 索引
        - count    // 计数
        - first        // 第一个
        - last        // 最后一个
        - begin    // begin属性值
        - end        // end 属性值
        - step        // step属性值
    - ------------------------------------
    - uri 代表所有协议路径
    - ```html
      <c:url    var="itcast"    value="http://www.itcast.cn"    scope="page"    context=""    >    <%--    context 是整个网站    --%>
      <c:param    name="name"    value="中文">    <%--    这样传参数有编码    --%>
      
      如果value值为"/" 则加入context属性提供上下文名称，如果context也被省略，就使用当前servlet的上下文名称
      -------------------------------------
      <c:redirect    url="${itcast}"    context=""    >
      -------------------------------------
      <c:set    var="name"    value="xx,xxx,xxx,xx"    scope="request"    >
      <c:forTokens    items="${name}"    delims=","    begin=""    end=""    step="1"    var="name"    varStatus=""    >    <%--切割字符串--%>
      -------------------------------------
      <c:import    url="/publics/head.jsp"    >    <%--动态包含，引入公共文件--%><%--网站publics文件夹--%>
      ```
- sql标签库
    - 以前没有mvc模式的时候，通过页面访问数据库时用的，现在不用
    - 引入
        - &lt;%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %&gt;    - 设置数据源
        - ```javascript
          <sql:setDataSource dataSource=”dataSource”[var=”name”]
              [scope=”page|request|session|application”]/>
          ```
    - jdbc连接
        - ```javascript
          <sql:setDataSource driver=”driverClass” url=”jdbcURL”
              user=”username”
              password=”pwd”
              [var=”name”]
              [scope=”page|request|session|application”]/>
          ```
    - JSTL提供了<sql:query>、<sql:update>、<sql:param>、<sql:dateParam>和<sql:transaction>这5个标签
        - 1.query
            - ```html
              query必需指定数据源
              <sql:query sql=”sqlQuery” var=”name” [scope=”page|request|session|application”]
              [dataSource=”dateSource”]
              [maxRow=”maxRow”]
              [startRow=”starRow”]/>
              或
              <sql:query var=”name” [scope=”page|request|session|application”]
              [dataSource=”dateSource”]
              [maxRow=”maxRow”]    # 设定最多可以暂存数据的长度
              [startRow=”starRow”]    # 设定从哪一行开始
                      >
                      sqlQuery
                      </sql:query>
              ```
            - 结果集的参数
                - rowCount    # 结果集中的记录总数
                - rowsByIndex    # 以数字为作索引的查询结果
                - columnNames    # 字段名称数组
                - Rows    # 以字段为索引查询的结果
                - limitedByMaxRows    # 是否设置了maxRows属性来限制查询记录的数量
                    - limitedByMaxRows用来判断程序是否收到maxRows属性的限制。
                    - 并不是说设定了maxRows属性，得到结果集的limitedByMaxRows的属性都为true，
                    - 当取出的结果集小于maxRows时，则maxRows没有对结果集起到作用此时也为false。
                    - 例如可以使用startRow属性限制结果集的数据量。
        - 2.update
            - ```html
              </sql:update>
              <sql:update sql=”SQL语句” [var=”name”] [scope=”page|request|session|application”]
                      [dateSource=”dateSource”]/>
              或
              <sql:update [var=”name”] [scope=”page|request|session|application”]
              [dateSource=”dateSource”]
              >SQL语句
              ```
            - 参数说明
                - dataSource    # 数据源对象
                - 其它与query一样
        - 3.param 参数设置
            - ```html
              <sql:param value=”value”/>
              或
              <sql:param>
                  Value
                  </sql:param>
              ```
        - 4.dataParam 标签
            - 用于为SQL标签填充日期类型的参数值
            - 参数说明
                - value：java.util.Date类型的参数。
                - type属性：指定填充日期的类型timestamp（全部日期和时间）、time（填充的参数为时间）、date（填充的参数为日期）。
        - 5.transaction 标签
            - ```html
              <sql:transaction [dataSource=”dataSource”]
              [isolation=”read_committed|read_uncommitted|repeatable|serializable”]
                  >
                  <sql:query>
                  <sql:uptade>
              </sql:transation>
              ```
- xml标签库
    - 核心操作
    - out    # 主要用来取出XML中的字符串。
        - 属性
        - select    # XPath语句
        - escapeXml    # 是否转换特殊字符
    - parse    # 用来解析xml文件
        - 属性
        - doc    # XML文件
        - systemId    # XML文件的URL
        - filter    # XMLFilter过滤器
        - varDom    # 储存解析后的XML文件
        - scopeDom    # varDom的范围
    - set    # 将从XML文件取得的内容储存至属性范围中
        - 属性
        - select    # XPath语句
    - 流程控制
        - ```javascript
          if
          choose when otherwise
              属性
              select    # XPath语句
          ```
    - 文件转换
        - ```html
          <x:transform doc=”xmldoc” xslt=”XSLTStytlesheet”[docSystemId=”xmlsystemid”]
              [result=”result”]
              [var=”name”]
              [scope=”scopeName”]
              [xsltSystemId=”xsltsystemid”]/>
          或
          <x:transform doc=”xmldoc” xslt=”XSLTStytlesheet”[docSystemId=”xmlsystemid”]
              [result=”result”]
              [var=”name”]
              [scope=”scopeName”]
              [xsltSystemId=”xsltsystemid”]
              >
              <x:param/>
              </x:transform>
          或
          <x:transform doc=”xmldoc” xslt=”XSLTStytlesheet”[docSystemId=”xmlsystemid”]
              [result=”result”]
              [var=”name”]
              [scope=”scopeName”]
              [xsltSystemId=”xsltsystemid”]
              >
          ```
        - 属性
            - doc    # 指定xml文件来源
              
            - xslt    # 转化xml的样式模板
              
            - docSystemId    # xml文件的URI
              
            - xsltSystemId    # xslt文件的URI
              
            - result    # 用来存储转换后的结果对象
- 国际化
    - &lt;%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %&gt;    - 国际化标签
    - 1.setLocale    # 设置一个全局的地区代码,设定的是本地的环境
        - 中文－大陆:<fmt:setLocale value="zh_CN"/> <fmt:formatDate value="${todayValue}"/><br>
    - 2.requestEncoding    # 设置统一的请求编码
        - &lt;fmt:requestEncoding value="GB2312"/&gt;    - 信息显示标签
        - ```html
          1.<fmt:bundle> 设置临时要读取的资源文件
          2.<fmt:message>  通过key取得value
          3.<fmt:setBundle>  设置一个要读取的全局的资源文件
              如
              <fmt:setBundle basename="applicationMessage" var="MyResourse"/>    # 绑定了名为applicationMessage_zh_CN.properties一类 的文件
              <fmt:bundle basename="MyResourse" prefix="label.">
              <fmt:message key="backcolor" bundle="${applicationBundle}"/>
              <fmt:message key="fontcolor" />
          </fmt:bundle>
          ```
    - 数字及日期格式化标签
    - 1.<fmt:formatDate>  日期的格式化
        - 属性
        - value:格式化的日期，该属性的内容应该是 java.util.Date 类型的实例
        - type:格式化的类型
        - pattern:格式化模式
        - timeZone:指定格式化日期的时区
    - 2.<fmt:parseDate>  解析日期
        - 属性
        - value:将被解析的字符串
        - type:解析格式化的类型
        - pattern:解析格式化模式
        - parseLocale:以本地化的形式来解析字符串，该属性的内容为 String 或 java.util.Locale 类型的实例
        - timeZone:指定解析格式化日期的时区
    - 3.<fmt:formatNumber>  数字格式化
        - 属性
        - value:格式化的数字,该数值可以是 String 类型或 java.lang.Number 类型的实例
        - type:格式化的类型,可能值包括:currency（货币）、number（数字）和percent（百分比）
        - pattern:格式化模式
        - maxIntegerDigits:指定格式化结果的最大值
        - minIntegerDigits:指定格式化结果的最小值
        - maxFractionDigits:指定格式化结果的最大值，带小数
        - minFractionDigits:指定格式化结果的最小值，带小数
        - 如
        - &lt;fmt:formatNumber value="1000.888" type="currency" var="money"/&gt;    - 4.<fmt:parseNumber>  解析数字
        - 属性
        - value:将被解析的字符串
        - type:解析格式化的类型
        - pattern:解析格式化模式
        - 如
        - &lt;fmt:parseNumber value="15%" type="percent" var="num"/&gt;    - 5.<fmt:setTimeZone>  标签则允许将时区设置保存为一个变量，在之后的工作可以根据该变量来进行属性描述
        - 属性
        - value    # 时区的设置
        - var    # 用于保存时区为一个变量
    - 6.<fmt:timeZone>  标签将使得在其标签体内的工作可以使用该时区设置
        - 属性
        - value    # 时区的设置
    - 7.<fmt:param> 标签:用于参数传递
        - 如：在MyResourse.properties文件中,有一个索引值如下(其中,{0}代表占位符):
        - Str2=Hi,{0}
        - 则,使用<fmt:param>标签传入值如下:
        - &lt;fmt:bundle basename="MyResourse"&gt;            - &lt;fmt:message key="Str2"&gt;            - &lt;fmt:param value="张三" /&gt;            - &lt;/fmt:message&gt;        - &lt;/fmt:bundle&gt;        - 也可以在资源文件中指定参数的类型:
        - 如:在MyResourse.properties文件中,有一个索引值如下:
        - Str3={0,date}
        - 则,使用<fmt:param>标签传入值如下:
        - &lt;% request.setAttribute("now",new Date()); %&gt;        - &lt;fmt:bundle basename="MyResourse"&gt;            - &lt;fmt:message key="Str3"&gt;            - &lt;fmt:param value="${now}" /&gt;            - &lt;/fmt:message&gt;        - &lt;/fmt:bundle&gt;