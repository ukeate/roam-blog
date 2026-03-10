- DOM相关
    - 属性
        - window.innerWidth
        - window.innerHeight
    - 事件
        - ```javascript
          window.addEventListener('resize', onWindowResize, false);
          function onWindowResize(){
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
                  controls.handleResize();
          }
          ```
    - 三大组件
        - 场景(scene)
            - var scene = new THREE.Scene();
        - 相机(camera)
            - var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);                                        # 透视相机
        - 渲染器(renderer)
            - ```javascript
              var renderer = new THREE.WebGLRenderer();
              renderer.setSize(window.innerWidth, window.innerHeight);
              document.body.appendChild(renderer.domElement);                        # domElement 是画布
              render( scene, camera, renderTarget, forceClear )
              ```
    - 版本
        - THREE.VERSION
- Renderer
    - 使用
        - ```javascript
          THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);                # 透视摄像机
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 600;                                                                # 相机位置
          camera.up.x = 0;
          camera.up.y = 1;
          camera.up.z = 0;                                                                        # 相机"上"的方向
          camera.lookAt({x:0, y:0, z:0});                                                                # 视野中心坐标
          camera.setViewOffset(fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight)
                  # 相机的有效显示部分
          
          WebGLRenderer 
          renderer = new THREE.WebGLRenderer({ antialias: false});
                          # 抗锯齿为false。true时显示更清晰，更耗cpu
                  renderer.setClearColorHex( 0x000000, 1);
                  renderer.setSize(window.innerWidth, window.innerHeight);
                          # 设置渲染器的宽度和高度
                  renderer.autoClear = false;
                  renderer.sortObjects = false;
                  
                  renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
                          # 设置一个渲染目标
                  renderTarget.minFilter = THREE.LinearFilter;
                  renderTarget.magFilter = THREE.NearestFilter;
                  postBloom = new BloomEffect(renderer, renderTarget, window.innerWidth, window.innerHeight, 4);
          
                  renderer.shadowMapEnabled = true;
                          # 开启显示阴影
                          ## 要显示阴影，还要设置物体castShadow = true; receiveShadow = true;
                          ## shadowMap是一张记录每个像素用于比较遮挡关系的texture
                  renderer.shadowMapSoft = true;
                          # 可以使阴影更加平滑，产生更少的锯齿
                  renderer.shadowCameraNear = 3;
                  renderer.shadowCameraFar = camera.far;
                  renderer.shadowCameraFov = 50;
                          # 表示摄像机近平面、远平面、角度的值。在摄像机范围内的物体产生阴影
                  renderer.shadowMapBias = 0.0039;
                  renderer.shadowMapDarkness = 0.5;
                          # 表示阴影的透明度, 0是完全透明
                  renderer.shadowMapWidth = 512;
                  renderer.shadowMapHeight = 512;
                          # 指定阴影渲染面的大小
                          ## 根据shadermap原理，阴影需要先绘制在一个缓冲区中，再根据缓冲区计算阴影。这就是缓冲区的大小。
          
                  container = document.createElement('div');
                  document.body.appendChild(container);
                  container.appendChild(renderer.domElement);
          ```
- Camera
    - 使用
        - ```javascript
          camera = new THREE.Camera(60, 1, 1, 6500);
          camera.position.z = -85;
          camera.position.y = 40;
          camera.aspect = window.innerWidth / window.innerHeight;
          
          cameraTarget = new THREE.Object3D();
                  # 相机目标
          cameraTarget.position.y = 10;
          cameraTarget.position.z = 6000;
          camera.target = cameraTarget;
          
          camera.updateProjectionMatrix();
          PerspectiveCamera
          THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);                # 透视摄像机
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 600;                                                                # 相机位置
          camera.up.x = 0;
          camera.up.y = 1;
          camera.up.z = 0;                                                                        # 相机"上"的方向
          camera.lookAt({x:0, y:0, z:0});                                                                # 视野中心坐标
          camera.setViewOffset(fullWidth, fullHeight, viewX, viewY, viewWidth, viewHeight)
                  # 相机的有效显示部分
          OrthographicCamera
          OrthographicCamera(left, right, top, bottom, near, far)
                  # 左右上下远近
          controls
          contorls = new THREE.FirstPersonControls(camera);
          contorls.movementSpeed = 20;                                        # 移动速度
          controls.lookSpeed = 0.05;                                                # 转头速度
          controls.lookVertical = true;                                                # 是否允许抬头或低头
          PathControls        # 路径相机
          controls = new THREE.PathControls(camera);
          controls.createDebugPath = true;
                  # 是否显示轨道
                  ## scene.add(controls.debugPath)来添加显示
          controls.waypoints = [[-500, 0, 0], [0, 200, 0], [500, 0, 0]];
                  # 路径的转折点，非转折点用插值来计算
          controls.duration = 28;
                  # 轨道的一头到另一头的运动时间(ms), 默认是10 * 1000
          controls.useConstantSpeed =true;
                  # 设置为匀速运行
          controls.lookSpeed = 0.06;
                  # 转头速度, 默认是0.005。数越大，转头越快
                  ##页面显示帧数越快, 转头越快
          controls.lookVertical = true;
                  # 是否可以上下转头
          controls.lookHorizontal = true;
                  # 是否可以左右转头
          controls.verticalAngleMap = {srcRange: [0, 2 * Math.PI], dstRange:[1.1, 3.8]};
          controls.horizontalAngleMap = {srcRange: [0, 2 * Math.PI], dstRange: [0.3, Math.PI - 0.3]};
          controls.lon = 180;
          
          controls.init();
          scene.add( controls.animationParent );
                  # 用THREE.js提供的Animation类来插值改变相机位置和方向
                  ## pathControls类中有initAnimationPath函数将动作转换为关键帧，存到了parentAnimation属性中
                  ### THREE.AnimationHandler中的add函数，把scene中的parentAnimation中的关键帧动作键入THREE.JS的动画引擎中。动画引擎会自动在关键帧之间插值，来决定关键帧中物体(如相机)的位置、大小、缩放等。
          
          function  render(){
                  controls.update(delta);
                  THREE.AnimationHandler.update(delta);
                          ### 让动画引擎动起来
          }
          TrackballControls   # 轨迹球相机
          介绍
                  追踪相机, 轨迹球相机
          作用
                  控制相机，左键旋转，右键平移，滚轮缩放
          api
                  THREE.TrackballControls = function (object, domElement)
                          # object一般是传入相机这个变量
                          # domElement为在哪个div中监听鼠标事件, 默认为document
          
          controls = new THREE.TrackballControls(camera);
                  # 传入相机作为参数来控制相机
          controls.rotateSpeed = 5.0;
                  # 旋转的速度
          controls.zoomSpeed = 5;
                  # 缩放的速度
          controls.panSpeed = 2;
                  # 平移的速度
          controls.noZoom = false;
                  # 不允许放大
          controls.noPan = false;
                  # 不允许右键摇镜头
          controls.staticMoving = false;
                  #  是否静态移动, false时移动镜头会有弹性
          controls.dynamicDampingFactor = 0.3;
                  # 阻力系数
                  ## 旋转时慢慢停下来是这个系数起作用
          
          function animate(){
                  requestAnimationFrame(animate);
                  controls.update();
                          # 完成更新相机属性的工作
                  rederer.render(scene, camera);
                  stats.update();
          }
          
          FlyControls     # 飞行相机
          FirstPersonControls     # 第一人称相机
          ```
