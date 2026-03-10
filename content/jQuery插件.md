- jQuery提供
    - fixedtableheader
    - tablesort
    - tools
    - ui
    - hashchange
        - 控制浏览器的前进后退到一个页面中(不必刷新)
    - easing
        - jquery的动画扩展, 比如动画执行的速度曲线
- 代码
    - icanhaz
    - mustache
- 功能
    - fileupload
    - treeview
        - 文件
            - jquery.treeview.js                        # treeview插件简化板
            - jquery.treeview.edit.js                # 可编辑的菜单
            - jquery.treeview.css                        # treeview可选使用的样式
    - validate
        - 使用
            - 验证写在<head>中时，要写在页面加载中（$(function{})）                # 否则读取<head>时，页面还没有加载，没有表单
            - 验证完成触发事件
                - 失败事件：errorPlacement:function(error,element){}                        # error是错误消息，element是求救消息的js对象 
                - 成功事件：success:function(label){}                        # label是显示消息的js对象
            - 远程验证：发送ajax请求到指定url                # 自动传递验证名与验证值，ie中get请求调用浏览器缓存，所以用户回退字符时不提交。所以用post方式发送请求
                - 返回"true"表示成功，"false"表示失败
                - remote:{
                    - url:"/outrun/servlet/JqueryValidateServlet",
                    - type:"post"
                - }
            - 简单例子
                - ```javascript
                  $("form").validate({
                          debug:true,
                          rules:{
                                  name:{
                                          required:true,
                                          rangelength:[6,12]
                                  },
                          },
                          messages:{
                                  name:{
                                          required:"用户名必填",
                                          rangelength:$.format("用户名长度必须在{0}-{1}之间")
                                  },
                          }
                  });
                  ```
        - 兼容：
            - 不同validate验证框架要求不同的jquery版本
            - validate1.5.2配jquery1.3
        - 经验
            - 默认情况是丢失焦点验证,如果验证失败则 在失败的文本框每次输入数据都会触发onkeyup
                - 设置        onkeyup:false
        - 样式
            - 默认是class="error"的样式，可以在页面中自定义.error{}样式取代，但是这样除了出错信息的样式修改外，用户输入信息的样式也会修改
            - 错误信息是以添加<label>标签的形式显示的，所以可以添加<label>标签的样式，如form label{}
    - acccordion  下拉菜单
    - autocomplete    自动补全(用索引库)
    - password Vlidation 密码强度
    - prettdate 日期插件
    - message 消息框
