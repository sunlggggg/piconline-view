# piconline-view
piconline's views
## build  project
1. init project
```
npm init
```
generate the package.json
2. install webpack 
```
npm install --save-dev webpack@4.16.1
```
3. create webpack.dev.config.js
``` 
touch  webpack.dev.config.js
```
4. webpack compile
```
mkdir src && touch ./src/index.js
```

src/index.js add new content
```js
document.getElementById('app').innerHTML = "Webpack works"
```
compile command
``` 
 webpack --config webpack.dev.config.js
```
如果webpack 没有使用全局安装
```
command not found: webpack
``` 
使用 -g 全局安装 
```
npm install --save-dev webpack@4.16.1 -g 
npm install webpack-cli -g
```
5. test 
dist文件夹下面新建一个index.html
```
touch ./dist/index.html
```
dist/index.html填写内容
``` html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="app"></div>
<script type="text/javascript" src="./bundle.js" charset="utf-8"></script>
</body>
</html>
```
使用浏览器中使用绝对路径的进行访问
file:///Users/username/workspace/piconline-view/dist/index.html

6. use label
label 帮助我们将es6 es7编译成es5 包括jsx
```
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
```
新建babel配置文件.babelrc

touch .babelrc
``` json
.babelrc

 {
   "presets": [
     "es2015",
     "react",
     "stage-0"
   ],
   "plugins": []
 }
 ```

 修改webpack.dev.config.js，增加babel-loader

 /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
 /*cacheDirectory是用来缓存编译结果，下次编译加速*/
 ```js
 module: {
     rules: [{
         test: /\.js$/,
         use: ['babel-loader?cacheDirectory=true'],
         include: path.join(__dirname, 'src')
     }]
 }
 ```

 现在我们简单测试下，是否能正确转义ES6~

修改 src/index.js
```js
 /*使用es6的箭头函数*/
 var func = str => {
     document.getElementById('app').innerHTML = str;
 };
 func('我现在在使用Babel!');
 ```
执行打包命令webpack --config webpack.dev.config.js

浏览器打开index.html，我们看到正确输出了我现在在使用Babel!

## add react
1. install react
```
npm install --save react react-dom
```

修改 src/index.js使用react
``` js
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    <div>Hello React!</div>, document.getElementById('app'));
```

执行打包命令webpack --config webpack.dev.config.js

打开index.html 看效果。


我们简单做下改进，把Hello React放到组件里面。体现组件化~
```
cd src
mkdir component
cd component
mkdir Hello
cd Hello
touch Hello.js
```
按照React语法，写一个Hello组件
```js
import React, {Component} from 'react';

export default class Hello extends Component {
    render() {
        return (
            <div>
                Hello,React!
            </div>
        )
    }
}
```
然后让我们修改src/index.js，引用Hello组件！

src/index.js
```js
import React from 'react';
import ReactDom from 'react-dom';
import Hello from './component/Hello/Hello';

ReactDom.render(
    <Hello/>, document.getElementById('app'));
```
在根目录执行打包命令

webpack --config webpack.dev.config.js

打开index.html看效果咯~

## 命令优化 
Q: 每次打包都得在根目录执行这么一长串命令webpack --config webpack.dev.config.js,能不打这么长吗？

A: 修改package.json里面的script，增加dev-build。

package.json
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-build": "webpack --config webpack.dev.config.js"
  }
```
现在我们打包只需要执行npm run dev-build就可以啦！

## webpack-dev-server
```
 npm install webpack-dev-server --save-dev -g
```

```
webpack-dev-server --config webpack.dev.config.js
```

``` js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-build": "webpack --config webpack.dev.config.js",
    "start": "webpack-dev-server --config webpack.dev.config.js"
  }
```


修改下我们的webpack-dev-server的配置
webpack.dev.config.js
```js
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0'
    }
```

## css loader
```
npm install css-loader style-loader --save-dev
```
css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；

style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

webpack.dev.config.js rules增加
```
{
   test: /\.css$/,
   use: ['style-loader', 'css-loader']
}
```