- Scene
    - 使用
        - ```javascript
          scene = new THREE.Scene();  # 场景
          scene.add(meshCube);
          scene.add(light);
          ```
- Light
    - 使用
        - ```javascript
          // light.position.x = x;
          light.position.set(0, 0, 300).normalize();;        
                  # 坐标, 向量化为1
          
          scene.add(light);                        
          PointLight  # 点光源
          var light = new THREE.PointLight(0x00FF00);
          DirectionalLight    # 方向光
          var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125);
                  # 0.125是颜色的密度, 和透明度差不多, 这里表示很淡很淡的白色
          scene.add(dirLight)
          AmbientLight    # 环境光
          scene.add(new THREE.AmbientLight(0x111111));
          SpotLight   # 聚光灯
          light = new THREE.SpotLight(0xffffff, 1.25);
              light.target.position.set(0, 0, 0);
              light.castShadow = true;
                      # 显现阴影，默认不显现
                      ## 显现阴影还要对renderer进行设置
          ```
- Particle
    - particleSystem = new THREE.ParticleSystem(particles, material);
- [[Three.js API Object]]
- [[Three.js API 工具类]]
- 扩展
    - 性能
        - [[stats.js]]
    - 动画引擎
        - [[Tween.js]]
    - Loader
        - VTKLoader
            - ```javascript
              var loader = new THREE.VTKLoader();
              loader.addEventListener('load', function(event){
                      var geometry = event.content;
                      var mesh = new THREE.Mesh(geometry, material);
                      mesh.position.setY( - 0.09);
                      scene.add(mesh);
              });
              loader.load("models/vtk/bunny.vtk");
              JSONLoader
              THREE.JSONLoader.prototype.load = functiono(url, callback, texturePath)
                  # url是json文件的地址
                  # callback在异步加载完后执行
                  # texturePath 纹理路径，没有这个参数时，在当前路径下寻找默认纹理。
              ```
        - JSONLoader
            - THREE.JSONLoader.prototype.load = functiono(url, callback, texturePath)
                - url是json文件的地址
                - callback在异步加载完后执行
                - texturePath 纹理路径，没有这个参数时，在当前路径下寻找默认纹理。
        - BinaryLoader
            - 使用
                - ```javascript
                  var loader = new THREE.BinaryLoader(true);
                  document.body.appendChild(loader.statusDomElement);
                          # 实时显示加载进度
                  
                  THREE.BinaryLoader = function(showStatus){
                  THREE.Loader.call(this, showStatus);
                          # showStatus表示是否显示进度条
                  }
                  THREE.BinaryLoader.prototype.load = function(url, callback, texturePath, binaryPath)
                  # url是js文件的路径
                  # callback 当url中数据加载完成后调用。callback中接收geometry作为参数
                  # texturePath 纹理路径，不指定默认放在url同文件夹下，或无纹理。
                  # binaryPath 二进制文件的路径，不指定时，根据url地址中的文件来加载。
                  ```
        - ColladaLoader
        - UTF8Loader
            - 导入 google WebGL-Loader格式的高压缩文件
        - SceneLoader
            - 导入各物体、变换层级、材质、纹理、相机、光源的统一js文件，其中有其它js的url引用
    - Controls
        - 见Camara
    - Detector
        - if(! Detector.webgl) Detector.addGetWebGLMessage();
