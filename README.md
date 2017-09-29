<div align="center">
    <h3>简介</h3> 
     <a href="http://wap.jiushouguoji.com"></a>
</div>

基于 ThinkPHP3 模板渲染的微信端购物商城：
- 接入微信支付
- 样式基于 `Gulp` 构建
- 终端适配方案 `flexible.js`
- 多处使用 `CSS Flexible Box` 布局


#### 基础配置

|          | Version    |
|----------|------------|
| PHP      | 5.6.27-NTS |
| MySQL    | 5.5.x      |
| Apache   | 2.4.x      |
| ThinkPHP | 3.2.3      |

#### 目录

    ├─dist  静态页面及样式
    ├─src   Less 源码
    └─web   服务器端


该项目作为转发服务器，与业务服务器之间使用 `API` 来代理用户的操作；

在微信中才能成功调起微信支付功能，`PC` 端仅能浏览页面；

请以 `web` 目录为根配置 `Apache` 虚拟主机来防止页面路由冲突。


<h3 align="center">开始</h3>

```bash
yarn install 
```
then
```bash
gulp 
```

`/web` 目录

```bash
composer install
```

