- 枚举类型的比较取决于声明顺序
- 举类的实现类
    - ```java
      java.lang.Enum<E> extends Object
          static <T extends Enum<T>> T valueOf(Class<T> enumType, String name)
      
      javax.lang.model.element.ElementKind extends java.lang.Enum<ElementKind>
          # 实际创建枚举类型时继承的类
          # 此类的静态方法不是Enum本身的方法，所以它们在java.lang.Enum的javadoc中没有出现。
          static ElementKind valueOf(String name)
              # 为提供的字符串返回一个枚举类型，该枚举类型必须精确地匹配源代码声明。
          static ElementKind[] values()
              # 返回一个枚举类型所有可能值的数组。
      ```
- 定义1
    - ```java
      public enum Color {
      RED, GREEN, BLANK, YELLOW
          # 元素列表必须在最前, 如果元素列表后面没有东西的话，可以省略分号
          // 枚举的构造方法必须是私有的
          // private WeekDay() {
          //}
      }
      ```
- 定义2
    - ```java
      enum Signal {
      GREEN, YELLOW, RED
      }
      ```
- 定义3
    - 自定义构造（要注意必须在enum的实例序列最后添加一个分号）
    - ```java
      public enum Color {
          RED("红色", 1), GREEN("绿色", 2), BLANK("白色", 3), YELLO("黄色", 4);
          // 成员变量
          private String name;
          private int index;
          // 构造方法
          private Color(String name, int index) {
              this.name = name;
              this.index = index;
          }
          // 普通方法
          public static String getName(int index) {
              for (Color c : Color.values()) {
              if (c.getIndex() == index) {
                  return c.name;
              }
              }
              return null;
          }
          // get set 方法
          public String getName() {
              return name;
          }
          public void setName(String name) {
              this.name = name;
          }
          public int getIndex() {
              return index;
          }
          public void setIndex(int index) {
              this.index = index;
          }
      }
      ```
- 使用
    - ```java
      public enum TrafficLamp {
          RED(30) {
      
              @Override
              public TrafficLamp nextLamp() {
                  return GREEN;
              }
          },
          GREEN(45) {
              @Override
              public TrafficLamp nextLamp() {
                  return YELLOW;
              }
          },
          YELLOW(5) {
              @Override
              public TrafficLamp nextLamp() {
                  return RED;
              }
          };
          public abstract TrafficLamp nextLamp();
      
          private int time;
      
          private TrafficLamp(int time) {
              this.time = time;
          }
      }
      @Test
      public void testHere() {
          WeekDay weekDay = WeekDay.MON;
          weekDay.toString();
          weekDay.name();
          // 排行
          weekDay.ordinal();
          WeekDay.valueOf("SUN");
          WeekDay.values();
      }
      ```
- 自己实现
    - ```java
      public abstract class WeekDay {
          private WeekDay() {
          };
      
          /*
          * public WeekDay nextDay(){ if(this == SUN){ return MON; }else { return
          * SUN; } }
          */
      
          public abstract WeekDay nextDay();
      
          public final static WeekDay SUN = new WeekDay() {
      
              @Override
              public WeekDay nextDay() {
                  return MON;
              }
          };
          public final static WeekDay MON = new WeekDay() {
      
              @Override
              public WeekDay nextDay() {
                  return SUN;
              }
          };
      
          @Override
          public String toString() {
              return this == SUN ? "SUN" : "MON";
          }
      }
      ```
- 使用接口组织枚举
    - ```java
      public interface Food {
      enum Coffee implements Food{
          BLACK_COFFEE,DECAF_COFFEE,LATTE,CAPPUCCINO
      }
      enum Dessert implements Food{
          FRUIT, CAKE, GELATO
      }
      }
      ```
- 用switch判断
    - JDK1.6之前的switch语句只支持int,char,enum类型
    - ```java
      enum Signal {
      GREEN, YELLOW, RED
      }
      public class TrafficLight {
      Signal color = Signal.RED;
      public void change() {
          switch (color) {
          case RED:
          color = Signal.GREEN;
          break;
          case YELLOW:
          color = Signal.RED;
          break;
          case GREEN:
          color = Signal.YELLOW;
          break;
          }
      }
      }
      ```
- 枚举的集合
    - java.util.EnumSet    # 集合中的元素不重复
    - java.util.EnumMap    # key是enum类型，而value则可以是任意类型。
