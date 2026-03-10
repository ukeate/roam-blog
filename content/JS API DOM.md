- window对象
    - document
        - 属性
            - id
            - innerHTML                               # 非标准但通用
            - body
                - 方法
                    - appendChild(domElement)
        - 方法
            - getElementById("")
    - element
        - 属性
            - innerHTML
            - style
                - display = "none"
                - visibility = "hidden"
            - className
        - 方法
            - createElement("div")
            - createTextNode(msg)
            - appendChild(ele)
    - XMLHttpRequest
        - var req = new XMLHttpRequest()
        - 方法
            - open("GET", url)
            - send(null)                              # null表示不带正文地发送这个请求
            - ```javascript
              onreadystatechange = function(){        # 重写回调函数
                  if(req.readyState == 4 && req.status == 200){
                      var text = req.responseText;    # 响应的字符串
                  }
              }
              ```
    - localStorage
    - Worker
        - 介绍
            - it is a javascript running in the background, without affecting the performance of the page.
            - dom中的js线程在执行时会阻塞
        - 使用
            - ```javascript
              var w;
              // start worker
              function startWorker(){
                  if(typeof(Worker) !== 'undefined'){
                      if(typeof(w) == 'undefined'){
                          w = new Worker('demo_workers.js');
                      }
                      w.onmessage = function(event){
                          ＃ worker 's api, will call postMessage()
                          document.getElementById('result').innerHTML = event.data;
                      };
                  }else {
                      document.getElementById('result').innerHTML = 'sorry, your browser does not support Web Workers...';
                  }
              }
              // stop worker
              w.terminate();                                                        ＃ worker 's api, will trigger w.onmessage();
              w = undefined;
              
              /* demo_workers.js */                                            # 外部的js文件不能访问window, document, parent对象
              var i = 0;
              function timeCount(){
                  i = i + 1;
                  postMessage(i);                                            # worker 's api, when onmessage() was triggered.
                  setTimeout('timeCount()', 500);
              }
              timedCount();
              ```
    - EventSource
        - 介绍
            - 浏览器推送
        - 事件
            - onopen
            - onmessage
            - onerror
        - 使用
            - ```javascript
              var source = new EventSource("demo_sse.php");
              source.onmessage = function(event){
                  document.getElementById('result').innerHTML += event.data + '<br/>';
              };
              // demo_sse.php
              <?php
              header('Content-Type: text/event-stream');
              header('Cache-Control: no-cache');
              
              $time = date('r');
              echo "data: The server time is: {$time}\n\n";
                  # data在上面event.data中引用
              flush();
              ?>
              ```
- 控件
    - ActiveXObject
        - new ActiveXObject("Excel.Application");         # Microsoft.XMLHTTP, ie中适用
        - Server.CreateObject("Microsoft.XMLHTTP")        # 在chrome中不起作用, 可以用 new XMLHttpRequest()创建
    - canvas
        - 概念
            - 原点: canvas左上角
            - 默认Style为black
            - 颜色设定
                - "red" "blue"
                - `"#EEEEFF"`
                - "rgb(1-255, 1-255, 1-255)"
                - "rgba(1-255, 1-255, 1-255, 0-1)"
            - 路径
                - 可以被填充多个轮廓或图形的操作。
        - 基本使用
            - var context =canvas.getContext("2d");
            - context.fill()//填充
            - context.stroke()//绘制边框
            - context.lineWidth//图形边框宽度
            - context.fillStyle//填充的样式
            - context.strokeStyle//边框样式
        - 绘制
            - 矩形
                - content.fillRect(x, y, width, height)
                - strokeRect(x, y, width, height)         # x, y是起点坐标, width, height为宽和高
            - 清除矩形区域
                - context.clearRect(x,y,width,height)
            - 圆弧
                - context.arc(x, y, radius, startAngle,endAngle, anticlockwise)
                    - x, y是圆心坐标, radius是半径, startAngle, endAngle是开始、结束弧度, anticlockwise=false时顺时针画圆
                    - 一刻钟是零度, 弧度可以用Math.PI来表示
        - 例子
            - 矩形
                - context.fillRect(0, 120, 100, 100);
                - context.strokeRect(120, 120, 100, 100);
                - context.clearRect(50, 50, 240, 120);
            - 圆弧
                - context.beginPath();
                - ctx.arc(100,75,50,0,1.3 * Math.PI, false);
                - context.closePath();
                - context.fill();                         # 或ctx.stroke()画线, fill()填充开始点与结束点的连线
        - image
            - var image = ctx.getImageData(0, 0, 256, 256);                   # 取画布矩形区域的图像
            - ctx.putImageData(image, 10, 70)             # 把图像复制到画布的一个起点
            - 例子
                - ```javascript
                  var c=document.getElementById("myCanvas");
                  var ctx=c.getContext("2d");
                  var imgData=ctx.createImageData(100,100);
                  for (var i=0;i<imgData.data.length;i+=4)                    # 一个像素有4个值RGB + alpha, alpha=255表示不透明
                  {
                      imgData.data[i+0]=255;
                      imgData.data[i+1]=0;
                  
                      imgData.data[i+2]=0;
                      imgData.data[i+3]=255;
                  }
                  ctx.putImageData(imgData,10,10);
                  ```
        - 优化
            - canvas.width = canvas.width                     # 一种巧妙的方法清除并重置画布
        - [[WebGL]]
