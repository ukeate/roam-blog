- JS动画引擎
- 官网
    - https://github.com/sole
- 介绍
    - 开源的缓动类
- 使用
    - ```javascript
      initObject之后调用
        function initTween()
        {
            new TWEEN.Tween( mesh.position)
                    .to( { x: -400 }, 3000 ).repeat( Infinity ).start();
        }
      animation中
        requestAnimationFrame(animation);
            TWEEN.update();
      ```
- 使用2(雾的far的缓动)
    - ```javascript
      scene.tween = new TWEEN.Tween(scene.fog, false)
        # 对scene.fog的属性进行操作
        .to({far: 1500}, 6000)
                # 在6秒种内将scene.fog.far变为1500
        .easing(TWEEN.Easing.Sinusoidal.EaseOut)
        .delay(6000)
                # 缓动在调用start()后，等待6秒执行
        .onComplete(function(){
                # 缓动执行完成后(far= 1500后)的回调函数
        }).start();
      
      scene.tweenBack = new TWEEN.Tween(scene.fog, false)
        .delay(2000)
        .to({far: 15000}, 10000)
        .easing(TWEEN.Easing.Sinusoidal.EaseOut);
      
      scene.tween.chain(scene.tweenBack);
      ```
- 使用3(相机的左右[-500, 500]摇动)
    - ```javascript
      # 缓动链
      camera.tween = new TWEEN.Tween(camera.position, false)
        .to({x: 500}, 6000)
        .easing(TWEEN.Easing.Sinusoidal.EaseInOut)
        .start();
      
      camera.tweenBack = new TWEEN.Tween(camera.position, false)
        .easing(TWEEN.Easing.Sinusoidal.EaseInOut)
        .to({x: -500}, 6000)
      
      camera.tween.chain(camera.tweenBack);
      camera.tweenBack.chain(camera.tween);
        # 两个动画彼此加入了自己的缓动链中，两个动画可以交替执行
      ```
