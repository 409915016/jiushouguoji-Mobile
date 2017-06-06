<div align="center">
    <h3>简介</h3> 
     <a href="http://wap.jiushouguoji.com"></a>
</div>

基于 ThinkPHP3.2.3 模板渲染的微信端购物商城：
- 支持微信支付
- 基于 `Gulp` 构建
- 使用 `Less` 管理多页面样式
- 使用淘宝多终端适配方案 `flexible.js`
- 多处使用 `CSS3 Flexible Box` 布局方式

<h3 align="center">开始</h3>

```bash
yarn install 
```
then
```bash
gulp 
```

<h3 align="center">代理</h3>

该项目作为转发服务器，与业务服务器之间使用 `API` 来代理用户的操作。

在手机微信中才能成功调起微信支付功能，`PC` 端仅能浏览页面。

`web` 项目根目录，使用 `ThinkPHP` 框架，页面由框架的模板引擎渲染。请开发环境中配置虚拟主机来防止页面路由冲突。


