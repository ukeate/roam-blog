- 用于区块链，合约导向式语言
- 执行流程
    - 源码 -> 编译器
        - 字节码 -> 部署(付费) -> 区块链网络
        - 接口声明 + web3.js -> DAPP
    - EVM执行(付费)
- EVM在多节点同时执行
    - 内存
        - 运行完释放，Gas小
    - 存储
        - 链上操作，Gas大
    - 栈
        - 执行快、读写快，容量低，Gas很小
- 特点
    - 交易验证
    - 运行智能合约
    - 完全隔离
    - 全节点运行
    - OutOfGas异常后会回滚
    - 256位指令集
    - 支持运算
        - 算数、位、逻辑、比较、跳转
- Web版IDE
    - remix.ethereum.org
- 类型
    - uint
        - 默认为uint256
- 语法
    - ```solidity
      pragma solidity >=0.7.0 <0.9.0;
      contract A {
        mapping(address => uint) map;
      
        function get(address _addr) public view returns(uint age) {
          return map[_addr];
        }
        function set(uint _age) public {
          map[msg.sender] = _age;
        }
        
        uint age;
        function setAge(uint _age) public {
          age = _age;
        }
        function getAge() public view returns(uint) { // view表示只读，不操作链
          return age;
        }
        function add(uint a, uint b) public pure returns(uint result, uint r_a) { // pure标记只做计算
          return （a + b,a）;
        }
        function getUserAddr() public view returns(address addr) {
          return msg.sender;
        }
      }
      require(1>2) // 相当于assert，抛异常
      ```
    - ```solidity
      pragma solidity ^0.5.12;
      contract Girl {
        string name;
        uint age;
        // 初始化参数
        constructor(string memory initName, uint initAge) public {
          name = intName;
          age = initAge;
        }
      
        function getGirl() public view returns(string memory name, uint age) {
          return(name, age);
        }
      }
      ```
- 编译
    - ABI
        - JSON表示的接口描述
    - Bytecode
        - 字节码
- 文档
    - 黄皮书
- 实现一个虚拟货币
    - 内容
        - 币名
            - 币单位、符号
            - 最小单位
        - 总共多少个
        - 管理员账户
        - 转账
        - 账户、余额
    - 实现
        - 以前发币硬分叉
            - 很难做挖矿
        - 现在用以太坊智能合约
    - 实现协议
        - ERC 20
    - 地址
        - 内部账户
            - 有code
        - 外部账户
    - ```solidity
      pragma solidity ^0.5.12;
      
      constract MyCoin {
        // 管理员
        address public operator;
      
        // 所有账户余额
        mapping(address => uint) balance;
      
        constructor() public {
          operator = msg.sender;
        }
      
        // 发币
        function create(address receiver, uint amount) public {
          // 只能管理员调起
          require(msg.sender == operator);
          balance(receiver) += amount;
          
        }
        
        // 转账
        function transfer(address receiver, uint amount) {
          require(balance[msg.sender] > amount);
          balance[msg.sender] -= amount;
          balance[receiver] += amount;
        }
        
        // 查看余额
        function viewBalance(address addr) public view returns(uint) {
          return balance(addr);
        }
      }
      ```
