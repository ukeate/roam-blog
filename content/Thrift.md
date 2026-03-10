- Apache托管，最初Facebook开发
- 接口定义语言(IDL)
    - ```c++
      struct Person {
        required string userName,
        optional i64 favoriteNumber,
        optional list<string> interests
      }
      ```
- 二进制编码格式
    - BinaryProtocol
    - CompactProtocol
        - 更紧凑
