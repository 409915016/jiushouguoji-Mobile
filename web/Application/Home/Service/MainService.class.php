<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/22
 * Time: 11:48
 */

namespace Home\Service;

use Home\Logic\MainLogic;

class MainService {
    const FAVORITES_COLLECT = 0;
    const FAVORITES_WISH = 1;
    const FAVORITES_ALERT = 2;

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
     * 获取导航列表
     * @return mixed
     */
    public static function getNav () {
        $url = API('NavList');
        $response = MainLogic::getData($url);
        /*fields: id, name, m_banner.banner*/

        self::setResponseData($response);
        //获取成功
        if($response['status'] == 1) {
            $data = $response['data'];
            //构造一下数组
            foreach($data as &$item) {
                $item['banner'] = $item['m_banner'][0]['banner'];
            }
            return $data;
        }
    }

    /**
     * 获取专场列表
     * @param int $nav_id
     */
    public static function getActivity ($nav_id = 0) {
        $url = API('ActivityList');
        $fields['nav_id'] = $nav_id;
        $response = MainLogic::getData($url, $fields);
        /*fields: id, name, cover, goods_list.id, goods_list.name, goods_list.price, goods_list.image*/

        self::setResponseData($response);

        //获取成功
        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }

    /**
     * 获取某专场的商品列表
     * @param $aid
     * @return array
     */
    public static function getActivityGoods ($aid) {
        $url = API('ActivityGoodsList');
        $fields['aid'] = $aid;
        $response = MainLogic::getData($url, $fields);
        /*fields: id, name, price, image*/
        $acts = array_column(self::getActivity(), null, 'id');
        /*fields: id, name, cover*/

        self::setResponseData($response);

        //获取成功
        if($response['status'] == 1) {
            $data['goods_list'] = $response['data'];
            $data['name'] = $acts[$aid]['name'];
            $data['cover'] = $acts[$aid]['cover'];
            return $data;
        }
    }

    /**
     * 获取推荐商品列表
     */
    public static function goodsList () {
        $url = API('GoodsList');
        if(IS_GET){
            $fields = I('get.');
        }else{
            $fields['n'] = 6;
            $fields['page'] = 1;
        }

        $response = MainLogic::getData($url, $fields);
        /*fields: id, name, cover*/

        self::setResponseData($response);

        //succeed
        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }

    /**
     * 获取商品详情
     * @param $id
     * @return mixed
     */
    public static function goodsDetail ($id) {
        $url = API('GoodsDetail');
        $fields['goods_id'] = $id;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        //succeed
        if($response['status'] == 1 && $response['data']) {

            $data = $response['data'];
            $desc = stripslashes($data['body']);
            //去头去尾即可食用
            $desc = preg_replace('/<\/div.*/sm', '', $desc);
            $desc = preg_replace('/.*?<div.*?>/sm', '', $desc);
            $data['body'] = $desc;
            return $data;
        }else{
            return false;
        }
    }

    /**
     * 添加: 收藏, 心愿单, 到货提醒
     * @param int $goods_id
     * @param int $type
     * @return bool
     */
    public static function FavoritesAdd ($goods_id, $type) {
        $url = API('FavoritesAdd');
        $fields['goods_id'] = $goods_id;
        $fields['type'] = $type;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            if($response['data'] > 0) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    /**
     * 取消: 收藏, 心愿单, 到货提醒
     * @param int $goods_id
     * @param int $type
     * @return bool
     */
    public static function FavoritesCancel ($goods_id, $type) {
        $url = API('FavoritesCancel');
        $fields['goods_id'] = $goods_id;
        $fields['type'] = $type;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1) {
            if($response['data'] > 0) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    public static function relatedGoods ($id) {
        $url = API('RelatedGoods');
        $fields['goods_id'] = $id;
        $fields['n'] = 6;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }

    public static function getGoodsComments ($id, $p=1, $n=6) {
        $url = API('GoodsComment');
        $fields['goods_id'] = $id;
        $fields['n'] = $n;
        $fields['page'] = $p;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function getGoodsEvaluationInfo ($goods_id) {
        $url = API('GoodsEvaluationInfo');
        $fields['goods_id'] = $goods_id;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function getHotWord () {
        $url = API('HotWord');
        $fields['n'] = 20;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }

    public static function autoWord ($word) {
        $url = API('AutoWord');
        $fields['word'] = $word;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            $data = array_column($data, 'keyword');
            return $data;
        }
    }

    public static function searchGoods ($key,$page=1,$n=20) {
        $url = API('SearchGoods');
        $fields['key'] = $key;
        $fields['page'] = $page;
        $fields['n'] = $n;
        $response = MainLogic::getData($url, $fields);

        self::setResponseData($response);

        if($response['status'] == 1) {
            $data = $response['data'];
            return $data;
        }
    }
}