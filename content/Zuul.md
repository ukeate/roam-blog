- 网关，智能路由、访问过滤
- 默认会用ribbon负载均衡
- application.yml
    - ```yaml
      zuul:
              prefix: /v1
              routes:
                  hiapi:
                      path: /hiapi/**
                      serviceId: erp-consumer-metadb
                      # url: http://localhost:8762  # 这样写不会做负载均衡
                      # serviceId: hiapi-v1
      
      ## 手动url负载均衡
          # ribbon: 
          #   eureka:
          #     enabled: false
          # hiapi-v1:
          #   ribbon:
          #     listOfServers: http://localhost:8762,http://localhost:8763
      ```
- 案例
    - 过滤
        - ```java
          import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;
                  @Component
                  public class MyFilter extends ZuulFilter {
          
                      private static Logger log = LoggerFactory.getLogger(MyFilter.class);
          
                      @Override
                      public String filterType() {
                          return PRE_TYPE;
                      }
          
                      @Override
                      public int filterOrder() {
                          return 0;
                      }
          
                      @Override
                      public boolean shouldFilter() {
                          return true;
                      }
          
                      @Override
                      public Object run() {
                          RequestContext ctx = RequestContext.getCurrentContext();
                          HttpServletRequest request = ctx.getRequest();
                          log.info(String.format("%s >>> %s", request.getMethod(), request.getRequestURL().toString()));
                          Object accessToken = request.getParameter("token");
                          if (accessToken == null) {
                              log.warn("token is empty");
                  //
                  //            ctx.setSendZuulResponse(false);
                  //            ctx.setResponseStatusCode(401);
                  //            try {
                  //                ctx.getResponse().getWriter().write("token is empty");
                  //            }catch (Exception e){
                  //
                  //            }
                              return null;
                          }
                          log.info("ok");
                          return null;
                      }
                  }
          ```
    - 熔断
        - ```java
          @Component
                  public class MyFallbackProvider implements ZuulFallbackProvider {
                      @Override
                      public String getRoute() {
                          return "*";
                      }
          
                      @Override
                      public ClientHttpResponse fallbackResponse() {
                          return new ClientHttpResponse() {
                              @Override
                              public HttpStatus getStatusCode() throws IOException {
                                  return HttpStatus.OK;
                              }
          
                              @Override
                              public int getRawStatusCode() throws IOException {
                                  return 200;
                              }
          
                              @Override
                              public String getStatusText() throws IOException {
                                  return "OK";
                              }
          
                              @Override
                              public void close() {
          
                              }
          
                              @Override
                              public InputStream getBody() throws IOException {
                                  return new ByteArrayInputStream("error, I'm the fallback".getBytes());
                              }
          
                              @Override
                              public HttpHeaders getHeaders() {
                                  HttpHeaders headers = new HttpHeaders();
                                  headers.setContentType(MediaType.APPLICATION_JSON);
                                  return headers;
                              }
                          };
                      }
                  }
          ```
