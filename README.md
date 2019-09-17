# interview

> a interviewSystem for vue project!

##  安装Node.js

## 安装vscode

## 导入项目

## 项目配置

### 后端请求地址 
    src/main.js 其中 Vue.http.options.root = 'http://127.0.0.1:8888/' 修改后台请求地址
    src/compoents/Main.vue 第87行  this.socket = new WebSocket("ws://localhost:8888/websocket");  修改WebSocket地址 
    两者一起修改

## 运行项目

   vscode 按 ctrl+` 打开终端 先npm install 安装依赖  再npm run dev 运行项目 打包项目看以下操作
   
   建议使用淘宝镜像下载 打开cmd 执行 npm config set registry http://registry.npm.taobao.org/  npm get registry
   
   [切换淘宝镜像](https://www.jianshu.com/p/8f9f79e5cd0d)
   

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
