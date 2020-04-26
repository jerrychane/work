#### Yeoman 脚手架总结

(1）全局 yo 命令安装，安装命令 yo <package>

脚手架的名称是 generator- 打头，如：yo brain-imooc

(2) 使用 generator-generator 快速创建脚手架生成项目

全局安装 npm install -g generator-generator

(3) 使用 npm 进行发布

link 命令本地测试，发布时设置 npm registry

#### 升级 Vue3.0

MVVM (Model-View-ViewModel) 是一种软件架构模型，组成部分：模型、视图、视图模型；

#### 代码调试

Vue DevTools 插件；

#### 前端框架分类及选型

##### 一、下一代 web 引擎 koa 框架

**1.Koa 是什么？**

Koa 是一个全新的 web 框架，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

利用 async 函数（使用同步的写法，去执行异步的函数）丢弃回调函数，并增强错误处理。Koa 没有任何预置的中间件，可快速而愉快地编写服务端应用程序。

**2.Koa 核心概念**

Koa Application （应用程序）

Context （上下文）

Request （请求）、Response （响应）

**3.Koa工作原理**

执行的顺序：顺序执行

回调的顺序：反向执行，即先进后出

**4.Koa开发RESTful接口**

Koa 中间件：路由 koa-router 、协议解析 koa-body、跨域处理 @koa/cors