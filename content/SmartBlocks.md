- 模板
    - #SmartBlock What Are Smartblocks
        - They are like Roam templates
        - Outputs all of the content at once
        - But with special "Smart" commands
        - Demoing <%DATE:today%>
    - 触发词
        - jj
    - 命令参考
        - https://roamjs.com/extensions/smartblocks/command_reference
        - Data/Time

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | DATE | &lt;%DATE:Today%&gt;                      &lt;%DATE:Friday%&gt;<br>&lt;%DATE:Friday%&gt;<br>&lt;%DATE:5 days from now%&gt;<br>&lt;%DATE:In two weeks%&gt;<br>&lt;%DATE:In two weeks,yyyy-MM-dd%&gt; |  |
            | TIME<br>- &lt;%TIMEAMPM%&gt;                        - AM/PM格式插入时间 | &lt;%TIME%&gt;                - TIMEAMPM |  |
            | DATEBASIS | &lt;%DATEBASIS:DNP%&gt;使用运行工作流的每日注释页面日期，如果不是 DNP，它将使用今天的日期                      &lt;%DATEBASIS:today%&gt;使用今天的日期作为基础<br>&lt;%DATEBASIS:in 3 days%&gt;使用从现在起 3 天后的日作为日期基准<br>&lt;%DATEBASIS:in two weeks%&gt; | 基准日期 |
        - 偶然性

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | RANDOMBLOCK |  |  |
            | RANDOMBLOCKFROM |  |  |
            | RANDOMBLOCKMENTION |  |  |
            | RANDOMCHILDOF |  |  |
            | RANDOMNUMBER | 1,10 |  |
            | RANDOMPAGE |  |  |
        - TODO

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | TODOTODAY | &lt;%TODOTODAY:20,(({uid}))%&gt;                        - 今日块引用列表 |  |
            | TODOOVERDUE | &lt;%TODOOVERDUE:20,(({uid}))%&gt;                        - 逾期 |  |
            | TODOOVERDUEDNP | &lt;%TODOOVERDUEDNP:20,(({uid}))%&gt;                        - 过期 |  |
            | TODOFUTURE | &lt;%TODOFUTURE:20,(({uid}))%&gt;                        - 未来 |  |
            | TODOFUTUREDNP |  |  |
            | TODOUNDATED |  |  |
        - 块关联

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | ATTRIBUTE |  |  |
            | BLOCKMENTIONS |  |  |
            | BLOCKMENTIONSDATED |  |  |
            | BREADCRUMBS |  |  |
            | BUTTON |  |  |
            | CHILDREN |  |  |
            | CONCAT |  |  |
            | CURRENTPAGENAME |  |  |
            | CURRENTURL |  |  |
            | CURRENTUSER |  |  |
            | CURRENTBLOCKREF |  |  |
            | CURRENTBLOCKCONTENT |  |  |
            | GETATTRIBUTE |  |  |
            | TRIGGERREF |  |  |
            | RESOLVEBLOCKREF |  |  |
            | SEARCH |  |  |
            | HASHTAG |  |  |
            | TAG |  |  |
            | REPLACE |  |  |
            | UPDATEBLOCK |  |  |
            | PARENT |  |  |
        - 逻辑控制

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | IFVAR |  |  |
            | IFNOTVAR |  |  |
            | IFMATCH |  |  |
            | IFNOTMATCH |  |  |
            | IFDATEOFYEAR |  |  |
            | IFDAYOFMONTH |  |  |
            | IFDAYOFWEEK |  |  |
            | IFTAGINBLOCK |  |  |
            | IFCHILDREN |  |  |
            | INPUT |  |  |
            | SET |  |  |
            | GET |  |  |
            | HAS |  |  |
            | CLEARVARS |  |  |
            | SUM |  |  |
            | DIFFERENCE |  |  |
            | PRODUCT |  |  |
            | DIVISION |  |  |
            | FLOOR |  |  |
            | ROUND |  |  |
            | SMARTBLOCK |  |  |
            | REPEAT |  |  |
        - 指针

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | CLIPBOARDCOPY |  |  |
            | CLIPBOARDPASTETEXT |  |  |
            | CURSOR |  |  |
            | INDENT |  |  |
            | UNINDENT |  |  |
            | FOCUSONBLOCK |  |  |
        - 动作

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | EXIT |  |  |
            | NOTIFICATION |  |  |
            | NOBLOCKOUTPUT |  |  |
            | SKIPIFEMPTY |  |  |
            | OPENPAGE |  |  |
            | SIDEBARWINDOWOPEN |  |  |
            | OPENREFERENCESINSIDEBAR |  |  |
            | SIDEBARWINDOWCLOSE |  |  |
            | SIDEBARSTATE |  |  |
            | APIGET |  |  |
        - 工作流

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | HIDE |  |  |
            | NOCURSOR |  |  |
        - 公共思想

            | 名字 | 值 | 说明 |
            | --- | --- | --- |
            | Formatting |  |  |
- 其它功能
    - daily自动触发
    - 按钮
    - 批量触发
    - 热键
    - 命令面板
- Store
    - ctrl +p, Open SmartBlocks Store
