- 主动
    - 拆任务
      ```javascript
      你是具有丰富开发经验的前端开发工程师，请你阅读@需求文档.md 这个产品及UI文档，你需要完成这个产品的前端页面开发，这是一个移动端的H5页面，需要适配手机访问，请你按照你丰富的前端开发经验，拆解出详细的前端开发任务，按照以下格式保存到 doc目录中。
      - 根据开发顺序创建TASK001这样的任务编号；
      - 每个任务包含名称,任务描述、版本、状态（计划中、测试单元编写中、开发中、完成等）。
      每个TASK都有验收标准清单和注意事项（提现用户或将来的AI助手需要注意的详细内容）
      
      @后端开发任务.md 现在你开始执行任务，每次只能执行一个任务，执行任务完成后需要更新任务状态以及验收清单。功能和接口规范需要跟 @doc 下文档保持一致。 必须是我回复后才能继续下一项任务
      ```
    - PRD
      ```javascript
      我想开发一个小程序
      目标用户：
      - 主要用户：25-45岁的家长，没时间来教小孩怎么写作文，也可能不知道还在对应年级作文的写作规范和要求
       用户痛点：
      -家长难以针对孩子写作弱点提供定制化提升方案
      -无法获得实时写作建议
      
      我目前想到的核心功能如下：
      1、用户可以对作文进行拍照，然后上传图片
      2、调用大模型对作文进行批改
      3、每次批改作文消耗一个积分，使用微信支付进行充值可获得积分
      4、用户使用微信授权登陆，登陆完成需要绑定手机号
      
      graph TD;
          A[用户打开小程序] --> B[显示微信登录按钮];
          B --> C[用户点击微信登录按钮];
          C --> D[小程序向微信请求登录授权];
          D --> E[微信验证用户身份并返回授权结果];
          E --> F[如果授权成功，用户登录小程序，小程序获取用户基本信息（如头像、昵称等）];
          E --> G[如果授权失败，弹出提示框告知用户登录失败，引导用户重新尝试或检查微信设置];
          F --> H[用户可在个人中心进行密码设置（可选，用于后续可能的账号安全需求）];
          F --> I[如果用户忘记密码，可在登录页面点击“忘记密码”按钮];
          I --> J[进入密码找回流程，通过微信验证身份后重置密码];
      
      现在需要你帮我输出高保真的原型图，请通过以下方式帮我完成所有界面的原型设计，并确保这些原型界面可以直接用于开发：
      1、用户体验分析：先分析这个小程序的主要功能和用户需求，确定核心交互逻辑。
      2、产品界面规划：作为产品经理，定义关键界面，确保信息架构合理。
      3、高保真 UI 设计：作为 UI 设计师，设计贴近真实小程序设计规范的界面，使用现代化的 UI 元素，使其具有良好的视觉体验。
      4、HTML 原型实现：使用 HTML + Tailwind CSS（或 Bootstrap）生成所有原型界面，并使用 FontAwesome（或其他开源 UI 组件）让界面更加精美、接近真实的 小程序 设计。拆分代码文件，保持结构清晰：
      5、每个界面应作为独立的 HTML 文件存放，例如 home.html、profile.html、settings.html 等。
      - index.html 作为主入口，不直接写入所有界面的 HTML 代码，而是使用 iframe 的方式嵌入这些 HTML 片段，并将所有页面直接平铺展示在 index 页面中，而不是跳转链接。
      - 真实感增强：  - 界面尺寸应模拟 iPhone 15 Pro，并让界面圆角化，使其更像真实的手机界面。 
      - 使用真实的 UI 图片，而非占位符图片（可从 Unsplash、Pexels、Apple 官方 UI 资源中选择）。 
      - 添加顶部状态栏（模拟 iOS 状态栏），并包含 App 导航栏（类似 iOS 底部 Tab Bar）。
        请按照以上要求生成完整的 HTML 代码，并确保其可用于实际开发。
      ```
    - UI
      ```javascript
      你是一名专业的网页设计师和前端开发专家，对现代 Web 设计趋势和最佳实践有深入理解，尤其擅长创造具有极高审美价值的用户界面。你的设计作品不仅功能完备，而且在视觉上令人惊叹，能够给用户带来强烈的"Aha-moment"体验。
      
      请根据最后提供的内容，设计一个**美观、现代、易读**的"中文"可视化网页。请充分发挥你的专业判断，选择最能体现内容精髓的设计风格、配色方案、排版和布局。
      
      **设计目标：**
      
      *   **视觉吸引力：** 创造一个在视觉上令人印象深刻的网页，能够立即吸引用户的注意力，并激发他们的阅读兴趣。
      *   **可读性：** 确保内容清晰易读，无论在桌面端还是移动端，都能提供舒适的阅读体验。
      *   **信息传达：** 以一种既美观又高效的方式呈现信息，突出关键内容，引导用户理解核心思想。
      *   **情感共鸣:** 通过设计激发与内容主题相关的情感（例如，对于励志内容，激发积极向上的情绪；对于严肃内容，营造庄重、专业的氛围）。
      
      **设计指导（请灵活运用，而非严格遵循）：**
      
      *   **整体风格：** 可以考虑杂志风格、出版物风格，或者其他你认为合适的现代 Web 设计风格。目标是创造一个既有信息量，又有视觉吸引力的页面，就像一本精心设计的数字杂志或一篇深度报道。
      *   **Hero 模块（可选，但强烈建议）：** 如果你认为合适，可以设计一个引人注目的 Hero 模块。它可以包含大标题、副标题、一段引人入胜的引言，以及一张高质量的背景图片或插图。
      *   **排版：**
          *   精心选择字体组合（衬线和无衬线），以提升中文阅读体验。
          *   利用不同的字号、字重、颜色和样式，创建清晰的视觉层次结构。
          *   可以考虑使用一些精致的排版细节（如首字下沉、悬挂标点）来提升整体质感。
          *   Font-Awesome中有很多图标，选合适的点缀增加趣味性。
      *   **配色方案：**
          *   选择一套既和谐又具有视觉冲击力的配色方案。
          *   考虑使用高对比度的颜色组合来突出重要元素。
          *   可以探索渐变、阴影等效果来增加视觉深度。
      *   **布局：**
          *   使用基于网格的布局系统来组织页面元素。
          *   充分利用负空间（留白），创造视觉平衡和呼吸感。
          *   可以考虑使用卡片、分割线、图标等视觉元素来分隔和组织内容。
      *   **调性：**整体风格精致, 营造一种高级感。
      *   **数据可视化：** 
          *   设计一个或多个数据可视化元素，展示Naval思想的关键概念和它们之间的关系。
          *   可以考虑使用思想导图、概念关系图、时间线或主题聚类展示等方式。
          *   确保可视化设计既美观又有洞察性，帮助用户更直观地理解Naval思想体系的整体框架。
          *   使用Mermaid.js来实现交互式图表，允许用户探索不同概念之间的关联。
      
      **技术规范：**
      
      *   使用 HTML5、Font Awesome、Tailwind CSS 和必要的 JavaScript。
          *   Font Awesome: <https://cdn.staticfile.org/font-awesome/6.4.0/css/all.min.css>
          *   Tailwind CSS: <https://cdn.staticfile.org/tailwindcss/2.2.19/tailwind.min.css>
          *   非中文字体: <https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap>
          *   `font-family: Tahoma,Arial,Roboto,"Droid Sans","Helvetica Neue","Droid Sans Fallback","Heiti SC","Hiragino Sans GB",Simsun,sans-self;`
          *   Mermaid: <https://cdn.jsdelivr.net/npm/mermaid@latest/dist/mermaid.min.js>
      *   实现完整的深色/浅色模式切换功能，默认跟随系统设置，并允许用户手动切换。
      *   代码结构清晰、语义化，包含适当的注释。
      *   实现完整的响应式，必须在所有设备上（手机、平板、桌面）完美展示。
      
      **额外加分项：**
      
      *   **微交互：** 添加微妙而有意义的微交互效果来提升用户体验（例如，按钮悬停效果、卡片悬停效果、页面滚动效果）。
      *   **补充信息：** 可以主动搜索并补充其他重要信息或模块（例如，关键概念的解释、相关人物的介绍等），以增强用户对内容的理解。
      *   **延伸阅读:** 分析文件后，提供一份"进一步阅读"的简短清单，推荐 5 本最佳相关书籍或论文，并提供简要说明或链接。
      
      **输出要求：**
      
      *   提供一个完整、可运行的单一 HTML 文件，其中包含所有必要的 CSS 和 JavaScript。
      *   确保代码符合 W3C 标准，没有错误或警告。
      
      请你像一个真正的设计师一样思考，充分发挥你的专业技能和创造力，打造一个令人惊艳的网页！
      
      待处理内容：{{content}}
      ```
    - Git流程
      ```javascript
      ---
      description: 
      globs: 
      alwaysApply: false
      ---
      
      # Gitflow工作流规则
      
      ## 主分支
      
      ### main（或master）
      - 包含生产就绪代码
      - 永远不要直接提交到main分支
      - 只接受来自以下分支的合并：
        - hotfix/* 分支
        - release/* 分支
      - 每次合并后必须使用版本号标记
      
      ### develop
      - 主开发分支
      - 包含最新交付的开发变更
      - 功能分支的源分支
      - 永远不要直接提交到develop分支
      
      ## 支持分支
      
      ### feature/*
      - 从develop分支创建
      - 合并回：develop
      - 命名约定：feature/[issue-id]-描述性名称
      - 示例：feature/123-user-authentication
      - 创建PR前必须与develop分支保持同步
      - 合并后删除
      
      ### release/*
      - 从develop分支创建
      - 合并回：
        - main
        - develop
      - 命名约定：release/vX.Y.Z
      - 示例：release/v1.2.0
      - 仅进行bug修复、文档编写及与发布相关的任务
      - 不添加新功能
      - 合并后删除
      
      ### hotfix/*
      - 从main分支创建
      - 合并回：
        - main
        - develop
      - 命名约定：hotfix/vX.Y.Z
      - 示例：hotfix/v1.2.1
      - 仅用于紧急生产环境修复
      - 合并后删除
      
      ## 提交信息
      
      - 格式：`type(scope): description`
      - 类型：
        - feat: 新功能
        - fix: Bug修复
        - docs: 文档变更
        - style: 格式调整、缺失分号等
        - refactor: 代码重构
        - test: 添加测试
        - chore: 维护任务
      
      ## 版本控制
      
      ### 语义化版本
      - MAJOR版本用于不兼容的API变更
      - MINOR版本用于向后兼容的功能性变更
      - PATCH版本用于向后兼容的bug修复
      
      ## Pull Request规则
      
      1. 所有变更必须通过Pull Request进行
      2. 所需批准：至少1个
      3. CI检查必须通过
      4. 不允许直接提交到受保护分支（main, develop）
      5. 合并前分支必须保持最新
      6. 合并后删除分支
      
      ## 分支保护规则
      
      ### main和develop
      - 要求Pull Request审核
      - 要求状态检查通过
      - 要求分支保持最新
      - 限制规则包括管理员
      - 禁止强制推送
      - 禁止删除
      
      ## 发布流程
      
      1. 从develop创建release分支
      2. 更新版本号
      3. 修复任何与发布相关的问题
      4. 创建PR到main
      5. 合并到main后：
         - 标记发布
         - 合并回develop
         - 删除release分支
      
      ## 热修复流程
      
      1. 从main创建hotfix分支
      2. 修复问题
      3. 更新patch版本号
      4. 创建PR到main
      5. 合并到main后：
         - 标记发布
         - 合并回develop
         - 删除hotfix分支
      ```
    - Git格式
      ```javascript
      ---
      description: 辅助生成 git 提交信息
      globs: 
      alwaysApply: false
      ---
      # Git 规则
      
      ## 重要原则
      - **重要**：不要自动提交 git 代码，除非有明确的提示
      - 提交前确保代码通过所有测试
      - 保持提交信息简洁明了，描述清楚变更内容
      - 避免大型提交，尽量将变更分解为小的、相关的提交
      
      ## 提交规范
      git 提交模板<type>(<scope>): <subject>，具体要求如下：
      1. 注意冒号 : 后有空格
      2. type 的枚举值有：
      - feat: 新增功能
      - fix: 修复 bug
      - docs: 文档注释
      - style: 代码格式(不影响代码运行的变动)
      - refactor: 重构、优化(既不增加新功能, 也不是修复bug)
      - perf: 性能优化
      - test: 增加测试
      - chore: 构建过程或辅助工具的变动
      - revert: 回退
      - build: 打包
      3. 若 subject 中描述超过两种要点，请使用要点列表描述详情，每个要点使用-符号开头，多个换行，参考如下样例：
        feat(web): implement email verification workflow
        
        - Add email verification token generation service
        - Create verification email template with dynamic links
        - Add API endpoint for token validation
        - Update user model with verification status field
      
      
      ## 分支管理
      - main/master: 主分支，保持稳定可发布状态
      - develop: 开发分支，包含最新开发特性
      - feature/*: 功能分支，用于开发新功能
      - bugfix/*: 修复分支，用于修复bug
      - release/*: 发布分支，用于准备发布
      
      **常用分支命名约定**：
      
      | 分支类型   | 命名格式             | 示例                      |
      | ---------- | -------------------- | ------------------------- |
      | 功能分支   | feature/[描述]       | feature/user-auth         |
      | 修复分支   | fix/[问题ID]-[描述]  | fix/issue-42-login-crash  |
      | 发布分支   | release/[版本]       | release/v2.1.0            |
      | 热修复分支 | hotfix/[版本]-[描述] | hotfix/v2.0.1-payment-fix |
      ```
