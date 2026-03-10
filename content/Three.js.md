- 介绍
    - 协调程序加载项的类库
- 使用
    - ```javascript
      var preload = new createjs.LoadQueue(false, "assets/");
      var plugin= {
          getPreloadHandlers: function(){
              return{
                  types: ["image"],
                  callback: function(src){
                      var id = src.toLowerCase().split("/").pop().split(".")[0];
                      var img = document.getElementById(id);
                      return {tag: img};
                  }
              }
          }
      }
      preload.installPlugin(plugin);
      preload.loadManifest([
          "Autumn.png",
          "BlueBird.png",
          "Nepal.jpg",
          "Texas.jpg"
      ]);
      ```
- [[Three.js API]] [[顶点着色器]] [[片元着色器]]
- 命令
    - convert_obj_three.py
        - 介绍
            - 转换obj文件为three.js二进制文件
        - python convert_boj_three.py -i alien2.obj -o alien2_bin.js -t binary
- [[着色器]]
- [[Thress.js思路]]
- 框架
    - [[SIM.JS]]
    - [[Physi.js]]
    - [[Voxel.js]]
- [[Three.js例子]]
