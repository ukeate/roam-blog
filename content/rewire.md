- JS测试，测试私有方法
- ```javascript
  it('limit should return success', function () {
      var lib = rewire('../lib/index.js')
      var litmit = lib.__get__('limit')
      litmit(10).should.be.equal(10)
  })
  ```
