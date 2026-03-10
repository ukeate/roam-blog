- ## 基础扩展
    - 循环变量作用域
        - ```javascript
          function constfunc(v){
              return function(){return v}
          }
          var funcs = []
          for(var i = 0; i < 10; i++){
              funcs[i] = constfunc(i)
          }
          ```
    - 闭包序列
        - ```javascript
          function constfunc(v){
              return function(){return v}
          }
          var funcs = []
          for(var i = 0; i < 10; i++){
              funcs[i] = constfunc(i)
          }
          ```
    - 闭包计数器
        - ```javascript
          function counter(){
              var n = 0;
              return {
                  count: function(){return n++;},
                  reset: function(){n = 0;}
              };
          }
          ```
    - 属性存取器
        - ```javascript
          function counter(n){
              return{
                  get count() {return n++},
                  set count(m){
                      if(m >= n) {n = m }
                      else {throw Error("count can only be et to a larger value")}
                  }
              }
          }
          var c = counter(1000);
          c.count;
          ```
    - 属性define
        - ```javascript
          Object.defineProperty(Object.prototype, "extend", {
              writable: true,
              enumerable: false,
              configurable: true,
              value: function(o){
                  var names = Object.getOwnPropertyNames(o);
                  for(var i = 0; i < names.length; i++){
                      if(names[i] in this) continue;
                      var desc = Object.getOwnPropertyDescriptor(o, names[i]);
                      Object.defineProperty(this, names[i], desc);
                  }
              }
          });
          ```
    - 私有属性
        - ```javascript
          function addPrivateProperty(o, name, predicate){
              var value;
              o["get" + name] = function(){return value;}
              o["set" + name] = function(v){
                  if(predicate && ! predicate(v)) {throw Error("set" + name + ": invalid value " + v)}
                  else {value = v}
              };
          }
          var o = {}
          addPrivateProperty(o, "Name", function(x){ return typeof x == "string";});
          o.setName("A");
          o.setName(o);
          ```
    - 嵌套属性名
        - ```javascript
          function getAllPropertyNames = function(obj){
              var props = [];
              do {
                  props = props.concat(Object.getOwnPropertyNames(obj));
              } while (obj = Object.getPrototypeOf(obj));
              return props;
          }
          ```
    - 嵌套属性名2
        - ```javascript
          function keys(o){
              if(typeof o !== "object") throw TypeError();
              var result = [];
              for(var prop in o){
                  if(o.hasOwnProperty(prop))
                  result.push(prop);
              }
              return result;
          }
          ```
    - 嵌套累加
        - ```javascript
          function flexisum(a){
              var total = 0;
              for(var i = 0; i < arguments.length; i++) {
                  var element = arguments[i], n;
                  if(element == null){
                      continue;
                  } else if(isArray(element)){
                      n = flexisum.apply(this, element);
                  } else if(typeof element === "function"){
                      n = Number(element());
                  } else{
                      n = Number(element);
                  }
                  if(isNaN(n)){
                      throw Error("flexisum(): can't convert " + element + " to number");
                  }
                  total +=n;
              }
              return total;
          }
          ```
    - 泛函代理, monkey-patching 'this'
        - ```javascript
          function trace(o, m){
              var original = o[m];
              o[m] = function(){
                  return original.apply(this, arguments);
              }
          }
          ```
    - 兼容ECMAScript 3实现bind
        - ```javascript
          function bind(f, o){
              if(f.bind) {return f.bind(o)}
              else {
                  return function(){
                      return f.apply(o, arguments);
                  }
              }
          }
          ```
