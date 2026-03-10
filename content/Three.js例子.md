- 16万个三角形
    - 定义
        - o-> triangles = 160000
        - o-> 每个三角形有３个顶点, 一个顶点三个float表示，共triangles * 3 * 3个float
            - 用数组存放
        - o-> 每个顶点一个法向量，一个三角形３个法向量
    - 赋值
        - o-> 所有三角形顶点应该在一个以原点为中心的正方体内
        - o-> 三角形的位置在正方体内随机分布
    - 实现
        - ```javascript
          var geometry = new THREE.BufferGeometry();
            geometry.attributes = {
              index:{
                      itemSize: 1,
                      array: new Uint16Array(triangles * 3),
                      numItems: triangles * 3
              },
                      # 索引
                      ## 每一个数组元素的聚会范围是[0, 65535],如果顶点数超过65535,必须通过geometry的offset成员来进一步设置偏移量。
                      ### 65535是16位整型
              position: {
                      itemSize: 3,
                      array: new Float32Array(triangles * 3 * 3),
                      numItems: triangles * 3 * 3
              },
                      # 位置
              normal:{
                      itemSize: 3,
                      array: new Float32Array(triangle * 3 * 3),
                      numItems: triangles * 3 * 3
              },
                      # 法线
              color: {
                      itemSize: 3,
                              # 一项目(元)由几个字节组成
                      array: new Float32Array(triangles * 3 * 3),
                              # 实际存项目的内存数组
                      numItems: triangles * 3 * 3
                              # 有多少个项目
              }
                      # 颜色
            }
              # Uint16Array分配指定个数的16位无符号整数，寝值为0
              ##  如果内存紧张，无法分配时则引发异常
              ## api uint16Array = new Uint16Array(length);
              ### uint16Array = new Uint16Array(array);
              # 位置，用Vector3来表示，共有triangles * 3个Vector3
              ## 每个Vector3有x, y, z三个分量组成, 所以顶点需要triangles * 3 * 3个浮点数表示。
              # 法线, 一个点对应一个法线, 由x, y, z三个float组成，所以需要triangles    * 3 * 3个float
              # 颜色, 每个顶点一种颜色，颜色由R, G, B组成，所以需要triangles * 3 * 3个float
            var n = 800, n2 = n/2;
              # n是正方体的边长
            # 为三角形顶点赋随机值，后计算每个顶点的法向量
            ## positions数组每隔9个是一个三角形
            ## normals数组每隔9个是一个三角形
            # 随机生成颜色，赋给顶点
            ## colors数组每隔9个是一个三角形
            # 给geometry设置索引和偏移量
            ## 索引对应到点，所以有triangles * 3个
            ### 索引从0开始
            # 将BufferGeometry和材质组成mesh
          ```
- 人物粒子
    - 生成粒子
        - ```javascript
          var vertices = geometry.vertices;
          var mesh = new THREE.ParticleSystem(geometry, new THREE.ParticleBasicMaterial({size: 3, color: c}));
          mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
          mesh.position.x = mesh.position.y = mesh.position.z = position;
          ```
    - 渲染
        - ```javascript
          render()
          mesh.geometry.verticesNeedUpdate = true;
              # 如果不刷新，渲染出来的顶点位置不会改变
          renderer.clear();
          composer.render(0.01);
              # composer为THREE.EffectComposer, 效果组合器
          ```
- 多视口
    - viewport
    - 注意
        - 视口的坐标为归一化的坐标。左上角是(0, 0), 右下角是(1, 1)
    - 阴影贴图
        - canvas画阴影
        - 阴影纹理
            - var shadowTexture= new THREE.Texture(canvas);
            - shadowTexture.needsUpdate = true;
                - 表示纹理是新纹理，在绘制的时候，需要更新到材质上
            - var shadowMaterial = new THREE.MeshBasicMaterial({map:shadowTexture});
    - 平面和线框同时显示
        - 材质wireframe属性只有true和false,所以要创建2个不同材质的相同物体
        - THREE.SceneUtils.createMultiMaterialObject(geometry, materials)
            - 传递一个几何体和材质数组，几何体每一个材质组合成一个Mesh, 将Mesh加入组group对象中，返回组对象。
- 杰克与豆径
    - 主要内容
        - 天空盒
        - 生长效果
            - 树叶的生长
            - 树干变形
            - 音乐渲染控制生长
        - 对象池
    - 设计
        - 鼠标操作
        - 植物模型
            - plant
                - 豆干，豆径(leaf3.js)，豆叶(leaf5.js)
                - 豆径豆叶的材质
        - 植物生长
        - 阴天、晴天
            - 天空材质
        - 相机动画
    - 音乐
        - ```html
          <audio id="audio" preload="auto" loop>
                      # 预加载音乐并循环播放
              <source src="a.mp3" type="audio/mpeg">
          </audio>
          
          <script>
              audio = document.getElementById('audio');
              audio.play();
          </script>
          ```
- 流动立方体
    - 设计
        - 从相机到鼠标发射射线, 与射线相交的点，就是选中物体的某个点
