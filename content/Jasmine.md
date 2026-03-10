- 介绍
    - 编写单元测试
- 使用
    - ```javascript
      describe("A suite", function(){
          var foo;
          beforeEach(function(){
                  foo = 0;
                  foo += 1;
          });
          afterEach(function(){
                  foo = 0;
          });
          it("contains spec with an expectation", function(){
                  expect(true).toBe(true);
          });
      });
      ```
