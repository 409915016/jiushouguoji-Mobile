# 用户相关接口

## 1 用户登录
### URL: `<host_name>`/app/user/login

- 接口参数:
```
{
    username: '', 
    password: '', 
    type: 1, //1: 手机登录, 5: 微信登录, 6: QQ登录
}
```
- 返回数据:
```
{
    status: 1,
    message: "获取成功",
    data: {
        uid: ,//用户id 
        session:
        }
}
```

## 2 用户注册
### URL: `<host_name>`/app/user/add

- 接口参数:
```
{
    username: '', 
    password: '', 
    verify: '',//短信验证码
}
```
- 返回数据:
```
{
    status: 1,
    message: "获取成功",
    data: {
        uid: //用户id 
        }
}
```

## 3 当前登录用户信息
### URL: `<host_name>`/app/user

- 接口参数:
```
//无
```
- 返回数据:
```
{
    "status":1,
    "message":,
    "data":{
        "mobile":,"email":,"sex":,"birthday":,"open_id":,
        "uid":,"logo":,"username":,"nickname":,
    }
}
```

## 4 获取用户收藏/提醒/心愿单商品列表
### URL: `<host_name>`/app/Favorites/getFavoritesGoods

- 接口参数:
```
{
    type: ;//0：收藏, 1:心愿单, 2：到货提醒;
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": [
        [
            "id","goods_id","goods_name","goods_image","goods_class_id",
            "goods_price","create_time"
        ]
    ]
}
```

## 5 添加收藏/提醒/心愿单商品
### URL: `<host_name>`/app/Favorites/addFavoritesGoods

- 接口参数:
```
{
    type: ;//0：收藏, 1:心愿单, 2：到货提醒;
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": []
}
```

## 6 取消收藏/提醒/心愿单商品
### URL: `<host_name>`/app/Favorites/cancelFavoritesGoods

- 接口参数:
```
{
    type: ;//0：收藏, 1:心愿单, 2：到货提醒;
    goods_id: ;
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": []
}
```

## 7 编辑用户资料
### URL: `<host_name>`/app/user/edit

- 接口参数:
```
{
    nickname: ,  //昵称
    sex: ,       //性别
    logo: ,      //头像url
    birthday:    //生日"1900-01-01"
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "获取成功",
    "data": {"1"}
}
```

## 8 重置密码
### URL: `<host_name>`/app/user/reset

- 接口参数:
```
{
    mobile: ,  //手机号码
    password: ,  //新密码
    verify: //短信验证码
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "重置成功",
    "data": {}
}
```

## 9 获取用户订单
### URL: `<host_name>`/app/order

- 接口参数:
```
{
    type: ,  //默认 0:全部,1:待支付；2：已支付，待发货；3：已发货，待确认；4：完成收货；5：已取消；
    page: ,  //页数
    n:       //每页记录数
}
```
- 返回数据:
```
{
    "status": 1,
    "message",
    "data": [
        {
            "id","order_id","shop_id","shop_name","create_time",
            "coupon_code","coupon_fee","total_fee","real_amount","tax_fee",
            "total_goods_num","total_weight","order_status","refund_status","return_status",
            "apply_return_time","order_goods",
            "order_goods": [
                [
                    "id","goods_id","goods_name","goods_class_id","spec_id",
                    "spec_info","goods_price","goods_num","goods_image","goods_returnnum",
                    "total_fee","payment_fee","discount_fee","shop_id"
                ]
            ]
        }
    ]
}
```

## 10 查询退款/退货订单
### URL: `<host_name>`/app/Order/getReturnList

- 接口参数:
```
{
    status: //0：所有；1：申请中；2：通过；3：拒绝;4：完成
    page: //页号
    n: //记录数
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":[{
        "id":,"order_id":,"shop_id":,"shop_name":,"create_time":,
        "coupon_code":,"coupon_fee":,"total_fee":,"real_amount":,"tax_fee":,
        "total_goods_num":,"total_weight":,"order_status":,"refund_status":,"return_status":,
        "apply_return_time":,
        "order_goods":[
            {
                "id":,"goods_id":,"goods_name":,"goods_class_id":,"spec_id":,
                "spec_info":,"goods_price":,"goods_num":,"goods_image":,"goods_returnnum":,
                "total_fee":,"payment_fee":,"discount_fee":,"shop_id":,
            }
        ]
        },]
}
```

## 11 添加商品评论
### URL: '<host_name>'/app/Evaluate/addEvaluation

