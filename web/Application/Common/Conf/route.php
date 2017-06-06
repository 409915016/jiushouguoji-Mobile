<?php
//路由表
return [
    // 默认路由规则 针对模块
    'URL_ROUTE_RULES' => [
        'test'     => 'Test/test',

        //获取商品
        'rcm'      => 'Hot/recommend',
        'pay_dump' => 'User/pay_dump',

        'api_test'                       => 'Index/api_test',
        //获取地区
        'get_district/:id'               => 'Index/getDistrict',
        //搜索
        'hot_word'                       => 'Index/HotWord',
        'auto_word/:word'                => 'Index/AutoWord',
        'search/:word'                   => 'Index/searchGoods',
        'search_ajax'                    => 'Index/searchGoodsAjax',

        //活动专场
        'activity/:aid'                  => 'Index/activity',
        //商品详情
        'detail/:id\d'                   => 'Index/goodsDetail',
        'detail/comments/:id\d'          => 'Index/goodsComments',

        //收藏
        'collect/add/:id\d'              => ['Index/collect', 'act=add'],
        'collect/cancel/:id\d'           => ['Index/collect', 'act=cancel'],
        //心愿单
        'wish/add/:id\d'                 => ['Index/wish', 'act=add'],
        'wish/cancel/:id\d'              => ['Index/wish', 'act=cancel'],
        //到货提醒
        'alert/add/:id\d'                => ['Index/alert', 'act=add'],
        'alert/cancel/:id\d'             => ['Index/alert', 'act=cancel'],

        //创建拼团
        'cluster/create'                 => 'Hot/create_cluster',
        //加入拼团
        'cluster/join'                   => 'Hot/join_cluster',
        //拼团详情
        'cluster/detail/:cluster_id\d'   => 'Hot/cluster_detail',
        'cluster/order/:order_id\d'      => 'Hot/cluster_order_detail',

        //购物车
        'Cart/goods_count/add/:id'       => 'Cart/goods_count_add',
        'Cart/goods_count/sub/:id'       => 'Cart/goods_count_sub',
        'Cart/add/:goods_id'             => 'Cart/add_goods',
        'Cart/change_status/:id/:status' => 'Cart/goods_change_status',
        'Cart/delete_goods/:id'          => 'Cart/delete_goods',
        'Cart/create_order'              => 'Cart/create_order',
        'Cart/confirm_order'             => 'Cart/confirm_order',
        //选择收货地址
        'select_address'                 => 'User/address_select',

        //我的
        'User/login'                     => 'User/login',
        'User/logout'                    => 'User/logout',
        'User/register'                  => 'User/register',
        'User/verify'                    => 'User/sms_verify',
        'User/information'               => 'User/information',
        'User/forgot'                    => 'User/forgot',
        //微信登录
        'User/weixin_auth'               => 'User/weixin_auth',
        'User/third_bind'                => 'User/third_bind',
        'User/register_and_bind'         => 'User/register_and_bind',
        'User/weixin_init'               => 'User/weixin_init',

        //我的拼团
        'User/Order/cluster/:type'       => 'User/cluster',

        'User/Order/refund/'                => 'User/order_refund',
        'User/Order/received/:order_id\d'   => 'User/order_received',
        'User/Order/logistics/:order_id\d'  => 'User/order_logistics',

        //订单
        'User/Order/pay/:order_id'          => 'User/order_pay',
        'User/Order/detail/:order_id'       => 'User/order_detail',
        'User/Order/cancel/:order_id'       => 'User/order_cancel',
        'User/Order/comment/:order_id'      => 'User/order_comment',
        'User/Order/refund/:type/:order_id' => 'User/order_refund',
        'User/Order/:status'                => 'User/order',

        //关注
        'User/Concern/:type'                => 'User/favorites',
        //地址
        'User/Address/add'                  => 'User/address_add',
        'User/Address/del/:id'              => 'User/address_delete',
        'User/Address/setDefault/:id'       => 'User/address_set_default',
        'User/Address'                      => 'User/address_manage',
        //足迹
        'User/Footprint'                    => 'User/footprint',
        'User/Footprint/del/:id'            => 'User/footprint_del',
        //优惠券
        'User/Coupon/available/:goods_id'   => 'User/available_coupon',
        'User/Coupon/:type'                 => 'User/coupon',

        //退货/退款
        'User/refund'                       => 'User/refund',


        //顶部导航
        'Home/:nav'                         => 'Index/index',
        //底部导航
        'Hot'                               => 'Hot/index',
        'Cart'                              => 'Cart/index',
        'User'                              => 'User/index',
        'Home'                              => 'Index/index',
    ],
];