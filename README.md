# IonicPMP

## 1. 命令行安装ionic
首先需要安装 [Node.js](https://nodejs.org/en/)，在接下来的安装中需要使用到其 NPM 工具，更多 NPM 介绍可以查看[NPM 使用介绍](http://www.runoob.com/nodejs/nodejs-npm.html)。
然后通过命令行工具安装最新版本的 cordova 和 ionic 。通过参考[Android](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) 和 [iOS](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) 官方文档来安装。

Mac 系统上使用以下命令：
```
$ sudo npm install -g ionic cordova
```
如果已经安装了以上环境，可以执行以下命令来更新版本:
```
$ sudo npm update -g ionic cordova
```

## 2. 使用ionic创建应用
使用ionic官方提供的现成的应用程序模板，或一个空白的项目创建一个ionic应用：
```
$ ionic start myApp tabs
```
直接浏览器启动app
```
$ cd myApp
$ ionic serve
```
### 2.1 创建Android应用
```
$ cd myApp
$ ionic cordova platform add android
$ ionic cordova build android
```
模拟器运行
```
$ ionic cordova emulate android
```
真机运行
```
$ ionic cordova run android --device
```
### 2.2 创建iOS应用
```
$ cd myApp
$ ionic cordova platform add ios
$ ionic cordova build ios
$ ionic cordova emulate ios
```

如果出现"ios-sim was not found."错误，可以执行以下命令：
```
$ npm install -g ios-sim
```
## 3.ionic和原生混合
### 3.1 mix ionic and ios native
* [iOS WebViews](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/webview.html)
* [ionic移植到iOS原生工程](http://www.jianshu.com/p/fc7da9f26f35)

### 3.2 mix ionic and android native
* https://blog.nami.idv.tw/?p=598
* http://blog.csdn.net/Story51314/article/details/73290212
