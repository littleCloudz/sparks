# keep-alive
[Vue / keep-alive](https://www.jianshu.com/p/4b55d312d297)
keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存  
当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行  
[动态组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#在动态组件上使用-keep-alive)  



# [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
![](.vue_images/55ce6174.png)

# [vue-router的导航钩子（导航守卫）](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
> [vue-router 中的导航钩子](https://www.jianshu.com/p/5528c30f866b)

* 有三种方式可以植入路由导航过程中：
    1.全局的
    ```javascript
    router.beforeEach((to, from, next) => {
        if(...) next({name: 'Login'})
        else next()
    })
    ```
    ```javascript
    router.afterEach((to, from) => {
        ...
    })
    ```
        * 这些钩子不会接受 next 函数也不会改变导航本身：
    2.单个路由独享的
    ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
    ```
  
    3.组件级的
    ```javascript
    const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }
    }
    ```
  
    ```javascript
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
      })
    }
    ```
    ```javascript
    beforeRouteUpdate (to, from, next) {
        // just use `this`
        this.name = to.params.name
        next()
    }
    ```
    ```javascript
    beforeRouteLeave (to, from, next) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
    ```
  
  


# axios
```javascript
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
```

## promise = promise.then(chain.shift(), chain.shift());
[Vue项目总结（4）-API+token处理流程](https://www.jianshu.com/p/aaa1427b9517)

* 请求规则和响应规则是在同一个链上，因此，请求规则中的异常，可以由响应阶段失败函数处理。


# [【vue】router-link 与 router-view](https://www.cnblogs.com/dongzhuangdian/p/9515307.html)



# [You are using the runtime-only build of Vue where the template compiler is not available. Either](https://www.jianshu.com/p/92492aa7da6a)
使用template属性

# [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子)
vue-router history模式
不过这种模式要玩好，还需要后台配置支持。


# new VueRouter(...) 
```javascript
const PageHome = {
    template: '<p>This is PageHome</p>'
}
new VueRouter({
    routes: [{
        path: '/',
        component: PageHome
    }]
})

```

# [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)
```javascript
new VueRouter({
    routes: [{
        path: '/login',
        component: () => import('@/views/login/index')
    }]
})
```
* 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
* 结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

## [Vue 的异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
* Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。  

## [component: () => import() SyntaxError: Unexpected token相关问题的处理](https://blog.csdn.net/xyphf/article/details/100657123)
后来发现是是import这儿报错了，这里要babel的插件了，vue-router官网上有一段提示：
如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。
至此，问题全部解决了。  

### [vue路由懒加载，babel-loader无法处理/使用 import](https://www.cnblogs.com/yalong/p/11132580.html)



# new Vue(options)源码
[Vue实例初始化之 _init 方法](https://blog.csdn.net/zjq_1314520/article/details/87996164)
```typescript
// /vue-admin/node_modules/vue/src/core/instance/index.vue
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

```typescript
// code/vue-admin/node_modules/vue/src/core/instance/init.js:68
if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
```
* vm是Vue的实例对象，即this
* vm.$options


# vue实例的$mount方法

