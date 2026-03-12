- Large Language Model, 大模型，[[大模型本质]]
- 发展
    - [[RNN]],[[LSTM]],[[GRU]]
    - CNN
    - [[Transformer]]
- 分类
    - [[GPT]]
    - [[BERT]]
    - [[XLNet]]
    - RoBERTa
| 模型 | 结构 | 位置编码 | 激活函数 | layer norm方法 |
| --- | --- | --- | --- | --- |
| 原生Transformer | Encoder-Decoder | Sinusoida编码 | ReLU | Post layer norm |
| BERT | Encoder | 绝对位置编码 | GeLU | Post layer norm |
| LLaMA | Casual-decoder | [[RoPE]] | SwiGLU | Pre RMS Norm |
| ChatGLM-6B | Prefix decoder | [[RoPE]] | GeGLU | Post Deep Norm |
| Bloom | Casual decoder | ALiBi | GeLU | Pre Layer Norm |
- 决定效果
    - 模型参数量、数据集大小、计算量
    - 幂率
        - 如果单独增大一个，量越来越大，效果越来越小
        - 算力不足时，小模型收敛更快
- 分词
    - 子词
        - 通过训练数据得到
        - BPE(Byte Pair Encoding)
            - OpenAI使用
        - Word-Piece
            - 单独高频字不合子词
        - Unigram
            - 开始设定子词，慢慢减少
- 显存估计
    - 模型参数、Batchsize, Max_length
- 微调
    - 传统
        - 冻结层训练
    - 外挂，节约内存（大模型特有）
        - Prefix-Tuning
            - 软提示（加虚拟token），输出结果反向调整该提示id的embedding
            - embedding编码用MLP
            - P-Tuning
                - 编码用LSTM + MLP
            - P-Tuning V2
                - 模型每层前都外挂虚拟token
        - Adapter-Tuning
        - LoRA