- 报表
    - highcharts
    - jscharts
    - am charts
        - 对象与属性
            - 对象                # 静态创建
                - AmCharts.AmSerialChart()                 序列图
                    - 属性
                        - dataProvider        数据
                            - 接收json数据
                        - categoryAxis        横坐标
                            - 属性
                                - labelRotation          横坐标显示名角度
                                - gridPosition                网格的起始位置,"start"表示开始处
                                - dashLength                值为数字，网格中垂直线虚线程度 ，0代表实线
                        - categoryField        横坐标显示名(dataProvider数据中的字段名)
                        - depth3D        3D图形深度
                        - angle                3D图形角度(左上俯角)
                        - creditsPosition        未购买之前的商标位置，如"top-right"表示右上。
                    - 方法
                        - write("chartdiv")                # 要绘图div的id属性值
                - AmCharts.AmPieChart()                饼图
                - AmCharts.AmSerialChart()         雷达图
                - AmCharts.AmXYChart()                离散图
                - AmCharts.AmLegend()                图例
                - AmCharts.ValueAxis()                纵坐标
                    - 通过 AmCharts对象中图对象的addValueAxis()方法给图添加本属性
                    - 属性
                        - title                        纵坐标标题
                        - dashLength                值为数字，网格中水平线虚线程度 ，0代表实线
                - AmCharts.AmGraph()                图形
                    - 通过 AmCharts对象中图对象的addGraph()方法给图添加本属性
                    - 属性
                        - colorField                值为dataProvider提供数据中的字段名，表示数据在报表中的颜色
                        - valueField                值为dataProvider提供数据中的字段名，表示占有数值的多少
                        - balloonText                鼠标悬停时气球中的内容，用[[value]], description, [[percents]], [[open]], category 等标记来引用数据
                            - 也可以用html标签，如： "<span style='font-size:14px'>category: <b>[[value]]</b></span>"
                        - lineAlpha                0或1，代表数据图形是否有边界
                        - fillAlpha                代表数据图形是否透明，0为透明
                    - AmSerialChart中AGraph的属性
                        - type                        数据图形的形状，如"column"代表方块柱状图
                - AmCharts.ChartCursor()                光标
                    - 通过 AmCharts对象中图对象的addChartCursor()方法给图添加本属性
                    - 属性
                        - cursorAlpha                0或1，是否显示鼠标跟随线
                        - zoomable                true或false 是否可以用鼠标选中来放大
                        - categoryBalloonEnabled                        true或false 是否跟随鼠标显示横坐标种类名
            - 方法2                # 动态创建
                - AmCharts.makeChart("" , json);
                    - 参数1 : 要产生图形的div的id
                    - 参数2 : json格式的产生条件
                        - type : 图形类型，如"pie"
                        - dataProvider : 图形数据
                        - titleField : 需要显示的种类名对应在dataProvider中的字段名
                        - valueField : 需要显示的权重对应在dataProvider中的字段名
                        - legend : json数据，图例的产生条件
                            - align : 对齐条件，如"center"
                            - markerType : 图例的形状，如"circle"
        - 使用1
            - ```javascript
              var chart;
              var chartData = [ {
                      "country" : "USA",
                      "visits" : 4025,
                      "color" : "#FF0F00"
              }, {
                      "country" : "China",
                      "visits" : 1882,
                      "color" : "#FF6600"
              } ];
              
              AmCharts.ready(function() {
                      // SERIAL CHART
                      chart = new AmCharts.AmSerialChart();
                      chart.dataProvider = chartData;
                      chart.categoryField = "country";
                      // the following two lines makes chart 3D
                      chart.depth3D = 20;
                      chart.angle = 30;
              
                      // AXES
                      // category
                      var categoryAxis = chart.categoryAxis;
                      categoryAxis.labelRotation = 0;
                      categoryAxis.gridPosition = "start";
              
                      // value
                      var valueAxis = new AmCharts.ValueAxis();
                      valueAxis.title = "Visitors";
                      chart.addValueAxis(valueAxis);
              
                      // GRAPH
                      var graph = new AmCharts.AmGraph();
                      graph.valueField = "visits";
                      graph.colorField = "color";
                      graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
                      graph.type = "column";
                      graph.lineAlpha = 0;
                      graph.fillAlphas = 1;
                      chart.addGraph(graph);
              
                      // CURSOR
                      var chartCursor = new AmCharts.ChartCursor();
                      chartCursor.cursorAlpha = 0;
                      chartCursor.zoomable = false;
                      chartCursor.categoryBalloonEnabled = false;
                      chart.addChartCursor(chartCursor);
              
                      chart.creditsPosition = "top-right";
              
                      // WRITE
                      chart.write("chartdiv");
              });
              ```
        - 使用2
            - ```javascript
              AmCharts.makeChart("chartdiv", {
                  type: "pie",
                  dataProvider: [{
                      "country": "Czech Republic",
                          "litres": 156.9
                  }, {
                      "country": "Ireland",
                          "litres": 131.1
                  }, {
                      "country": "Germany",
                          "litres": 115.8
                  }, {
                      "country": "Australia",
                          "litres": 109.9
                  }, {
                      "country": "Austria",
                          "litres": 108.3
                  }, {
                      "country": "UK",
                          "litres": 65
                  }, {
                      "country": "Belgium",
                          "litres": 50
                  }],
                  titleField: "country",
                  valueField: "litres",
                  balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                  legend: {
                      align: "center",
                      markerType: "circle"
                  }
              
              });
              ```
- 习惯
    - 命名方式规律
        - jquery.插件名.功能名.js
    - 存储
        - 网站js/下        分子文件夹存放不同插件的文件
- 自定义
    - 函数
        - jQuery.extend(object);          # 直接调用
        - jQuery.fn.extend(object);      # 对象调用 $.extend($.fn,{})或$fn.extend({})
    - 例子
        - ```javascript
          $.extend({
                  max : function(a, b) {
                          return a > b ? a : b;
                  },
                  min : function(a, b) {
                          return a < b ? a : b;
                  }
          });
          $.fn.extend({
                  max1 : function(a, b) {
                          return a > b ? a : b;
                  }
          });
          $.extend($.fn, {
                  min1 : function(a, b) {
                          return a < b ? a : b;
                  }
          })
          alert($.max(1, 2));
          alert($("html").max1(2, 1));
          alert($("html").min1(1, 2));
          ```
