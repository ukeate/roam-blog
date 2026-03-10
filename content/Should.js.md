- 介绍
    - 兼容性测试
- 安装
    - npm install should --save-dev
- 使用
    - ```javascript
      var should = require('should');
      
      user.should.have.property('name', 'jack')
          # should(user).have.property('name','jack');
      user.should.have.property('pets').with.lengthOf(4);
          # 判断数组
      should.not.exist(err);
      should.exist(result);
      result.bar.should.equal(foo);
      (5).should.be.exactly(5).and.be.a.Number();
      user.should.be.an.instanceOf(Object).and.have.property('name', 'jack');
      this.obj.should.have.property('id').which.is.a.Number();
      ```
