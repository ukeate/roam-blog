- Utils
    - ImageUtils
        - loadTextureCube(["", ""]);
    - ShaderUtils
        - var shader = lib["cube"]
    - UniformsUtils
        - clone(shader.uniforms)
    - GeometryUtils
        - merge = function(geometry1, object2/* mesh | geometry */){ ... }
            - geometry1是合成后的对象，第二个是要合并的对象，如果是mesh，就取mesh中的geometry对象
- Filter
    - LinearFilter
    - NearestFilter
- Effect
    - BloomEffect
        - postBloom = new BloomEffect(renderer, renderTarget, window.innerWidth, window.innerHeight, 4);
- Helper
    - 辅助对象一键打开或关闭
        - ```javascript
          # 将所有辅助对象放到helps数组中
          var help = [];
          helps.push(helper);
          helps.push(faceNormalsHelper);
          helps.push(vertexNormalsHelper);
          
          window.addEventListener('keydown', onKeyDown, false);
          
          function setVisible(visible){
                  for(var i = 0; i < helps.length; i++){
                          helps[i].visible = visible;
                  }
          }
          
          function onKeyDown(event){
                  switch(event.keyCode){
                          case 65: /*A*/
                                  setVisible(false);
                                  break;
                          case 83: /*S*/
                                  setVisible(true);
                                  break;
                  }
          }
          ```
    - GridHelper
        - 介绍
            - 网格辅助类, 绘制网格和网格线颜色
        - api
            - THREE.GridHelper = function(size, step)
                - size定义网格正方形边长, step是间隔距离
        - 使用
            - var helper = new THREE.GridHelper(200, 10);
            - helper.setColors(0x0000ff, 0x808080);
                - 第一个是x y z轴颜色, 第二个是其它线条颜色
            - helper.position.y = -150;
            - scene.add(helper);
    - BoxHelper
        - 介绍
            - 长方体包围盒, 椭圆包围盒, 包围物体用于检查碰撞或辅助设计中表示选中
        - 使用
            - var boxHelper = new THREE.BoxHelper(mesh);
            - scene.add(boxHelper);
    - FaceNormalsHelper
        - 介绍
            - 辅助画法线
        - api
            - FaceNormalsHelper(object, size, hex, linewidth)
        - 使用
            - var faceNormalsHelper = new THREE.FaceNormalsHelper(mesh, 10)
    - VertexNormalsHelper
        - 介绍
            - 辅助画顶点法线
    - WireframeHelper
        - 介绍
            - 将模型转换为线框图``
- 物件
    - Mirror
        - 介绍
            - 模拟一个镜子, 放在那, 就反射它前面的景物
            - 原理是一个平面, 上面的材质不断变化
        - API
            - THREE.Mirror = function(renderer, camera options)
                - renderer是渲染器
                - camera最好是透视相机
                - options
                    - textureWidth
                    - textureHeight
                    - clipBias
                    - color
                    - debugMode
        - o-使用
            - ```javascript
              var planeGeo = new THREE.PlanneGeometry(100.1, 100.1);
                      # 定义平面
              groundMirror = new THREE.Mirror(
                      # 定义镜面
                      renderer,
                      camera,
                      {clipBias: 0.003,
                      textureWidth: WIDTH,
                      textureHeight: HEIGHT,
                              # 表示内存中生成纹理的大小, 最好和屏幕一样大, 否则有mosaic
                      debugMode: true}
                              # 开启调试模式会有辅助线
              );
              ```
- AnimationHandler
    - 介绍
        - 主要负责动画的插值和播放
- shader
    - EffectComposer
        - 介绍
            - 用于渲染复杂效果, 例如将一个场景作为纹理传入, 例如用着色器将场景某部分模糊或发光处理
            - 原理是将画面在一个临时缓冲区先画出来,再将大量效果组合. 一般是用着色器来实现
        - 使用
            - composer = new THREE.EffectComposer(render);
                - 可以是WEBGLRenderer或CanvasRenderer
                    - 第二个参数是renderTarget(渲染目标), 没有时默认生成一个
                        - renderTarget是gpu的内部对象,用来暂存绘制结果
            - composer.addPass(new THREE.RenderPass(scene, camera));
                - 第一个效果通常是RenderPass, 它将渲染结果放入效果链中
                    - 将结果渲染到gpu的一个帧缓冲区(临时内存)
                    - pass中有enable成员变量, 只有为true时该pass才起作用
            - var effect = new THREE.ShaderPass(THREE.DotScreenShader);
                - DotScreenShader是examples/js/shaders中的一个
                    - 它定义了一些一致变量, 每个帧循环操作它们来控制渲染效果
            - effect.uniforms['scale'].value = 4;
            - composer.addPass(effect);
            - var effect = new THREE.ShaderPass(THREE.RGBShiftShader);
            - effect.uniforms['amount'].value = 0.0015;
            - effect.renderToScreen = true;
            - composer.addPass(effect);
                - 通过addPass加效果到效果链passes中
                    - 添加顺序重要,后一个效果会作用于前一个效果
            - composer.render()
                - 用它替换render.render(scene, camera)
                    - 遍历所有通道, 可以传入参数delta, 表示帧与帧之间渡过的时间
        - API
            - 方法
                - insertPass(pass, index)
                    - 将某一个通道插入指定的位置
            - 对象
                - WebGLRenderTarget(width, height, options)
                    - width是缓冲区的宽度, height是缓冲区的高度, options是参数
                - RenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha)
                    - overrideMaterial表示一种材质, 它会覆盖先前设置的材质
                    - clearColor表示每一次帧缓冲绘制前的底色. 用于清除上一次绘制结果
                    - clearAlpha是0或1, 表示清除透明色
                        - this.enabled属性表示是否启用该pass
                    - 方法
                        - render(renderer, writeBuffer, readBuffer, delta)
                - DotScreenShader
                    - 点阵屏效果, 就是报纸中点阵的印刷效果
                - RGBShiftShader
                    - 变化颜色分量RGBA, 如A点的R值不显示, 而取B点的R值
                        - angle表示偏移角度
                        - amount表示AB的长度. 由于纹理坐标为0到1, 所以0.005会有很多像素
                - BloomPass(n)
                    - 像素点膨胀模糊, 像墨水渗出
                    - n 是模糊的程度
                - FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale)
                    - 依赖FilmShader.js. 整个场景灰白, 或像lcd荧光屏在屏幕上看到线条等屏幕效果
                        - noiseIntensity 表示杂点的密度, 值越大杂点越多
                        - scanlinesIntensity 是扫描线的密度, 值越大扫描线透明度越小
                        - scanlinesCount 扫描线的数量
                        - grayscale 如果true表示黑白显示
                    - var effectFilm = new THREE.FilmPass(0.35, 0.75, 2048, false);
                    - effectFilm.renderToScreen = true;
                    - composer.addPass(effectFilm);
- Projector
    - 介绍
        - 包含各种矩阵
        - 提供重要且简单的函数，进行二维和三维之间的转换
    - 函数
        - this.unprojectVector = function(vector, camera)
            - 归一化空间中的点
                - 归一化是将(-1, -1, -1)到(1, 1, 1)中的某个点还原成三维中的某个点
            - vector是需要归一化的那个点，要归一化成(-1, -1)到(1, 1)空间的点
                - z 是没有意义的，通常设置为1
            - camera是当前相机，有了相机才能计算当前投影。
