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

# css小箭头的实现 tooltip

# width: fit-content;
> [关于怎么让div宽度自适应文字内容？](https://segmentfault.com/q/1010000006075682)
直接设置display:inline-block;行元素是自适应文本长度的

# [box-sizing](https://www.runoob.com/cssref/css3-pr-box-sizing.html) 
## border-box
## content-box
## inherit

# [用Javascript获取页面元素的位置](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html)
* 网页上的每个元素，都有clientHeight和clientWidth属性。
这两个属性指元素的内容部分再加上padding的所占据的视觉面积，不包括border和滚动条占用的空间。
document元素的clientHeight和clientWidth属性，就代表了网页的大小。
getViewport函数
* 网页上的每个元素还有scrollHeight和scrollWidth属性，指包含滚动条在内的该元素的视觉面积。
document对象的scrollHeight和scrollWidth属性就是网页的大小，意思就是滚动条滚过的所有长度和宽度。
getPagearea()
* 这个函数有一个问题。如果网页内容能够在浏览器窗口中全部显示，不出现滚动条，那么网页的clientWidth和scrollWidth应该相等。但是实际上，不同浏览器有不同的处理，这两个值未必相等。
所以，我们需要取它们之中较大的那个值
## 获取网页元素的绝对位置
网页元素的绝对位置，指该元素的左上角相对于整张网页左上角的坐标。这个绝对位置要通过计算才能得到。
每个元素都有offsetTop和offsetLeft属性，表示该元素的左上角与父容器（offsetParent对象）左上角的距离。所以，只需要将这两个值进行累加，就可以得到该元素的绝对坐标。

## 获取网页元素的相对位置
网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标。
有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了。
* 滚动条滚动的垂直距离，是document对象的scrollTop属性；
* 滚动条滚动的水平距离是document对象的scrollLeft属性。

## 获取元素位置的快速方法
getBoundingClientRect()
它返回一个对象，其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
* 网页元素的相对位置就是
var X= this.getBoundingClientRect().left;
var Y =this.getBoundingClientRect().top;
* 再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;

# [transition-property]https://www.runoob.com/cssref/css3-pr-transition-property.html()
* transition-property: none|all| property;
transition-property: transform,visibility,opacity;
  }
  
# [opacity](https://www.w3school.com.cn/cssref/pr_opacity.asp)
0
1



# [CSS3中的transition属性详解](https://www.cnblogs.com/afighter/p/5731293.html)

# transform-origin ???


# [Css实现倒三角图标](https://blog.csdn.net/Cancer_Scorpio/article/details/52197800?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

# [js 和 jQuery 修改伪类样式几种方法](https://blog.csdn.net/qq_41067835/article/details/80884762)

.tooltip-arrow {
    position: absolute;
    width: 16px;
    height: 16px;
    color: #333;
}


.tooltip-box[data-placement^=top] > .tooltip-arrow:before {
    left: 0;
    bottom: -7px;
    border-width: 8px 8px 0;
    border-top-color: initial;
}
伪类的initial继承自color: #333;
所以改变color就可以改变倒三角的颜色。


# 省略三个点
overflow: hidden;
text-overflow: ellipsis;
