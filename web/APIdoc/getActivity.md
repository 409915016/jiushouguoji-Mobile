## URL: `<host_name>`/app/Goods/getNavList
### 描述: 获取商品导航分类列表
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

## URL: `<host_name>`/app/Goods/getActivityList
### 描述: 获取分类下的每个活动专场
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

## URL: `<host_name>`/app/Goods/getActivityGoodsList
### 描述: 获取活动专场下的商品列表
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
