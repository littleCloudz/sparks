# HTML

# CSS

## 盒模型

# JavaScript语言核心
* [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)方法创建一个新对象，使用现有的对象来提供新创建的对象的\_\_proto\_\_。

* 以下哪些方法会返回一个数组？  
√ [Object.keys()](ES6标准入门_第3版.md)  
返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。如果对象的键-值都不可枚举，那么将返回由键组成的数组。  
√ String.prototype.split()  
split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。  
X Array.prototype.join()  
join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。  
C选项返回字符串。  
X [Promise.all([ .. ])]((Promise.md)  
Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；  
如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。  
D选项返回的是promise对象。 
 
## 遍历

### 对象

#### [for...of](ES6标准入门_第3版.md)

#### [for...in](ES6标准入门_第3版.md)

#### [Object.keys(obj)]((ES6标准入门_第3版.md)

#### [Object.getOwnPropertyNames(obj)]((ES6标准入门_第3版.md)

#### [Object.getOwnPropertySymbols(obj)]((ES6标准入门_第3版.md)

#### [Reflect.ownKeys(obj)]((ES6标准入门_第3版.md)

### 数组  

#### [for...of](ES6标准入门_第3版.md)[参考](学习JavaScript数据结构与算法_第3版.md)

#### [@@iterator](学习JavaScript数据结构与算法_第3版.md)

#### [for语句](学习JavaScript数据结构与算法_第3版.md)

#### 迭代器函数

##### [every](学习JavaScript数据结构与算法_第3版.md)

##### [some](学习JavaScript数据结构与算法_第3版.md)

##### [forEach](学习JavaScript数据结构与算法_第3版.md)

##### [map](学习JavaScript数据结构与算法_第3版.md)

##### [filter](学习JavaScript数据结构与算法_第3版.md)

##### [reduce](学习JavaScript数据结构与算法_第3版.md)

#### 三种从数组中得到迭代器的方法

##### [entries](学习JavaScript数据结构与算法_第3版.md) [参考2](ES6标准入门_第3版.md)

##### [keys](学习JavaScript数据结构与算法_第3版.md)[参考2](ES6标准入门_第3版.md)

##### [values](学习JavaScript数据结构与算法_第3版.md)

 
## [类和模块](JavaScript权威指南_第6版.md)

## 局部变量

* 其中alert两次输出结果为()
```javascript
var foo = "Hello";
(function(){
    var bar = "World"; // 函数内部声明的局部变量，外部无法调用
    alert(foo+bar); // hello world
})(); // 匿名自执行函数
alert(foo+bar); // 报错 ReferenceError: bar is not defined
```
[ReferenceError/TypeError](你不知道的JavaScript_上卷.md)


## this
* 请阅读以下代码
```javascript
var obj = {};
obj.log = console.log;
obj.log.call(console, this);
// 该代码在浏览器中执行，输出的日志结果是什么？
// window
```
非严格模式下，JavaScript语句中"this"默认指向全局对象（window）  
[默认绑定——默认：在严格模式下绑定到undefined，否则绑定到全局对象](/20200430/this.md)

## 表达式和运算符

### 其他运算符

#### 条件运算符（?:）

#### typeof运算符

#### delete运算符


#### [void运算符](JavaScript权威指南_第6版.md)

* void();
上面表达式的结果是：<span class="strong">SyntaxError</span>

```javascript
typeof 1; // 'number'
typeof (1); // 'number'
typeof (); // SyntaxError语法错误

void 0; // undefined
void (0); // undefined
void (); // SyntaxError语法错误 
```

void后面的操作数不能为()  
void作为运算符后面接的是表达式  
void是一元运算符运算符，它出现在操作数之前，操作数可以是任意类型，操作数会照常计算，但忽略计算结果并返回undefined。由于void会忽略操作数的值，因此在操作数具有副作用的时候使用void来让程序更具语义。    

#### 逗号运算符（,）


## [运算符优先级](JavaScript权威指南_第6版.md)
* 假设val已经声明，可定义为任何值。则下面js代码有可能输出的结果为：  
```javascript
console.log('Value is ' + (val != '0') ? 'define' : 'undefine');  
// define
```

## 全局函数
* Math.round(-2019.5)等于多少？
// -2019

* 对于代码var a = 10.42; 取出a的整数部分，以下代码哪些是正确的？
√ parseInt(a);
√ Math.floor(a);
X Math.ceil(a);
X a.split('.')[0];




## 正则
* 以下代码的执行后，str的值是：
```javascript
var str = "Hellllo world";
str = str.replace(/(l)\1/g, '$1');
// Hello world
```
    * (l)表示第一个分组里有l  
    \1表示所获取的第1个()匹配的引用  
    /g表示全局匹配  
    $1表示第一个分组里的值l  
    (l)\1表示匹配两个连续字符ll，即ll  
    (l)\1/g表示全局匹配两个连续字符ll即llll  
    str.replace(/(l)\1/g, '$1')表示将ll替换成l  
    
* 下面哪个不是[RegExp对象](JavaScript权威指南_第6版.md)的方法？  
√ test  
X match  
√ exec  
√ compile  
     
* [正则表达式中(?:pattern)、(?=pattern)、(?!pattern)、(?<=pattern)和(?<!pattern)](https://www.cnblogs.com/dogecheng/p/11466687.html)



# 客户端JavaScript

## Web浏览器中的JavaScript、Window对象(BOM)
BOM（browser object model）浏览器对象模型
1. window对象
2. location对象
3. history对象
4. screen对象
5. navigator对象  
第13章和第14章解释了每一个Web浏览器窗口、标签页和框架由一个Window对象所表示。
* 下列代码，页面打开后能够弹出alert(1)的是？
```html
√ <iframe src="javascript:alert(1)"></iframe>
<!--加载页面的时候触发-->
√ <img src="" onerror="alert(1)"/>
<!--onerror事件，当图片不存在时将触发-->
√ IE下<s style="top:expression(alert(1))"></s>
<!--在ie7下会连续弹出-->
<!--IE5及其以后版本支持在CSS中使用expression，用来把CSS属性和Javascript表达式关联起来，这里的CSS属性可以是元素固有的属性，也可以是自定义属性。就是说CSS属性后面可以是一段Javascript表达式，CSS属性的值等于Javascript表达式计算的结果结果。-->
<!--在表达式中可以直接引用元素自身的属性和方法，也可以是用其他浏览器对象。这个表达式就好像是这个元素的一个成员函数一样。-->
<!--参考：http://www.blueidea.com/tech/site/2006/3705.asp-->
X <div onclick="alert(1)"></div>
<!--不可以，因为div里没有内容，盒子的宽度为0，所以点击不了-->
```

## 脚本化文档(DOM)
每个Window对象有一个document属性引用了Document对象。Document对象表示窗口的内容，它就是本章(15章)的主题。  
Document对象并非独立的，它是一个巨大的API中的核心对象，叫做文档对象模型（Document Object Model，DOM），它代表和操作文档的内容。  


## [事件处理](Event.md)

* 下列哪些事件不支持冒泡？
resize
click
blur
mouseleave

## 脚本化HTTP

### [Ajax](Ajax.md)

# [HTTP](http.md)
* 以下哪一项不属于浏览器[Response Headers](/http.md)字段：  
X Referer  
√ Connection  
√ Content-Type  
√ Server  
   
   
# [EChart](https://echarts.apache.org/zh/index.html)

# [Vue](vue.md)

## [new Vue()](Vue快跑_构建触手可及的高性能Web应用.md)

## [vue-router](vue.md)

## [vuex](vue.md)

## [vue-loader](vue.md)s

# [Webpack](webpack.md)

# [Lodash](http://lodash.think2011.net/)

## [_.defaultsDeep](http://lodash.think2011.net/defaultsDeep)
深分配对象的可枚举属性

## [_.debounce](http://lodash.think2011.net/debounce) & [_.throttle](http://lodash.think2011.net/throttle)
处理函数防抖和节流


# [IDEA](idea.md)

# [Git](git.md)

# [npm](npm.md)