- 接口参数:
```
{
    "goods_id1": {
        "scores": "5",
        "result": "3",  //1好, 2一般, 3差
        "content": "",
        "isanonymous": "1",
        "image":["image_url",]
    },
    "goods_id2": {
        "scores": "5",
        "result": "3",  //1好, 2一般, 3差
        "content": "",
        "isanonymous": "1",
        "image":["image_url",]
    },
    "order":{
        "order_id": "",  //订单id
        "desccredit": "5",  // 描述相符
        "servicecredit": "5",  //服务态度
        "deliverycredit": "5"  //发货速度
    }
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": 1
}
```

## 12 退出登录
### URL: '<host_name>'/app/user/logout

- 接口参数:
```
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 13 短信验证码
### URL: '<host_name>'/app/Common/getSmsVerify

- 接口参数:
```
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 14 获取订单概览
### URL: '<host_name>'/app/order/getOrderInfo

- 接口参数:
```
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 15 第三方绑定
### URL: '<host_name>'/app/user/userBinding

- 接口参数:
```
{
    moblie:,
    open_id:,  //union_id
    type: ,  //1weixin, 2QQ
    verify: ,  //验证码
    password: //未注册用户带上注册密码, 已注册留空
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 16 订单详情
### URL: '<host_name>'/app/Order/getOrderDetail

- 接口参数:
```
{
    order_id:
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 17 取消订单
### URL: '<host_name>'/app/Order/cancelOrder

- 接口参数:
```
{
    order_id:
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 18 退货/退款
### URL: '<host_name>'/app/Order/applyOrder

- 接口参数:
```
{
    type: ,  //1退款, 2退货
    order_id: ,
    reason: ,
    message:
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data":
}
```

## 19 获取用户地址列表
### URL: '<host_name>'/app/Address/getAddressList

- 接口参数:
```

```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {
        address1, address2
    }
}
```

## 20 获取默认地址
### URL: '<host_name>'/app/Address

- 接口参数:
```
{
    id //可选参数，id 为空时，返回用户默认地址
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {
        "id":"177",  //地址id
        "name":"",  //收件人
        "provinceid":"12",  //省份代号
        "cityid":"142",  //城市代号
        "areaid":"1449",  //区代号
        "area":"广东 江门市 蓬江区 ",
        "address":"甘化路176号",
        "personid":"", //身份证号，可空
        "receiver_zip":"510000",  //省份邮编
        "uid":"348",
        "mobile":"18022952095"
    }
}
```

## 21 添加地址
### URL: `<host_name>`/app/Address/addAddress

- 接口参数:
```
{
    name，
    mobile,
    personid,可选
    address，//街道地址
    provinceid,//省代号
    cityid，//市代号
    areaid //区代号
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {}
}
```

## 22 删除地址
### URL: `<host_name>`/app/Address/deleteAddress

- 接口参数:
```
{
    id
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {}
}
```

## 23 设置默认地址
### URL: `<host_name>`/app/Address/setDefault

- 接口参数:
```
{
    id  //地址id
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {}
}
```

## 24 足迹
### URL: `<host_name>`/app/Favorites/getFootprint

- 接口参数:
```
{
    
}
```
- 返回数据:
```
{
    "status":,
    "message":,
    "data": {
        "id":,
        "shop_id":,
        "shop_name":,
        "shop_logo":,
        "create_time":
    }
}
```

## 25 删除足迹
### URL: `<host_name>`/app/Favorites/delFootprint

- 接口参数:
```
{
    id  //足迹id, 多个用","分割
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 26 支付
### URL: `<host_name>`/app/pay/getPayMsg

- 接口参数:
```
{
    channel: ,  //1：支付宝 2：微信 ;3:通联
    order_id: ,  //订单id
    coupon_num:  //优惠券号（没有优惠券时可空）
}
```
- 返回数据:
```
{
    "status": 1,
    "message":,
    "data":[]
}
```

## 27 确认收货
### URL: `<host_name>`/app/Order/comfirmOrder

- 接口参数:
```
{
    order_id
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 28 获取退货列表
### URL: `<host_name>`/app/Order/getAfterSaleList

- 接口参数:
```
{}
```
- 返回数据:
```
{
    "status": 1,
    "message": "",
    "data": {}
}
```

## 29 优惠券
### URL: `<host_name>`/app/Coupon

- 接口参数:
```
{
    type: //1:unused 2:used 3:overdue
}
```
- 返回数据:
```
{
    "status": 1,
    "message": "",
    "data": [
        {id, cid, c_num, c_value, use_comments, cover},
    ]
}
```