- 我的世界
    - ```javascript
      MineCraftApp = function(){
          Sim.App.call(this);
      }
      MineCraftApp.prototype = new Sim.App();
      
      MineCraftApp.prototype.init = function(param){
          Sim.App.prototype.init.call(this, param);
            # 调用父类的init函数，在父类中初始化相机, 场景等类
              # 性能监视器
              # 天空盒
              # 相机控制类
              # 场景中的一个个小物体
      }
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
- 汽车换装
    - 设计
        - 汽车类
            - 更换s汽车模型
            - 更换汽车各部分颜色
        - 两个相机
        - 两个场景
        - 三种光源
        - 天空盒
        - 渲染器
        - 效率监听器
        - 初始化各种材质
    - 汽车类
        - veyron: {
            - name: '布加迪威龙',
            - url: 'obj/veyron/VeyronNoUv_bin.js',
            - author: '布加迪威龙',
            - init_rotation: [0, 0, 0],
            - scale: 5.5,
            - init_materials: 4,
            - body_materials: [2],
            - object: null,
            - buttons: null,
            - materials: null
        - }
- 分形
    - ```javascript
      uniforms = {
          scale: {type: 'v2', value: new THREE.Vector2()},
          c: {type: 'v2', value: new THREE.Vector2()}
      }
      material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent
      });
      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.0), material);
          # 用 2 * 2 的平面来覆盖浏览器窗口
      function onWidowResize(event){
          renderer.setSize(window.innerWidth, window.innerHeight);
          uniforms.scale.value.x = window.innerWidth / 2;
          uniforms.scale.value.y = window.innerHeight;
      }
      
      o-> 片元着色器中代码 
      uniform vec2 c;
      uniform vec2 scale;
      void main(void){
          float R = (gl_FragCoord.x - scale.x) / scale.y;
          float I = (gl_FragCoord.y - scale.x) / scale.y;
          float R2 = R * R, I2 = I * I;
          int mm;
          for(int m =0; m < 255; m++){
              I = (R + R) * I + c.y; R = R2 - I2 + c.x; R2 = R * R; I2 = I * I; mm = m;
              if(abs((I2) / (I + R)) > 10.) break;
          }
          if(mm == 254) gl_FragColor = vec4(0., 0., 0., 1.);
          else{
              float a = float(mm);
              a = mod(a, 15.) / 5.;
              gl_FragColor = vec4(max(0., abs(a - 1.5) - .5)),
                  max(0., 1. - abs(a - 1.)),
                  max(0., 1. - abs(a - 2.)),
                  1.);
          }
      }
      ```
- 镜像分形
    - 介绍
        - 镜面反射场景
    - ```javascript
      var mirrorMesh = new THREE.Mesh(planeGeo, groundMirror.material);
          # groundMirror.material是THREE.Mirror中定义的材质. 会在每次update(或者render)过程中变化
          ## groundMirror.updateTextureMatrix()
          ## groundMirror.render() 要在update或render前重新渲染镜子的纹理.
          ### 多面镜子时, 如上一个个更新会有干扰, 要用下面代码更新
          ### groundMirror.renderWithMirror(verticalMirror);
          ### verticalMirror.renderWithMirror(groundMirror);
      mirrorMesh.add(groundMirror);
      mirrorMesh.rotateX(-Math.PI / 2);
      scene.add(mirrorMesh);
      
      THREE.ShaderLib['mirror'] = {
          uniforms: {
              mirrorColor: {
                  type: 'c',
                  value: new THREE.Color(0x7F7F7F)
              },
              mirrorSampler: {type: 't', value: null},
              textureMatrix: {type: 'm4', value: new THREE.Matrix4()}
          },
          vertexShader: [
              'uniform mat4 textureMatrix;',
              'varying vec4 mirrorCoord;',
              'void main() {',
                  'vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
                  'vec4 worldPosition = modelMatrix * vec4(position, 1.0);',
                  'mirrorCoord = textureMatrix * worldPosition;',
                  'gl_Position = projectionMatrix * mvPosition;',
              '}'
          ].join(''\n),
          fragmentShader: [
              'uniform vec3 mirrorColor;',
              'uniform sampler2D mirrorSampler;',
              'varying vec4 mirrorCoord;',
              'float blendOverlay(float base, float blend){',
                  'return (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)));',
              '}',
              'void main(){',
                  'vec4 color = texture2DProj(mirrorSampler, mirrorCoord);',
                  'color = vec4(blendOverlay(mirrorColor.r, color.r), blendOverlay(mirrorColor.g, color.g), blendOverlay(mirrorColor.b, mirrorColor.b), 1.0);',
                  'gl_FragColor = color;',
              '}'
          ].join('\n')
      };
      ```
- 文字
    - 介绍
        - 原理: 每个要显示的文字生成mesh
- 小地图
    - 介绍
        - 实现方式1, 在天空直接用正投影相机
            - 实现简单,但渲染效果差,占很多cpu时间(重新绘制一次整个场景)
        - 实现方式2, 用正投影相机, 但用画大地图的数据来绘制
            - 小地图渲染用很少时间, 因为复杂模型都用小方块或图片代替了
    - o-> 实现
        - ```javascript
          camera.lookAt(scene.position);
          camera2.lookA(scene.position);
          
          renderer2 = new THREE.CanvasRenderer();
              # 两个WebGLRenderer位置重叠时,会渲染不正常(其中一个全黑)
          renderer2.setSize(200, 150);
          
          renderer.render(scene, camera);
          renderer2.render(scene, camera2);
          ```
