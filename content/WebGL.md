- 介绍
    - 由Khronos Group维护                          # 还维护了OpenGL和COLLADA
    - 使用OpenGL渲染语言GLSL ES
    - WebGL是在浏览器中实现三维效果的一套规范
    - webgl通过增加openGL es 2.0的一个js绑定, 把它们结合在一起
    - webgl可以为html5 canvas提供硬件3d加速渲染
        - 更流畅地展示3d场景和模型
        - 创建复杂的导航和数据视觉化
- 内置变量
    - gl_FragColor
        - 输出的一个像素的颜色, vec4类型, 红 绿 蓝 透明
    - gl_FragCoord
        - 只读变量,保存了片元相对窗口的坐标位置
        - x, y, z, 1/w   其中z表示片元深度, z越大越深
- 输入
    - varying0, varying1, .... , varyingn
        - #用户自定义的易变变量
    - uniforms
        - 一致变量. 在js, 顶点着色器, 片元着色器中传递数据, 一次渲染中数据不变
    - 临时变量
    - gl_Position
        - 当前片段(像素)的位置
    - gl_FrontFacing
        - 表示每个顶点的大小
    - gl_PointSize
        - 当前片段来自三角形的正面还是背面. 该变量只是为了节省性能
    - 采样器
- 变量
    - 变量分类
        - attributes(属性变量)                        # 保存顶点独有数据，如顶点的位置
            - attributes vec3 pos;
        - uniform(一致变量)                                # 一帧渲染过程中保持不变，如光照方向
            - uniform vec3 a;
        - varying(易变变量)                                # 比较容易变化的变量，用来在顶点着色器与片元着色器之间传递数据
            - varying vec3 a;
    - 类型
        - vec2
            - 二维变量
        - vec3
            - 三维变量
        - vec4
        - mat4
        - sampler2D
        - float
    - 传递关系
        - attribute        ->        顶点着色器        ->        varying        ->        图元光栅化        ->        varying        ->        片元着色器        ->        gl_FragColor
        - uniform        ->        顶点着色器        ->        gl_Position        ->        图元光栅化        ->        gl_Position        ->        片元着色器        ->        gl_FragColor
- 使用
    - ```html
      <script id="fragmentShader" type="x-shader/x-fragment">
              void main(){
                      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
                              ＃ 表示片元颜色，是RGBA
              }
      </script>
      ```
- 例子
    - ```javascript
      uniform vec2 resolution;
      uniform float time;
      float a = 1.0, b = 1.0, c = 1.0;
      float t;
      void main (){
              t = time;
              a = abs(sin(t));
              b = abs(cos(t));
              c = abs(sin(t) * cos(t));
              gl_FragColor = vec4(vec3(a, b, c), 1.0);
      }
      ```
- 名词
    - 科纳斯组织       Khronos Group
    - GLSL ES         OpenGL Shading Language Embedded System
    - 网格          Mesh
    - 模型          model
    - 纹理映射        texture map
    - 材质          material
    - 光源          light
    - 变换          transform
    - 相机          camera
    - 视口          viewport
    - 投影矩阵       projection matrix
    - 视锥体         view volume
    - 视平截头体      view frustum
    - 着色器         shader
    - 图元          primitive
    - 三角形带        triangle strip
    - 类型化数组       typed array
    - 模型视图矩阵      modelview matrix
    - 投影矩阵        projection matrix
    - 顶点着色器        vertex shader
    - 片元着色器        fragment shader
    - 像素着色器        pixel shader, 同fragment shader
    - 自发光         unlit
    - 预置光照        prelit
    - 镜面高光        specular highlights
    - 镜面反射        specular reflection
    - alpha混合        alpha blending
    - 变换层级        transform hierarchy
    - 帧动画         frame-based animation
    - 补间动画        tweening
    - 关键帧         keyframe
    - 关键帧动画       keyframe animation
    - 插值          interpolation
    - 线性插值        linear interpolation
    - 关节动画        articulated animation
    - 蒙皮动画        skinned animation
    - 骨骼          skeleton
    - 目标变形动画      morph target animation
    - 程序贴图        procedural texture
    - 纹理变换        texture transform
    - 拾取          picking
    - 面法线        face normal
    - 程序贴图        procedural texture
    - 多级渐进纹理过滤        mipmapping / mipmapping filtering
    - 数码内容创作软件        DCC        digital content creation
    - 包围盒        bounding box
- 框架
    - three.js
    - physi.js
    - glMatrix
    - GLGE
    - philoGL
    - sceneJS
    - spiderGL
- 着色器
- 工具
    - webgl inspector
        - chrome的扩展, webgl调试
- 网站
    - www.khronos.org/webgl/
        - Khronos提供的主页
    - learningwebgl.com/blog
    - blog.tojicode.com
    - https://developer.mozilla.org/en/WebGL
        - mozilla的webgl教程
    - www.chromeexperiments.com
        - Chrome体验
    - www.html5rocks.com
        - 提供html5资源
    - www.lao3d.com
        - 国内首个webgl网站
