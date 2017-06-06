<?php
return array(
    'GoodsList' => '/app/Goods',
    'GoodsDetail' => '/app/Goods/getGoodsDetail',
    'RelatedGoods' => '/app/Goods/getRelatedGoods',
    'GoodsComment' => '/app/Goods/getGoodsEvaluation',
    'NavList' => '/app/Goods/getNavList',
    'ActivityList' => '/app/Goods/getActivityList',
    'ActivityGoodsList' => '/app/Goods/getActivityGoodsList',
    'GoodsCategory' => '/app/Goods/getGoodsCategory',
    'GoodsEvaluationInfo' => '/app/Goods/getEvaluationInfo',

    'Login' => '/app/user/login',
    'Register' => '/app/user/add',
    'UserInfo' => '/app/user',
    'Favorites' => '/app/Favorites/getFavoritesGoods',
    'FavoritesAdd' => '/app/Favorites/addFavoritesGoods',
    'FavoritesCancel' => '/app/Favorites/cancelFavoritesGoods',
    'UserEdit' => '/app/user/edit',
    'ResetPassword' => '/app/user/reset',
    'Order' => '/app/Order',
    'ReturnOrder' => '/app/Order/getReturnList',
    'OrderComment' => '/app/Evaluate/addEvaluation',
    'Logout' => '/app/user/logout',
    'SMSVerify' => '/app/Common/getSmsVerify',
    'getMark' => '/app/order/getOrderInfo',
    'ThirdBind' => '/app/user/userBinding',
    'OrderDetail' => '/app/Order/getOrderDetail',
    'OrderCancel' => '/app/Order/cancelOrder',
    'OrderRefund' => '/app/Order/applyOrder',
    'AddressList' => '/app/Address/getAddressList',
    'AddressGet' => '/app/Address',
    'AddressAdd' => '/app/Address/addAddress',
    'AddressDel' => '/app/Address/deleteAddress',
    'AddressSet' => '/app/Address/setDefault',
    'Footprint' => '/app/Favorites/getFootprint',
    'FootprintDel' => '/app/Favorites/delFootprint',
    'Pay' => '/app/pay/getPayMsg',
    'Received' => '/app/Order/comfirmOrder',
    'Refund' => '/app/Order/getAfterSaleList',
    'Coupon' => '/app/Coupon',
    'SelectCoupon' => '/app/Coupon/selectCoupon',
    'WaitingEvolution' => '/app/Evaluate',

    'Cart' => '/app/Cart',
    'CartEdit' => '/app/Cart/editCartGoods',
    'CartDel' => '/app/Cart/deleteCartGoods',
    'CartAdd' => '/app/Cart/addCartGoods',
    'CartEditStatus' => '/app/Cart/editStatus',
    'CreateOrder' => '/app/Order/orderConfirm',
    'ConfirmOrder' => '/app/Order/createOrder',



    'ClusterList' => '/app/Cluster/getCluster',
    'ClusterDetail' => '/app/Cluster/getClusterDetail',
    'ClusterOrder' => '/app/Cluster/getClusterOrderDetail',
    'ClusterCreate' => '/app/Cluster/createCluster',
    'ClusterJoin' => '/app/Cluster/joinCluster',
    'GetClusterList' => '/app/Cluster/getClusterList',
    'getClusterGoods' => '/app/Goods/getClusterGoods',
    'AvailableCoupon' => '/app/Coupon/selectClusterCoupon',


    'HotWord' => '/app/Search/getSearchHotWord',
    'AutoWord' => '/app/Search/autoWordList',
    'SearchGoods' => '/app/Search',
    'GetDistrict' => '/app/Common/getDistrict',
);