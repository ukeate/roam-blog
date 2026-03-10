- web.xml
    - ```html
      <filter>
          <filter-name>testFilter
          <filter-class>cn.itcast.filter.text.TestFilter
          <init-param>
              <param-name>encoding</param-name>
              <param-value>GB2312</param-value>
          </init-param>
      </filter>
      <filter-mapping>
          <filter-name>testFilter
          <url-pattern>/*
      </filter-mapping>
      ```
- API
    - Filter接口
        - 多个过滤器, 按web.xml中注册的顺序映射调用。servlet执行完后, 从后向前返回执行chain.doFilter之后的方法
        - init
        - destroy
        - doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
    - FilterChain接口
        - doFilter(ServletRequest request, ServletResponse response)
    - FilterConfig接口
        - private FilterConfig config = null;
        - init()
            - this.config = config;
        - doFilter()
            - String ip = this.config.getInitParameter("ip");
- 映射
    - 1.映射的url
    - 2.servlet的名字
        - 通配servlet <url-pattern>/servlet/*</url-pattern>
    - 3.为了映射servlet中的转发, 映射一个过滤器到某种传递方式
        - ```html
          <filter-mapping>
              <dispatcher>FORWARD
                  # FORWARD 转发方式
                  # REQUEST  请求方式
                  # INCLUDE  包含方式
                  # ERROR  错误页面
              </dispatcher>
          </filter-mapping>
          ```
- 设置编码
    - ```java
      doFilter()
          HttpServletRequest httpRequest = (HttpServletRequest) request;
          HttpServletResponse httpResponse = (HttpServletResponse) response;
          httpRequest.setCharacterEncoding("utf-8")
          String method = httpRequest.getMethod();
          if("get".equalsIgnoreCase(method)){
              chain.doFilter(new MyWapperRequest(httpRequest),response);
          }else{
              request.setCharacterEncoding("utf-8");
          }
      
      class MyWapperRequest extends HttpServletRequestWrapper{
          private HttpServletRequest request = null;
      
          public MyWapperRequest (HttpServletRequest request){
              super(request);
              this.request = request;
          }
      
          @Override
          public String getParameter(String name){
              String value = request.getParameter(name);
              String method = request.getMethod();
              if(value != null &&"get".equalsIgnoreCase(method)){
                  value = new String(value.getBytes("iso8859-1"),request.getCharacterEncoding())
              }
              return value;
          }
      }
      ```
- 设置缓存
    - Expires:-1
    - Cache-Control:no-cache
    - Pragma:no-cache
    - ```java
      NoCacheFilter implements Filter # 设置不缓存
          doFilter()
              HttpServletResponse httpResponse = response;
              httpResponse.setHeader("Expires",-1 + "");
              //  setDataHeader("expires",-1);
              httpResponse.setHeader("cache-control","no-cache");
              httpResponse.setHeader("pragma","no-cache");
              chain.doFilter(request,httpResponse);
      
      
      
      CacheFilter
          # 缓存静态资源
          # web.xml中url-pattern 可以映射多个 param-name=jpg param-value=2
          private FilterConfig config = null;
      
          doFilter()
              HttpServletResponse httpResponse = (HttpServletResponse) response;
              HttpServletResponse httpRequest = (HttpServletRequest) request;
      
          String resource = request.getRequestURI();
          String date  = null;
          if(resource.endsWith("jpg")){
              date =  config.getInitParameter("jpg");
              httpResponse.setDateHeader("expires",System.currentTimeMillis() + longDate * 60 * 60 * 1000);    // 换算成秒
          } else if(resource.endsWith("js")){
              String date  = config.getInitParameter("js");
              config.getInitParameter("js");
              httpResponse.setDateHeader("expires",System.currentTimeMillis() + longDate * 60 * 60 * 1000);
          }
      
          chain.doFilter(httpRequest,httpResponse);
      ```
- 修改编码
    - ```java
      EncodingFilter implements Filter{
          doFilter(request,response){
              HttpServletResponse httpResponse = (HttpServletResponse) response;
              HttpServletResponse httpRequest = (HttpServletRequest) request;
              httpRequest.setCharacterEncoding("utf-8");
              chain.doFilter(httpRequest,httpResponse);
          }
      }
      class EncodingRequest extends HttpServletRequestWrapper{
          private HttpServletRequest request;
          public EncodingRequest (HttpServletRequest request){
              super(request);
              this.request = request;
          }
      
          @Override
          public String getParameter(String name){
              String value = request.getParameter(name)
              if(value != null && "get".equalsIgnoreCase(request.getMethod)){
                  value = new String(value.getBytes("iso8859"),"utf-8");
              }
              return value;
          }
      }
      ```
- 登录
    - LoginFilter
        - ```java
          init(){
              this.config  = config;
          }
          private FilterConfig config = null;
          doFilter(){
              String path = this.config.getInitParameter("loginPage");
              HttpSession session = httpRequest.getSession(false);
          
              // 判断用户请求的是否是UserServlet
              String servletName = httpRequest.getServletPath();
              servletName = substring(servletName.lastIndexOf("/")+1);
              if("UsersServlet".equals(servletName)){
              }else{ // 一般的servlet
                  if(session != null){
                      // 获取登录标记
                      User user = null;
                      user = (User)session.getAttribute("user");
          
                      // 判断
                      if(user != null){
                          // 放行资源
                          chain.doFilter(httpRequest,httpResponse);
                      }else{
                          // 页面重定向到登录页面
                          httpResponse.sendRedirect(httpRequest.getContextPath() + "/" + path);
                      }
                  }
              }
          }
          ```
    - web.xml
        - ```html
          ```
