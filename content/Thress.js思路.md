- animate动画
    - window.requestAnimationFrame(callback)
        - 返回id, 传给window.cancelAnimationFrame()取消该次动画
        - 原理
            - 传递浏览器回调函数，浏览器调用它更新画面。
                - 与setInterval()不同之处在于自动控制了时间。对方法调用进行了优化。页面失去选中时动画自动暂停。
            - 回调函数中　调用了requestAnimation(callback)来循环调用
            - 通常执行callback函数来开始动画
        - 最原始的是window.setTimout()或者window.setInterval()来更新元素的位置
            - 更新频率要达到每秒60次
    - animation
        - ```javascript
          function threeStart() {
              initThree();
              initCamera();
              initScene();
              initLight();
              initObject();
              animation();
          
          }
          function animation() {
              //renderer.clear();
              camera.position.x = camera.position.x + 1;
              renderer.render(scene, camera);
              requestAnimationFrame(animation);
          }
          或
          function animation()
          {
              mesh.position.x-=1;
              renderer.render(scene, camera);
              requestAnimationFrame(animation);
          }
          ```
    - render
        - ```javascript
          function animate(){
              for(var i = 0; i < apps.length; ++i){
                      apps[i].animate();
              }
              requestAnimationFrame(animate);
          }
          function App(...){
              this.animate = function(){
                      render();
                      stats.update();
              }
              function render(){
                      camera.position.x += (mouseX - camera.position.x) * 0.05;
                      camera.position.y += (-mouseY - camera.position.y) * 0.05;
                              # 相机位置随鼠标移动
                              ## mouseX, mouseY为自定义的全局变量
                      camera.lookAt(scene.postion);
                      renderer.render(scene, camera);
              }
          }
          ```
    - render计算
        - ```javascript
          var mouseX = 0, mouseY = 0;
          document.addEventListener('mousemove', onDocumentMouseMove, false);
          function onDocumentMouseMove(event){
              mouseX = (event.clientX - windowHalfX);
              mouseY = (event.clientY - windowHalfY);
          }
          ```
    - 相机旋转
        - 围绕y轴, 半径1000的圆作圆周运动
            - ```javascript
              var timer = 0.0001 * Date.now();
                  # 用当前时间作弧度
              camera.position.x = Math.cos(timer) * 1000;
              camera.position.z = Math.sin(timer) * 1000;
              camera.lookAt(scene.position);
              ```
    - 自发光变化
        - material.emissive.setHSV(0.54, 1, 0.7 * (0.5 + 0.5 * Math.sin(35 * timer)));
    - 引擎
        - 组成
            - 定义与初始化相机
            - 定义与初始化场景
            - 定义与初始化光
            - 定义与初始化渲染器
            - 定义与初始化性能监视器
            - 定义鼠标事件, 窗口缩放事件
                - ele.addEventListener('mousedown', ...)
                - ele.addEventListener('mouseup', ...)
                - ele.addEventListener('mousemove', ...)
                - window.addEventListener('resize', ...)
            - 播放音乐
- 结构
    - 定义App类
        - App类将相机，视图，灯光等场景代码封装，为了场景的代码的重用
            - 场景重新new
        - 例子1, 视口app
            - function App( containerId, fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight )
    - 对象池
        - 介绍
            - 用过的对象保存起来，下次需要时重复使用。
            - 减少频繁创建对象所造成的内存开销和cpu开销
        - 自定义ObjectPool.js
            - ```javascript
              function ObjectPool(){
                  this.pool = new Array();
                  this.avail = new Array();
                          # 可用在pool中的索引，pool中对象不在使用，待再利用时放入avail中
              }
              ObjectPool.prototype.createObject = function(){
                  return new Object();
              }
                  #  创建一个多态的对象(如一个豆径)，需要重载,
              ObjectPool.prototype.returnObject = function(poolId){
                  this.avail.push(poolId);
              }
                  # 标记为可再利用
              ObjectPool.prototype.getObject = function(){
                  if(this.avail.length ==0){
                          var o = this.createObject();
                          o.poolId = this.pool.length;
                          this.pool.push(o);
                          this.avail.push(o.poolId);
                  }
                  var poolId = this.avail.pop();
                  return this.pool[poolId];
              }
              ```
- 控制
    - resize
        - ```javascript
          window.addEventListener( 'resize', onWindowResize, false );
          
          function onWindowResize( event ) {
              SCREEN_WIDTH = window.innerWidth;
              SCREEN_HEIGHT = window.innerHeight;
          
              renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
              camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
              camera.updateProjectionMatrix();
                      # 产生透视投影矩阵
          }
          ```
    - 鼠标射线
        - ```javascript
          mouse = new THREE.Vector3(0, 0, 1);
          projector = new THREE.Projector();
          ray = new THREE.Ray(camera.position);
          
          function onDocumentMouseMove(event){
              mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
              mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                      # 取得鼠标的位置，并将其转换为-1到1之间(归一化)
              ray.direction = projector.unprojectVector(mouse.clone(), camera);
                      # 得到当前鼠标指向二维的点在程序三维中的位置
              ray.direction.subSelf(camera.position).normalize();
                      # 鼠标所在的点送去相机所在的点，得到相机指向鼠标所在点的向量并规范化
              intersects = ray.intersectObject(plane);
                      # 计算射线与模型的相交点数组
          }
          ```
