
> [《深入理解TypeScript》2020.2](https://weread.qq.com/web/reader/6393276071bc6e966392234)

* 2012.10
* 其提供的静态类型系统，大大增强了代码的可读性及可维护性；同时，它提供最新的和不断发展的JavaScript特性，能让我们构建更健壮的组件。  
* http://www.broadview.com.cn/37651页面进行下载。

# 第1章 为什么要使用TypeScript
* TypeScript代码会被编译成JavaScript代码，JavaScript代码才是实际被执行的代码。

* 在开始之前，你需要准备好以下工具。
    * TypeScript编译器  
    它是OSS（Open SourceSoftware，开源软件），在源代码和npm（Node.js包管理工具）上可以找到。
    * TypeScript编辑器 
    如果愿意，你可以使用Notepad，但是我更推荐使用Visual Studio Code（以下简称VSCode）和我所写的扩展工具。当然还有其他许多IDE（Integrated Development Environment，集成开发环境）也支持TypeScript。

* 通常建议人们使用稳定的版本

* 可以使用npm命令行来安装TypeScript
```
npm install typescript@next
```

* 你可以让VS Code通过创建.vscode/settings.json来使用这个版本
```javascript
"typescript.tsdk": "./node_modules/typescript/lib"
```

* 微软推出TypeScript主要是为了实现两个目标：
    * 为JavaScript提供可选的类型系统。
    * 兼容当前及未来的JavaScript的特性。

# 第6章 TypeScript类型系统

## 6.14 readonly
* TypeScript类型系统允许你在一个接口里使用readonly来标记属性。它能让你以一种更安全的方式工作  
```javascript
function foo(config: {readonly bar: number, readonly bas: number }) {
// ......
}
const config = {var: 123, bas: 123};
foo(config);
```
* 当然，你也可以在接口和类型里使用readonly。  

```javascript
type Foo = {
    readonly bar: number;
    readonly bas: number;
}

// 初始化
const foo:Foo = {bar: 123, bas: 456};

// 不能被改变
foo.bar = 456; // 错误：foo.bar为只读属性
```
* 你也能指定一个类的属性为readonly，然后在声明时或在构造函数中初始化它们，如下所示。  

```javascript
class Foo {
    readonly bar = 1; // 正确
    readonly baz: string;
    constructor(){
        this.baz = 'hello'; // 正确
    }
}
```
。。。



# 第11章 提示与建议

## 11.5 对象字面量的惰性初始化
* 用字面量初始化对象的写法十分常见。
```javascript
let foo = {};
foo.bar = 123;
foo.bas = 'Hello  World';
```
* 但在TypeScript中，同样的写法却会报错。  
这是因为TypeScript在解析let foo={}这段赋值语句时，会进行“类型推断”，它会认为等号左边foo的类型即为等号右边{}的类型。由于{}本没有任何属性，因此，如果像上面那样给foo添加属性，就会报错。  
    1. 最好的解决方案  
    ```javascript
        let foo = {
            bar: 123,
            bas: 'Hello World'
        };
    ```
    2. 快速解决方案  
    下面的快速解决方案采用惰性的思路，会错误地在初始化变量时忘记添加属性。  
    利用TypeScript的“类型断言”机制让代码顺利通过编译。  
    ```javascript
    let foo = {} as any;
    foo.bar = 123;
    foo.bas = 'Hello World';
    ```
    3. 折中的解决方案  
    创建interface，这样的好处在于方便撰写类型文档，而且TypeScript会参与类型检查  
    ```javascript
    interface Foo {
        bar: number;
        bas: string;
    }
    let foo = {} as Foo;
    foo.bar = 123;
    foo.bas = 'Hello World';
    ```
    使用interface还可以确保类型安全
    
        