- 函数式
    - thunk
        - ```javascript
          function thunk (fileName) {
              return function (callback) {
                  return fs.readFile(fileName, callback)
              }
          }
          ```
    - extend, 同名覆盖
        - ```javascript
          function extend(o, p){
              for(prop in p){
                  o[prop] = p[prop];
              }
              return o
          }
          ```
    - merge, 同名不覆盖
        - ```javascript
          function merge(o, p){
              for(prop in p){
                  if(o.hasOwnProperty[prop]) {continue}
                  o[prop] = p[prop];s
              }
              return o;
          }
          ```
    - restrict, 删除非公共属性
        - ```javascript
          function restrict(o, p){
              for(prop in o){
                  if(!(prop in p)) delete o[prop];
              }
              return o;
          }
          ```
    - substract, 删除公共属性
        - ```javascript
          function subtract(o, p){
              for(prop in p){
                  delete o[prop];
              }
              return o;
          }
          ```
    - union, extend产生新对象
        - function union(o, p) { return extend(extend({}, o), p);}
    - intersection, restrict产生新对象
        - function intersection(o, p){ return restrict(extend({}, o), p);}
    - mixin
        - ```javascript
          function mix (...mixins) {
              class Mix {}
              for (let mixin of mixins) {
                  copyProperties(Mix, mixin);
                  copyProperties(Mix.prototype, mixin.prototype);
              }
              return Mix;
          }
          function copyProperties(target, source) {
              for(let key of Reflect.ownKeys(source)) {
                  if(key !== 'constructor'
                      && key !== 'prototype'
                      && key !== 'name') {
                      let desc = Object.getOwnPropertyDescriptor(source, key);
                      Object.defineProperty(target, key, desc);
                  }
              }
          }
          ```
    - 混合继承
        - class A extends mix(B, C) {}
    - mixins方法不被覆盖
        - ```javascript
          let Mixin1 = (superclass) => class extends superclass {
              foo () {if(super.foo) super.foo()}
          }
          let Mixin2 = (superclass) => class extends superclass {
              foo () {if(super.foo) super.foo()}
          }
          class S {
              foo() {}
          }
          class C extends Mixin1(Mixin2(s)) {
              foo() {super.foo()}
          }
          new c().foo()        // C, Mixin1, Mixin2, S
          ```
    - trait
        - 同mixins 额外功能: 防止同名方法冲突, 排除混入某些方法，为混入方法起别名等
        - @traits(A, B)
        - class C()
- generator
    - 状态机 generator clock
        - ```javascript
          var clock = function* (_) {
              while(true) {
                  yield _;
                  console.log('Tick');
                  yield _;
                  console.log('Tock');
              }
          }
          ```
        - 非generator实现
        - ```javascript
          var ticking = true;
          var clock = function() {
              if (ticking) {console.log('Tick');}
              else {console.log('Tock');}
              ticking = !ticking
          }
          ```
    - 递归next
        - ```javascript
          function run(fn) {
              var gen = fn();
              function next (err, data) {
                  var result = gen.next(data);
                  if (result.done) {return result.value;}
                  result.value(next);
              }
              next();
          }
          run(gen);
          ```
    - generator, promise, 递归next2
        - ```javascript
          var readFile = function(fileName) {
              return new Promise(function (resolve, reject) {
                  fs.readFile(fileName, function(err, data) {
                      if(err) {reject(err);}
                      resolve(data);
                  })
              })
          }
          var gen = function* () {
              var f1 = yield readFile('/etc/fstab');
          }
          function run(gen) {
              var g = gen();
              function next(data) {
                  var result = g.next(data);
                  if (result.done) {return result.value;}
                  result.value.then(function(data) {
                      next(data);
                  })
              }
              next()
          }
          run(gen);
          ```
    - co, thunkify
        - ```javascript
          var readFile = thunkify(fs.readFile);
          var gen = function* () {
              var r1 = yield readFile('/etc/fstab');
              var r2 = yiled readFile('/etc/shells')
          }
          co(gen)
          ```
    - mixins注解
        - ```javascript
          function mixins (...list) {
              return function (target) {
                  Object.assign(target.prototype, ...list)
              }
          }
          const Foo = {
              foo() {}
          }
          @mixins(Foo)
          class MyClass()
          ```
