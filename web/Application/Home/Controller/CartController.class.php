<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/26
 * Time: 9:27
 */

namespace Home\Controller;


use Home\Service\MainService;
use Home\Service\UserService;
use Org\Mysteries\Teleport;

class CartController extends UserController {

    public function index () {
        $this->title = '购物车';
        $m = new Teleport();
        $m->save();

        if(self::checkLogin(true)){
            $data = UserService::cart();
            $cart_info = $data['cartInfo'];

            //提取商品列表
            $list = array_diff_key($data, array('cartInfo' => array()));
            foreach($list as $item) foreach($item as $i) $checked[] = $i['status'];

            $this->assign('all_checked', array_product($checked));
            $this->assign('cart_list', $list);
            $this->assign('cart_info', $cart_info);


        }else{
            //header('Location: /User/login');
        }
        //获取推荐商品
        $goods = MainService::goodsList();
        $this->assign('goods', $goods);
        $this->display('Cart/cart');
    }

    public function add_goods ($goods_id) {
        if(!self::checkLogin(1)){
            returnJSON(0, '请先登录', -5);
        }else{
            UserService::CartAdd($goods_id, 1) ? returnJSON(1, '添加购物车成功') : returnJSON(0, UserService::getResponseData());
        }
    }

    public function goods_count_add ($id) {
        self::checkLogin();
        $result = UserService::CartEdit($id, 1);
        returnJSON($result);
    }

    public function goods_count_sub ($id) {
        self::checkLogin();
        $result = UserService::CartEdit($id, -1);
        returnJSON($result);
    }

    public function goods_change_status ($id, $status = 0) {
        self::checkLogin();
        $result = UserService::CartStatus($id, $status);
        returnJSON($result);
    }

    public function delete_goods ($id) {
        self::checkLogin();
        $result = UserService::CartDel($id);
        returnJSON($result);
    }

    public function create_order () {
        self::checkLogin();

        $m = new Teleport();
        $m->pop();
        $m->save();

        $data = UserService::CreateOrder();

        if(!$data) {

        }
        $addr = UserService::GetAddress();
        $this->assign('address', $addr);
        $this->assign('data', $data);
        $this->display('Cart/create_order');
    }

    public function confirm_order () {
        self::checkLogin();
        $data = I('post.');
        $succeed = UserService::ConfirmOrder($data['id'], $data['msg']);
        if($succeed){
            returnJSON('/User/Order/wait_pay', '下单成功', 1);
        }else{
            returnJSON('/Cart', '下单失败', 0);
        }
    }
}