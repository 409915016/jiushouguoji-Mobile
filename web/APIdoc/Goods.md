#商品相关接口

## 1 接口获取商品列表
### URL: `<host_name>`/app/Goods

- 接口参数:
```
{
    page,     // 页数 (default 1)
    n,       // 每页记录数 (default 10)
    orderBy,  // 1:按发布顺序; 2:按销量; 3:按销售价格; (default 1)
    order,    // asc:升序; desc:降序 (default asc)
    cat_id,   // 分类筛选(可选)
    shop_id   // 店铺筛选(可选)
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "获取成功",
    "data": [{
        "id":,"common_id":,"name":,"shop_id":,"shop_name":,
        "price":,"market_price":,"is_free_shipping":,"salenum":,"stock":,
        "collect":,"wish":,"arrival":,"image":,"item_pcs":,
        "sell_time":,"sh_market_price":,"cluster":,"cluster_price":,"cluster_member":,
        "tips":,"cat_id":,"free_freight":,"subscribe_collect":,"subscribe_wish":,
        "subscribe_arrival":,
        },]
}
```

## 2 接口获取商品详细信息
### URL: `<host_name>`/app/Goods/getGoodsDetail

- 接口参数:
```
{goods_id: 0 //商品id}
```
- 返回数据:
```
{
    "status": 1,
    "message": "获取成功",
    "data": {
        "id": ,"common_id": ,"name": ,"shop_id": ,"shop_name": ,
        "price": ,"market_price": ,"is_free_shipping": ,"salenum": ,"stock": ,
        "collect": ,"wish": ,"arrival": ,"image": ,"item_pcs": ,
        "sell_time": ,"sh_market_price": ,"cluster": ,"cluster_price": ,"cluster_member": ,
        "spec": ,"body": ,"property": ,"brand_id": ,"brand_name": ,
        "spec_name": ,"spec_value": ,"type_id": ,"customs_clearance": ,"goods_border": ,
        "tips": ,"cat_id": ,"free_freight": ,"subscribe_collect": ,"subscribe_wish": ,
        "subscribe_arrival": ,
        "images": [{
                "image": 
            },],
        "sevice": ,"prompt": ,
        "cart_info": {
            "goods_sum": ,"price_sum": 
        }
    }
}
```

## 3 接口获取商品评论
### URL: `<host_name>`/app/Goods/getRelatedGoods

- 接口参数:
```
{
    goods_id: 0, //商品id
    page: 1,     // 页数 (default 1)
    n: 10        // 每页记录数 (default 10)
}
```
- 返回数据:
```
{
    "status",
    "message",
    "data",
    "data": [
        [
            "id","member_id","member_name","common_id","goods_id",
            "goods_name","scores","result","content","image",
            "isanonymous","create_time","status","explain","update_time",
            "evaluate_from"
        ]
    ]
}
```

## 4 接口获取相关商品列表
### URL: `<host_name>`/app/Goods/getGoodsEvaluation

- 接口参数:
```
{
    goods_id: 0, //商品id
    n: //最多返回记录数
}
```
- 返回数据:
```
{
    "status",
    "message",
    "data",
    "data": [
        [
            "id","common_id","name","shop_id","shop_name",
            "price","market_price","is_free_shipping","salenum","stock",
            "collect","wish","arrival","image","item_pcs",
            "sell_time","sh_market_price","cluster","cluster_price","cluster_member",
            "tips","cat_id","free_freight","subscribe_collect","subscribe_wish",
            "subscribe_arrival"
        ]
    ]
}
```

## 5 获取商品导航分类列表
### URL: `<host_name>`/app/Goods/getNavList

- 接口参数: 
```
{id: 0 //可选}
```
- 返回数据: 
```
{
    "status": 1,
    "message": "获取成功",
    "data": [{
        "id":, "name":,
        "m_banner": [{
            "banner":, "bid":,
        }]
    },]
}
```

## 6 获取分类下的活动专场
### URL: `<host_name>`/app/Goods/getActivityList

- 接口参数：
```
{nav_id: 0 //导航分类id, 可选}
```
- 返回数据：
```
{
    "status": 1, 
    "message": "获取成功", 
    "data": [{
        "id", "name", "cover", "description", "start_time", "end_time", 
        "goods_list": [{
            "arrival":, "cat_id":, "cluster":, "cluster_member":, "cluster_price":,
            "collect":, "common_id":, "free_freight":, "id":, "image":,
            "is_free_shipping":, "item_pcs":, "market_price":, "name":, "price":,
            "salenum":, "sell_time":, "sh_market_price":, "shop_id":, "shop_name":,
            "stock":, "subscribe_arrival":, "subscribe_collect":, "subscribe_wish":, "tips":,
            "wish":,
        },]
    ,]
}
```

## 7 获取活动专场下的商品列表
### URL: `<host_name>`/app/Goods/getActivityGoodsList

- 接口参数: 
```
{
    aid: 0, //专场id
    page: 1, //页数 (default 1)
    n: 10, //每页记录数 (default 10)
}
```
- 返回数据:
```
{
     "status": 1,
     "message": "获取成功",
     "data": [
       {
         "id","common_id","name","shop_id","shop_name", 
         "price","market_price","is_free_shipping","salenum","stock", 
         "collect","wish","arrival","image","item_pcs", 
         "sell_time","sh_market_price","cluster","cluster_price","cluster_member", 
         "tips","cat_id","free_freight","subscribe_collect","subscribe_wish", 
         "subscribe_arrival",]
}
```

## 8 获取商品的分类
### URL: `<host_name>`/app/Goods/getGoodsCategory

- 接口参数: 
```
{
    pid: 0, //父级id, 空则获取一级分类
}
```
- 返回数据:
```
{
     "status": 1,
     "message": "获取成功",
     "data": [
       {"name","pic", "id"},
       ]
}
```

## 9 获取商品评论信息统计
### URL: `<host_name>`/app/Goods/getEvaluationInfo

- 接口参数: 
```
{
    goods_id: 0, //商品id
}
```
- 返回数据:
```
{
     "status": 1,
     "message": "获取成功",
     "data": {
        "count", "score", "delivery_scores", "logistics_scores", "good_count",
        "normal_count", "bad_count", "img_count"     
     }
}
```