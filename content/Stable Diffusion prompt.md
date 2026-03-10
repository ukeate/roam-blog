- tag
    - ,分隔
        - 1girl,loli
    - |等比例混合
        - 1girl,red|blue hair
    - 权重
        - (loli:1.21),(one girl:1.21)
        - `((one girl)),(cat ears),[flower hairpin]`
            - ()增强1.1倍, []减少1.1倍
    - 渐变
        - a girl with very long [white:yellow:16] hair
            - 16步后white变yellow
        -  [white:yellow:0.5]
            - 50%步后变
    - 交替
        - [cow|horse|cat|dog]
            - 顺序轮流
- 格式
    - 规则
        - 词数尽量100内，最好75
        - 越前越关键，只写必要
        - 同类一起
    - ```plain text
      画质词>>
      这个一般比较固定，无非是，杰作，最高画质，分辨率超级大之类的
      
      风格词艺术风格词>>
      比如是照片还是插画还是动画
      
      图片的主题>>
      比如这个画的主体是一个女孩，还是一只猫，是儿童还是萝莉还是少女，是猫娘还是犬娘还是福瑞，是白领还是学生
      
      他们的外表>>
      注意整体和细节都是从上到下描述，比如
      发型（呆毛，耳后有头发，盖住眼睛的刘海，低双马尾，大波浪卷发），
      发色（顶发金色，末端挑染彩色），
      衣服（长裙，蕾丝边，低胸，半透明，内穿蓝色胸罩，蓝色内裤，半长袖，过膝袜，室内鞋），
      头部（猫耳,红色眼睛），
      颈部（项链），
      手臂（露肩），
      胸部（贫乳），
      腹部（可看到肚脐），
      屁股（骆驼耻），
      腿部（长腿），
      脚步（裸足）
      
      他们的情绪>>
      表述表情
      
      他们的姿势>>
      基础动作（站，坐，跑，走，蹲，趴，跪），
      头动作（歪头，仰头，低头），
      手动作（手在拢头发，放在胸前 ，举手），
      腰动作（弯腰，跨坐，鸭子坐，鞠躬），
      腿动作（交叉站，二郎腿，M形开腿，盘腿，跪坐），
      复合动作（战斗姿态，JOJO立，背对背站，脱衣服）
      
      图片的背景>>
      室内，室外，树林，沙滩，星空下，太阳下，天气如何
      
      杂项>>
      比如NSFW，眼睛描绘详细
      ```
- 试用
    - ```plain text
      (masterpiece:1.331), best quality,
      illustration,
      (1girl),
      (deep pink hair:1.331), (wavy hair:1.21),(disheveled hair:1.331), messy hair, long bangs, hairs between eyes,(white hair:1.331), multicolored hair,(white bloomers:1.46),(open clothes),
      beautiful detailed eyes,purple|red eyes),
      expressionless,
      sitting,
      dark background, moonlight, ,flower_petals,city,full_moon, 
      
      lowres,bad anatomy,bad hands,text,error,missing fingers,
      extra digit,fewer digits,cropped,worst quality,
      low quality,normal quality,jpeg artifacts,signature,
      watermark,username,blurry,missing arms,long neck,
      Humpbacked,missing limb,too many fingers,
      mutated,poorly drawn,out of frame,bad hands,
      unclear eyes,poorly drawn,cloned face,bad face
      ```
    - ```plain text
      (((masterpiece))),((best quality)), flat chest,((loli)),((one girl)),very long light white hair, beautiful detailed red eyes,aqua eyes,white robe, cat ears,(flower hairpin),sunlight, light smile,blue necklace,see-through
      
      ((part of the head)), ((((mutated hands and fingers)))), deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, Octane renderer,lowres, bad anatomy, bad hands, text, missing fingers, worst quality, low quality, normal quality, signature, watermark, blurry,ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), messy drawing,(2girls), morbid, mutilated, tranny, trans, trannsexual, [out of frame], (bad proportions), octane render, unity, unreal, maya, photorealistic
      ```
- prompt系列
    - Counterfei
        - https://huggingface.co/gsdf/Counterfeit-V2.5
