- 页面需要获取用户信息，从数据库中取数据显示
- java类中试用：
- cn.itcast.resource包中
    - ```yaml
      hello_en_US.properties
      hello=hello
      hello_zh_CN.properties
      hello=编码后的“你好”
      ```
    - Test.java
        - ```java
          #  获取信息
          Locale locale = locale.CHINA;
          #  加载资源
          ResourceBundle bundler = ResourceBundle.getBundle("cn.itcast.resource.hello",locale);
          #  取出数据
          String str = bundler.getString("hello");
          ```
- JSP中
    - ```html
      <%
          ResourceBundle bundler = ResourceBundle.getBundle("lang.properties.hello", request.getLocale());
          out.write(bundler.getString("title"));
      %>
      ```
- &lt;fmt&gt;标签    - ```html
      <fmt:setLocale value="${pageContext.request.locale }" scope="page"/>
      <fmt:setBundle basename="lang.properties.hello" var="bundler" scope="page"/>
      <fmt:message bundle="${bundler }" key="title"></fmt:message>
      ```
- 资源转码
    - native2ascii.exe
    - myeclipse properties文件编辑器
- ie 中得到en_US
- Locale locale
    - getLanguage();
    - getCountry();
    - getDefault();
- ResourceBundle
    - 读取文件cn.itcast.resource.hello省略_en_US.properties
    - getString(String key)
- 实例1：
    - 创建页面
    - 创建资源文件
    - 编辑页面
    - request.getLocale();
    - ResourceBundle.getBundle("",locale);
    - getString("")
- 实例2：
    - 编辑页面
    - &lt;%@ taglib%&gt;    - &lt;f:setLocale scope="" value=""&gt;    - &lt;f:setBundle basename="" var="" scope=""&gt;    - &lt;f:message bundle="" key="" &gt;- 动态数据国际化
- 日期国际化
    - SimpleDateFormat    #  继承DateFormat
    - getDateTimeInstance
    - getDateInstance
    - getTimeInstance
    - static int FULL
    - static int LONG
    - static int MEDIUM
    - static int SHORT
- 实例3：
    - cn.itcast.i18n.MyDateI18n
    - DateFormat format = DateFormat.getDateTimeInstance(DateFormat.FULL,DateFormat.FULL,Locale.CHINA);
    - String str = format.format(new Date());
    - 解析页面中的字符串
    - FULL 和 LONG  和 MEDIUM 和 SHORT 的 区别
    - DataFomat
    - String format(Date date)
    - Date parse(String source)
    - 创建static string2Date(String str)
    - 分析区域
        - Locale locale = Locale.CHINA;
    - 分析日期的风格
        - int dateType = DateFormat.SHORT;
        - int timeType = DateFormat.FULL;
    - 获取对象
        - DateFormat format = DateFormat.getDateTimeInstance(dateType,timeType,locale);
    - 解析
        - format.parse(str);
- 动态数字国际化
    - ```java
      java.text.*;
      Number类
      NumberFormat(普通数字，货币，百分比)
      getIntegetInstance
      getCurrencyInstance
      getPercentInstance(Locale inLocale)
      
      format
      parse
      创建cn.itcast.i18n.MyNumberI18n
      #  获取对象
      #  getPercentInstance
      #  getCurrencyInstance
      NumberFormat format = NumberFormat.getIntegerInstance(Locale.CHINA);
      
      #  格式化 或解析
      long num = 10000000000L;
      #  Number num = format.parse(str);
      #  double price = num.doubleValue();
      format.format(num);
      ```
- 动态文本国际化
    - ```java
      At 12:30 pm on jul 3,1998, a hurricance destroyed 99 houses and caused $1000000 of damage.
      MessageFormat
      MessageFormat(String pattern,Locale locale)
      format(String pattern,Object...arguments)
      format(Object)
      parse()
      占位
      At{0}  on {0}, a hurricance destroyed{1} houses and caused {2} of damage.
      
      实例1：
      MyMessageI18n.java
      #  定义模式字符串
      String pattern
      #  定义locale对象
      MessageFormat format = new MessageFormat(pattern,Locale.CHINA);
      #  定义参数数组
      DateFormat datef = DateFormat.getDateTimeInstance(DateFormat.MEDIUM,DateFormat.SHORT,Locale.US);
      Date date = datef.parse("Jul 3,1998 12:30 PM");
      
      Integer num = new Integer(99);
      
      long currency = NumberFormat.getCurrencyInstance(Locale.US).parse("$1000000");
      String damage = NumberFormat.getCurrencyInstance(locale).format(currency);
      
      Object [] values = {date,num,damage};
      #  格式化
      String str = format.format(values);
      
      分析：{索引，对象，类型}
      MessageFormat messf = new MessageFormat("{0,time,short} on {0,date}, a hurricance destroyed {1} houses and caused {2,number,currency} of damage.",Locale.CHINA);
      
      Object [] values = {new Date(),new Integer(100),1000};
      
      String str = messf.format(values);
      ```
