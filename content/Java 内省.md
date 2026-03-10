- IntroSpector，操作javabean
- 例子
    - ```java
      Point p = new Point();
      PropertyDescriptor pd = new PropertyDescriptor("x", p.getClass());
      Method methodGetX = pd.getReadMethod();
      Method methodSetX = pd.getWriteMethod();
      methodSetX.invoke(p, 7);
      System.out.println(methodGetX.invoke(p));
      
      BeanInfo beanInfo = Introspector.getBeanInfo(p.getClass());
      PropertyDescriptor[] pds = beanInfo.getPropertyDescriptors();
      for(PropertyDescriptor pd2 : pds){
          if(pd.getName().equals("x")){
              System.out.println(pd.getReadMethod().invoke(p));
              break;
          }
      }
      ```
