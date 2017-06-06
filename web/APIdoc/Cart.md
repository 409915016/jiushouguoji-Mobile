# 购物车相关接口

## 1 购物车详情
### URL: `<host_name>`/app/Cart

- 接口参数
```
{}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {
        "0": [
            id, shop_id, shop_name, goods_id, goods_name,
            goods_price, goods_num, goods_image, status, sale_status, uid
        ],
        "cart_info": {
            goods_sum, price_sum
        }
    }
}
```

## 2 编辑购物车
### URL: `<host_name>`/app/Cart/editCartGoods

- 接口参数
```
{
    id, //购物车id
    n  //添加件数
}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 3 删除商品
### URL: `<host_name>`/app/Cart/deleteCartGoods

- 接口参数
```
{
    id, //购物车id
    goods_id  
}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 4 添加商品到购物车
### URL: `<host_name>`/app/Cart

- 接口参数
```
{
    goods_id，//商品id
    n //添加件数
}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 5 改变购物车中商品的状态
### URL: `<host_name>`/app/Cart/editStatus

- 接口参数
```
{
    id, //购物车id,
    status// 0:取消；1：钩选
}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 6 创建订单
### URL: `<host_name>`/app/Order/orderConfirm

- 接口参数
```
{}
```
- 返回数据
```
{}
```

## 7 生成订单
### URL: `<host_name>`/app/Order/createOrder

- 接口参数
```
{
    address_id, // 地址id
    $message //买家留言
}
```
- 返回数据
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```