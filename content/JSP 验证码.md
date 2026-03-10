- 在<img>标签的src属性中指定该jsp文件即可
    - out.clear();out = pageContext.pushBody();两条语句的作用是
    - 使该验证码jsp文件的传输不会默认地在返回数据后中断，而是在<img>标签调用该jsp的页面加载结束之后再中断数据的传输
- ```html
  <%@ page language="java" pageEncoding="UTF-8"%>
  <%@ page contentType="image/jpeg" import="java.util.*,java.awt.*,java.awt.image.*,javax.imageio.*"%>
  <%!
      // 声明区，定义产生颜色和验证内容的全局方法
      public Color getColor(){
  
      Random random = new Random();
      int r = random.nextInt(256);
      int g = random.nextInt(256);
      int b = random.nextInt(256);
      return new Color(r,g,b);
      }
      public String getNum(){
      String str = "";
      Random random = new Random();
      for(int i = 0; i < 4; i++){
          str += random.nextInt(10) + " ";
      }
      return str;
      }
  %>
  <%
      // 设置响应无缓存
      response.setHeader("pragma", "mo-cache");
      response.setHeader("cache-control", "no-cache");
      response.setDateHeader("expires", 0);
      // 图片对象,画笔对象
      BufferedImage image = new BufferedImage(80,30,BufferedImage.TYPE_INT_RGB);
      Graphics g = image.getGraphics();
      // 画背景
      g.setColor(new Color(200,200,200));
      g.fillRect(0, 0, 80, 30);
      // 画干扰线
      for(int i = 0; i < 30; i++){
      Random random = new Random();
      int x = random.nextInt(80);
      int y = random.nextInt(30);
      int xl = random.nextInt(x+10);
      int yl = random.nextInt(y+10);
      g.setColor(getColor());
      g.drawLine(x, y, x + xl, y + yl);
      }
      // 画内容
      g.setFont(new Font("serif", Font.BOLD,16));
      g.setColor(Color.BLACK);
      String checkNum = getNum();
      g.drawString(checkNum,15,20);
      // 放内容到session中，返回图片流
      session.setAttribute("validateCode", checkNum.replaceAll(" ", ""));
      ImageIO.write(image, "jpeg", response.getOutputStream());
      out.clear();
      out = pageContext.pushBody();    // 不按照jsp默认的getWriter()方法输出，用我们定义的流的方法进行输出
  %>
  ```
