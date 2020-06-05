# mpvue
## [mpvue 云开发](https://segmentfault.com/a/1190000016641238)
首先在src/main.js文件添加以下语句。

wx.cloud.init({
  traceUser: true
})
必须要初始化才能使用云开发，traceUser决定是否在将用户访问记录到用户管理中，在控制台中可见。
## 小程序mpvue的标签
img
div
p
button
同html
## 页面跳转
>[mpvue——页面跳转](https://www.cnblogs.com/wangyang0210/p/10417976.html)

### a标签
```html
<a href='/pages/counter/main' class='counter'>去往Vuex示例页面</a>
```
### 小程序组件 [navigator](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)
<navigator url='./join/main>参与场次</navigator>
### API

#### 跳转带参数 wx.navigateTo
* mpvue进行小程序开发的过程中，进行页面的跳转不能使用vue的路由
* 只能使用微信小程序的页面跳转方法

[wx.navigateTo\(Object object\)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)


* 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
使用 wx.navigateBack 可以返回到原页面。
小程序中页面栈最多十层。
```html
<span @click='openResult'>参与场次</span>
<span @click='viewPrizeRecord'>奖品记录</span>
```
```javascript
methods: {
    openResult(){
        wx.navigateTo({url: './join/main'})
    },
    viewPrizeRecord(){
        mpvue.navigateTo({url: './prize/main'})
    }
}
```


```javascript
wx.navigateTo({
    url: 'test?id=1',
    events: {
        acceptDataFromOpenedPage(data){
            console.log(data)
        },
        someEvent(data){
            console.log(data)
        }
        
    },
    success(res){
    res.eventChannel.emit('acceptDataFromOpenerPage', {data: 'test'})
    }
})

Page({
    onLoad(option){
        console.log(option.query);
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit('acceptDataFromOpenedPage', { data: 'test'});
        eventChannel.emit('someEvent',{data: 'test'});
        eventChannel.on('acceptDataFromOpenerPage', (data)=> {
            console.log(data);
        });
    }
})
```


#### 内页跳首页 wx.reLaunch()

```html
<img @click='goHome' class='empty-btn' src='/static/images/btn1.png'>
```
```javascript
goHome(){
    mpvue.reLaunch({url: '/pages/index/main'})
}
```




## mpvue 列表渲染
### Vue语法
>[列表渲染](https://cn.vuejs.org/v2/guide/list.html)

#### 遍历数组
```html
<ul id='example-1'>
   <li v-for='item in items' :key='item.message'>
      {{ item.message }}
   </li>
</ul>

```
<ul>
   <li v-for='(item, key) in items' >
   {{parentMessage}} - {{index}} - {{item.name}}
   </li>
</ul>

#### 遍历对象
用 v-for 来遍历一个对象的 property。
<ul>
   <li v-for='value in object'>
   {{value}}
   </li>
</ul>

<div v-for='(value, name) in object'>
{{name}}: {{value}}
</div>

* 用第三个参数作为索引：
<div v-for='(value, name, key) in objcet'>
{{index}}. {{name}}: {{value}}
</div>
在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。
#### 在 `<template>` 上使用 v-for

### 微信原生WXML语法
>[列表渲染](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)


#### wx:for
##### 变量
``` 
<view wx:for='{{array}}' >
    {{index}}: {{item.message}}
</view>
```
##### 字符串
当 wx:for 的值为字符串时，会将字符串解析成字符串数组
```html
<view wx:for='array'>
   {{item}}
</view>
```
等同于
```html
<view wx:for='{{['a', 'b', 'c'}}'>
   {{item}}
</view>
```
* 注意： 花括号和引号之间如果有空格，将最终被解析成为字符串
#### wx:for-item、wx:for-index
使用 wx:for-item 可以指定数组当前元素的变量名，
使用 wx:for-index 可以指定数组当前下标的变量名

#### block wx:for
#### wx:key
##### 字符串
##### 保留关键字 *this


## vue scss loader
```html
<style lang='scss'></style>
```
安装sass-loader、node-sass
* 报错this.getResolve is not a function
'sass-loader': '^8.0.0'改为7.3.1就可以了

## :key报错
```html
<li class='merchandise' v-for='item in merchandiseList' :key=''a' + index'>
```
Uncaught SyntaxError: missing ) after argument list


## 小程序图片高度
<image mode='widthFix'></image>
小程序的这个标签的宽高会有预设width: 320px; height: 240px;
* 所以你像普通的浏览器里那样，设置一个图片的宽，然后高度会自适应是不现实的，解决办法的话，要不然就是宽高你的设定好，但是这样比较局限
好在image 有个属性mode='widthFix'
设置了这个属性后，image 就 可以像img标签一样了。

#Vue

## event.target
[Vue中注意target和currentTarget的使用](https://www.cnblogs.com/gxsyj/p/9798455.html)

### event.currentTarget指向事件所绑定的元素，
### event.target始终指向事件发生时的元素。
因为没点击到其他的元素，所以event.currentTarget与event.target两者获取到的对象都是一样的。
当点击a中的i时event.target与event.currentTarget获取到的对象分别为：
* 从上面的结果可以看出当使用currentTarget时，不管你点击的是a或者a之中的任何元素，其获取到的对象都为绑定事件的a；
* 当使用target时，如果你点击到a元素则传a元素，如果点击到a之中的某个子级元素则传a之中的某个元素。


#微信小程序原生
## this.getOpenerEventChannel is not a function

* [页面路由跳转及参数传递？](https://gitee.com/liang_wan_ming/dormitory-wechat)
* [还有一点需要注意 基础库要求 2.73 ！！！！切记切记，上线记得设置最低版本](https://blog.csdn.net/cherrycola_zjl/article/details/96870500)

{
    "usingComponents": {}
}

* [开发者工具版本RC1.02.1910121的问题](https://developers.weixin.qq.com/community/develop/doc/000aa0c2cb4b58410a5968dee56000)
回退到RC1.02.19070301就不报错了，Stable1.02.1907300版本也没有问题
现在Stable v1.02.1910120依然报错。

## 生成领取积分链接二维码

## 小程序分享自定义图片给朋友
### wx.canvasToTempFilePath
```javascript
wx.canvasToTempFilePath({
    canvasId: 'canvas_poster',
    fileType: 'jpg',
    quality: 1,
    destWidth: that.data.cwidth,
    destHeight: that.data.cheight,
    success: function(res) {
       // 获得图片临时路径
       that.setData({
           imageTempPath: res.tempFilePath,
           canvasDisplay: 'none'
       })
       console.log(res.tempFilePath)
       that.setData({
           boxshadow: 'box-shadow: 0 0 10px #FFCD4F',
           visible1: true
       })
       wx.hideLoading()
       that.$wuxBackdrop.release()
       that.showToolTip()
       clearTimeout(t)
    
    }
})
```

[微信小程序实现截屏](https://blog.csdn.net/qq_37413200/article/details/80231515)
[微信小程序转发传值及自定义图片](https://www.jianshu.com/p/3cb1a37b9436)




