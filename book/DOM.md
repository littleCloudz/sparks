> [JavaScript DOM编程艺术（第2版）](https://weread.qq.com/web/reader/7a8324c071a123567a89289kc81322c012c81e728d9d180)

# 第3章 DOM
## 节点的概念
3.4 节点
节点（node）这个词是个网络术语，它表示网络中的一个连接点。一个网络就是由一些节点构成的集合。  
在DOM里有许多不同类型的节点。  
有很多类型的DOM节点包含着其他类型的节点。  
先看看其中的三种：  

### 1. 元素节点（element node）

* DOM的原子是元素节点。  

  如果把Web上的文档比做一座大厦，元素就是建造这座大厦的砖块，这些元素在文档中的布局形成了文档的结构。        

* 标签的名字就是元素的名字。    
  1. `<p>`文本段落元素的名字是“p”        
  2. `<ul>`无序清单元素的名字是“ul”        
  3. `<li>`列表项元素的名字是“li”        
* 元素可以包含其他的元素。            

     没有被包含在其他元素里的唯一元素是`<html>`元素，它是我们的节点树的根元素。

### 2. 属性节点                
* 属性节点用来对元素做出更具体的描述。            
* `<p title="a gentle reminder">Don't forget to buy this stuff.</p>`            

 在DOM中，title="a gentle reminder"是一个属性节点（attribute node）            

* 因为属性总是被放在起始标签里，所以属性节点总是被包含在元素节点中。            

 并非所有的元素都包含着属性，但所有的属性都被元素包含。                                    

### 3. 文本节点  
* 如果一份文档完全由一些空白元素构成，它将有一个结构，但这份文档本身将不会包含什么内容。  

 互联网上绝大多数内容都是由文本提供的。  

* `<p>Don't forget to buy this stuff.</p>`  

 `<p>`元素包含着文本“Don't forgetto buy this stuff.”。它是一个文本节点（text node）            

* 在XHTML文档里，文本节点总是被包含在元素节点的内部。  

 但并非所有的元素节点都包含有文本节点。 
## 3.4.5 获取元素
* 有3种DOM方法可获取元素节点，
分别是通过元素ID、通过标签名字和通过类名字来获取。
### 1. getElementById
### 2. getElementsByTagName
### 3. getElementsByClassName


### 4. get-Attribute
### 5. setAttribute

## 4.4.2 nodeType属性
* 由childNodes属性返回的数组包含所有类型的节点，而不仅仅是元素节点。
事实上，文档里几乎每一样东西都是一个节点，甚至连空格和换行符都会被解释为节点，而它们也全都包含在childNodes属性所返回的数组当中。
* 每一个节点都有nodeType属性。
* 获取节点的nodeType属性：
node.nodeType;
* nodeType属性总共有12种可取值，但其中仅有3种具有实用价值。
    * 元素节点的nodeType属性值是1。
    * 属性节点的nodeType属性值是2。
    * 文本节点的nodeType属性值是3。

## 3.5 获取和设置属性    
### 3.5.1 getAttribute
### 3.5.2 setAttribute

setAttribute也只能用于元素节点：
object.setAttribute(attribute, value);
    
# 第7章 动态创建标记
深入剖析DOM方法：createElement、createTextNode、appendChild和insertBefore
## 7.2 DOM方法
### 7.2.1 createElement方法
* 只要你使用了createElement方法，就应该把新创建出来的元素赋给一个变量就总是个好主意：
var para = document.createElement('p');
    * 变量para现在包含着一个指向刚创建出来的那个p元素的引用。
    * 现在，虽然这个新创建出来的p元素已经存在了，但它还不是任何一棵DOM节点树的组成部分，它只是游荡在JavaScript世界里的一个孤儿。它这种情况称为文档碎片(document fragment)，还无法显示在浏览器的窗口画面里。不过，它已经像任何其他的节点那样有了自己的DOM属性。
    * 这个无家可归的p元素现在已经有一个nodeType和一个nodeName值
### 7.2.2 appendChild方法
* 把新创建的节点插入某个文档的节点树的最简单的办法是，让它成为这个文档某个现有节点的一个子节点。
parent.appendChild(child);

### 7.2.3 createTextNode方法
* 你现在已经创建出了一个元素节点并把它插入了文档的节点树，这个节点是一个空白的p元素。你想把一些文本放入这个p元素，但createElement方法帮不上忙，它只能创建元素节点。
* 你需要创建一个文本节点，你可以用createTextNode方法来实现它。

var txt = document.createTextNode("Hello world");
para.appendChild(txt);


# [HTML DOM 节点](https://www.runoob.com/htmldom/htmldom-nodes.html)
* 在 HTML DOM 中，所有事物都是节点。DOM 是被视为节点树的 HTML。
* DOM 节点（DOM Nodes）
* 在 HTML DOM (Document Object Model) 中 , 每一个元素都是 节点:
    * 文档是一个文档节点。
        * Document 对象
        当浏览器载入 HTML 文档, 它就会成为 Document 对象。
        Document 对象是 HTML 文档的根节点。
        Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。
        提示：Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。
    * 所有的HTML元素都是元素节点。
    * 所有 HTML 属性都是属性节点。
    * 文本插入到 HTML 元素是文本节点。
    * 注释是注释节点。
* HTML DOM 节点树
  HTML DOM 将 HTML 文档视作树结构。这种结构被称为节点树
* DOM 处理中的常见错误是希望元素节点包含文本。
  在本例中：<title>DOM 教程</title>，元素节点 <title>，包含值为 "DOM 教程" 的文本节点。
  可通过节点的 innerHTML 属性来访问文本节点的值。
  
  
  
  
  
# [HTML DOM 方法](https://www.runoob.com/htmldom/htmldom-methods.html)
* HTML DOM 方法是我们可以在节点（HTML 元素）上执行的动作。
* HTML DOM 属性是我们可以在节点（HTML 元素）设置和修改的值。  
    ## [document.documentElement](https://www.runoob.com/jsref/prop-document-documentelement.html)
  

# [HTML DOM Document 对象](https://www.runoob.com/jsref/dom-obj-document.html)

    
# Document 对象属性和方法
  HTML文档中可以使用以下属性和方法:
  
## document.getElementsByClassName()	
返回文档中所有指定类名的元素集合，作为 NodeList 对象。
## document.getElementById()	
返回对拥有指定 id 的第一个对象的引用。
## document.getElementsByName()	
返回带有指定名称的对象集合。
## document.getElementsByTagName()	
返回带有指定标签名的对象集合。
## document.querySelector()	
返回文档中匹配指定的CSS选择器的第一元素
## document.querySelectorAll()	
document.querySelectorAll() 是 HTML5中引入的新方法，返回文档中匹配的CSS选择器的所有元素节点列表
* querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象。
* NodeList 对象表示节点的集合。可以通过索引访问，索引值从 0 开始。
* 你可以使用 NodeList 对象的 length 属性来获取匹配选择器的元素属性，然后你可以遍历所有元素，从而获取你想要的信息。
* ```javascript
elementList = document.querySelectorAll(selectors);
```
    * elementList 是一个静态的 NodeList 类型的对象。
    * selectors 是一个由逗号连接的包含一个或多个 CSS 选择器的字符串。
        CSS 选择器	String	必须。 指定一个或多个匹配 CSS 选择器的元素。可以通过 id, class, 类型, 属性, 属性值等作为选择器来获取元素。
        
        多个选择器使用逗号(,)分隔。

    * 返回值:	一个 NodeList 对象，表示文档中匹配指定 CSS 选择器的所有元素。 NodeList 是一个静态的 NodeList 类型的对象。如果指定的选择器不合法，则抛出一个 SYNTAX_ERR 异常。

# [JS节点类型之DocumentFragment类型](https://blog.csdn.net/yotcap/article/details/80693584)

```javascript
['Element', 'Fragment'].some((type) => isType(value, type))
const str = {}.toString.call(value)
str.indexOf('[object') === 0 && str.indexOf(`${type}`) > -1 
```

# [classList](https://www.runoob.com/jsref/prop-element-classlist.html)

# [documentElement](https://www.runoob.com/jsref/prop-document-documentelement.html)
documentElement 属性以一个元素对象返回一个文档的文档元素。
document.documentElement
