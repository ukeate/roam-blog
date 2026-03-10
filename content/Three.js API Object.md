- Mesh
    - 使用
        - ```javascript
          var mesh = THREE.Mesh(geometry, material);                                                                # mesh模型
              mesh.position.x= x;
              mesh.rotation.x = rx;
              scene.add(meshCube);
          方法
              mesh1.addChild(mesh2)
                      # mesh2加入mesh1, 组成一个Mesh
              
          api
              mesh.scale.multiplyScalar(0.35)
                      # 让x y z方向缩放系数到原模型的0.35倍
          line
          THREE.Line( geometry, material, THREE.LinePieces );                                                ＃ 线
              scene.add(line);
          例子
              var line_material = new THREE.LineBasicMaterial({color: 0x303030}),
              geometry = new THREE.Geometry(),
              floor = -75, step = 25;
              for( var i = 0; i <= 40; i++){
                      geometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
                      geometry.vertices.push(new THREE.Vector3(500, floor, i * step - 500));
          
                      geometry.vertices.push(new THREE.Vector3(i * step - 500, floor,- 500));
                      geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, 500));
              }
              var line = new THREE.Line(geometry, line_material, THREE.LinePieces);
              scene.add(line);
          MorphAnimMesh
          介绍
              动画网格模型
              包含几个动画帧(一极动画模型)，通过播放帧来看动画。
              可以设置帧数，播放到哪一帧，顺播还是倒播。
          THREE.MorphAnimMesh = function (geometry, material){
              THREE.Mesh.call(this, geometry, material);
                      # 调用基类构造函数
              this.duration = 1000;
                      # 完成所有帧的时间(milliseconds)
              this.mirroredLoop = false;
                      # 表示镜像循环(是否循环播放)
              this.time = 0;
                      # 当前播放时间
              this.lastKeyframe = 0;
                      # 上一帧
              this.currentKeyframe = 0;
                      # 当前播放的帧
              this.direction = 1;
                      # 表示从前向后播放, -1是从后向前
              this.directionBackwards = false;
                      # 是否倒播
              this.setFrameRange(0, this.geometry.morphTargets.length - 1);
                      # 设置最小帧和最大帧
                      ## 这里开始帧是0, 结束帧是 总帧数 - 1
          }
          方法
              THREE.MorphAnimMesh.prototype.setDirectionForward = function(){
                      this.direction = 1;
                              # 1是前进, -1是后退
                      this.directionBackwords = false;
                              # false表示前进
              }
                      # 计算下一帧是哪一帧时，根据上面两个变量计算
              THREE.MorphAnimMesh.prototype.setDirectionBackward
              THREE.MorphAnimMesh.prototype.setAnimationLabel = function(label, start, end){
                      if( !this.geometry.animations) this.geometry.animation = {};
                      this.geometry.animations[label] = {start: start, end: end};
              }
                      # 设置帧分组标签(为了给每组设置不同的播放速度)
              THREE.MorphAnimMesh.playAnimation('A', 33)
                      # 播放标签为'A'的组动画，帧数(fps)为33帧/秒
              THREE.MorphAnimMesh.prototype.updateAnimation = function(delta
                      # delta表示实际浏览器每次刷新的间隔时间
                      # 作用: 主要更新lastKeyframe
          ```