- 触发
    - TDD
      ```markdown
      # 核心编程原则
      
      ## 沟通与语言规范
      - 交流、注释: 统一使用简体中文。
      - 每次回复，都请以“收到，思维武者🔍”开头，请审视的输入的潜在问题，能提出明显在我思考框架外的建议。
      - 代码实体、技术术语、提交记录: 统一使用英文。
      - 批判性反馈与破框思维: 对于任何方案，提出 >= 3个风险, >= 3条改进建议。
      - 若不可行，直接指出原因并给替代方案。
      - 任务全部完成时，打印执行总时间。
      
      ## [重要]调试-验证矩阵表格(位于CLAUDE.md中的"调试"模块下的"验证矩阵")
      - 验证矩阵完备：所有业务场景及业务功能，必须穷举出验证矩阵条目及严苛的验收标准。尤其注意丰富业务边界场景验证条目。不列举非业务相关条目。
      - 验证矩阵正交：验证矩阵条目必须无重复，必须保持高信息密度。
      - 验证矩阵对齐：缺失验证矩阵条目禁止编码、禁止执行调试动作。发现缺失条目必须及时补充。
      - 验收标准精密
        - 唯一性原则：每个验证项只有一个唯一正确的状态
        - 完整性原则：必须验证从输入到输出的完整业务流程
        - 原子性原则：验收标准必须是原子的，不可拆分的
        - 可重现性原则：验收结果必须100%可重现
        - 端到端验证：验证实际业务功能而非仅技术指标
        - 高信息密度：在不丢失精密信息的前提下，保证高信息密度
      
      ## TDD, 设计>测试>实现
      - 设计先行：任何业务实现前，先向docs和CLAUDE.md同步设计修改。
      - 即时测试：功能改动即刻更新并合并到现有测试，测试必须体现出所有功能。
      - 业务导向：只写业务的端到端测试。测试代码要对齐"调试-验证矩阵表格"的业务功能。
      - 模块导向：每个业务模块必须有测试文件、且只有1个完备的测试文件，超出必需合并。
      
      ## 测试覆盖
      - 单测力求覆盖所属业务模块全部分支。
      - 必须真实覆盖功能, 禁止伪实现。业务代码严禁使用TODO、空循环、假数据、占位返回值
      - Mock仅限于测试代码中，业务逻辑严禁依赖任何Mock开关。  
      
      ## [重要]坚守正义(只做正确的事, 只正确的做事)
      - 严禁过度简化：绝不允许为精练代码修改甚至裁剪任何功能。
      - 坚决实行业界最佳实践：坚守优雅设计, 坚守代码可扩展性。
      - 逐一修复：发现错误必须定位并修复，不跳过。禁止打补丁实现假成功，必须真正把代码改正。
      
      ## 可读性
      - 不过度简化，严格保留业务功能细节的前提下，极致压缩实现同样功能需要的代码行数。
      - 代码密度>85%。
      - 函数式风格压缩代码。
      - 命名见名知意, 除行业标准外禁止缩写。
      - 禁止为兼容写冗余分支。
      - 只有极其必要时才新建文件，单模块文件数<=8个。
      - 避免重复(DRY)：写代码前检查所有已知代码，有相似代码直接复用或重构后复用。
      - 高内聚，低耦合：相关代码必须放在一起; 仅暴露必要的API和参数; 禁止跨层调用内部实现。 
      
      ## 及时精练
      - 修改完代码后自动删除死代码, 自动跑测试提升代码质量。
      - 修改完代码后自动按"可读性"重构业务代码。
      
      ## 代码质量
      - 及时修正：任何测试、调试后，必须补充潜在的问题到测试中，并在代码改正，并测试成功。
      - 只留存业务逻辑代码、测试代码, 禁止其它代码或脚本，禁止演示用代码，调试用的代码用完即删。
      - 替代方案：当前代码方案不可行时，立即切换到完整可行的替代实现。
      - TODO管理：不写任何TODO，出现未知业务时，自行构思业务最佳实践并自动实现。
      
      ## 统一文档
      - 功能更新必须写入项目CLAUDE.md
      - 功能更新必须结合CLAUDE.md的"调试"模块已有的调试方法，对其做合并或追加。
      - CLAUDE.md必须精练
      - 严禁CLAUDE.md、DOC.md、README.md之外的其它任何文档及*.md文件。
      ```
    - 触发写API
      ```javascript
      ---
      ** 入参要求
      - header中必须设置 auth， 值为当前登录后保存的token值
      - 请求的参数使用json 格式， 就算是参数为空，也需要使用 {} 来代替
      ** http请求
         请求方式默认是post，除非有明确要求
      ** 返参
      - 后端统一返回的参数为json对象，格式如下
      {
      "error": 0,
       "body": object,
       "message": ''
      
         }
       error =0, 表示没有任何异常
       error = 500, 表示系统异常，需要弹出系统异常的错误
       error = 401，表示需要登录
       error 其它值，表示业务异常，直接弹出 message内容
       body 是一个对象
       ** 设计一个通用函数来处理后端API返回值，所有的API文件都是用这个通用函数
       ** 当接口发生修改或者新增时，将接口信息按照如下格式：
       接口名称
      - 接口核心功能描述，不超过200字
      - 接口地址: /print/assembly/{id}/export-pdf
      - 方法: GET
      - 需要登录: 是
      - 请求参数: 无
      - 响应类型: blob
      - 返回值：{}
      同步更新到  @接口文档.md
      
      
      ---
      我现在需要一份接口文档，你需要扫描每个页面,页面在 @pages @components   ，按照以下流程来获取页面中的接口信息
      - 从页面中获取调用的接口，并找到接口调用的真实地址,如果没有你可以自己生成真实的接口地址
      - 从页面中获取调用接口的入参和返参，并放到下面的格式中返回
      - 出参和入参的格式定义需要符合接口的统一规则 api.mdc
      - 接口需要标出是否需要登陆才能访问
      最后生成md文档保存起来
      格式如下：
      接口名称
      - 接口核心功能描述，不超过200字
      - 接口地址: /print/assembly/{id}/export-pdf
      - 方法: GET
      - 需要登录: 是
      - 请求参数: 无
      - 响应类型: blob
      - 返回值：{}
      记得把 接口规则文档放到上下文中
      
      
      ---
      description: 
      globs: src/api/*.js
      alwaysApply: false
      ---
      #说明
      本规则适用于所有需要调用api请求的功能
      #项目结构
      - api目录存放所有跟后端请求的服务API，任何涉及到后端调用的必须写在这个目录里面
      - api的命名方式 模块名称大写API.js
      - 每个接口必须有注释，注释格式如下：
      /**
      * 接口名称
      * 功能描述
      * 入参
      * 返回参数
      * url地址
      * 请求方式
      **/
      - 每个接口的实现可参考如下示例：
          import { get, post, put, del } from './index.js'
          /**
          * 获取购物车列表
          * 功能描述：获取用户购物车中的所有商品
          * 入参：无
          * 返回参数：购物车商品列表
          * url地址：/cart/list
          * 请求方式：GET
          */
          export function getCartList() {    
              return get('/cart/list')
          }
      
      ---
      description: 
      globs: src/api/mockManager.js
      alwaysApply: false
      -----
      你每次写mock的接口的同时也需要在api目录写真实的接口
      
      ---
       @api 里面的每个route发生变化时必须执行自动化测试，并将测试结果告诉我
      我的项目是一个前后端分离的项目，现在这个项目是前端项目，我希望前端项目在发生变更时，如果涉及到后端的接口变化，你帮我生成一个后端服务的任务清单，我将任务任务清单发给后端服务能直接生成代码。
      任务清单放到doc中。
      基于以上需求，帮我生成一个rules
      ```