- 场景
    - 天空盒
        - 两种实现
            - 立方体内部贴纹理
            - 椭球内部贴纹理
        - 立方体天空盒
            - ```javascript
              var r = 'textures/cube/Bridge2';
              var urls = [r + 'posx.jpg', r + 'negx.jpg', r + 'posy.jpg', r + 'negy.jpg', r + 'posz.jpg', r + 'negz.jpg'];
              var textureCube = THREE.ImageUtils.loadTextureCube(urls);
              textureCube.format = THREE.RGBFormat;
                  # 设置图片格式，此格式不需要透明度。节约内存又加快渲染速度
              var shader = THREE.ShaderLib['cube'];
                  # ShaderLib与three.js引擎的一个数组, 其中的cube存放的是立方体贴图的shader
              shader.uniforms['tCube'].value = textureCube;
                  # 纹理给shader着色器
              var material = new THREE.ShaderMaterial({
                  fragmentShader: shader.fragmentShader,
                  vertexShader: shader.vertexShader,
                  uniforms: shader.uniforms,
                  depthWrite: false,
                  side: THREE.BackSide
              });        # 用ShaderMaterial材质包装shader
              mesh = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), 22, material);
              sceneCube.add(mesh);
              ```
- 性能
    - 概要
        - 3d设计的精髓在于性能优化
        - 使用连续内存(如数组)将加速程序运行，不连续内存将增加读取时寻址的时间。
    - 使用
        - ```javascript
          $(document).ready(
              function(){
                  var container = document.getElementById("container");
                  var app = new MineCraftApp();
                  app.init({container: container});
                          # container属性 表示最后渲染结果外层的div
                  app.run();
              }
            );
          ```
    - App
        - 介绍
            - 封装了three.js的一些基本操作, 如
                - 创建渲染场景
                - 创建相机
                - 控制画布缩放
                - 鼠标输入
            - 对three.js进行了面向对象的封装，可以面向对象编程
        - 函数
            - ```javascript
              prototype.init(param)
                  # 初始化
                  ## 参数是一个键值对对象
                  ## 一个WebGLRenderer渲染器
                  ## 一个场景 THREE.Scene()
                  ## 一个透视投影 THREE.PerspectiveCamera
                  ## 一个投影器 THREE.Projector()
                  ## 一些鼠标键盘的操作
              prototype.run = function(){
                  # 是渲染循环，会不断被调用
                  ## 调用每一个Sim.Object的update
                  this.update();
                  this.renderer.render(this.scene, this.camera);
                  var that = this;
                  requestAnimationFrame(function(){that.run(); });
                          # run的帧循环
              }
                  
              prototype.addObject
                  # 将Sim.Object对象加入场景中
              prototype.removeObject
                  # 将Sim.Object对象从场景移出
              ```
        - 属性
            - renderer
            - scene
            - camera
            - objects
                - 场景中的所有可视对象
    - Publisher
        - 介绍
            - 一个事件驱动模型
            - Sim.Publisher用于
                - 记录事件
                - 发送事件
                - 处理事件
            - 当事件发生时，它遍历注册的回调列表，调用每一个注册的函数
        - 函数
            - prototype.subscribe = function(message, subscriber, callback)
                - 发起订阅
                    - message表示事件名
                    - 放callback函数的类
                    - 事件发生时的执行回调函数
            - prototype.unsubscribe = function(message, subscriber, callback)
                - 取消订阅, 删除MessageTypes数组中事件名对就的链表中的一节点
                    - message值为null, false, undefined时表示删除整个链表(不删除事件)
            - prototype.publish = function(message)
                - 触发事件
        - 属性
            - MessageTypes
                - 事件与其处理函数的集合
                    - 形如 messageType['remove'] = [subscriber, callback] -> [subscriber, callback]
                        - 'remove'是事件名, subscriber是订阅者, callback是订阅者该事件的回调方法
                        - -> 是链表的意思
    - Object
        - 介绍
            - sim.js所有封装类的基类, 派生于Sim.Publisher
            - 可以表示大多数对象(自定义的对象派生于它)
        - 方法
            - prototype.setPosition
                - 设置object3D对象的位置
            - prototype.setScale
            - prototype.setVisible
            - prototype.update
                - 更新该对象和它的children
                    - 在每一次渲染循环时调用,用来产生自己的动画
            - prototype.addChild
                - 添加子对象, 如汽车添加轮子
            - prototype.removeChild
        - 属性
            - object3D
                - 用于保存three.js中的Object3D对象
            - children