[Vue $mount （解析 $mount 源码）](https://www.jianshu.com/p/402e712ab90f)





# [Vue-Loader](https://vue-loader.vuejs.org/zh/guide/#vue-cli)

```javascript
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```
* 除了通过一条规则将 vue-loader 应用到所有扩展名为 .vue 的文件上之外，  
* 请确保在你的 webpack 配置中添加 Vue Loader 的插件：
这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 `<script>` 块。

# 为什么要使用Vue.use(VueRouter)
> [关于Vue.use()详解](https://www.jianshu.com/p/89a05706917a)
因为 axios 没有 install。  

> [解读Vue.use()源码](https://segmentfault.com/a/1190000016256277)
* 使用了vue.use()注册插件之后就可以在所有的vue文件中使用路由：
  this.$route

## html charset
> [《HTML 5与CSS 3权威指南（第4版·上册）》](https://weread.qq.com/web/reader/08532c307171b752085018bk45c322601945c48cce2e120)

HTML 5与HTML 4的区别 · 语法的改变
### HTML 5的语法变化					
* 它的变化，正是因为在HTML 5之前几乎没有符合标准规范的Web浏览器导致的。					
	在这种情况下，各浏览器之间的互兼容性和互操作性在很大程度上取决于网站或网络应用程序的开发者在开发上所做的共同努力				
	而浏览器本身始终是存在缺陷的。				
	在HTML 5中提高Web浏览器之间的兼容性是它的一个很大的目标，为了确保兼容性，就要有一个统一的标准。				
	因此，在HTML 5中，围绕着这个Web标准，重新定义了一套在现有HTML的基础上修改而来的语法，以便各浏览器在运行HTML的时候能够符合一个通用标准。				
* 因为关于HTML 5语法解析的算法也都提供了详细的记载，所以各Web浏览器的供应商可以把**HTML 5分析器**集中封装在自己的浏览器中。					
	最新的Firefox（默认为4.0以后的版本）与WebKit浏览器引擎中都迅速地封装了**供HTML 5使用的分析器**				
	IE（Internet Explorer）与Opera也在努力加快对HTML 5的支持				
	提高浏览器的兼容性指日可待。				
* HTML的语法是在SGML（Standard Generalized MarkupLanguage）语言的基础上建立起来的。					
	但是SGML语法非常复杂，要开发能够解析SGML语法的程序也很不容易，因此很多浏览器都不包含SGML的分析器。				
	因此，虽然HTML基本上遵从SGML的语法，但是对于HTML的执行在各浏览器之间并没有一个统一的标准。				

### 基本语法区别包括
* HTML 5中的标记方法
    1. 内容类型（ContentType）  
    HTML 5的文件扩展符与内容类型保持不变。
       * 扩展符仍然为“.html”或“.htm”
       * 内容类型（ContentType）仍然为“text/html”
    2. DOCTYPE声明  
    DOCTYPE声明是HTML文件中必不可少的，它位于文件第一行。  
       * 在HTML 4中，它的声明方法如下：    
        `<!DOCTYPE html PUBLIC "-// W3c// DTD XHTML 1.0 Transitional// EN" "http://www.w3c.org/TR/xhtml/DTD/xhtml1-transitional.dtd">`
       * 在HTML 5中，刻意不使用版本声明，一份文档将会适用所有版本的HTML。
          * HTML 5中的DOCTYPE声明方法（不区分大小写）如下：  
            `<!DOCTYPE html>`
          * 当使用工具时，也可以在DOCTYPE声明方式中加入SYSTEM识别符，声明方法如下：
            `<!DOCTYPE HTML SYSTEM "about:legacy-compat">`
          在HTML 5中像这样的DOCTYPE声明方式是允许的（不区分大小写，引号不区分是单引号还是双引号）。
    
    3. 指定字符编码
        * 在HTML 4中，使用meta元素的形式指定文件中的字符编码，如下所示：  
        `<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">`
        * 在HTML 5中，可以使用对<meta>元素直接追加charset属性的方式来指定字符编码，如下所示：  
        `<meta charset="UTF-8">`  
        两种方法都有效，可以继续使用前面一种方式（通过content元素的属性来指定），但是不能同时混合使用两种方式。  
        * 在以前的网站代码中可能会存在下面代码所示的标记方式，但在HTML 5中，这种字符编码方式将被认为是错误的，这一点请注意。  
        `<meta charset="UTF8" http-equiv="Content-Type" content="text/html;charset=UTF-8">`  
        从HTML 5开始，对于文件的字符编码推荐使用UTF-8。

* HTML 5确保的兼容性  
这几方面来详细看一下在HTML 5中是如何确保与之前版本的HTML实现兼容的。  
1.可以省略标记的元素  
    在HTML 5中，元素的标记可以省略。  
    具体来说，分为三种类型： 
   * 不允许写结束标记  
   只允许使用“<元素/>”的形式进行书写。
      * area
      * base
      * br  
        HTML 5之前的`<br>`这种写法可以被沿用。
      * col
      * command
      * embed
      * hr
      * img
      * input
      * keygen
      * link
      * meta
      * param
      * source
      * track
      * wbr   
   * 可以省略结束标记
      * li
      * dt
      * dd
      * p
      * rt
      * rp
      * optgroup
      * option
      * colgroup
      * thead
      * tbody
      * tfoot
      * tr
      * td
      * th   
   * 开始标记和结束标记全部可以省略  
   是指该元素可以完全被省略。  
   注意，即使标记被省略了，该元素还是以隐式的方式存在的。  
      * html
      * head
      * body  
        例如省略不写body元素时，在文档结构中它还是存在的，可以使用document.body访问。
      * colgroup
      * tbody

2.具有boolean值的属性  
对于具有boolean值的属性，例如disabled与readonly等，
* 要想将属性值设定为true时
   * 只写属性不写属性值   
	`<input type="checkbox" checked>`
   * 属性值= 属性名  
	`<input type="checkbox" checked="checked">`
   * 属性值= 空字符串   
	`<input type="checkbox" checked="">`
* 要想将属性值设定为false时  
   * 不写属性   
	`<input type="checkbox" >`
    
3.省略引号  
* 在指定属性值的时候，属性值两边加引号时既可以用双引号，也可以用单引号。  
`<input type="text">`  
`<input type='text'>`  
* HTML 5在此基础上做了一些改进，当属性值不包括空字符串、“<”、“>”、“=”、单引号、双引号等字符时，属性值两边的引号可以省略。  
`<input type=text>`  




## &lt;a&gt; 标签
> [《从0到1：HTML+CSS快速上手》](https://weread.qq.com/web/reader/1053223071cad78210554c5kc81322c012c81e728d9d180)  
> [《CSS3网页设计从入门到精通（微课精编版）》](https://weread.qq.com/web/reader/80a32f207199a65080abd74kc81322c012c81e728d9d180)  
> [HTML 链接 · HTML · HTML系列教程 · W3school](https://www.w3school.com.cn/html/html_links.asp)  
> [HTML &lt;a&gt; 标签 · HTML/HTML5标签 · 参考手册 · W3school](https://www.w3school.com.cn/tags/tag_a.asp)  


### 超链接HTML
#### 超链接语法
`<a href="链接地址" target="打开方式">文本或图片</a>`
* a标签                        
在HTML中，我们可以使用a标签来实现超链接。      
我们通过使用 `<a>` 标签在 HTML 中创建链接。
* href属性                       
表示你想要跳转到的那个页面的路径（也就是地址），可以是相对路径，也可以是绝对路径。   
   * 将文本设置为超链接，这种叫作“文本超链接”   
   ```
   <a href="http://www.lvyestudy.com">绿叶学习网</a>
   ```                
   * 将图片设置为超链接，这种叫作“图片超链接”   
   ```
   <a href="http://www.lvyestudy.com"><img src="img/lvye.png" alt="绿叶学习网" /></a>
   ```                
* target属性                     
   默认情况下，超链接都是在当前浏览器<span class="s3">窗口</span>打开新页面的。                   
   在HTML中，我们可以使用target属性来定义超链接打开<span class="s3">窗口</span>的方式。                   
   a标签的target属性取值有4种：    
   <table>
      <tr><td>_self</td><td>在原来<span class="s3">窗口</span>打开链接（默认值）</td></tr>
      <tr><td>_blank</td><td>在新<span class="s3">窗口</span>打开链接</td></tr>
      <tr><td>_parent</td><td>在父<span class="s3">窗口</span>打开链接</td></tr>
      <tr><td>_top</td><td>在顶层<span class="s3">窗口</span>打开超链接</td></tr>
   </table>                 
        
#### 超链接有两种                      
1. 外部链接                          
   外部链接指向的是“外部网站的页面”                      
   `<a href="http://www.lvyestudy.com">绿叶学习网</a>`
2. 内部链接                          
   内部链接指向的是“自身网站的页面”                      
   `<a href="page2.html">跳转到页面2</a>`
   * 锚点链接                       
   它的链接地址（也就是href）指向的是当前页面的某个部分。                   
   ```html
   <a href="#article">推荐文章</a>                     
   <div id="article">                     
   ...                     
   </div> 
   ```                    
      * 想要实现锚点链接，需要定义以下2个参数：                   
      · 目标元素的id                     
      · a标签的href属性指向该id     
      
      
### 超链接样式
#### 在所有浏览器中，链接的默认外观是：                                       
* 未被访问的链接带有下划线而且是蓝色的   
<span style="color:rgb(0, 0, 238);text-decoration: underline;">我是超链接</span>                          
* 已被访问的链接带有下划线而且是紫色的   
<span style="color:rgb(85, 26, 139); text-decoration: underline;">我是超链接</span>                                   
* 活动链接带有下划线而且是红色的      
<span style="color:red; text-decoration: underline;">我是超链接</span>   
鼠标单击时：字体为红色，带有下划线。
鼠标单击时，指的是单击超链接的那一瞬间。也就是说，字体变为红色也就是一瞬间的事情。             
* 当鼠标指针移过链接对象时显示为手形，                                      
                                        
#### 设计超链接的基本样式                                        
   * 使用CSS3的**动态伪类选择器**定义超链接的4种状态样式。
      <table>
       <tr>
         <td>a:link</td>
         <td>定义超链接的默认样式</td>
       </tr>
       <tr>
         <td>a:visited</td>
         <td>定义超链接被访问后的样式</td>
       </tr>
       <tr>
         <td>a:hover</td>
         <td>定义鼠标指针移过超链接时的样式。</td>
       </tr>
       <tr>
         <td>a:active</td>
         <td>定义超链接被激活时的样式</td>
       </tr>
      </table>
      * :hover伪类
      可以定义任何一个元素在鼠标经过时的样式。注意，是任何元素。
      元素:hover{…}
      ```css
      div:hover { background-color: hotpink; }
      img:hover { border: 2px solid red; }
      ```
   * 超链接4种状态样式的排列顺序是固定的，一般不能随意调换。
   "love hate"
      ```   
      a.al:hover { color: #00FF00; }                                    
      a.al:active { color: #FFFF00; }                                   
      a.al:link { color: #FF0000; }                                   
      a.al:visited { color: #0000FF; }
      ```                            
      通过指定类型选择器，限定上面4个样式仅作用于包含al类的超链接中。  
      当鼠标经过超链接时，会先执行第1行声明，                                    
      但是紧接着第3行的声明会覆盖掉第1行和第2行声明的样式，所以就无法看到鼠标经过和被激活时的效果。                                    
   * 用户可以根据需要仅定义部分状态样式。                                      
      * 若要把未访问的和已经访问的链接定义成相同的样式  
      ``` 
      a.al:link { color: #FF0000; }                                 
      a.al:hover { color: #00FF00; }                                  
      a.al:active { color: #FFFF00; }     
      ```                            
      * 如果仅希望超链接显示两种状态样式   
      ```css                    
      a { color: #FF0000; }                                 
      a:hover { color: #00FF00; }    
      ```                             
      其中a标签选择器定义a元素的默认显示样式                                  
      然后定义鼠标经过时的样式                                  
      * 但是如果页面中包含锚记对象，将会影响锚记的样式。如果定义如下的样式，则仅影响超链接未访问时的样式和鼠标经过时的样式。                                    
      ```css
      a:link { color: #FF0000; }                                  
      a:hover { color: #00FF00; }                                 
      ```
   * 为什么我的浏览器中的超链接是紫色的呢？用color属性重新定义也无效，这是怎么回事？	
   如果某一个地址的超链接之前被单击过，浏览器就会记下你的访问记录。那么下次你再用这个已经访问过的地址作为超链接地址时，它就是紫色的了。小伙伴们换一个地址就可以了。
     

#### 定义下画线样式                                       
   * 使用CSS3的text-decoration属性进行清除                                      
      ```css
      a { text-decoration: none; }
      ```
   * 从用户体验的角度考虑，在取消默认的下画线之后，应确保浏览者可以识别所有超链接   
    如加粗显示、变色、缩放、高亮背景等。                                    
    也可以设计当鼠标经过时增加下画线，因为下画线具有很好的提示作用。  
      ```css
      a:hover { text-decoration: underline; }
      ```
   * 下画线样式不仅仅是一条实线，可以根据需要自定义设计。主要设计思路如下：  
      * 借助`<a>`标签的底边框线来实现。                                    
         * 当鼠标经过超链接文本时，显示为下画虚线、字体加粗、色彩高亮的效果  
            ```css
            a {                               
             text-decoration: none;                              
             color: #999;                              
            }                               
            a:hover {                               
             border-bottom: dashed 1px red;                              
             color: #000;                              
             font-weight: bold;                              
             zoom: 1;                              
            }               
            ```                
         * 定义超链接始终显示为下画线效果，并通过颜色变化来提示鼠标经过时的状态变化  
            ```css
            a {                               
             text-decoration: none;                              
             border-bottom: dashed 1px red;                              
             color: #666;                              
             zoom: 1;                              
            }                               
            a:hover {                               
             color: #000;                              
             border-bottom: dashed 1px #000;                             
            }         
            ```                      
      * 利用背景图像来实现，背景图像可以设计出更多精巧的下画线样式。      
         * 使用Photoshop设计一个虚线（images/dashed.psd），设计图像高度为1px，宽度为4px、6px或8px。具体宽度可根据虚线的疏密确定。     
         * 在Photoshop中，选择颜色以跳格方式进行填充，最后保存为GIF格式图像。  
         * 定义背景图像，定位到超链接元素的底部，并沿x轴水平平铺   
            ```css
            a {                                 
              text-decoration: none;                                
              color: #666;                                
            }                                 
            a:hover {                                 
              color: #000;                                
              background: url(images/dashed1.gif) left bottom repeat-x;                               
            }       
            ```                          
                                        
#### 定义特效样式                                        
为超链接文本设计立体视觉效果，主要是借助边框颜色的深浅错落，模拟一种凸凹变化的立体效果。   
 * 设置右边框和底边框同色，同时设置顶边框和左边框同色，利用明暗色彩的搭配来设计立体效果。  
 * 设置超链接文本的背景色为深色效果，营造凸起效果，当鼠标移过时，再定义浅色背景来营造凹下效果。                                    
 * 为网页设计浅色背景，再定义字体颜色来烘托立体样式。  

```css  
 a {                                   
   text-decoration: none;                                  
   border: solid 1px;                                  
   padding: 0.4em 0.8em;                                 
   color: #444;                                  
   background: #f99;                                 
   border-color: #fff #aaab9c #aaab9c #fff;                                  
   zoom: 1;  /* 解决IE浏览器无法显示问题 */                                 
 }                                   
 a:hover {                                   
   color: #800000;                                 
   background: transparent;                                  
   border-color: #aaab9c #fff #fff #aaab9c;                                  
 }                                   
```

#### 定义光标样式                                        
  * 在默认状态下，鼠标指针经过超链接时显示为手形。                
  * cursor属性定义鼠标移过对象时的指针样式，取值说明如下：    
      <table>
          <tr>
              <td>auto</td>
              <td>基于上下文决定应该显示什么光标</td>
          </tr>
          <tr>
              <td>crosshair</td>
              <td>十字线光标（+）</td>
          </tr>
          <tr>
              <td>default</td>
              <td>基于平台的默认光标。通常渲染为一个箭头。</td>
          </tr>
          <tr>
              <td>pointer </td>
              <td> 指针光标，表示一个超链接。 </td>
          </tr>
          <tr>
              <td>move </td>
              <td> 十字箭头光标，用于标示对象可被移动。 </td>
          </tr>
              <td>e-resize、ne-resize、nw-resize、n-resize、se-resize、sw-resize、s-resize、w-resize</td>
              <td> 表示正在移动某个边，如se-resize光标用来表示框的移动开始于东南角 </td>
          </tr>
          <tr>
              <td>text </td>
              <td> 表示可以选择文本。通常渲染为I形光标 </td>
          </tr>
          <tr>
              <td>wait </td>
              <td> 表示程序正忙，需要用户等待，通常渲染为手表或沙漏 </td>
          </tr>
          <tr>
              <td>help </td>
              <td> 光标下的对象包含帮助内容，通常渲染 为一个问号或一个气球 </td>
          </tr>
          <tr>
              <td>
                  &lt;uri&gt;URL
              </td>
              <td> 自定义光标类型的图标路径 </td>
          </tr>
      </table>
  * 使用自定义图像作为光标类型                                     
      * IE和Opera只支持*.cur等特定的图片格式                                    
      * Firefox、Chrome和Safari既支持特定图片类型，也支持常见的\*.jpg、\*.gif、\*.jpg等图片格式。                                    
    cursor属性值可以是一个序列，当用户端无法处理第1个图标时，它会尝试处理第2个、第3个等，如果用户端无法处理任何定义的光标，则必须使用列表最后的通用光标。  
    例如，下面样式中就定义了3个自定义动画光标文件，最后定义了1个通用光标类型。    
      ```css
      a:hover { cursor: url('images/1.ani'), url('images/1.cur'), url('images/1.gif'), pointer; }
      ```

## window.location 浏览器定位和导航
> [《JavaScript权威指南（第6版）》](https://weread.qq.com/web/reader/0513214059343c051f11bc8kc81322c012c81e728d9d180)


### 如何使用location属性来获取当前显示文档的URL 
* Location对象              
Location对象表示该<span class="s3">窗口</span>中当前显示的文档的URL，并定义了方法来使<span class="s3">窗口</span>载入新的文档。
  * Window对象的location属性引用的是Location对象，Document对象的location属性也引用到Location对象：
  ```javascript 
  window.location === document.location // 总是返回true 
  ```          
                 
  * Document对象也有一个URL属性是文档首次载入后保存该文档的URL的静态字符串。           
  如果定位到文档中的**片段标识符**（如#table-of-contents），Location对象会做相应的更新，而document.URL属性却不会改变。            
              
* 解析URL             
#### <span class="key">href属性</span>          
   是一个字符串，后者包含URL的完整文本。       
#### *toString()*方法          
   返回<span class="key">href属性</span>的值        
   因此在会隐式调用*toString()*的情况下，可以使用location代替location.href       
#### <span class="key">URL分解属性</span>    
    
分别表示URL的各个部分。        
同时被Link对象（通过HTML文档中的`<a>`和`<area>`元素创建）支持。       
参阅本书第四部分的Location和Link项获取详细信息。 
##### host        
##### hostname       
##### port        
##### pathname     
##### <span class="key">hash</span>  
<span class="key">hash属性</span>返回URL中的“**片段标识符**”部分
##### search  
search属性也类似，它返回的是问号之后的URL，这部分通常是某种类型的查询字符串。        
  * 一般来说，这部分内容是用来参数化URL并在其中嵌入参数的。虽然这些参数通常用于运行在服务器上的脚本，但在启用JavaScript的页面中当然也可以使用它们。         
  * 例14-2展示了一个通用函数urlArgs（）的定义，可以用这个函数将参数从URL的search属性中提取出来。       
  该例子用到了decodeURIComponent（），后者是在客户端JavaScript定义的全局函数。（参见本书第三部分中的Global获取详细内容。） 
   ```javascript      
   /*    
    * 这个函数用来解析来自URL的查询串的name=value参数对     
    * 它将name = value对存储在一个对象的属性中，并返回该对象      
    * 这样来使用它      
    *    
    * var args = urlArgs(); // 从URL中解析参数     
    * var q = args.q || ""; // 如果参数定义了的话就使用参数；否则使用一个默认值     
    * var n = args.n ? parseInt(ars.n) : 10;    
    */      
   function urlArgs() {    
      var args = {}; // 定义一个空对象  
      var query = location.search.substring(1); // 查找到查询串，并去掉'?'  
      var pairs = query.split("&");  // 根据"&"符号查询字符串分隔开  
      for( var i = 0; i < pairs.length; i++) {  // 对于每个片段   
         var pos = pairs[i].indexOf('='); // 查找"name=value"
         if(pos == -1) continue; // 如果没有找到的话，就跳过
         var name = pairs[i].substring(0, pos); // 提取name
         var value = pairs[i].substring(pos+1); // 提取value
         value = decodeURIComponent(value); // 对value进行解码
         args[name] = value; // 存储为属性
      }  
      return args; // 返回解析后的参数   
   }     
   ```      
       
### 如何使用location属性载入新的文档                
#### *assign()*方法               
可以使<span class="s3">窗口</span>载入并显示你指定的URL中的文档。           
#### *replace()*方法             
也类似，但它在载入新文档之前会从浏览历史中把当前文档删除。          
* 如果脚本无条件地载入一个新文档，*replace()*方法可能是比*assgin()*方法更好的          
否则，“后退”按钮会把浏览器带回到原始文档，而相同的脚本则会再次载入新文档。          
* 如果检测到用户的浏览器不支持某些特性来显示功能齐全的版本，可以用location.*repla)*来载入静态的HTML版本。    
```javascript        
// 如果浏览器支持XMLHttpRequest对象          
// 则将其重定向到一个不需要Ajax的静态页面            
if(!XMLHttpRequest) location.replace("staticpage.html");          
// 注意，在这个例子中传入*replace()*的是一个相对URL。         
// 相对URL是相对于当前页面所在的目录来解析的，就像将它们用于一个超链接中。
```         
#### *reload()*方法               
  可以让浏览器重新载入当前文档。            
#### 直接把新的URL赋给location属性
使浏览器跳转到新页面的一种更传统的方法            
* 绝对URL
```javascript
location = "http://www.oreilly.com"; // 在此网站购买书！   
```      
* 把相对URL赋给location，它们会相对当前URL进行解析    
```javascript        
location = "page2.html"; // 载入下一个页面    
```  
* 纯粹的**片段标识符**是相对URL的一种类型，它不会让浏览器载入新文档，动到文档的某个位置。        
`#top`标识符是个特殊的例子：如果文档中没有元素的ID是“top”，它会让浏览器跳。 
```javascript
location = "#top"; // 跳转到文档的顶部    
```        
#### Location对象的<span class="key">URL分解属性</span>是可写的，对它们重新赋值会改变URL的位置，并且导致浏览器载入一个新的文档             
```javascript          
location.search = "?page=" + (pagenum+1); // 载入下一个页面  
``` 
如果改变的是<span class="key">hash属性</span>，则在当前文档中进行跳转       
              
## window.open 多<span class="s3">窗口</span>和<span class="s4">窗体</span>  
> [《JavaScript权威指南（第6版）》](https://weread.qq.com/web/reader/0513214059343c051f11bc8kc81322c012c81e728d9d180)

    
* 标签页       
   * 一个Web浏览器<span class="s3">窗口</span>可能在桌面上包含多个标签页。               
   * 每一个标签页都是独立的**“浏览上下文”（browsingcontext）**，               
   每一个**上下文**都有独立的Window对象，而且相互之间互不干扰。           
   每个标签页中运行的脚本通常并不知道其他标签页的存在，          
   更不用说和其他标签页的Window对象进行交互操作或者操作其文档内容了。            
   * 如果Web浏览器不支持多标签页，或者把标签页关掉了，可能在某一时刻桌面上会有很多打开的Web浏览器<span class="s3">窗口</span>。           
   而使用标签页，每个桌面<span class="s3">窗口</span>中的Window对象都是独立的，也就是说彼此就是完全独立的，和其他桌面<span class="s3">窗口</span>没有任何联系。  


* `<iframe>`             
   * HTML文档经常使用`<iframe>`来嵌套多个文档。             
   由`<iframe>`所创建的嵌套**浏览上下文**是用它自己的Window对象所表示的。            
   * 废弃的`<frameset>`和`<frame>`元素同样创建了一个嵌套的**浏览上下文**，每一个<frame>都由一个独立的Window对象表示。           
   * 对于客户端JavaScript来说，<span class="s3">窗口</span>、标签页、iframe和框架都是**浏览上下文**；            
   对于JavaScript来说，它们都是Window对象。           
   * 和相互独立的标签页不同，嵌套的**浏览上下文**之间并不是相互独立的。           
      在一个<span class="s4">窗体</span>中运行的JavaScript程序总是可以看到它的祖先和子孙<span class="s4">窗体</span>，尽管脚本查看这些<span class="s4">窗体</span>中的文档受到**同源策略**的限制。        
      14.8.2节会讲到嵌套的<span class="s4">窗体</span>。        
      
      
* 但是<span class="s3">窗口</span>并不总是和其他<span class="s3">窗口</span>完全没关系。              
   一个<span class="s3">窗口</span>或标签页中的脚本可以打开新的<span class="s3">窗口</span>或标签页，当一个脚本这样做时，这样多个<span class="s3">窗口</span>或<span class="s3">窗口</span>与另一个<span class="s3">窗口</span>的文档之间就可以互操作（可以参照13.6.2节中讲解的**同源策略**约束）。           
   14.8.1节介绍关于<span class="s3">窗口</span>打开和关闭的更多内容。       
        
* 因为Window是客户端JavaScript的<span class="s5">全局对象</span>，每个<span class="s3">窗口</span>或<span class="s4">窗体</span>都包含独立的JavaScript<span class="s2">执行上下文</span>。    
   不过，在一个<span class="s3">窗口</span>中的JavaScript代码，如果有**同源策略**的限制，则可以使用另外一个<span class="s3">窗口</span>中定义的对象、属性和方法。           
   与此相关的细节会在14.8.3节中详细讨论。           
   当由于**同源策略**的限制导致<span class="s3">窗口</span>之间无法直接交互时，HTML5提供一个基于事件的消息传输API，可以用于间接的通信。这在22.3节中会有详细讨论。          
               
               
如何打开和关闭浏览器<span class="s3">窗口</span>                  
### 打开<span class="s3">窗口</span>              
使用Window对象的*open（）*方法可以打开一个新的浏览器<span class="s3">窗口</span>（或标签页，这通常和浏览器的配置选项有关）。            
Window.*open（）*载入指定的URL到新的或已存在的<span class="s3">窗口</span>中，并返回代表那个<span class="s3">窗口</span>的Window对象。           
* #### *open()*有4个可选的参数：     
   1. 要在新<span class="s3">窗口</span>中显示的文档的URL。      
      如果这个参数省略了（也可以是空字符串），那么会使用空页面的URL about:blank。      
   2. 新打开的<span class="s3">窗口</span>的名字    
      * <span class="s3">窗口</span>的名字
         * 如果指定的是一个已经存在的<span class="s3">窗口</span>的名字（并且脚本允许跳转到那个<span class="s3">窗口</span>），会直接使用已存在的<span class="s3">窗口</span>。     
         * 否则，会打开新的<span class="s3">窗口</span>，并将这个指定的名字赋值给它。     
         * 如果省略此参数，会使用指定的名字“<span class="s6">_blank</span>”打开一个新的、未命名的<span class="s3">窗口</span>。    
            
      * 需要注意的是，脚本是无法通过简单地猜测<span class="s3">窗口</span>的名字来操控这个<span class="s3">窗口</span>中的Web应用的，只有设置了“允许导航”（allowed to navigate）（HTML5规范中的术语）的页面才可以这样。     
      宽泛地讲，当且仅当<span class="s3">窗口</span>包含的文档来自相同的源或者是这个脚本打开了那个<span class="s3">窗口</span>（或者递归地打开了<span class="s3">窗口</span>中打开的<span class="s3">窗口</span>），脚本才可以只通过名字来指定存在的<span class="s3">窗口</span>。    
      * 如果其中一个<span class="s3">窗口</span>是内嵌在另一个<span class="s3">窗口</span>里的<span class="s4">窗体</span>，那么在它们的脚本之间就可以相互导航。     
      这种情况下，可以使用保留的名字“<span class="s6">_top</span>”（顶级祖先<span class="s3">窗口</span>）和“<span class="s6">_parent</span>”（直接父级<span class="s3">窗口</span>）来获取彼此的**浏览上下文**。    
            
      * <span class="s3">窗口</span>的名字是非常重要的，      
         * 因为它允许*open（）*方法引用已存在的<span class="s3">窗口</span>，  
         * 并同时可以作为`<a>`和`<form>`元素上HTML target属性的值，用来表示引用的文档（或表单提交结果）应该显示在命名的<span class="s3">窗口</span>中。   
            这个target属性的值可以设置为“<span class="s6">_blank</span>”、“<span class="s6">_parent</span>”或“<span class="s6">_top</span>”，从而使引用的文档显示在新的空白<span class="s3">窗口</span>、父<span class="s3">窗口</span>/<span class="s4">窗体</span>或顶层<span class="s3">窗口</span>中。
         * Window对象如果有name属性，就用它保存名字。   
            该属性是可写的，并且脚本可以随意设置它。  
            * 如果传递给window.*open（）*一个除“<span class="s6">_blank</span>”之外的名字，通过该调用创建的<span class="s3">窗口</span>将以该名字作为name属性的初始值。  
            * 如果`<iframe>`元素有name属性，表示该iframe的Window对象会用它作为name属性的初始值。  
            
   3. 一个以逗号分隔的列表，包含大小和各种属性，用以表明新<span class="s3">窗口</span>是如何打开的。       
      * 如果省略这个参数
         * 那么新<span class="s3">窗口</span>就会用一个默认的大小，而且带有一整组标准的UI组件，即菜单栏、状态栏、工具栏等。      
         * 在标签式浏览器中，会创建一个新的标签。     
            
      * 如果指定这个参数，就可以指定<span class="s3">窗口</span>的尺寸，以及它包含的一组属性。（显式指定<span class="s3">窗口</span>尺寸更像是创建新<span class="s3">窗口</span>，而不是新标签。）    
         例如，要打开允许改变大小的浏览器<span class="s3">窗口</span>，并且包含状态栏、工具栏和地址栏，就可以这样写：  
         ```javascript 
         var w = window.open("smallwin.html", "smallwin", "width=400,height=350,status=yes,resizable=yes"); 
         ```
            
      * 第三个参数是非标准的，HTML5规范也主张浏览器应该忽略它。      
         参见第四部分中的Window.*open（）*查看在此参数中可以指定什么内容。  
         注意，当指定第三个参数时，所有没有显式指定的功能都会忽略。   
         出于各种安全原因，浏览器包含对可能指定的功能的限制。   
         例如，通常不允许指定一个太小的或者位于屏幕之外的<span class="s3">窗口</span>，并且一些浏览器不允许创建一个没有状态栏的<span class="s3">窗口</span>。 
            
   4. 只在第二个参数命名的是一个存在的<span class="s3">窗口</span>时才有用。       
      它是一个布尔值，
      * true: 声明了由第一个参数指定的URL是应用替换掉<span class="s3">窗口</span>浏览历史的当前条目    
      * false: 还是应该在<span class="s3">窗口</span>浏览历史中创建一个新的条目
      后者是默认的设置。  
         
* #### *open（）*的返回值           
   是代表命名或新创建的<span class="s3">窗口</span>的Window对象。        
   可以在自己的JavaScript代码中使用这个Window对象来引用新创建的<span class="s3">窗口</span>，就像使用隐式的Window对象window来引用运行代码的<span class="s3">窗口</span>一样：         
   ```javascript
   var w = window.open(); // 打开一个新的空白<span class="s3">窗口</span>         
   w.alert("About to visit http://example.com"); // 调用alert()方法         
   w.location = "http://example.com"; // 设置它的location属性        
   ```
            
   * 在由window.*open（）*方法创建的<span class="s3">窗口</span>中，opener属性引用的是打开它的脚本的Window对象。        
   * 在其他<span class="s3">窗口</span>中，opener为null： 
      ```javascript       
      w.opener !== null; // true，对于由w创建的任意<span class="s3">窗口</span>    
      w.open().opener === w; // true， 对于任意<span class="s3">窗口</span>w    
      ```  
            
* Window.*open（）*是广告商用来在你浏览网页时采用的“页面之前弹出”或“页面之后弹出”<span class="s3">窗口</span>的一种方法。            
   由于对于这种烦人的弹出<span class="s3">窗口</span>的滥用，因此大部分浏览器都增加了弹出<span class="s3">窗口</span>过滤系统。       
   通常，*open（）*方法只有当用户手动单击按钮或者链接的时候才会调用。        
   JavaScript代码尝试在浏览器初始载入（或卸载）时开启一个弹出<span class="s3">窗口</span>时，通常会失败。       
   将上面的代码粘贴到浏览器的JavaScript控制台里进行测试，可能会由于同样的原因而失败。        
               
### 关闭<span class="s3">窗口</span>              
   * 方法*close（）*将关闭一个<span class="s3">窗口</span>。           
   如果已经创建了Window对象w，可以使用如下的代码将它关掉：  
   ```javascript         
      w.close();        
   ```
   运行在那个<span class="s3">窗口</span>中的JavaScript代码则可以使用下面的代码关闭：  
   ```javascript         
   window.close();        
   ``` 
   要显式地使用标识符window，这样可以避免混淆Window对象的*close（）*方法和Document对象的*close（）*方法——如果正在从事件处理程序调用*close（）*，这很重要。        
   * 大多数浏览器只允许自动关闭由自己的JavaScript代码创建的<span class="s3">窗口</span>。          
   如果要关闭其他<span class="s3">窗口</span>，可以用一个对话框提示用户，要求他对关闭<span class="s3">窗口</span>的请求进行确认（或取消）。          
      在表示<span class="s4">窗体</span>而不是顶级<span class="s3">窗口</span>或标签页上的Window对象上执行*close（）*方法不会有任何效果，它不能关闭一个<span class="s4">窗体</span>（反之可以从它包含的文档中删除iframe）。         
      即使一个<span class="s3">窗口</span>关闭了，代表它的Window对象仍然存在。         
      已关闭的<span class="s3">窗口</span>会有个值为true的closed属性，它的document会是null，它的方法通常也不会再工作。        
               
### <span class="s4">窗体</span>之间的关系              
   * Window对象的方法*open（）*返回代表新创建的<span class="s3">窗口</span>的Window对象。           
      而且这个新<span class="s3">窗口</span>具有opener属性，该属性可以打开它的原始<span class="s3">窗口</span>。       
      这样，两个<span class="s3">窗口</span>就可以相互引用，彼此都可以读取对方的属性或是调用对方的方法。        
   * <span class="s4">窗体</span>也是这样的。          
   * <span class="s3">窗口</span>或<span class="s4">窗体</span>中运行的代码都可以通过下面介绍的属性引用到自己的<span class="s3">窗口</span>或<span class="s4">窗体</span>，以及嵌套的子<span class="s4">窗体</span>。          
               
      1. 任何<span class="s3">窗口</span>或<span class="s4">窗体</span>中的JavaScript代码都可以将自己的<span class="s3">窗口</span>和<span class="s4">窗体</span>引用为window或<span class="key">self</span>。            
      2. <span class="key">parent</span>和<span class="key">top</span>属性允许脚本引用它的<span class="s4">窗体</span>的祖先。          
         * <span class="s4">窗体</span>可以用<span class="key">parent</span>属性引用包含它的<span class="s3">窗口</span>或<span class="s4">窗体</span>的Window对象： 
         ```javascript          
         parent.history.back();        
         ```
         * 如果一个<span class="s3">窗口</span>是顶级<span class="s3">窗口</span>或标签，而不是<span class="s4">窗体</span>，那么其<span class="key">parent</span>属性引用的就是这个<span class="s3">窗口</span>本身：          
         ```javascript
         parent == self; // 只有顶级窗口才会返回true 
         ```        
   
         * 如果一个<span class="s4">窗体</span>包含在另一个<span class="s4">窗体</span>中，而后者又包含在顶级<span class="s3">窗口</span>中，那么该<span class="s4">窗体</span>就可以使用<span class="key">parent</span>.<span class="key">parent</span>来引用顶级<span class="s3">窗口</span>。            
         * <span class="key">top</span>属性是一个通用的快捷方式，无论一个<span class="s4">窗体</span>被嵌套了几层，它的<span class="key">top</span>属性引用的都是指向包含它的顶级<span class="s3">窗口</span>。        
         * 如果一个Window对象代表的是一个顶级<span class="s3">窗口</span>，那么它的<span class="key">top</span>属性引用的就是<span class="s3">窗口</span>本身。         
         * 对于那些顶级<span class="s3">窗口</span>的直接子<span class="s4">窗体</span>，<span class="key">top</span>属性就等价于<span class="key">parent</span>属性。         
      3. 有不止一种方法可以引用<span class="s3">窗口</span>或<span class="s4">窗体</span>的子孙<span class="s4">窗体</span>。        
         * 可以用获取其他元素的方法来获取一个表示`<iframe>`的元素对象。        
        <span class="s4">窗体</span>是通过`<iframe>`元素创建的。               
         假定文档里有`<iframeid="f1">`。那么，表示该iframe的元素对象就是：   
         ```javascript   
         var iframeElement = document.getElementById("f1");    
         ```
         `<iframe>`元素有contentWindow属性，引用该<span class="s4">窗体</span>的Window对象，所以此<span class="s4">窗体</span>的Window对象就是：          
         ```javascript
         var childFrame = document.getElementById("f1").contentWindow;      
         ``` 
         * 尽管如此，通常不需要使用getElementById（）方法和contentWindow属性来获取<span class="s3">窗口</span>中子<span class="s4">窗体</span>的引用。每个Window对象都有一个frames属性，它引用自身包含的<span class="s3">窗口</span>或<span class="s4">窗体</span>的子<span class="s4">窗体</span>。        
            * frames属性引用的是**类数组对象**，并可以通过数字或<span class="s4">窗体</span>名进行索引。     
         要引用<span class="s3">窗口</span>的第一个子<span class="s4">窗体</span>，可以用frames[0]。    
         要引用第二个子<span class="s4">窗体</span>的第三个子<span class="s4">窗体</span>，可以用frames[1].frames[2]。     
         <span class="s4">窗体</span>里运行的代码可以用<span class="key">parent</span>.frames[1]引用兄弟<span class="s4">窗体</span>。     
         注意frames[]数组里的元素是Window对象，而不是`<iframe>`元素。     
            * 如果指定`<iframe>`元素的name或id属性，那么除了用数字进行索引之外，还可以用名字来进行索引。       
         例如，名字为“f1”的帧应该用frames["f1"]或frames.f1。  
                        
         * 从表示<span class="s4">窗体</span>的Window对象来获取该<span class="s4">窗体</span>的``<iframe>``元素——用Window对象的frameElement属性。          
      表示顶级<span class="s3">窗口</span>的Window对象的frameElement属性为null，         
      <span class="s4">窗体</span>中的Window对象的frameElement属性不是null：     
      ```javascript   
      var elt = document.getElementById("f1");        
      var win = elt.contentWindow;        
      win.frameElement === elt   // 对于帧来说永远是true         
      window.frameElement === null // 对于顶级<span class="s3">窗口</span>来说永远是true   
      ```    

  
               
   * 刚刚在14.7节中讲到，`<iframe>`以及其他元素的name和ID都可以自动通过Window对象的属性来应用，而`<iframe>`元素和其他的元素有所不同：            
      * 对于<span class="s4">窗体</span>来说，通过Window对象的属性引用的`<iframe>`是指<span class="s4">窗体</span>中的Window对象，而不是元素对象。         
         * 也就是说，可以通过<span class="s4">窗体</span>的名字“f1”来代替frames.f1。     
         实际上，HTML5规范指出frames属性是一个自引用（self-referential）的属性，就像window和<span class="key">self</span>一样。    
         * 而这个Window对象看起来像一个由<span class="s4">窗体</span>组成的数组。    
            也就是说可以通过window[0]来获取第一个子<span class="s4">窗体</span>的引用，   
            可以通过window.length或length查询<span class="s4">窗体</span>的编号。 
         * 但是这里我们使用frames来代替window会比较清晰一些，尽管这种方法有些传统。      
            需要注意的是，当前的浏览器不会让frame==window，但在frame和window不相等的情况下，可以通过子<span class="s4">窗体</span>的索引或名字来获取其他对象的引用。  
               
      * 可以使用`<iframe>`的元素的name或id属性作为JavaScript代码中的引用标识。           
      但如果使用name属性的话，所指定的name同样也会成为代表这个<span class="s4">窗体</span>的Window对象的name属性。         
      以这种方式给出的名字可以用做一个链接的target属性，而且它可以用做window.*open（）*的第二个参数。        
               
               
### 如何编写可以在多个<span class="s3">窗口</span>和嵌套<span class="s4">窗体</span>中工作的JavaScript代码                
交互<span class="s3">窗口</span>中的JavaScript              
   * 每个<span class="s3">窗口</span>和<span class="s4">窗体</span>都是它自身的JavaScript<span class="s2">执行上下文</span>，以Window作为<span class="s5">全局对象</span>。           
   * 但是如果一个<span class="s3">窗口</span>或<span class="s4">窗体</span>中的代码可以应用到其他<span class="s3">窗口</span>或<span class="s4">窗体</span>（并且**同源策略**没有阻止它），那么一个<span class="s3">窗口</span>或<span class="s4">窗体</span>中的脚本就可以和其他<span class="s3">窗口</span>或<span class="s4">窗体</span>中的脚本进行交互。          
      * 设想一个Web页面里有两个`<iframe>`元素，分别叫“A”和“B”，并假设这些<span class="s4">窗体</span>所包含的文档来自于相同的一个服务器，并且包含交互脚本。         
         * <span class="s4">窗体</span>A里的脚本定义了一个变量i：   
            ```javascript  
            var i = 3;  
            ```
            这个变量只是<span class="s5">全局对象</span>的一个属性，也是Window对象的一个属性。 
            * <span class="s4">窗体</span>A中的代码可以用标识符i来引用变量，  
            * 或者用window对象显式地引用这个变量： 
               window.i
         * 由于<span class="s4">窗体</span>B中的脚本可以引用<span class="s4">窗体</span>A的Window对象，因此它也可以引用那个Window对象的属性：    
            ```javascript  
            parent.A.i = 4; // 改变<span class="s4">窗体</span>A中的变量i的值  
            ```
               
      * 如果<span class="s4">窗体</span>B中的脚本声明了一个（非嵌套的）函数f，这个函数在<span class="s4">窗体</span>B中是全局变量，并且<span class="s4">窗体</span>B中的代码可以用f（）调用f。  
         但是<span class="s4">窗体</span>A中的代码必须将f作为<span class="s4">窗体</span>B的Window对象的f属性来引用：         
         定义函数的关键字function可以声明一个变量，就像关键字var所做的那样。
         ```javascript      
         var f = parent.B.f;     
         ```
         现在<span class="s4">窗体</span>A中的代码就可以像<span class="s4">窗体</span>B中的代码那样调用函数f（）了。     
               
         当采用这种方式在<span class="s4">窗体</span>或<span class="s3">窗口</span>间共享函数时，牢记词法作用域的规则非常重要。    
         函数在定义它的作用域中执行，而不是在调用它的作用域中执行。 
         就上面那个例子来说，如果函数f引用了全局变量，那么将在<span class="s4">窗体</span>B的属性中查找这些变量，即使函数是由<span class="s4">窗体</span>A调用的。   
      * 要记住构造函数也是函数，所以当用构造函数和相关的原型对象定义一个类（见第9章）时，那个类只在一个单独的<span class="s3">窗口</span>中定义。         
         假设在例子9-6中的<span class="s3">窗口</span>包含<span class="s4">窗体</span>A和<span class="s4">窗体</span>B，并且包含Set类。     
         * 顶级<span class="s3">窗口</span>中的脚本可以创建新的Set对象，类似这样：
            ```javascript      
            var s = new Set();   
            ```
         * 相反，每个<span class="s4">窗体</span>中的代码必须显式地用父级<span class="s3">窗口</span>的属性来引用Set（）构造函数： 
            ```javascript     
            var s = new parent.Set();
            ```  
         * 另外，每个<span class="s4">窗体</span>中的代码还可以定义自己的变量来引用构造函数，这样就更方便了：
            ```javascript      
            var Set = top.Set(); 
            var s = new Set();   
            ```
         * 和用户定义的类不同，内置的类（比如String，Date和RegExp）都会在所有的<span class="s3">窗口</span>中自动预定义。      
         但是要注意，每个<span class="s3">窗口</span>都有构造函数的一个独立副本和构造函数对应原型对象的一个独立副本。   
         例如，每个<span class="s3">窗口</span>都有自己的String（）构造函数和String.prototype对象的副本。
         因此，如果编写一个操作JavaScript字符串的新方法，并且通过把它赋值给当前<span class="s3">窗口</span>中的String.prototype对象而使它成为String类的一个方法，那么该<span class="s3">窗口</span>中的所有字符串就都可以使用这个新方法。
         但是，别的<span class="s3">窗口</span>中定义的字符串不能使用这个新方法。
         * 事实上，每个Window都有自己的原型对象，这意味着instanceof操作符不能跨<span class="s3">窗口</span>工作。    
            例如，当用instanceof来比较<span class="s4">窗体</span>B的一个字符串和<span class="s4">窗体</span>A的String（）构造函数时，结果会为false。 
            7.10节介绍了决定跨<span class="s3">窗口</span>数组的类型时的相关困难。  
               
   * WindowProxy对象           
      我们已经讲过很多次，Window对象是客户端JavaScript的全局变量。但是从技术上来看，并不是这样的。         
      Web浏览器每次向<span class="s3">窗口</span>或<span class="s4">窗体</span>中载入新的内容，它都会开始一个新的JavaScript<span class="s2">执行上下文</span>，包含一个新创建的<span class="s5">全局对象</span>。         
      但是当多个<span class="s3">窗口</span>或<span class="s4">窗体</span>在使用时，有一个重要的概念，尽管<span class="s4">窗体</span>或<span class="s3">窗口</span>载入了新的文档，但是引用<span class="s4">窗体</span>或<span class="s3">窗口</span>的Window对象还仍然是一个有效的引用。         
      所以客户端JavaScript有两个重要的对象。         
      1. 客户端<span class="s5">全局对象</span>处于作用域链的顶级，并且是全局变量和函数所定义的地方。     
            事实上，<span class="s5">全局对象</span>会在<span class="s3">窗口</span>或<span class="s4">窗体</span>载入新内容时被替换。  
      2. 我们称为“Window对象”的对象实际上不是<span class="s5">全局对象</span>，而是<span class="s5">全局对象</span>的一个代理。      
            每当查询或设置Window对象的属性时，就会在<span class="s3">窗口</span>或<span class="s4">窗体</span>的当前<span class="s5">全局对象</span>上查询或设置相同的属性。   
            HTML5规范称这个代理对象为WindowProxy，但在本书中我们会继续使用名词Window对象。   
            由于它的代理行为，除了有更长的生命周期之外，代理对象表现得像真正的<span class="s5">全局对象</span>。   
         如果可以比较两个对象，那么区分它们会很困难。     
         但是事实上，没有办法可以引用到真正的客户端<span class="s5">全局对象</span>。    
         <span class="s5">全局对象</span>处于作用域链的顶端，但是window、<span class="key">self</span>、<span class="key">top</span>、<span class="key">parent</span>以及<span class="s4">窗体</span>的属性全部返回代理对象。      
         window.*open（）*方法也返回代理对象。    
         甚至顶级函数里this关键字的值都是代理对象，而不是真正的<span class="s5">全局对象</span>      
         最后一点对于ES3和ES5规范稍有违背，但客户端JavaScript是需要支持这种多重<span class="s2">执行上下文</span>的。      


## HTML元素的ID和name作为Window对象的属性来使用（作为Window对象属性的文档元素）  
   * 如果在HTML文档中用id属性来为元素命名，并且如果Window对象没有此名字的属性，Window对象会赋予一个属性，它的名字是id属性的值，而它们的值指向表示文档元素的HTMLElement对象。
      * 在客户端JavaScript中，Window对象是以<span class="s5">全局对象</span>的形式存在于作用域链的最上层，这就意味着在HTML文档中使用的id属性会成为可以被脚本访问的全局变量。              
      如果文档包含一个`<button id="okay"/>`元素，可以通过全局变量okay来引用此元素。           
      * 有一个重要的警告：如果Window对象已经具有此名字的属性，这就不会发生。              
         * 比如，id是“history”、“location”或“navigator”的元素，就不会以全局变量的形式出现，因为这些ID已经占用了。          
         * 如果脚本中的变量声明出现在命名元素之前，那这个变量的存在就会阻止元素获取它的window属性。          
         * 而如果脚本中的变量声明出现在命名元素之后，那么变量的显式赋值会覆盖该属性的隐式值。          
         * 同样，如果HTML文档包含一个id为“x”的元素，并且还在代码中声明并赋值给全局变量x，那么显式声明的变量会隐藏隐式的元素变量。        
      * 通过document.getElementById（）方法，用HTML的id属性来查找文档元素。  
   见下面的例子：     
       ```javascript         
       var ui = ["input", "prompt", "heading"];  // 数组中存放要查找的元素id           
       ui.forEach(function(id) {   // 用每个id查找对应的元素           
          ui[id] = document.getElementById(id);  // 将其存放在一个属性中        
       });            
       ```
      运行完这段代码之后，ui.input、ui.prompt和ui.heading会引用文档元素。          
      脚本可以用全局变量input和heading来代替ui.input和ui.heading。            
      但记得14.5节里的Window对象有个方法的名字是prompt（），所以脚本中不能用全局变量prompt代替ui.prompt。          
                  
   * 元素ID作为全局变量的隐式应用是Web浏览器演化过程中遗留的怪癖。               
      它主要是出于与已有Web页面后向兼容性的考虑。          
      * 但这里并不推荐使用这种做法——浏览器厂商可以在任何时候为Window对象定义新属性，而这些新属性都会破坏使用了此属性名的隐式定义的代码。          
      * 反之，用document.getElementById（）来显式查找元素。如果给它一个更简单的名字，这种用法会变得更加简便。
          ```javascript             
             var $ = function(id) { return document.getElementById(id); };        
             ui.prompt = $("prompt");  
         ```       
      * 很多客户端类库都定义了$函数，类似上面一样来通过ID查找元素。           
      （我们会在第19章里看到jQuery的$函数作为通用的元素选择方法，基于ID、标签名、class属性或其他标准，返回一个或多个元素。）           
   * 假设ID并没有被Window对象使用的话，那么任何有id属性的HTML元素都会成为全局变量的值。 以下HTML元素如果有name属性的话，也会这样表现：         
    `<a>`  
    `<applet>`  
    `<area>`  
    `<embed>`  
    `<form>`  
    `<frame>`  
    `<frameset>`  
    `<iframe>`  
    `<img>`  
    `<object>`  
    
   * id元素在文档中必须是唯一的：两个元素不能有相同的id。但是，这对name属性无效。    
   如果上面的元素有多于一个有相同的name属性（或者一个元素有name属性，而另一个元素有相同值的id属性），具有该名称的隐式全局变量会引用一个**类数组对象**，这个**类数组对象**的元素是所有命名的元素。         
                  
   * 有name或id属性的`<iframe>`元素是个特殊的例子。          
   为它们隐式创建的变量不会引用表示元素自身的Element对象，        
   而是引用表示`<iframe>`元素创建的嵌套浏览器窗体的Window对象。         
                     

##  [sentence.split(/\s+/)](https://www.w3school.com.cn/js/jsref_split.asp)

## 截取字符串方法：substring()、substr()和slice()
> [《JavaScript修炼之道》](https://weread.qq.com/web/reader/89c3201071d3be5089c30d8kc81322c012c81e728d9d180)  >

3个方法功能类似，都可以截取字符串，但它们的参数含义有所不同。                                               
### 1. substring(**startIndex \[,endIndex\]**)                         
   ```javascript
   var oStr = "Hello, can I help you?";   
   ```                                          
   * 用于提取并返回字符串索引值startIndex到endIndex-1之间的字符串。                                           
      substring()必须至少有一个参数为正数，否则无结果输出。                                        
      ```javascript
      alert(oStr.substring(6, 9)); // 提取第6~8之间的字符，输出：can    
      ```                                    
   * 参数为负数时会看成0。                                           
      ```javascript
      alert(oStr.substring(-4); // 将负数看成0，输出：Hello, can I help you?     
      ```                                    
      而且为负数的参数永远都只能作为第一个参数，且其值都会被看成0。                                      
      所以，substring(2,-3)等效于substring(0,2)，substring(-4)等效于substring(0)。                                     
   * 如果第一个参数为正数，第二个参数为负数，则两个参数会对调位置。                                            
      ```javascript
      alert(oStr.substring(2, -3); // 将负数和正数对调，且将负数看成0, 输出：He                         
      ```                
   * 如果startIndex比endIndex大，则在提取子串之前会先对调这两个参数。                                           
      ```javascript
      alert(oStr.substring(9, 6)); // 第二个参数大于第一个参数，截取字符串前先对调参数位置，输出:can   
      ```                                     
      第二个参数大于第一个参数时，两个参数会对调位置，所以substring(9,6)等效于substring(6,9)。                                         
   如果startIndex和endIndex相等，则返回空字符。                                            
   如果只有一个startIndex参数，则返回字符串从startIndex位置开始到结尾之间所有字符串。
      ```javascript                                       
      alert(oStr.substring(6)); // 从第6个索引字符开始提取后面所有的字符，输出：can I help you?   
      ```                                      
                                                
### 2. substr(**startIndex \[,length\]**)                                                
   var str = "Hello, can I help you?";                                           
   * 用于从startIndex位置开始向后面截取不超过length个字符。                                           
      ```javascript
      alert(str.substr(1, 3)); // 从第二个字符开始提取后面不超过3个字符的子串， 输出：ell   
      ```                                      
   * 参数startIndex可以取正数或负数，                                             
      为负数时，则该负数的绝对值表示字符串的倒数第几个字符，                                          
      例如-1指最后一个字符，-2指倒数第二个字符，以此类推。                                         
      ```javascript
      alert(str.substr(-2, 3);  // 从倒数第二个字符开始提取后面不超过3个字符的子串， 输出：u?   
      ```                                       
   * length参数只能为非0正数，表示截取的字符个数，否则不能截取字符串；                                             
      ```javascript
      alert(str.substr(1, -3)); // length参数为负数，没有结果输出     
      ```                                   
   * 该参数可以省略，如果省略则表示从startIndex开始截取到字符串结尾的所有字符。                                             
      ```javascript
      alert(str.substr(6)); //  从第6个索引字符开始提取后面所有的字符，输出：can I help you?       
      ```                                  
                                                
### 3. slice(**(startIndex \[,endIndex\]**)                                              
   ```javascript
   var str = "Hello, can I help you?";  
   ```                                         
                                                
   * 用于截取并返回字符串索引值startIndex到endIndex-1之间的字符串。                                           
      ```javascript
      alert(str.slice(6)); // can I help you?                                          
      alert(str.slice(6, 9)); // can  
      ```                                        
   * 该方法和substring()的用法很类似，参数的含义                                             
      * 两个参数都可以为负数                                         
         ```javascript
         alert(str.slice(2, -3)); // llo, can I help y                                       
         alert(str.slice(-4)); //  you?                                       
         alert(str.slice(-4, -1)); // you   
         ```                                  
      * 第一个参数必须大于第二个参数                                        
         ```javascript
         alert(str.slice(9, 6)); // 没有输出                       
         ```               
   * 其他和substring()的完全一样，故在此不再赘述。                                            
                                                
使用substring()实现字符串的收缩和展开效果，具体代码如下所示：
  ```javascript   
   <!DOCTYPE html>                                             
   <html>                                             
      <head>                                          
         <meta charset="UTF-8">                                      
         <title>使用substring()实现字符串的收缩和展开</title>                                       
      </head>                                         
      <body>                                          
         <p>                                       
            <span>DJI大疆创新今日发布“御”Mavic2系列无人机，包括“御”Mavic2专业版及“御”Mavic2变焦版两款。大疆官方将“御”Mavic2系列定位为“便携航拍旗舰“，其延续了“御”Mavic Pro的折叠式机身设计，并将哈苏影像与光学变焦技术融入其中。</span>                                  
            ...<a href="javascript:;">>>收缩</a>                                   
         </p>                                      
         <script>                                     
            window.onload = function() {                                   
               var oP = document.getElementsByTagName('p')[0];                               
               var oSpan = document.getElementsByTagName('span')[0];                               
               var oA = document.getElmentsByTagName('a')[0];                                
               var str = oSpan.innerHTML;                               
               var onOff = true;                               
               oA.onclick = function() {                                
                  if(onOff) {                            
                     oSpan.innerHTML = str.substring(0, 27);                           
                     oA.innerHTML = '>>展开';                          
                                                
                  } else {                            
                     oSpan.innerHTML = str;                          
                     oA.innerHTML = '>>收缩';                          
                  }                             
               onOff = !onOff;                                 
               }                                
            }                                   
         </script>                                       
      </body>                                         
   </html>      
   ```                                      
   
   
## Demo页面
./20200507/atag.html
