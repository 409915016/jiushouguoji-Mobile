<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/15
 * Time: 16:11
 */

namespace Home\Service;


use Home\Logic\MainLogic;

class HotService {

    public static $response_data = array();

    /**
     * @return array
     */
    public static function getResponseData () {
        return self::$response_data;
    }

    /**
     * @param array $response_data
     */
    public static function setResponseData ($response_data) {
        self::$response_data = $response_data;
    }

    /**
     * 获取拼团商品
     * @return mixed
     */
    public static function ClusterGoods () {
        $url = API('getClusterGoods');
        $response = MainLogic::getData($url);
        self::setResponseData($response);
        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }

    /**
     * 获取商品页拼团列表
     * @param $goods_id
     * @return bool
     */
    public static function ClusterList ($goods_id) {
        $url = API('ClusterList');
        $fields['goods_id'] = $goods_id;
        $fields['n'] = 15;
        $fields['page'] = 1;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        } else {
            return false;
        }
    }

    /**
     * 获取拼团详情
     * @param $cluster_id
     * @return bool
     */
    public static function ClusterDetail ($cluster_id) {
        $url = API('ClusterDetail');
        //$fields_cluster_id = 'cluser_id';
        $fields['cluser_id'] = $cluster_id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取拼团订单详情
     * @param $order_id
     * @return bool
     */
    public static function ClusterOrder ($order_id) {
        $url = API('ClusterOrder');
        $fields['id'] = $order_id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 发起团购
     * post [goods_id, goods_num, addr_id, pay_channel, coupon_num, message]
     * @param $fields
     * @return bool
     */
    public static function ClusterCreate ($fields) {
        $url = API('ClusterCreate');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 加入团购
     * post [cluster_id, goods_id, goods_num, addr_id, pay_channel, coupon_num, $message]
     * @return bool
     */
    public static function ClusterJoin ($fields) {
        $url = API('ClusterJoin');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        } else {
            return false;
        }
    }
}