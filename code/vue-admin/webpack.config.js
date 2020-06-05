const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['syntax-dynamic-import']
                }

            },
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loaders'
            ]
        }]
    },
    devServer: {
        publicPath: '/'
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            inject: true,
            title: '公众号管理后台'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}
