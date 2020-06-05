# webpack-dev-server


# package.json --  "typings": "types/index.d.ts",

[package.json 字段说明](https://www.cnblogs.com/mengfangui/p/11174583.html)
// TypeScript 的入口文件
  "typings": "types/index.d.ts",

[webpack](https://www.webpackjs.com/)
# 配置

## [context](https://www.webpackjs.com/configuration/entry-context/#context)
* 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader  
* 默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

## [resolve](https://www.webpackjs.com/configuration/resolve/)
```javascript
resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
        '@': resolve('src')
    }
}
```
* 能够使用户在引入模块时不带扩展


# 概念
* webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。  
* 从 webpack v4.0.0 开始，可以不用引入一个配置文件。  

## 要先理解四个核心概念：
webpack.config.js

### 入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。  
进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。  
每个依赖项随即被处理，最后输出到称之为 bundles 的文件中  
```javascript 
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```


### 输出(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。  
```javascript 
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'd￿ist'),
    filename: 'my-first-webpack.bundle.js'
  }
};

```

在代码最上面导入的 path 模块是什么，它是一个 Node.js 核心模块，用于操作文件路径。  
术语生成(emitted 或 emit)贯穿了我们整个文档和插件 API。它是“生产(produced)”或“释放(discharged)”的特殊术语。  

### loader  
loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。  

loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。  

* 在更高层面，在 webpack 的配置中 loader 有两个目标：
    * test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
    * use 属性，表示进行转换时，应该使用哪个 loader。

```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;

```    
“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”

```javascript
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```


#### .vue单文件组件需要使用的loader
* vue-loader
* babel-loader
* [vue-style-loader](https://www.npmjs.com/package/vue-style-loader)
* css-loader


### 插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。  
插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。  

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。  
多数插件可以通过选项(option)自定义。  
你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。
```javascript 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;

```
#### .vue单文件组件需要使用的plugin
* VueLoaderPlugin
* [HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)
    * HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。   
    * 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。

# 运行webpack命令

# [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

[详解webpack-dev-server的使用](https://segmentfault.com/a/1190000006964335)
* webpack-dev-server支持两种模式来自动刷新页面.
    * iframe模式(页面放在iframe中,当发生改变时重载)
    * inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)
    两种模式都支持热模块替换(Hot Module Replacement).热模块替换的好处是只替换更新的部分,而不是页面重载.
    ```javascript
    "dev": "cross-env BABEL_ENV=development webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --port 9528",
    ```
* (Hot Module Replacement)热模块替换
  
  * 在命令行中运行inline模式，并启用热模块替换
  
  这里只需要多增加 --hot指令就OK了.如下所示.
  
  webpack-dev-server --content-base build --inline --hot
  注意:命令行模式下,webpack.config.js中一定要配置output.publicPath来指定编译后的包(bundle)的访问位置.
  
  * 在Nodejs API中运行inline模式，并启用热模块替换
  
  这里需要做以下三点:
  
  在webpack.config.js的entry选项中添加:webpack/hot/dev-server
  在webpack.config.js的plugins选项中添加:new webpack.HotModuleReplacementPlugin()
  在webpack-dev-server的配置中添加：hot:true
