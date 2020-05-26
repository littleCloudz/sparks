# 设计&实现tooltip 
## ES6方式
import 
参考: bootstrap tooltip
### 问题:如何在index.html中使用es6编写的插件
## 模块化在es6下怎么做？
参考：编写UI组件
## 实现步骤
### 根据需求，我们先写出dom结构
### 写出css结构
### 接下来，我们开始编写我们的交互插件
#### 我们假设组件的弹出层就是一个对象。则这个对象是包含了我们的交互、样式、结构及渲染的过程。
#### 然后就可以将插件的功能都写上。最终要做到通过实例化一个MyDialog对象就可以使用我们的插件了。
#### 做一些工具函数



> [如何定义一个高逼格的原生JS插件](https://www.jianshu.com/p/e65c246beac1)

# 如何一步一步地实现我的插件封装:
## 插件的外包装
### 用函数包装

* 所谓插件，其实就是封装在一个闭包中的一种函数集。

```javascript
function add(n1, n2) {
    return n1 + n2;
}
add(1, 2);
```

* 不过我们在实际工作与应用中，一般情况的需求都是比较复杂得多。
直接将这堆函数都写出来不就完了。然后都放在一个js文件里面。需要的时候，就调用它就好了。
```javascript
// 加
function add(n1,n2) {
    return n1 + n2;
}
// 减
function sub(n1,n2) {
    return n1 - n2;
}
// 乘
function mul(n1,n2) {
    return n1 * n2;
}
// 除
function div(n1,n2) {
    return n1 / n2;
}
// 求余
function sur(n1,n2) {
    return n1 % n2;
}
```

### 用全局对象包装
* 不过，如果是两个人以上的团队，或者你与别人一起协作写代码，这时候，另一个人并不知道你是否写了add方法，这时他也定义了同样的add方法。那么你们之间就会产生命名冲突，一般称之为变量的 全局污染

* 为了解决这种全局变量污染的问题。这时，我们可以定义一个js对象来接收我们这些工具函数。
```javascript
var plugin = {
    add: function(n1,n2) {
        return n1 + n2;
    },
    sub: function(n1,n2) {
        return n1 - n2;
    },
    mul: function(n1,n2) {
        return n1 * n2;
    },
    div: function(n1,n2) {
        return n1 / n2;
    },
    sur: function(n1,n2) {
        return n1 % n2;
    }
}
plugin.add(1, 2);
```
* 有个别人，接手你的项目，并不知道此全局变量已经定义，则他又定义了一次并赋值，这时，就会把你的对象覆盖掉。
可能你会这么干来解决掉命名冲突问题：

```javascript
if(!plugin) {
    var plugin = {
        // ...
    }
}

if(typeof plugin === undefined) {
    var plugin = {
        // ...
    }
}
```

如果一个变量已经声明过，后面如果不是在函数内声明的，则是没有影响的。所以，就算在别的地方声明过var plugin，我同样也以可以在这里再次声明一次。
基本上，这就可以算是一个插件了。解决了全局污染问题，方法函数可以抽出来放到一单独的文件里面去。

### 利用闭包包装
* 不过我们的plugin对象，是定义在全局域里面的。
我们知道，js变量的调用，从全局作用域上找查的速度会比在私有作用域里面慢得多得多。 ???
所以，我们最好将插件逻辑写在一个私有作用域中。
    * 实现私有作用域，最好的办法就是使用闭包。
    可以把插件当做一个函数，插件内部的变量及函数的私有变量，为了在调用插件后依旧能使用其功能，闭包的作用就是延长函数(插件)内部变量的生命周期，使得插件函数可以重复调用，而不影响用户自身作用域。
    故需将插件的所有功能写在一个立即执行函数中：
    ```javascript
    ;(function(global, undefined){
        var plugin = {
            add: function(n1, n2){..}
            ..
        };
        !('plugin' in global) && (global.plugin = plugin);
    })(window)
    ```
    
    * 对上面的代码段传参问题进行解释一下：
        * 在定义插件之前添加一个分号，可以解决js合并时可能会产生的错误问题；
        * undefined在老一辈的浏览器是不被支持的，直接使用会报错，js框架要考虑到兼容性，因此增加一个形参undefined，就算有人把外面的 undefined 定义了，里面的 undefined 依然不受影响；
        * 把window对象作为参数传入，是避免了函数执行的时候到外部去查找。
* 我们觉得直接传window对象进去，我觉得还是不太妥当。我们并不确定我们的插件就一定用于浏览器上，也有可能使用在一些非浏览端上。
所以我们还可以这么干，我们不传参数，直接取当前的全局this对象为作顶级对象用。
  ```javascript
  (function(undefined){
    'use strict'
    var _global;
    var plugin = {
        add: function(n1, n2){..}
        ..
    };
    _global = (function(){return this || (0, eval)('this');}()); // ???直接_global = this || (0, eval)('this') 可以么？
    !('plugin' in _global) && (_global.plugin = plugin);
  
  }());
  ```

    * 上面的代码段中有段奇怪的表达式：(0, eval)('this')，实际上(0,eval)是一个表达式，这个表达式执行之后的结果就是eval这一句相当于执行eval('this')的意思
    > [(0, eval)(‘this’)](https://www.cnblogs.com/qianlegeqian/p/3950044.html)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        * Global Object代表一个全局对象
            * js中不允许存在独立的函数，变量和常量，它们都是Global Object 的属性和方法，包括内置的属性和方法
            * 但是Global Object实际并不存在，它是由window充当这个角色，并且这个过程是在js首次加载时进行的
            在一个页面中，首次载入js代码时会创建一个全局执行环境，这个全局执行环境的作用域链实际上只有一个对象，即全局对象（window），并用this来引用全局对象。
        * 从语法上来解读： 
            * 逗号操作符总会返回表达式中的最后一项，所以0在这里基本上没有什么用，换成其他任意数值均可
            * 然后通过”()”来立即执行这个表达式，返回eval
            * 为eval传入’this’字符串，然后被当做实际的ECMAScript语句来解析
        * 这个表达式的作用： 
        因为在严格模式下，匿名函数中的this为undefined,
        为了防止在严格模式下window变量被赋予undefined，使用(0, eval)(‘this’)就可以把this重新指向window对象。
        * (0, eval)？？这个执行完以后是什么呢？
        答案是eval
        * 间接eval调用和直接eval调用
        (0, eval)(‘this’)是间接的eval调用，那么直接和间接调用之后的区别是什么呢？
            * 间接调用计算出来的是一个值，而不是引用
            这是因为两个操作符 - （例子(1,eval)里的）逗号操作符和(例子(eval=eval)里的)等号操作符-对它的操作数执行了GetValue。
            因此，(1,eval)和(eval = eval)计算出一个值，而eval 和 (eval)计算出的是一个引用。
            * 间接调用是在全局范围内执行执行代码的。
            ```javascript
            var foo = 'global.foo';
            var obj = {
                foo: 'obj.foo',
                method: function(){
                    return this.foo;
                }
            }
            console.log(obj.method()); // 'obj.foo'
            console.log((1, obj.method)());  // 'global.foo'
            ```
        * 严格模式下，外部访问不到eval()中创建的任何变量或函数
        ```javascript
        'use strict'
        eval("var msg = '123';");
        console.log(msg); // ReferenceError: msg is not defined
        ```
        
        * 为eval赋值也会导致错误
        ```javascript
        'use strict'
        eval = '123'; // SyntaxError: can't assign to eval in strict mode
        ```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
### 使用模块化的规范包装

* 但是如果是多个人一起开发一个大型的插件，这时我们要该怎么办呢？多人合作，肯定会产生多个文件，每个人负责一个小功能，那么如何才能将所有人开发的代码集合起来呢？这是一个讨厌的问题。要实现协作开发插件，必须具备如下条件：
    * 每个功能互相之间的依赖必须要明确，则必须严格按照依赖的顺序进行合并或者加载
    * 每个子功能分别都要是一个闭包，并且将公共的接口暴露到共享域（即是一个被主函数暴露的公共对象）
* 关键如何实现，有很多种办法。
    * 最笨的办法就是按顺序加载js
    ```html
    <script type="text/javascript" src="part1.js"></script>
    <script type="text/javascript" src="part2.js"></script>
    <script type="text/javascript" src="part3.js"></script>
    ...
    <script type="text/javascript" src="main.js"></script>
    ```
    
        * 但是不推荐这么做，这样做与我们所追求的插件的封装性相背。
    * 为了实现插件的模块化并且让我们的插件也是一个模块，我们就得让我们的插件也实现模块化的机制。
    我们实际上，只要判断是否存在加载器，如果存在加载器，我们就使用加载器，如果不存在加载器，我们就使用顶级域对象。
    ```javascript
    ;(function(undefined){
        'use strict';
        var _global;
        var plugin = {
            add: function(){...}
            ...
        };
        _global = (function(){ return this || (0,eval)('this')});
        if(typeof module !== undefined && module.exports) {
            module.exports = plugin;
        } else if(typeof define !== undefined && define.amd){
            define(function(){ return plugin; });
        } else {
            !('plugin' in _global) && (_global.plugin = plugin);
        }
    
    }()
    ```
    
        * 引入了插件之后，则可以直接使用plugin对象
        ```javascript
        with(plugin) {
            console.log(add(1,2));
            ...
        }
        ```
        
        
    
    
> [JavaScript中 with的用法](https://blog.csdn.net/zwkkkk1/article/details/79725934)
    * with关键字的作用在于改变作用域

## 插件的API
### 插件的默认参数

* 不管我们是否传有参数，我们都应该返回一个值以告诉用户我做了怎样的处理
    ```javascript
    function add(param){
        var args = !!param ? Array.prototype.slice.call(arguments) : [];
        return args.reduce(function(pre, cur){
            return pre + cur;
        }, 0);
    }
    
    add(); // 0
    add(1,2,3); // 6
  
    ``` 
    * Array.prototype.slice.call(arguments) 将具有length属性的对象 转成数组
    * es6语法中新增了Array.from()，所以上述类型的对象可以Array.from(obj)就直接转化成数组！
* 作为一个健壮的js插件，我们应该把一些基本的状态参数添加到我们需要的插件上去。
假设还是上面的加减乘除余的需求，我们如何实现插件的默认参数呢？道理其实是一样的。

```javascript
;(function(undefined){
    var _global;
    
    
    function result(args, fn){
        var argsArr = Array.prototoype.slice.call(arguments);
        if(argsArr.length > 0){
            return args.reduce(fn);
        } else {
            return 0;
        }
    }
    
    
    var plugin = {
        add: function(){
            return result(arguments,function(pre,cur){
                return pre + cur;
            });
        },//加
        sub: function(){
            return result(arguments,function(pre,cur){
                return pre - cur;
            });
        },//减
        mul: function(){
            return result(arguments,function(pre,cur){
                return pre * cur;
            });
        },//乘
        div: function(){
            return result(arguments,function(pre,cur){
                return pre / cur;
            });
        },//除
        sur: function(){
            return result(arguments,function(pre,cur){
                return pre % cur;
            });
        } //余
    }
    
    _global = (function(){ return this || (0, eval)('this'); }());
    if(typeof module !== undefined && module.exports){
        module.exports = plugin;    
    
    } else if(typeof define !== undefined && define.amd){
        define(function(){ return plugin; });
    } else {
        !('plugin' in _global) && (_global.plugin = plugin);
    }

}())
```


### 插件的钩子
* 我们的插件需要提供一个修改默认参数的入口。
  如上面我们说的修改默认参数，实际上也是插件给我们提供的一个API。
* 通常我们用的js插件，实现的方式会有多种多样的。最简单的实现逻辑就是一个方法，或者一个js对象，又或者是一个构造函数等等。
然我们插件所谓的API，实际就是我们插件暴露出来的所有方法及属性。
plugin暴露出来的方法则是如下几个API：
add
sub
mul
div
sur
* 在插件的API中，我们常常将容易被修改和变动的方法或属性统称为钩子(Hook)，方法则直接叫钩子函数。这是一种形象生动的说法，就好像我们在一条绳子上放很多挂钩，我们可以按需要在上面挂东西。
* 实际上，我们即知道插件可以像一条绳子上挂东西，也可以拿掉挂的东西。那么一个插件，实际上就是个形象上的链。不过我们上面的所有钩子都是挂在对象上的，用于实现链并不是很理想。


### 插件的链式调用（利用当前对象）
* 插件并非都是能链式调用的，有些时候，我们只是用钩子来实现一个计算并返回结果，取得运算结果就可以了。
* 但是有些时候，我们用钩子并不需要其返回结果。我们只利用其实现我们的业务逻辑，为了代码简洁与方便，我们常常将插件的调用按链式的方式进行调用。
* 如何才能将链式调用运用到我们的插件中去呢？
    * 假设我们上面的例子，如果是要按照plugin这个对象的链式进行调用，则可以将其业务结构改为：
    ```javascript

    var plugin = {
        add: function(n1,n2){ return this; },
        sub: function(n1,n2){ return this; },
        mul: function(n1,n2){ return this; },
        div: function(n1,n2){ return this; },
        sur: function(n1,n2){ return this; } 
    }
  
    ```
    我们只要将插件的当前对象this直接返回，则在下一下方法中，同样可以引用插件对象plugin的其它勾子方法。然后调用的时候就可以使用链式了。
    plugin.add().sub().mul().div().sur()  //如此调用显然没有任何实际意义
    显然这样做并没有什么意义。我们这里的每一个钩子函数都只是用来计算并且获取返回值而已。而链式调用本身的意义是用来处理业务逻辑的。
    

### 插件的链式调用（利用原型链）
* JS在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做__proto__的内置属性，用于指向创建它的函数对象的原型对象prototype。
* 在上面的需求中，我们可以将plugin对象改为原型的方式，则需要将plugin写成一个构造方法，我们将插件名换为Calculate避免因为Plugin大写的时候与Window对象中的API冲突。

```javascript
...
function Calculate(){}
Calculate.prototype.add = function(){return this;}
Calculate.prototype.sub = function(){return this;}
Calculate.prototype.mul = function(){return this;}
Calculate.prototype.div = function(){return this;}
Calculate.prototype.sur = function(){return this;}
...
```
* 假设我们的插件是对初始化参数进行运算并只输出结果，我们可以稍微改一下：

```javascript
// plugin.js
;(function(undefined) {
    "use strict"
    var _global;

    function result(args,type){
        var argsArr = Array.prototype.slice.call(args);
        if(argsArr.length == 0) return 0;
        switch(type) {
            case 1: return argsArr.reduce(function(p,c){return p + c;});
            case 2: return argsArr.reduce(function(p,c){return p - c;});
            case 3: return argsArr.reduce(function(p,c){return p * c;});
            case 4: return argsArr.reduce(function(p,c){return p / c;});
            case 5: return argsArr.reduce(function(p,c){return p % c;});
            default: return 0;
        }
    }

    function Calculate(){}
    Calculate.prototype.add = function(){console.log(result(arguments,1));return this;}
    Calculate.prototype.sub = function(){console.log(result(arguments,2));return this;}
    Calculate.prototype.mul = function(){console.log(result(arguments,3));return this;}
    Calculate.prototype.div = function(){console.log(result(arguments,4));return this;}
    Calculate.prototype.sur = function(){console.log(result(arguments,5));return this;}


    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Calculate;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return Calculate;});
    } else {
        !('Calculate' in _global) && (_global.Calculate = Calculate);
    }
}());
```

* 这时调用我们写好的插件，则输出为如下：

```javascript
var plugin = new Calculate();
plugin
    .add(2,1)
    .sub(2,1)
    .mul(2,1)
    .div(2,1)
    .sur(2,1);
// 结果：
// 3
// 1
// 2
// 2
// 0
```

* 上面的例子，可以并没有太多的现实意义。
* 不过在网页设计中，我们的插件基本上都是服务于UI层面，利用js脚本实现一些可交互的效果。
这时我们编写一个UI插件，实现过程也是可以使用链式进行调用。

### 编写UI组件

* 一般情况，如果一个js仅仅是处理一个逻辑，我们称之为插件，
* 但如果与dom和css有关系并且具备一定的交互性，一般叫做组件。当然这没有什么明显的区分，只是一种习惯性叫法。
* 利用原型链，可以将一些UI层面的业务代码封装在一个小组件中，并利用js实现组件的交互性。
* 现有一个这样的需求:
    * 实现一个弹层，此弹层可以显示一些文字提示性的信息；
    * 弹层右上角必须有一个关闭按扭，点击之后弹层消失；
    * 弹层底部必有一个“确定”按扭，然后根据需求，可以配置多一个“取消”按扭；
    * 点击“确定”按扭之后，可以触发一个事件；
    * 点击关闭/“取消”按扭后，可以触发一个事件。
* 根据需求，我们先写出dom结构：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
    <link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
    <div class="mydialog">
        <span class="close">×</span>
        <div class="mydialog-cont">
            <div class="cont">hello world!</div>
        </div>
        <div class="footer">
            <span class="btn">确定</span>
            <span class="btn">取消</span>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>
```
* 写出css结构：

```css
* { padding: 0; margin: 0; }
.mydialog { background: #fff; box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3); overflow: hidden; width: 300px; height: 180px; border: 1px solid #dcdcdc; position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; }
.close { position: absolute; right: 5px; top: 5px; width: 16px; height: 16px; line-height: 16px; text-align: center; font-size: 18px; cursor: pointer; }
.mydialog-cont { padding: 0 0 50px; display: table; width: 100%; height: 100%; }
.mydialog-cont .cont { display: table-cell; text-align: center; vertical-align: middle; width: 100%; height: 100%; }
.footer { display: table; table-layout: fixed; width: 100%; position: absolute; bottom: 0; left: 0; border-top: 1px solid #dcdcdc; }
.footer .btn { display: table-cell; width: 50%; height: 50px; line-height: 50px; text-align: center; cursor: pointer; }
.footer .btn:last-child { display: table-cell; width: 50%; height: 50px; line-height: 50px; text-align: center; cursor: pointer; border-left: 1px solid #dcdcdc; }
```
* 接下来，我们开始编写我们的交互插件。
    * 我们假设组件的弹出层就是一个对象。则这个对象是包含了我们的交互、样式、结构及渲染的过程。于是我们定义了一个构造方法：
    
    ```javascript
    function MyDialog(){} // MyDialog就是我们的组件对象了
    ```
    对象MyDialog就相当于一个绳子，我们只要往这个绳子上不断地挂上钩子就是一个组件了。于是我们的组件就可以表示为：
    
    ```javascript
    function MyDialog(){}
    MyDialog.prototype = {
        constructor: this,
        _initial: function(){},
        _parseTpl: function(){},
        _parseToDom: function(){},
        show: function(){},
        hide: function(){},
        css: function(){},
        ...
    }
    ``` 
    
    * 然后就可以将插件的功能都写上。不过中间的业务逻辑，需要自己去一步一步研究。
    无论如何写，我们最终要做到通过实例化一个MyDialog对象就可以使用我们的插件了。
    
    * 在编写的过程中，我们得先做一些工具函数：
        1.对象合并函数
        ```javascript
        // 对象合并
        function extend(o,n,override) {
            for(var key in n){
                if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                    o[key]=n[key];
                }
            }
            return o;
        }
        ```
        2.自定义模板引擎解释函数
        ```javascript
        // 自定义模板引擎
        function templateEngine(html, data) {
            var re = /<%([^%>]+)?%>/g,
                reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
                code = 'var r=[];\n',
                cursor = 0;
            var match;
            var add = function(line, js) {
                js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                    (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                return add;
            }
            while (match = re.exec(html)) {
                add(html.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            add(html.substr(cursor, html.length - cursor));
            code += 'return r.join("");';
            return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
        }
      
        ```
        3.查找class获取dom函数
        ```javascript
        // 通过class查找dom
        if(!('getElementsByClass' in HTMLElement)){
            HTMLElement.prototype.getElementsByClass = function(n, tar){
                var el = [],
                    _el = (!!tar ? tar : this).getElementsByTagName('*');
                for (var i=0; i<_el.length; i++ ) {
                    if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1 ) {
                        el[el.length] = _el[i];
                    }
                }
                return el;
            };
            ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
        }
        ```
    * 结合工具函数，再去实现每一个钩子函数具体逻辑结构：
    ```javascript
    // plugin.js
    ;(function(undefined) {
        "use strict"
        var _global;
    
        ...
    
        // 插件构造函数 - 返回数组结构
        function MyDialog(opt){
            this._initial(opt);
        }
        MyDialog.prototype = {
            constructor: this,
            _initial: function(opt) {
                // 默认参数
                var def = {
                    ok: true,
                    ok_txt: '确定',
                    cancel: false,
                    cancel_txt: '取消',
                    confirm: function(){},
                    close: function(){},
                    content: '',
                    tmpId: null
                };
                this.def = extend(def,opt,true);
                this.tpl = this._parseTpl(this.def.tmpId);
                this.dom = this._parseToDom(this.tpl)[0];
                this.hasDom = false;
            },
            _parseTpl: function(tmpId) { // 将模板转为字符串
                var data = this.def;
                var tplStr = document.getElementById(tmpId).innerHTML.trim();
                return templateEngine(tplStr,data);
            },
            _parseToDom: function(str) { // 将字符串转为dom
                var div = document.createElement('div');
                if(typeof str == 'string') {
                    div.innerHTML = str;
                }
                return div.childNodes;
            },
            show: function(callback){
                var _this = this;
                if(this.hasDom) return ;
                document.body.appendChild(this.dom);
                this.hasDom = true;
                document.getElementsByClass('close',this.dom)[0].onclick = function(){
                    _this.hide();
                };
                document.getElementsByClass('btn-ok',this.dom)[0].onclick = function(){
                    _this.hide();
                };
                if(this.def.cancel){
                    document.getElementsByClass('btn-cancel',this.dom)[0].onclick = function(){
                        _this.hide();
                    };
                }
                callback && callback();
                return this;
            },
            hide: function(callback){
                document.body.removeChild(this.dom);
                this.hasDom = false;
                callback && callback();
                return this;
            },
            modifyTpl: function(template){
                if(!!template) {
                    if(typeof template == 'string'){
                        this.tpl = template;
                    } else if(typeof template == 'function'){
                        this.tpl = template();
                    } else {
                        return this;
                    }
                }
                // this.tpl = this._parseTpl(this.def.tmpId);
                this.dom = this._parseToDom(this.tpl)[0];
                return this;
            },
            css: function(styleObj){
                for(var prop in styleObj){
                    var attr = prop.replace(/[A-Z]/g,function(word){
                        return '-' + word.toLowerCase();
                    });
                    this.dom.style[attr] = styleObj[prop];
                }
                return this;
            },
            width: function(val){
                this.dom.style.width = val + 'px';
                return this;
            },
            height: function(val){
                this.dom.style.height = val + 'px';
                return this;
            }
        }
    
        _global = (function(){ return this || (0, eval)('this'); }());
        if (typeof module !== "undefined" && module.exports) {
            module.exports = MyDialog;
        } else if (typeof define === "function" && define.amd) {
            define(function(){return MyDialog;});
        } else {
            !('MyDialog' in _global) && (_global.MyDialog = MyDialog);
        }
    }());
    ```
    * 到这一步，我们的插件已经达到了基础需求了。我们可以在页面这样调用：
    ```html
      <script type="text/template" id="dialogTpl">
          <div class="mydialog">
              <span class="close">×</span>
              <div class="mydialog-cont">
                  <div class="cont"><% this.content %></div>
              </div>
              <div class="footer">
                  <% if(this.cancel){ %>
                  <span class="btn btn-ok"><% this.ok_txt %></span>
                  <span class="btn btn-cancel"><% this.cancel_txt %></span>
                  <% } else{ %>
                  <span class="btn btn-ok" style="width: 100%"><% this.ok_txt %></span>
                  <% } %>
              </div>
          </div>
      </script>
      <script src="index.js"></script>
      <script>
          var mydialog = new MyDialog({
              tmpId: 'dialogTpl',
              cancel: true,
              content: 'hello world!'
          });
          mydialog.show();
      </script>
      ```
    

## 插件的监听
* 就好像我们进行事件绑定一样，只有用户点击了按扭，才响应具体的事件。那么，我们的插件，应该也要像事件绑定一样，只有执行了某些操作的时候，调用相应的事件响应。
  这种js的设计模式，被称为 订阅/发布模式，也被叫做 观察者模式。
    * 比如，在打开弹窗之前，我们需要先进行弹窗的内容更新，执行一些判断逻辑等，然后执行完成之后才显示出弹窗。
    * 在关闭弹窗之后，我们需要执行关闭之后的一些逻辑，处理业务等。这时候我们需要像平时绑定事件一样，给插件做一些“事件”绑定回调方法。
* 我们jquery对dom的事件响应是这样的：
```javascript
$(<dom>).on("click",function(){})
```
* 我们照着上面的方式设计了对应的插件响应是这样的：
```javascript
mydialog.on('show',function(){})
```

## 成果
最终我们实现的插件代码为：

```javascript
// plugin.js
;(function(undefined) {
    "use strict"
    var _global;

    // 工具函数
    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }
    // 自定义模板引擎
    function templateEngine(html, data) {
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0;
        var match;
        var add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
    }
    // 通过class查找dom
    if(!('getElementsByClass' in HTMLElement)){
        HTMLElement.prototype.getElementsByClass = function(n){
            var el = [],
                _el = this.getElementsByTagName('*');
            for (var i=0; i<_el.length; i++ ) {
                if (!!_el[i].className && (typeof _el[i].className == 'string') && _el[i].className.indexOf(n) > -1 ) {
                    el[el.length] = _el[i];
                }
            }
            return el;
        };
        ((typeof HTMLDocument !== 'undefined') ? HTMLDocument : Document).prototype.getElementsByClass = HTMLElement.prototype.getElementsByClass;
    }

    // 插件构造函数 - 返回数组结构
    function MyDialog(opt){
        this._initial(opt);
    }
    MyDialog.prototype = {
        constructor: this,
        _initial: function(opt) {
            // 默认参数
            var def = {
                ok: true,
                ok_txt: '确定',
                cancel: false,
                cancel_txt: '取消',
                confirm: function(){},
                close: function(){},
                content: '',
                tmpId: null
            };
            this.def = extend(def,opt,true); //配置参数
            this.tpl = this._parseTpl(this.def.tmpId); //模板字符串
            this.dom = this._parseToDom(this.tpl)[0]; //存放在实例中的节点
            this.hasDom = false; //检查dom树中dialog的节点是否存在
            this.listeners = []; //自定义事件，用于监听插件的用户交互
            this.handlers = {};
        },
        _parseTpl: function(tmpId) { // 将模板转为字符串
            var data = this.def;
            var tplStr = document.getElementById(tmpId).innerHTML.trim();
            return templateEngine(tplStr,data);
        },
        _parseToDom: function(str) { // 将字符串转为dom
            var div = document.createElement('div');
            if(typeof str == 'string') {
                div.innerHTML = str;
            }
            return div.childNodes;
        },
        show: function(callback){
            var _this = this;
            if(this.hasDom) return ;
            if(this.listeners.indexOf('show') > -1) {
                if(!this.emit({type:'show',target: this.dom})) return ;
            }
            document.body.appendChild(this.dom);
            this.hasDom = true;
            this.dom.getElementsByClass('close')[0].onclick = function(){
                _this.hide();
                if(_this.listeners.indexOf('close') > -1) {
                    _this.emit({type:'close',target: _this.dom})
                }
                !!_this.def.close && _this.def.close.call(this,_this.dom);
            };
            this.dom.getElementsByClass('btn-ok')[0].onclick = function(){
                _this.hide();
                if(_this.listeners.indexOf('confirm') > -1) {
                    _this.emit({type:'confirm',target: _this.dom})
                }
                !!_this.def.confirm && _this.def.confirm.call(this,_this.dom);
            };
            if(this.def.cancel){
                this.dom.getElementsByClass('btn-cancel')[0].onclick = function(){
                    _this.hide();
                    if(_this.listeners.indexOf('cancel') > -1) {
                        _this.emit({type:'cancel',target: _this.dom})
                    }
                };
            }
            callback && callback();
            if(this.listeners.indexOf('shown') > -1) {
                this.emit({type:'shown',target: this.dom})
            }
            return this;
        },
        hide: function(callback){
            if(this.listeners.indexOf('hide') > -1) {
                if(!this.emit({type:'hide',target: this.dom})) return ;
            }
            document.body.removeChild(this.dom);
            this.hasDom = false;
            callback && callback();
            if(this.listeners.indexOf('hidden') > -1) {
                this.emit({type:'hidden',target: this.dom})
            }
            return this;
        },
        modifyTpl: function(template){
            if(!!template) {
                if(typeof template == 'string'){
                    this.tpl = template;
                } else if(typeof template == 'function'){
                    this.tpl = template();
                } else {
                    return this;
                }
            }
            this.dom = this._parseToDom(this.tpl)[0];
            return this;
        },
        css: function(styleObj){
            for(var prop in styleObj){
                var attr = prop.replace(/[A-Z]/g,function(word){
                    return '-' + word.toLowerCase();
                });
                this.dom.style[attr] = styleObj[prop];
            }
            return this;
        },
        width: function(val){
            this.dom.style.width = val + 'px';
            return this;
        },
        height: function(val){
            this.dom.style.height = val + 'px';
            return this;
        },
        on: function(type, handler){
            // type: show, shown, hide, hidden, close, confirm
            if(typeof this.handlers[type] === 'undefined') {
                this.handlers[type] = [];
            }
            this.listeners.push(type);
            this.handlers[type].push(handler);
            return this;
        },
        off: function(type, handler){
            if(this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type];
                for(var i = 0, len = handlers.length; i < len; i++) {
                    if(handlers[i] === handler) {
                        break;
                    }
                }
                this.listeners.splice(i, 1);
                handlers.splice(i, 1);
                return this;
            }
        },
        emit: function(event){
            if(!event.target) {
                event.target = this;
            }
            if(this.handlers[event.type] instanceof Array) {
                var handlers = this.handlers[event.type];
                for(var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](event);
                    return true;
                }
            }
            return false;
        }
    }

    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = MyDialog;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return MyDialog;});
    } else {
        !('MyDialog' in _global) && (_global.MyDialog = MyDialog);
    }
}());
```
然后调用的时候就可以直接使用插件的事件绑定了。

```javascript
var mydialog = new MyDialog({
    tmpId: 'dialogTpl',
    cancel: true,
    content: 'hello world!'
});
mydialog.on('confirm',function(ev){
    console.log('you click confirm!');
    // 写你的确定之后的逻辑代码...
});
document.getElementById('test').onclick = function(){
    mydialog.show();
}

```
## 插件发布

## 结论
* 关于如何编写出一个好的js原生插件，
    * 需要平时在使用别人的插件的同时，多查看一下api文档，了解插件的调用方式，
    * 然后再看一下插件的源码的设计方式。
    基本上我们可以确定大部分插件都是按照原型的方式进行设计的。
    而我从上面的例子中，就使用了
        * 好多js原生的知识点，
        * 函数的命名冲突、
        * 闭包、
        * 作用域，
        * 自定义工具函数
        * 扩展对象的钩子函数，以及
        * 对象的初始化、
        * 原型链继承，
        * 构造函数的定义及
        * 设计模式，还有
        * 事件的自定义，
        * js设计模式的观察者模式等知识。
        这些内容还是需要初学者多多了解才能进行一些高层次一些的插件开发。


> [原生JavaScript插件编写指南](http://geocld.github.io/2016/03/10/javascript_plugin/)

### 一个可复用的插件需要满足以下条件：

#### 1. 插件全局函数——插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
* 实现私有作用域，最好的办法就是使用闭包。
闭包的作用就是延长函数(插件)内部变量的生命周期。

```javascript
(function(){
    //插件所有功能都写在这个函数下
})();

```

#### 2. 插件默认参数——插件需具备默认设置参数；
* 插件的主要功能可以总结至几个关键参数
将默认参数放置在全局函数的最前面，参数变量名为options,通过对象字面量进行赋值：

```javascript
var options = {
    key1: para1,
    key2: para2,
    key3: para3
}

```
编写功能部分时调用方式：options.color
    
#### 3. 插件API、参数设置和监听——插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
* 因为API指向的是使用者，故需要在用户调用插件时将API暴露给用户
将API设置为Object类型，用户就可以通过调用API的key进行使用
* api的写法示范

```javascript
var api = {
    config: function(ops){
        // ...
        return this;   
    },
    listen: function listen(elem){
        // ...
        return this;
    },
    feature1: function(){
        // ...
    },
    feature2: function(){
        // ...
    }
}
this.pluginName = api;
```

* 在config和listen这两个最基本的API完成后，需要将API与插件的名字结合起来

* 有了上面的框架，针对config设置函数的写法就有了明确的要求：
在用户没有传入自定义函数时，默认使用上一节options中的参数，
如果用户有设置config参数，使用用户自定义参数

```javascript
config: function(opt){
    if(!opt) return options; // ???
    for(var key in opt) {
        options[key] = opt[key];
    }
    return this;
}
```
    
#### 4. 插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
* 针对元素的监听listen，需要对所有符合条件的dom元素进行监听：

```javascript
listen: function listen(elem){
    if(typeof elem === 'string') {
        document.querySelectorAll(elem),
        i = elems.length;
        while(i--) {
            listen(elems[i]);
        }
        return
    }
    // 将插件的部分功能函数写在这里
    return this;
}
```
    
#### 5. 插件支持链式调用。
* api.config和api.listen两个函数都应该在最后返回this，以便实现插件的链式调用。
    
#### 6. 则用户使用该插件时，调用方式为：

```javascript
pluginName.listen('#demo');
```

如需要自定义参数：

```javascript
pluginName.config({key: 'para'}).listen('#demo');
pluginName.listen('#demo').config({key: 'para'});
```










# [如何判断Javascript对象是否存在](http://www.ruanyifeng.com/blog/2011/05/how_to_judge_the_existence_of_a_global_object_in_javascript.html)
判断一个Javascript对象是否存在，有超过50种写法。
1. 
    ```javascript
    if(!myObj) {
        myObj = {}
    }

    ```
    * 运行这段代码，浏览器会直接抛出ReferenceError错误
    if语句判断myObj是否为空时，这个变量还不存在，所以才会报错。
    ```javascript
    
    if(!myObj) {
        var myObj = {}
    }
   ```
    * Javascript语言是"先解析，后运行"，解析时就已经完成了变量声明
    var命令的"代码提升"（hoisting）作用。Javascript解释器，只"提升"var命令定义的变量，对不使用var命令、直接赋值的变量不起作用，这就是为什么不加var会报错的原因。

2. 
    ```javascript
    if(!window.myObj) {
        myObj = {}
    }
   ```

    * 不过，从代码的规范性考虑，最好还是对第二行加上var
    ```javascript
    if(!window.myObj) {
        var myObj = {}
    }
    if(!window.myObj) {
        window.myObj = {}
    }
   ```
    * 面这种写法的缺点在于，在某些运行环境中（比如V8、Rhino），window未必是顶层对象。
   
3. 
    ```javascript
    if(!this.myObj) {
        this.myObj = {}
    }   
   ```

    * 在全局变量的层面中，this关键字总是指向顶层变量，所以就可以独立于不同的运行环境。
4. 


# js中将一段代码变成表达式有很多种方式
## (function(){..})) 或者 (function(){..})()
## void function(){..}()
## !function(){..}()
## +function(){..}()
当然，我们不推荐你这么用。而且乱用可能会产生一些歧义。


# Cannot use import statement outside a module
> [报错：Uncaught SyntaxError: Cannot use import statement outside a module 详解](https://blog.csdn.net/qq_43340929/article/details/101862294)
* HTML 网页中，浏览器通过 script 标签加载 JavaScript 脚本。
由于浏览器脚本的默认语言是 JavaScript，因此type="application/javascript"可以省略。
在报错中了解到，是说无法在模块外部使用import语句，因为Module 的加载实现的是es6语法，所以在浏览器加载html文件时，需要在script 标签中加入type="module"属性。

--------
> [《JavaScript编程精解（原书第3版）》](https://weread.qq.com/web/reader/14632cb071d2827314677c6)

## 10.6 ECMAScript模块
* CommonJS模块运行良好，与NPM的结合使JavaScript社区可以开始大规模共享代码。
* 这就是2015年的JavaScript标准引入了自己不同的模块系统的原因。
    * 但它们仍然有点像用强力胶带粘在JavaScript上的。
    * 表示法略显过时，例如，你添加到exports的内容在局部作用域内不可用。
    * 而且因为require是一个普通的函数调用，它可以采用任何类型的参数，而不仅仅是字符串文字，如果不运行代码就很难确定模块的依赖性。

* 它通常称为ES模块，其中ES代表ECMAScript。
    * 依赖关系和接口的主要概念保持不变，
    * 但细节不同。
        * 首先，表示法现在已整合到语言中。
            * 你可以使用特殊的import关键字，而不是调用函数来访问依赖项。
            * 同样，export关键字用于导出内容。
            它可能出现在函数、类或绑定定义（let、const或var）的前面。
            ```javascript
            import ordinal from "ordinal";
            import { date, month } from "date-names";
            
            export function formatDate(date, format)  { /* ... */ }
            ``` 
            
        * ES模块的接口不是单个值，而是一组命名绑定。
        前面的模块将formatDate绑定到一个函数。
        从其他模块导入时，导入绑定而不是值，这意味着导出模块可以随时更改绑定的值，导入它的模块将看到其新值。  
        * 如果存在名为default的绑定，则将其视为模块的主要导出值。  
        如果在示例中导入类似ordinal的模块，而没有绑定名称周围的大括号，则会获得其default绑定。  
        此类模块仍可以在其默认导出的同时以不同的名称导出其他绑定。  
            * 要创建默认导出，请在表达式、函数声明或类声明之前编写导出默认值。  
            ```javascript
            export default ["Winter", "Spring", "Summer", "Autumn"];
            ```
        * 可以使用单词as重命名导入的绑定
        ```javascript
        import { day as dayNames } from "date-names";
        console.log(dayNames.length);
        ```
        * 另一个重要的区别是ES模块导入发生在模块的脚本开始运行之前。
        这意味着import声明不可以出现在函数或块中，并且依赖项的名称必须是带引号的字符串，而不是任意表达式。
* 在撰写本文时，JavaScript社区正在采用这种模块样式。但这是一个缓慢的过程。在规定格式后，浏览器和Node.js花了几年时间才开始支持它。
尽管它们现在大部分都支持它，但这种支持仍然存在问题，关于如何通过NPM分发这些模块的讨论仍在进行中。
* 许多项目都是使用ES模块编写的，然后在发布时自动转换为其他格式。我们处于这两种不同的模块系统并用的过渡时期，人们需要能够读写其中任何一种的代码。
## 13.4 HTML和JavaScript
* HTML标签＜script＞，此标签允许我们在文档中包含一段JavaScript。
    * 一旦浏览器读取HTML时遇到＜script＞标签，此标签的脚本就会运行。
    * 直接在HTML文档中包含大型程序通常是不切实际的。可以为＜script＞标签指定src属性，以从URL获取脚本文件（包含JavaScript程序的文本文件）。
    * 当HTML页面引用其他URL（例如，图像文件或脚本）作为其自身的一部分时，Web浏览器将立即获取它们并将它们包含在页面中。
    * 必须始终使用＜/script＞关闭脚本标记，即使它引用了脚本文件且不包含任何代码。如果你忘记了这一点，页面的其余部分将被解释为脚本的一部分。
        * 你可以通过为脚本标记提供type="module"属性来在浏览器中加载ES模块（请参见10.6节）。通过使用相对于它们自己的URL作为import声明中的模块名称，这些模块可以依赖于其他模块。
* 某些属性也可以包含JavaScript程序。
接下来显示的＜button＞标签（显示为按钮）具有onclick属性。只要单击按钮，就会运行属性的值。
```javascript
<button onclick="alert('Boom!');">DO NOT PRESS</button>
```
    * 我必须在onclick属性中使用单引号作为字符串标记，因为双引号已用于引用整个属性。
    * 也可以使用&quot；来标记字符串。


# [JQuery 的元素选择器的实现原理](https://www.jianshu.com/p/3e8a7e05740c)

# new
> [深入理解 new 操作符](https://www.cnblogs.com/onepixel/p/5043523.html)

* new 可以用来实例化一个类，从而在内存中分配一个实例对象。
* ```javascript
function Animal(name){
    this.name = name;
}
 Animal.color = "black";
 Animal.prototype.say = function(){
    console.log("I'm " + this.name);
 };
 var cat = new Animal("cat"); //  第8行代码是关键
 
 console.log(
     cat.name,  //cat
     cat.height //undefined
 );
 cat.say(); //I'm cat
 
 console.log(
     Animal.name, //Animal
     Animal.color //back
 );
 Animal.say(); //Animal.say is not a function
```
    * 在 Animal 对象（Animal本身是一个函数对象）上定义了一个静态属性:color,并赋值“black”。
    * 在 Animal 函数的原型对象 prototype 上定义了一个 say() 方法，say方法输出了 this 的 name 值。
    * 通过 new 关键字创建了一个新对象 cat
        * Animal 本身是一个普通函数，但当通过new来创建对象时，Animal 就是构造函数。
        * JS引擎执行这句代码时，在内部做了很多工作，用伪代码模拟其内部流程如下：
        ```javascript
        new Animal('cat') = {
            var obj = {};
            obj.__proto__ = Animal.prototype;
            var result = Animal.call(obj,"cat");
            return typeof result === 'object'? result : obj;
        }
        ```
            * 把 obj 的__proto__ 指向构造函数 Animal 的原型对象 prototype，此时便建立了 obj 对象的原型链：obj->Animal.prototype->Object.prototype->null
            * 在 obj 对象的执行环境调用 Animal 函数并传递参数 “ cat ” 。 相当于 var result = obj.Animal("cat")。
    * 分析一下输出结果：
        * cat.color - cat 对象先查找自身的 color，没有找到便会沿着原型链查找，在上述例子中，我们仅在 Animal 对象上定义了 color，并没有在其原型链上定义，因此找不到
        * 对于Animal来说，它本身也是一个对象，因此它在访问属性和方法时也遵守上述查找规则，所以：
            * Animal 先查找自身的 name，找到了 name，但这个 name 并不是我们定义的 name，而是函数对象内置的属性，一般情况下，函数对象在产生时会内置 name 属性并将函数名作为赋值（仅函数对象）。
            * Animal 的原型链： Animal->Function.prototype->Object.prototype->null
        

* 在JavaScript 中，万物皆对象，为什么还要通过 new 来产生对象？
要弄明白这个问题，我们首先要搞清楚 cat 和 Animal 的关系：
    * 【1】cat 继承了 Animal 对象
    * 【2】cat 是 Animal 的实例
        * JS是如何来定义实例对象：
        A instanceof B
        如果上述表达式为 true，JavaScript 认为 A 是 B 的实例对象
            *  instanceof 的内部原理：
            ```javascript
            var L = A.__proto__;
            var R = B.prototype;
            if(L === R)
                return true;
            ```
            * 在 new 的执行过程【2】中，cat 的 __proto__ 指向了Animal 的 prototype，所以 cat 和 Animal 符合 instanceof 的判断结果。
      
    * 因此，通过 new 创建的 对象 和 构造函数 之间建立了一条原型链，
    原型链的建立，让原本孤立的对象有了依赖关系和继承能力，让JavaScript 对象能以更合适的方式来映射真实世界里的对象，这是面向对象的本质。

# > [jQuery 2.0.3 源码分析core - 选择器](https://www.cnblogs.com/aaronjs/p/3281911.html)
* 匹配模式三：$(.className)
如果第一个参数是一个.className，jQuery对象中拥有class名为className的标签元素，并增加一个属性值为参数字符串、document的selector、context属性
```javascript
return jQuery(document).find(className);
```
* this.constructor( context ).find( selector );
> [Javascript中this、prototype、constructor的理解](https://blog.csdn.net/aaroun/article/details/79040670)
constructor始终指向创建当前对象的构造（初始化）函数。

# [sizzle](https://blog.csdn.net/yc2222/article/details/79376155)
* jquery内部使用的几个DOM方法：
    * getElementById()
    * getElementsByTagName()
    * getElementsByClassName()
    * querySelectorAll();
    
    
#[js封装插件【组件】三种方式，含es6新特性](https://blog.csdn.net/weixin_30872789/article/details/95055951)
# [BootStrap的Tooltip插件源码解析](https://blog.csdn.net/qq_30051139/article/details/53897233)
      
      
# 在浏览器中加载ES6模块  Chrome浏览器直接打开html文件时，Chrome浏览器会报错：Access to script at 'file:///masaike' from origin 'null' has been blocked by CORS policy: The response is invalid.
> [【ES6】Module的语法、加载实现](https://www.jianshu.com/p/e89e9d1d1caa)

# Uncaught TypeError: Failed to resolve module specifier "jquery". Relative re
> [ES6 Importing npm module](https://stackoverflow.com/questions/54622376/es6-importing-npm-module)

# [如何用JavaScript（ES6）标准语法，取代jQuery的一些主要功能](http://www.w3cbest.com/163.html)
#[在es6模块中怎么引入传统的jQuery和jQuery插件呢？](https://blog.csdn.net/twx843571091/article/details/80924726)
#[BootStrap基础---提示框(tooltip)](https://blog.csdn.net/qq_39913441/article/details/98516009)
```javascript
$(function(){
    $('[data-toggle="tooltip"]').tooltip();
})
```
```javascript
$(function(){
    $('#myTooltip').tooltip({
        title:'我是一个提示框，我在顶部出现',
        placement:'top',
        animation:'true',
        container:'body',
        trigger:'hover'
    });
})
```
#[BootStrap4核心源码学习之JS部分](https://www.dazhuanlan.com/2019/10/12/5da10125aeb37/?__cf_chl_jschl_tk__=7d32b789ba8b5ddac3e94d52d962e592629fcf6e-1590092107-0-AcL54Y3XqfvKXfoUtG1bSjzyB1WnTooprnrMyKrTCPB-hxB5MD-fgFNtfTcYZxW19HxMiQ1CgUpXIK8T4RVsTVEbnuNZZF56c_4BzVHhoPEb762y36-PTzbj5aiu4gUfZhraEfVLjyvdcIeiNMseTUvV-5X7uo1gmvOLuyic1GEE7dE8EhxvMvpjzbbhn-aQPlY3BbYi8PrQ3e8Kgjp47xMNxs_bmMKfSVMgYWiQd-FLainr3-t5rUxP_RKsR-YMSN6Ss9qI8zqYJBLCOnXLFTNXe1cy9cPKRcBoo6h6gDOMB6geLdNZpKsxxFLPKjKkNQ)
#[Bootstrap Tooltip插件实现鼠标移出提示框隐藏](https://blog.csdn.net/qq_34136569/article/details/99937837)


#[TS 三种函数的定义方式](https://blog.csdn.net/HeiXueJi/article/details/84991620)

# tooltip参考[Tippy.js](https://atomiks.github.io/tippyjs/v6/creation/)
