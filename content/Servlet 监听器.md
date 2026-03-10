- 分类
    - ServletContextListener
    - ServletContextAttributeListener
    - HttpSessionListener
    - HttpSessionAttributeListener
    - HttpSessionActivationListener
- web.xml 注册在过滤器后面，servlet前面
    - ```html
      <listener>
      <listener-class>cn.listen.MyListener</listener-class>
      </listener>
      ```
- 自定义
    - ```java
      public class MyListener implements ServletContextListener {
          public void contextDestroyed(ServletContextEvent sce) {
              System.out.println("die");
          }
          public void contextInitialized(ServletContextEvent sce) {
              System.out.println("init");
          }
      
          // 当过滤器被销毁时自动执行
          public void destroy(){
              System.out.println("Filterdestroyed");
          }
          // 当拦截的时候
          public void doFilter(request,response,chain){
              System.out.println("doFilter");
              System.out.println("放行目标资源");
              chain.doFilter(request,response);
              System.out.println("目标已经放行");
          }
          // 初始化的时候
          public void init(FilterConfig config){
              System.out.println("FilterInited");
          }
      }
      ```