- 场景
    - CRD
      ```javascript
      # 调试
      
      ## 用deploy.sh 部署config/samples/ms1/torin/ms1_tpl.yaml 调试。deploy.sh 要保持最简，尽量不改动
      
      ## 测试CR时，应该先本地调试，再正式调试
      ### 本地调试，正确顺序是
          1. kill掉占用端口的进程
          2. "nohup make run > operator.log 2>&1 &"
          3. "gtimeout 10 tail -f operator.log"调试，注意一次看日志的timeout时间不能超过10s。
      ### 正式调试是，deploy正式调试之前应该准备好CRD和Helm，正确顺序是：
          1. helm push（推送更新的chart到仓库） 
              helm package ./config/samples/ms1/maas/helm/mas
              helm push *.tgz oci://moments8-acr-registry.cn-beijing.cr.aliyuncs.com/moments8
          2. deploy controller
              make manifests generate fmt vet install
              IMG=moments8-acr-registry.cn-beijing.cr.aliyuncs.com/moments8/mas-operator:v1.0.2
              docker buildx build --platform linux/amd64 -t $IMG .
              docker push $IMG
              make deploy IMG=$IMG
          3. apply CR
              ./deploy.sh
      
      # 要做
      
      ## 执行阻塞相关命令时：
          1. 执行预期中会一直阻塞的命令时，必须使用gtimeout设置超时时间，包括但不限于：tail -f、kubectl logs -f、kubectl delete、kubectl rollout、make run等持续运行的命令。例如：gtimeout 30 tail -f operator.log 或 gtimeout 30 kubectl logs -f pod-name。这样可以防止命令无限期阻塞工作流程。
          2. 所有timeout类型的设置，包括gtimeout命令，时间不要超过30s。无论是gtimeout、kubectl wait的--timeout参数，还是其他任何超时设置，都必须控制在30秒以内。
          3. 使用sleep命令时，时间不能超过30秒。所有需要等待的命令都应该控制在30秒以内，避免长时间阻塞工作流程。
      
      ## 在删除Kubernetes资源时：
          1. 必须分两步执行：第一步使用kubectl patch移除finalizers：kubectl patch [resource] --type=json -p='[{"op":"remove","path":"/metadata/finalizers"}]'，第二步再执行kubectl delete：kubectl delete [resource]。这两个命令必须分开执行，不能用&&连接符一次性执行，以确保每一步都能正确完成并观察到结果。
          2. kubectl delete namespace时，应该先把该namespace下的资源一个个patch移除finalizers后再delete，而不是直接强制删除namespace。
          3. 所有kubectl delete命令都必须加超时限制，最多20秒。
      
      # 不要做
      
      ## 不要写脚本
      ## 不要写文档
      ## 不要用make test 或 go test 测试，统一用deploy.sh调试
      
      # 项目结构
      ## 顶层目录
      | 目录 | 作用 |
      | --- | --- |
      | `api/` | CRD 类型定义与代码生成 |
      | `internal/controller/` | 业务控制器与辅助模块 |
      | `config/` | CRD、RBAC、样例 YAML、Kustomize |
      | `cmd/` | 主入口 `main.go` |
      | `scripts/` | CI/CD、调试与工具脚本 |
      
      ## 关键文件
      - **Makefile**：一键构建、测试、推送  
      - **PROJECT**：Kubebuilder 配置  
      - **go.mod / go.sum**：依赖管理  
      
      ## 开发流程
      1. 修改 `api/*` → `make manifests` 生成 CRD  
      2. 实现业务逻辑 → `make generate` 自动注册 RBAC  
      3. 本地测试 → `make test`  
      4. 构建镜像 → `make docker-build && make docker-push`  
      5. 在 infra 集群中部署 Operator
      
      ## 代码规范
      - 控制器函数注释采用 **GoDoc** 风格  
      - 避免循环依赖，工具类放入 `pkg/`  
      - 日志使用 `ctrl.Logger`，统一字段
      
      *：Kubebuilder 配置  
      - **go.mod / go.sum**：依赖管理  
      
      ## 开发流程
      1. 修改 `api/*` → `make manifests` 生成 CRD  
      2. 实现业务逻辑 → `make generate` 自动注册 RBAC  
      3. 本地测试 → `make test`  
      4. 构建镜像 → `make docker-build && make docker-push`  
      5. 在 infra 集群中部署 Operator
      
      ## 代码规范
      - 控制器函数注释采用 **GoDoc** 风格  
      - 避免循环依赖，工具类放入 `pkg/`  
      - 日志使用 `ctrl.Logger`，统一字段
      ```
    - 后端
      ```javascript
      ---
      description: java 开发规范
      globs: 
      alwaysApply: true
      ---
      # Java 开发规范与架构指南
      
      ## 项目架构说明
      
      ### 模块划分
      - **gyl-common**: 通用工具模块（工具函数、枚举类、通用DTO、异常定义）
      - **gyl-core**: 核心业务模块（service、manager、mapper三层架构）
      - **gyl-gateway**: 网关层（HTTP请求处理、参数校验、路由转发）
      
      ### 三层架构详解
      
      #### Service层 (`gyl-core/src/main/java/com/njgyl/core/service`)
      - **职责**: 业务流程编排、参数校验、权限控制
      - **设计原则**: 一个业务领域一个Service，一个功能一个方法
      - **接口规范**: 必须定义接口，入参和返参使用DTO类型
      - **调用关系**: 调用Manager层方法，不直接操作数据库
      
      #### Manager层 (`gyl-core/src/main/java/com/njgyl/core/manager`)
      - **职责**: 核心业务逻辑封装、数据操作、缓存处理
      - **设计原则**: 通用化设计，提供可复用的业务方法
      - **缓存管理**: Redis读写操作统一在此层处理
      - **接口规范**: 不需要定义接口，直接使用实现类，入参和返参使用DTO类型
      - **业务封装**: 相同或相似业务逻辑必须在此层统一封装
      
      #### Mapper层 (`gyl-core/src/main/java/com/njgyl/core/mapper`)
      - **职责**: 数据库访问，一个表对应一个Mapper
      - **技术选型**: 优先使用MyBatis-Plus单表CRUD，复杂查询使用XML
      - **文件规范**: XML文件命名为`表名+Mapper.xml`，存放在`gyl-core/src/main/resources/mapper/`
      - **数据类型**: 入参必须使用专门数据库对象或者DTO类型，禁止自定义Map类型，返参可以是entity或者其他对象类型
      
      #### Gateway层 (`gyl-gateway`)
      - **职责边界**: 仅负责参数校验（不涉及service层）、请求路由，禁止编写业务逻辑
      - **调用规范**: 只能调用gyl-core下的Service方法
      - **路径规范**: 
        - 后台管理: `/api/admin/`
        - 商城应用: `/api/app/`
        - 仓配系统: `/api/wms/`
      - **认证模块**: AdminHandlerInterceptors（后台）、ShopHandlerInterceptors（商城）
      
      ## 开发规范
      
      ### 业务逻辑封装规范
      - **避免重复**: Service层不允许重复业务逻辑，必须调用Manager层统一方法
      - **参数适配**: Service层通过不同DTO参数调用Manager层统一方法
      - **实践案例**: 密码修改功能，无论用户修改还是管理员重置，都调用Manager层统一方法
      - **流程实现**: 在流程代码中不允许出现TODO或者注释不写代码只写文字的情况
      ### API设计规范
      - **请求方法**: 仅允许POST和GET请求
      - **参数规范**: 超过2个参数必须定义DTO实体
      - **DTO命名**: 功能明确命名，如`AdminUserCreateDTO`、`MallUserLoginDTO`
      - **字段校验**: 使用Bean Validation注解进行参数校验
      - **响应格式**: 统一使用 [Result](mdc:gyl-common/src/main/java/com/njgyl/common/result/Result.java) 封装，时间字段转字符串
      
      ### 数据处理规范
      - **对象拷贝**: 禁止使用`BeanUtil.copyProperties()`，采用手动字段赋值
      - **状态管理**: 所有状态字段使用枚举类型，避免魔法数字
      - **DTO分类**: 按功能分包存放（user/、shop/、goods/等）
      - **转换封装**: DTO转换方法统一放在各模块convert包中
      
      ### 异常处理规范
      - **日志记录**: 所有异常catch必须记录详细日志（堆栈、参数、方法信息）
      - **异常分类**:
        - `BusinessException`: 业务逻辑异常
        - `ServiceException`: 服务层处理异常
        - `DataAccessException`: 数据访问异常
      - **异常传播**: Service层异常由统一异常处理器处理
      - **事务异常**: 在@Transactional(rollbackFor = Exception.class)的函数中不要使用try .... catch 捕获异常
      
      ### 工具类使用规范
      - **优先选择**: Hutool工具库
      - **字符串操作**: `StrUtil` 替代 `StringUtils`
      - **集合操作**: `CollUtil` 处理集合相关操作
      - **时间处理**: `DateUtil` 进行时间格式化和计算
      
      ## 开发流程规范
      
      ### 标准开发流程
      1. **需求分析**: 识别是否有相似功能已存在
      2. **架构设计**: 确定核心逻辑实现层级，避免重复开发
      3. **Mapper层**: 定义数据访问接口和SQL（如需要）
      4. **Manager层**: 封装可复用的业务逻辑和数据操作
      5. **Service层**: 实现具体业务流程，调用Manager层方法
      6. **Controller层**: 提供HTTP接口，仅做参数校验和路由
      
      ### 代码复用原则
      - **开发前必查**: 查阅 [README.md](mdc:README.md) 确认现有功能
      - **Manager层优先**: 优先使用已有Manager层方法，避免重复实现
      - **逻辑抽象**: 将相似业务逻辑抽象到Manager层，供多个Service调用
      - **重构意识**: 发现重复代码时，及时重构到合适层级
      - **调用规范**: 不要使用包名的方式调用类或者方法，比如 om.njgyl.core.convert.UserConvert
      
      ## 安全与限制规范
      
      ### 安全性要求
      - **认证授权**: Redis缓存登录状态，基于角色的权限管理
      - **密码安全**: MD5加密存储，登录时比对加密值
      - **数据验证**: 所有外部输入必须验证，使用参数化查询防SQL注入
      - **XSS防护**: 对输出内容进行适当转义
      
      ### 严格禁止事项
      - **文件修改**: 禁止修改`pom.xml`（未经允许）和`gyl-core/src/main/java/com/njgyl/core/entity/`下的实体类
      - **对象拷贝**: 禁止使用`BeanUtil.copyProperties()`
      - **数据库变更**: 必须生成SQL文档存放在`doc/`目录，需版本化管理和向前兼容
      - **循环操作数据**: 禁止在循环中查询数据，应该使用ids查询
      
      ## 最佳实践总结
      
      ### 关注点分离
      - 每一层只关注自己的职责，不越界处理其他层的逻辑
      - Gateway层专注请求处理，Service层专注业务编排，Manager层专注业务封装
      
      ### 代码复用
      - 在Manager层统一封装相似业务逻辑，避免在Service层重复实现
      - 通过参数适配实现不同场景下的业务逻辑复用
      
      ### 可维护性
      - 使用枚举管理状态，使用DTO传输数据，手动字段赋值提高可读性
      - 完善的异常处理和日志记录，便于问题排查和系统监控
      ```
    - 前端
      ```javascript
      ---
      description: 
      globs: 
      alwaysApply: true
      ---
      # 项目通用规范
      
      ## 技术栈
      - 使用vue3+vant框架，使用原生的js语言，不需要使用typeScript
      - 尽量使用vant现有的组件
      - 使用Pinia管理用户登录态、购物车数据
      - 所有调用后端服务都必须使用API，目录在src/api
      - 页面的组件嵌套不要超过三层
      - 你在进行页面开发时，可以扫描 [README.md](mdc:README.md) 的项目结构，看下是否有可用的组件或者工具方法
      ## 项目结构
      每次更新完文件都需要更新项目结构目录，信息在 [README.md](mdc:README.md)中
      使用真实的 UI 图片，而非占位符图片（可从 Unsplash、Pexels、Apple 官方 UI 资源中选择）
      ## 限制
      - 不允许在对话中使用npm run dev 启动项目
      - 不要在vue页面中定义测试数据，所有的数据必须来自后端服务或者mock接口
      - 不要创建测试文档
      ## 项目结构规则
      - **分层组织**：按功能或领域划分目录，遵循"关注点分离"原则
      - **命名一致**：使用一致且描述性的目录和文件命名，反映其用途和内容
      - **模块化**：相关功能放在同一模块，减少跨模块依赖
      - **适当嵌套**：避免过深的目录嵌套，一般不超过3-4层
      - **资源分类**：区分代码、资源、配置和测试文件
      - **依赖管理**：集中管理依赖，避免多处声明
      - **约定优先**：遵循语言或框架的标准项目结构约定
      ## 通用开发原则
      - **可测试性**：编写可测试的代码，组件应保持单一职责，没有我的允许不能创建测试用例
      - **DRY 原则**：避免重复代码，提取共用逻辑到单独的函数或类
      - **代码简洁**：保持代码简洁明了，遵循 KISS 原则（保持简单直接），每个方法行数不超过300行
      - **命名规范**：使用描述性的变量、函数和类名，反映其用途和含义
      - **注释文档**：为复杂逻辑添加注释，编写清晰的文档说明功能和用法
      - **风格一致**：遵循项目或语言的官方风格指南和代码约定
      - **利用生态**：优先使用成熟的库和工具，避免不必要的自定义实现
      - **架构设计**：考虑代码的可维护性、可扩展性和性能需求
      - **版本控制**：编写有意义的提交信息，保持逻辑相关的更改在同一提交中
      - **异常处理**：正确处理边缘情况和错误，提供有用的错误信息 
      ## git 操作
      - 你完成了一项功能开发后，需要进行commit 操作
      ## 响应语言
      - 始终使用中文回复用户
      ```
    - 小程序
      ```javascript
      /components/**/*，/pages/**/*
      
      你是一个经验丰富的小程序开发人员，擅长解决各种小程序开发问题，严格遵守小程序开发规范
      项目结构
      - components
        /**这里存放小程序的自定义组件，每个组件单独一个文件夹 */
      - pages
       /**这里存放小程序的页面，每个页面单独一个文件夹 */
      - api
      /** 这里存放调用后端服务的文件，按模块划分，每个模块一个文件,文件命名：**Api.js */
      - static
      /**存放其他常用js或者静态资源图片 */
      ui及页面规范
      - 所有页面必须包含 js、json、wxml、wxss文件，json文件必须包含以下基本内容
      {
        "navigationBarTitleText": "上传作文",
        "usingComponents": {
        }
      }
       
      代码规范：
          - 使用微信小程序原生框架进行开发，合理使用组件化开发。
          - 遵循微信小程序设计规范，确保良好的用户体验。
          - 利用微信小程序提供的API进行功能开发，如登录、支付、地理位置等。
          - 使用分包加载优化小程序体积和加载性能。
          - 合理使用页面生命周期函数和组件生命周期函数。
          - 编写详细的代码注释，并在代码中添加必要的错误处理和日志记录。
          - 合理使用本地存储和缓存机制。
      
      
      api/*.js
      
      ** 入参要求
         - header中必须设置 auth， 值为当前登录后保存的token值
         - 请求的参数使用json 格式， 就算是参数为空，也需要使用 {} 来代替
      ** http请求
         请求方式默认是post，除非有明确要求
      ** 返参
        - 后端统一返回的参数为json对象，格式如下
         {
          "error": 0,
           "body": object,
           "message": ''
      
         }
       error =0, 表示没有任何异常
       error = 500, 表示系统异常，需要弹出系统异常的错误
       error = 401，表示需要登录
       error 其它值，表示业务异常，直接弹出 message内容
       body 是一个对象
       ** 设计一个通用函数来处理后端API返回值，所有的API文件都是用这个通用函数
      ```
    - 技术栈
        - https://github.com/sanjeed5/awesome-cursor-rules-mdc/tree/main/rules-mdc
        - https://cursor.directory/