- Mesh组件                        
    - Geometry
        - THREE.Geometry();
            - 空几何体
            - geometry.vertices.push(p1);
                - p1是一个点
            - geometry.vertices.push(p2);
            - geometry.colors.push( color1, color2 );
        - 属性
            - vertices
                - 顶点数组
            - colors
            - morphColors
                - 加载json模型后存储颜色的地方
            - faces        
                - 面数组
                - color
            - faceVertexUvs
                - 面法线数组
                - 方法
                    - set                # 设置纹理坐标
                        - faceVertexUvs[0][2][0].set(0, 0)
                        - faceVertexUvs[0][2][1].set(0, 0)
                        - faceVertexUvs[0][2][2].set(0, 0)
                        - faceVertexUvs[0][2][3].set(0, 0)
                            - 设置第2个面(顶面)的纹理坐标全部为0，这样就去掉了这个面的纹理坐标
                            - 第一维表示第几种纹理，第二维表示第几个面，第三维表示第几个顶点的纹理坐标
        - BufferGeometry
            - 一般编程中
                - 物体的形状可以用一个类Geometry来表示
                - 物体顶点内容如果放到缓冲区中，可以new分配连续的内存
                - 物体和内存是分离的
            - Tree.js中
                - 物体和内存统一起来，形成了THREE.BufferGeometry
                - THREE.BufferGeometry = Buffer + THREE.Geometry
                - BufferGeometry是自由度最高的geometry类型
                    - 自由指定每个顶点的位置、颜色、法线(影响光照)
                    - Buffer就是将顶点位置数组、顶点颜色数组等放在一个缓冲区中，加快加载与运行速度。
                        - Buffer的这些缓冲区存储在BufferGeometry的属性attributes集合对象里面
                            - attributes初始化时为空 this.attributes = {};
            - api
                - var geometry = new THREE.BufferGeometry();
                    - THREE.BufferGeometry = function()
        - IcosahedronGeometry
            - 二十面体
            - radius = 200
            - geometry = new THREE.IcosahedronGeometry(radius, 1);
            - faceIndices = ['a', 'b', 'c', 'd'];
            - for(var i = 0; i < geometry.faces.length; i++){
                - f = geometry.faces[i];
                    - 得到第i个面
                - n = (f instanceof THREE.Face3) ? 3 : 4;
                    - 判断每个面由几个点组成
                    - 每个点可以由f.a, f.b, f.c, f.d得到
                - for(var j = 0; j < n; j++){
                    - vertexIndex = f[faceIndices[j]];
                        - 得到点在geometry中的索引
                    - p = geometry.vertices[vertexIndex];
                        - 得到点
                    - f.vertexColors[j] = color;
                        - 给面的顶点赋值
                            - 顶点默认颜色为白色
                - }
            - }
        - SphereGeometry
            - var geometry = new THREE.SphereGeometry(70, 32, 16);
                - 70是半径, 32和16表示横向和纵向球体由多少线分割
        - BoxGeometry
            - 介绍
                - 原来的CubeGeometry
            - 长立方体
                - THREE.CubeGeometry = function(width, height, depth, widthSegments, heightSegments, depthSegments)
                    - 参数分别表示x y z轴长度和分别在x y z轴上被分成了几份
        - CylinderGeometry
            - 圆柱体
                - THREE.CylinderGeometry(100, 150, 400);
        - PlaneGeometry   # 平面
        - TextGeometry
            - 介绍
                - 可以从字体文件中生成字体几何体
            - THREE.TextGeometry = function(text, parameters)
                - text是要显示的文字
                - parameters包括
                    - size: <float> 字体大小, 如80号是小字体
                    - height: <float> 厚度
                    - curveSegments: <int> 一条曲线上点的数目, 越多越精细
                    - font: <string> 使用字体的名称
                    - weight: <string> `取值normal或bold, 如果字体中没有bold, 整个程序会崩溃
                    - style: <string> 取值normal或italics(斜体), 没有italics也会崩溃
            - 使用
                - 在typeface上转换自己的字体
                    - http://typeface.neocracy.org/fonts.html
                        - 要求字体的签名是TrueType或OpenType
                        - 在Convert Font页面选择要转换的字,可以加快转换,也减少生成js文件的大小
                - var text3d = new THREE.TextGeometry('要显示的字', {
                    - size: 120,
                    - height: 30,
                    - curveSegments: 3,
                    - font: 'simhei',
                    - face: 'simhei',
                    - weight: 'normal'
            - });
    - Material
        - 使用
            - THREE.LineBasicMaterial( parameters );                                                        # 线材质
                - 参数
                    - Color：线条的颜色，用16进制来表示，默认的颜色是白色。
                    - Linewidth：线条的宽度，默认时候1个单位宽度。
                    - Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
                    - Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。
                    - VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。（如果关于插值不是很明白，可以QQ问我，QQ在前言中你一定能够找到，嘿嘿，虽然没有明确写出）。
                    - Fog：定义材质的颜色是否受全局雾效的影响。
                        - uniforms: 传入着色器中的固定变量, 如
                            - {
                                - scale: {type: 'v2', value: new THREE.Vector2()}
                            - }
            - THREE.MeshBasicMaterial({color: 0x00ff00});                                                        # mesh材质
        - MeshBasicMaterial
            - 介绍
                - 是three.js中最基本的材质
            - 功能
                - 将mesh渲染成线框模式或平面模式
                    - 平面模式指表面渲染比较平整
            - api
                - new THREE.MeshBasicMaterial({
                    - color: 0xffaa00, 
                    - transparent: true, 
                        - 标志为true时颜色A分量(alpha)才起作用
                    - blending: THREE.AdditiveBlending
                        - 混合方式, 对应OpenGL ES中不同混合方式。表示怎么与背景结合
                            - OpenGL中有一个颜色缓冲区，存放每次渲染的颜色(目标颜色)，新颜色(源颜色)可以与它混合，形成最新的颜色。
                            - 可以是THREE.NoBlending = 0
                                - 不混合。直接用新颜色覆盖以前的颜色
                            - THREE.NormalBlending = 1
                                - 将源颜色与目标颜色通过透明度正常混合
                            - THREE.AdditiveBlending = 2
                                - 加法混合
                            - THREE.SubtractiveBlending = 3
                                - 减法混合
                            - THREE.MultiplyBlending = 4
                                - 乘法混合
                            - THREE.CustomBlending = 5
                                - 自定义混合
                - });
                - new THREE.MeshBasicMaterial({
                    - color: 0xffaa00, 
                    - wireframe: true
                - });
                - new THREE.MeshBasicMaterial({
                    - map: texture, 
                    - transparent: true
                - });
        - MeshNormalMaterial
            - 只支持以THREE.FlatShading模式来渲染Mesh, 不支持将Mesh渲染为线框模式
        - MeshLambertMaterial
            - 在灰暗或不光滑的表面产生的均匀散射而形成的材质类型。向各个方向均反射光线。如白纸
            - new THREE.MeshLambertMaterial({
                - color: 0xff6600,                                # 材质的颜色
                - ambient: 0xff2200,                                # 受环境光情况
                - envMap: textureCube,                                # 环境纹理，会将环境纹理映射到材质身上
                - combine: THREE.MixOperation,                # 与环境材质之间的混合方式
                - reflectivity: 0.3                                        # 对反射光的反射系数
            - })
            - new THREE.MeshLambertMaterial({map:texture, transparent: true})
                - 带透明的兰伯特材质, 可以看到球体另一边的颜色
            - new THREE.MeshLambertMaterial({color: 0xdddddd, shading: THREE.FlatShading})
                - 灰色，非平滑
            - new THREE.MeshLambertMaterial({color: 0xdddddd, shading: THREE.SmoothShading})
                - 灰色，平滑
            - new THREE.MeshLambertMaterial({color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading})
                - emissive表示自发光
        - MeshPhongMaterial
            - 有明显高光区，适用于湿滑的，表面具有光泽的物体。如: 玻璃，水滴等
            - 特点
                - 会产生高光(球某一点在光线下特别亮)
            - THREE.MeshPhongMaterial({ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FloatShading})
            - THREE.MeshPhongMaterial({ambient:0x030303, color:0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true})
            - THREE.MeshPhongMaterial({color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true})
        - MeshDepthMaterial
            - 支持一些尝试测试的效果
        - MeshFaceMaterial
            - 面材质，它是一个材质数组。
            - 有且仅有一个成员数组materials, 用来存放一组材质。
                - 这组材质会被geometry的不同面所使用，来做到同一个物体不同面使用不同材质的效果。
                - 每一个面使用什么材质由geometry中的索引决定
        - ShaderMaterial
            - 使用
                - material = new THREE.ShaderMaterial({
                    - uniforms: uniforms,
                        - 一致变量数组，传递到两个着色器中使用
                    - vertexShader: document.getElementById('vertexShader').textContent,
                        - 顶点着色器的代码
                    - fragmentShader: document.getElementById('fragmentShader').textContent
                        - 片元着色器代码
                - });
                - uniforms = {
                    - time: {type: 'f', value: 1.0},
                        - 表示时间， f 代表浮点型
                    - resolution: {type: 'v2', value: new THREE.Vector2() }
                        - 表示浏览器窗口的宽度和高度，v2代表二维向量
                - }                # 该一致变量在绘制过程中不会改变，在顶点shader与片元shader之间用相同名字来共享
                    - 一致变量在不同图元中会改变
                - uniforms.resolution.value.x = window.innerWidth
                - uniforms.time.value += 0.005
                    - 通过value改变uniforms中变量的值
    - Texture
        - 例子
            - ```javascript
              var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
              geometry.vertices[0].uv = new THREE.Vector2(0,0);
              geometry.vertices[1].uv = new THREE.Vector2(2,0);
              geometry.vertices[2].uv = new THREE.Vector2(2,2);
              geometry.vertices[3].uv = new THREE.Vector2(0,2);
                                              # 平面有4个纹理坐标。由顶点的成员nv表示，nv是一个二维向量，对应到纹理坐标
              
              var texture = THREE.ImageUtils.loadTexture("textures/a.jpg",null,function(t){});
              var material = new THREE.MeshBasicMaterial({map:texture});
              
              var mesh = new THREE.Mesh( geometry,material );
              scene.add( mesh );
              
              ```
        - 例子2(canvas)
            - ```javascript
              var geometry = new THREE.CubeGeometry(150, 150, 150);
              texture = new THREE.Texture(canvas);
                                              # 默认情况下，纹理被均匀地分配到四边形的各个顶点上。
              var material = new THREE.MeshBasicMaterial({map: texture});
              texture.needsUpdate = true;
                                              # 如果canvas中有动画的话，要设置纹理更新。而且每requestAnimationFrame渲染一帧动画，都要对texture.needsUpdate设置一遍true。如果不更新，显示黑色正方体。
                                              ## 黑色正方体原因: js异步运行,canvas绘制时钟需要时间, three.js已经开始渲染图形了，这时候canvas没有绘制完成，就显示材质本身的颜色。
              mesh = new THREE.Mesh(geometry, material);
              scene.add(mesh);
              ```
        - Mapping
            - UVMapping
        - Filter
            - LinearFilter
        - Wrapping
            - RepeatWrapping
    - Color
        - THREE.Color()
        - THREE.Color( 0x444444 );       
    - Vector3
        - THREE.Vecotor3(4,8,9);                                                                        
        - THREE.Vector3();
        - point1.set(4,8,9);
    - Quaternion
        - 介绍　
            - 四元组
        - api
            - THREE.Quaternion = function(x, y, z, w){
                - this._x = x || 0;
                - this._y = y || 0;
                - this._z = z || 0;
                - this._w = (w !== undefined) ? w : 1;
            - }
            - setFromAxisAngle: function(axis, angle)
                - Quaternion的静态方法
                    - axis是向量，表示轴, angle表示弧度
                    - 返回一个四元组
            - setFromEuler: function(euler, update)
                - 欧拉角转为四元组
            - setFromRotationMatrix: function(m)
                - 把矩阵转为欧拉角
- Fog
    - scene.fog = new THREE.Fog(0x999999, 0.1, 8000);
    - THREE.Fog = function(hex, near, far)
        - hex为颜色, near是雾开始的地方, far是雾结束的地方
- Object3D
    - new THREE.Object3D();
- Ray
    - 介绍
        - 一条射线
    - ray = new THREE.Ray(camera.position);
        - 传入起点
