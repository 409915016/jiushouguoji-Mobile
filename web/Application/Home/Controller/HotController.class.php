<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/26
 * Time: 18:50
 */

namespace Home\Controller;

use Home\Logic\WeixinAuthLogic;
use Home\Service\HotService;
use Home\Service\MainService;
use Home\Service\UserService;
use Org\Mysteries\Teleport;

class HotController extends UserController {


    public function index () {
        Teleport::clear();
        $m = new Teleport();
        $m->save();

        $this->title = '就手推荐';
        $list = HotService::ClusterGoods();
        $this->assign('list', $list);
        $this->display('hot');
    }

    public function cluster_detail ($cluster_id) {
        if(self::checkLogin(1)){
            if(HotService::ClusterDetail($cluster_id)){
                $detail = HotService::getResponseData();
                $this->assign('detail', $detail['data']);
                $this->display('cluster_detail');
            }else{
                //TODO: catch error
                echo '出问题?';
            }
        }else{
            $this->login();
        }
    }

    public function cluster_order_detail ($order_id) {
        if(self::checkLogin(1)){
            if(HotService::ClusterOrder($order_id)){
                $detail = HotService::getResponseData();
                $this->assign('detail', $detail['data']);
                $this->display('cluster_order_detail');
            }else{
                //TODO: catch error
                echo '出问题?';
            }
        }else{
            $this->login();
        }
    }

    public function join_cluster () {
        if(!self::checkLogin(1)){
            header('Location: /User/login');
        }

        if(IS_POST){
            if(HotService::ClusterJoin()){
                returnJSON(1, '成功加入拼团');
            }else{
                returnJSON(0, '加入拼团错误');
            }
        }else{

            $cluster_id = I('get.cluster_id');

            HotService::ClusterDetail($cluster_id);

            $cluster_detail = HotService::getResponseData()['data'];

            $goods_id = $cluster_detail['goods_id'];

            $addr_id = I('get.addr');
            $addr = UserService::GetAddress($addr_id);
            $this->assign('addr', $addr);

            $coupon_id = I('get.coupon');

            $goods_detail = MainService::goodsDetail($goods_id);
            $this->assign('goods_detail', $goods_detail);

            $coupon = UserService::AvailableCoupon($goods_id);
            $this->assign('available_coupon', count($coupon));

            $coupon = array_column($coupon, 'c_value', 'id');
            $this->assign('c_value', $coupon[$coupon_id]);

            $this->assign('type', 'join');

            $this->title = '拼团支付详情';
            $this->display('create_cluster');
        }
    }

    public function create_cluster () {
        self::checkLogin();

        $goods_id = I('get.goods_id');
        if(!empty($goods_id)){

            $addr_id = I('get.addr');
            $addr = UserService::GetAddress($addr_id);
            $this->assign('addr', $addr);

            $coupon_id = I('get.coupon');

            $goods_detail = MainService::goodsDetail($goods_id);
            $this->assign('goods_detail', $goods_detail);

            $coupon = UserService::AvailableCoupon($goods_id);
            $this->assign('available_coupon', count($coupon));

            $coupon = array_column($coupon, 'c_value', 'id');
            $this->assign('c_value', $coupon[$coupon_id]);


            $this->assign('type', 'join');

            $this->title = '拼团支付详情';
            $this->display('create_cluster');
        }


    }

    public function recommend(){
        //获取推荐商品
        $goods = MainService::goodsList();
        $result = array();
        foreach($goods as $item){
            $result[] = array(
                'url' => "/detail/{$item['id']}",
                'name' => $item['name'],
                'price' => $item['price'],
                'image' => $item['image'],
                'stock' => $item['stock']
            );
        }

        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode(array('status'=>1, 'data' => $result, 'message' => 'success'), JSON_UNESCAPED_UNICODE));
    }
}