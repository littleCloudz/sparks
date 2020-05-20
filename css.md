#flex
>`[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 容器的属性
### flex-direction: row | row-reverse | colum | column-reverser;
主轴的方向
### flex-wrap: nowrap | wrap | wrap-reverse;
### flex-flow: `<flex-direction>` || `<flex-wrap>`;
### justify-content: flex-start | flex-end | center | space-between | space-around;
定义了项目在主轴上的对齐方式。
space-between: 两端对齐，项目之间的间隔都相等。
space-around: 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items: flex-start | flex-end | center | baseline | stretch;
定义项目在交叉轴上如何对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### align-content: flex-start | flex-end | center | space-between | space-around | stretch;
## 项目的属性
### order: `<integer>`;
数值越小，排列越靠前，默认为0。
### flex-grow: `<number>`;
定义项目的放大比例
默认为0，即如果存在剩余空间，也不放大。
如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
### flex-shrink: `<number>`;
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值对该属性无效。
### flex-basis: `<length>` | auto;
定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。
它的默认值为auto，即项目的本来大小。
可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
### flex: none | [`<'flex-grou'>``<'flex-shrink'>`?||`<'flexbasis'>`]
该属性有两个快捷值：
* auto (1 1 auto) 
* none (0 0 auto)
### align-self: auto | flex-start | flex-end | center | baseline | stretch;
允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

# sass [嵌套CSS 规则](https://www.sass.hk/guide/)
## 父选择器的标识符&
### 伪类
article a {
    color: blue;
    &:hover { color: red; }
}

### ie的类名
举例来说，当用户在使用IE浏览器时，你会通过JavaScript在`<body>``标签上添加一个ie的类名
\#content aside {
 color: red;
 body.ie & { color: green; }   
}
编译后：
\#content aiside {color: red;}
body.ie #content aside {color: green;}






