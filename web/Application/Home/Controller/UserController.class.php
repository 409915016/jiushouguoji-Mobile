<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/26
 * Time: 18:01
 */

namespace Home\Controller;

use Home\Service\HotService;
use Org\Mysteries\Teleport;
use Think\Controller;
use Home\Service\MainService;
use Home\Service\UserService;
use Home\Logic\WeixinAuthLogic;

/**
 * @property string title
 */
class UserController extends Controller {

    /**
     * initialize
     *
     */
    public function _initialize(){

       if(self::check_unionid() || UserService::Info()){
           UserService::setIsLogin(true);
       }
    }

    private function check_unionid () {
        if($unionid = cookie('unionid')){
            return UserService::weixin_login($unionid);
        }
    }

    /**
     * 我的主页

     */
    public function index () {
        $this->title = '个人中心';

        Teleport::clear();
        $m = new Teleport();
        $m->save();

        if($info = UserService::Info()){
            $this->assign('info', $info);
        }
        $mark = UserService::getMark() ? UserService::getResponseData()['data'] : '';

        $this->assign('mark', $mark);
        $this->display('index');
    }

    /**
     * 用户信息

     */
    public function information () {
        if(IS_POST){
            if(UserService::Edit()){
                returnJSON(1, '修改成功');
            }else{
                returnJSON(0, '修改失败');
            }
        }
        $this->checkLogin();

        $info = UserService::Info();
        $this->assign('info', $info);
        $this->title = '我的资料';
        $this->display();
    }

    /**
     * 登录
     */
    public function login () {
        if(IS_POST) {
            if(UserService::Info()) {
                //提示已经登录
                returnJSON(1, '当前已登录');
            } else {
                if(UserService::login()) {
                    returnJSON(1, '登录成功');
                } else {
                    returnJSON(0, '登录失败');
                }
            }
        } else {
            $this->title = '登录';
            $this->display('User/login');
        }
    }

    /**
     * 微信验证登录
     *
     */
    public function weixin_auth(){
        $w = new WeixinAuthLogic();

        if($access = $w->getWebAccess('snsapi_userinfo')) {

            $union_id = $access['unionid'];

            if(UserService::weixin_login($union_id)) {
                cookie('unionid', $union_id, array('expire'=> 604800));
                $this->index();
            } else {
                $r = UserService::getResponseData();
                if($r['status'] == '-3') {
                    $this->assign('open_id', $union_id);
                    $this->third_bind();
                } else {
                    header('Content-Type: text/html; charset=utf-8');
                    exit("<script>alert('出了点问题\\n" . $r['status'] . " ');</script>");
                }
            }
        }
    }

    /**
     * 第三方绑定
     *
     */
    public function third_bind () {
        if(IS_POST){
            if(UserService::ThirdBind()){
                returnJSON(1, '绑定成功');
            }else{
                returnJSON(0, '绑定失败');
            }
        }else{
            $this->title = '微信绑定';
            $this->display('third_party_bind');
        }
    }

    public function weixin_init () {
        $w = new WeixinAuthLogic();
        $user_info = $w->get_user_info();
        $data = array(
            'nickname' => $user_info['nickname'],
            'sex' => (int)!$user_info['sex'], //翻转性别值
            'logo' => 'Public/img/icon/account.png',
            'signature' => 'have good a day :)'
        );
        UserService::Edit($data);
        if(UserService::weixin_login($user_info['union_id'])) {
            header('Location: /User');
        } else {
            $r = UserService::getResponseData();
            header('Content-Type: text/html; charset=utf-8');
            exit("<script>alert('出了点问题\\n" . $r['status'] . " ');</script>");
        }
    }

    /**
     * 退出登录

     */
    public function logout () {
        if(!$this->checkLogin(1)){
            returnJSON(0, '尚未登录');
        }
        if(UserService::Logout()) {
            cookie('unionid', null);
            returnJSON(1, '退出成功');
        } else {
            returnJSON(0, '退出失败');
        }
    }

    /**
     * 用户注册

     */
    public function register () {
        if(IS_POST) {
            if(UserService::Register()){
                $m = UserService::getResponseData();
                returnJSON(1, $m['message']);
            }else{
                $m = UserService::getResponseData();
                returnJSON(0, $m['message']);
            }
        } else {
            $this->title = '注册';
            $this->display();
        }
    }

    /**
     * 短信验证码
     * @internal param $mobile
     */
    public function sms_verify () {
        if(IS_POST && UserService::SMSVerify(I('post.mobile'))) {
            returnJSON(1, '获取成功');
        } else {
            returnJSON(1, '获取失败');
        }
    }

    /**
     * 重置密码

     */
    public function forgot () {

        if(IS_POST) {
            if(UserService::ResetPassword()) {
                returnJSON(1, '密码重置成功');
            } else {
                returnJSON(UserService::getResponseData());
            }
        } else {
            $this->title = '重置密码';
            $this->display();
        }
    }

    /**
     * 检查登录
     * @param bool $need_return
     * @return bool
     */
    public function checkLogin ($need_return = false) {
        if(!!UserService::Info()) {
            return true;
        } else if($need_return) {
            return false;
        } else {
            header('Location: /User/login');
            exit;
        }
    }

    /**
     * 心愿单, 收藏, 提醒
     * @param $type
     */
    public function favorites ($type) {
        $this->checkLogin();

        $type_case = array('wish' => array('value' => UserService::MY_WISH, 'name' => '心愿单'), 'collect' => array('value' => UserService::MY_COLLECT, 'name' => '我的收藏'), 'alert' => array('value' => UserService::MY_ALERT, 'name' => '到货提醒'),);

        $list = UserService::Favorites($type_case[$type]['value']);
        $this->assign('list', $list);

        //获取推荐商品
        $goods = MainService::goodsList();
        $this->assign('goods', $goods);

        $this->title = $type_case[$type]['name'];
        $this->display('favorites');
    }

    /**
     * 我的订单
     * @param $status
     */
    public function order ($status) {
        $this->checkLogin();

        $status_case = array_flip(array('all', 'wait_pay', 'payed', 'wait_confirm_goods', 'finish', 'cancel',));

        $ORDER_STATUS = array('ORDER_ALL' => '全部', 'ORDER_WAIT_PAY' => '待付款', 'ORDER_PAYED' => '待发货', 'ORDER_WAIT_CONFIRM_GOODS' => '待收货', 'ORDER_FINISH' => '已完成', 'ORDER_CANCEL' => '已取消',);

        $refund_case = array('申请退款', '已提交申请', '正在审核', '退款被拒绝', '退款通过', '退款完成', '等待退款');
        $return_case = array('申请退货', '已提交申请', '正在审核', '退货被拒绝', '退货通过', '退货完成', '等待退货');

        $order_list = UserService::UserOrder($status_case[$status]);

        foreach($order_list as &$item) {
            $item['order_status_text'] = $ORDER_STATUS[$item['order_status']];
            if($item['refund_status'] > 0) $item['button'] = $refund_case[$item['refund_status']];
            if($item['return_status'] > 0) $item['button'] = $return_case[$item['return_status']];
        }

        $this->assign('order_list', $order_list);

        $this->title = $ORDER_STATUS['ORDER_' . strtoupper($status)];
        $this->display();
    }

    /**
     * 取消订单
     * @param $order_id 订单id
     */
    public function order_cancel ($order_id) {
        $this->checkLogin();

        if(UserService::OrderCancel($order_id)) {
            returnJSON(1, '订单已取消');
        } else {
            returnJSON(1, '订单取消失败');
        }
    }

    /**
     * 订单详情
     * @param $order_id 订单id
     */
    public function order_detail ($order_id) {
        $this->checkLogin();

        $data = UserService::OrderDetail($order_id);

        $ORDER_STATUS = array('ORDER_ALL' => '全部', 'ORDER_WAIT_PAY' => '待付款', 'ORDER_PAYED' => '待发货', 'ORDER_WAIT_CONFIRM_GOODS' => '待收货', 'ORDER_FINISH' => '已完成', 'ORDER_CANCEL' => '已取消',);
        $refund_case = array('申请退款', '已提交申请', '正在审核', '退款被拒绝', '退款通过', '退款完成', '等待退款');
        $return_case = array('申请退货', '已提交申请', '正在审核', '退货被拒绝', '退货通过', '退货完成', '等待退货');

        $data['order_status_text'] = $ORDER_STATUS[$data['order_status']];
        if($data['refund_status'] > 0)
            $data['button'] = $refund_case[$data['refund_status']];
        if($data['return_status'] > 0)
            $data['button'] = $return_case[$data['return_status']];


        $waiting_evolution = $data['order_status'] == 'ORDER_FINISH' && UserService::WaitingEvolution() ? 1 : 0;

        $this->assign('waiting_evolution', $waiting_evolution);
        $this->assign('data', $data);
        $this->title = '订单详情';
        $this->display('order_detail');
    }

    /**
     * 订单评论
     * @param $order_id 订单id
     */
    public function order_comment ($order_id) {
        $this->checkLogin();

        if(IS_POST) {
            $success = UserService::OrderComment($order_id);
            $msg = $success ? '评论成功' : '评论失败';
            returnJSON('', $msg, $success);
        } else {
            $data = UserService::OrderDetail($order_id);
            $this->title = '发表评论';
            $this->assign('goods_list', $data['order_goods']);
            $this->display('order_comment');
        }
    }

    /**
     * 我的团购
     * @param $type
     */
    public function cluster ($type){
        $this->checkLogin();

        $type_case = array_flip(array(0, 'all', 'underway', 'success', 'failed'));

        $cluster_list = UserService::ClusterList($type_case[$type]);
        $this->assign('cluster_list', $cluster_list);

        $this->title = '我的拼团';
        $this->display('cluster');
    }

    /**
     * 地址管理
     *
     */
    public function address_manage () {
        $this->checkLogin();

        $data = UserService::AddressList();
        $this->assign('data', $data);
        $this->title = '收货地址';
        $this->display();
    }

    /**
     * 设置默认地址
     * @param $id 地址id
     */
    public function address_set_default ($id) {
        $this->checkLogin();
        $success = UserService::AddressSetDefault($id);
        $msg = '设置地址';
        returnJSON($success, $msg);
    }

    /**
     * 删除地址
     * @param $id 地址id
     */
    public function address_delete ($id) {
        self::checkLogin();
        $success = UserService::AddressDelete($id);
        $msg = '删除地址';
        returnJSON($success, $msg);
    }

    /**
     * 新增地址
     *
     */
    public function address_add () {
        self::checkLogin();
        if(IS_POST) {
            $success = UserService::AddressAdd();
            $msg = '新增地址';
            returnJSON($success, $msg);
        } else {
            $this->title = '新增地址';
            $this->display('address_edit');
        }
    }

    /**
     * 地址选择
     *
     */
    public function address_select () {
        $this->checkLogin();

        $data = UserService::AddressList();
        $this->assign('data', $data);

        $this->assign('back', $_SERVER['HTTP_REFERER']);

        $this->title = '收货地址';
        $this->display();
    }

    /**
     * 浏览历史
     *
     */
    public function footprint () {
        $this->checkLogin();
        $list = UserService::Footprint();
        $this->assign('list', $list);

        //获取推荐商品
        $goods = MainService::goodsList();
        $this->assign('goods', $goods);

        $this->title = '我的足迹';
        $this->display();
    }

    /**
     * 我的优惠券
     * @param $type string
     */
    public function coupon ($type) {
        $this->checkLogin();

        $type_case = array_flip(array(0, 'unused', 'used', 'overdue'));
        $list = UserService::Coupon($type_case[$type]);
        $this->assign('list', $list);
        $this->title = '优惠券';
        $this->display();
    }

    public function select_coupon ($order_id) {
        $coupons_list = UserService::SelectCoupon($order_id);

        $this->assign('back', $_SERVER['HTTP_REFERER']);
        $this->assign('coupons_list', $coupons_list);
        $this->display('User/use_coupon');
    }

    /**
     * 可用的优惠券
     * @param $goods_id int 商品id
     */
    public function available_coupon ($goods_id) {
        $coupons_list = UserService::AvailableCoupon($goods_id);

        $this->assign('back', $_SERVER['HTTP_REFERER']);
        $this->assign('coupons_list', $coupons_list);
        $this->display('User/use_coupon');
    }

    /**
     * 我的退货
     *
     */
    public function refund () {
        $this->checkLogin();
        $list = UserService::Refund();

        $refund_case = array('申请退款', '已提交申请', '正在审核', '退款被拒绝', '退款通过', '退款完成', '等待退款');
        $return_case = array('申请退货', '已提交申请', '正在审核', '退货被拒绝', '退货通过', '退货完成', '等待退货');


        foreach($list as &$item) {
            if($item['refund_status'] > 0) $item['refund_status_text'] = $refund_case[$item['refund_status']];
            if($item['return_status'] > 0) $item['refund_status_text'] = $return_case[$item['return_status']];
        }

        $this->assign('list', $list);
        $this->display();
    }

    /**
     * 订单支付
     * @param $order_id
     */
    public function order_pay ($order_id) {
        $this->checkLogin();

        $w = new WeixinAuthLogic();
        $access = $w->getWebAccess();

        if(!empty($access)) {
            $open_id = $access['openid'];

            if('cluster_order' == $order_id){
                $fields = S('fields');
                $fields['openid'] = $open_id;
                if(isset($fields['cluster_id']) && HotService::ClusterJoin($fields) || HotService::ClusterCreate($fields)){
                    $jsApiParameters = HotService::getResponseData();
                }else{
                    //TODO: 错误提示
                }
                $order_price = $fields['order_price'];
                $redirect_url = array('/User/Order/cluster/underway', '/Hot');
            }else{
                $order_detail = UserService::OrderDetail($order_id);

                $order_price = $order_detail['total_fee'];

                if(UserService::OrderPay($order_id, $open_id)){
                    $jsApiParameters = UserService::getResponseData();
                }
                $redirect_url = array('/User/Order/payed', '/Hot');
            }

            $this->assign('redirect_url', $redirect_url);
            $this->assign('order_price', $order_price);
            $this->assign('jsApiParameters', json_encode($jsApiParameters['data']));
            $this->title = "订单支付";
            $this->display();
        }else{
            S('fields', I('post.'));
        }
    }

    public function order_refund(){
        $this->checkLogin();
        if(IS_POST){
            if(UserService::OrderRefund()){
                returnJSON(1, '申请成功');
            }else{
                returnJSON(0, '申请失败');
            }
        }else{
            $type = I('get.type');
            $type_text = $type == 1 ? '退款' : $type == 2 ? '退货': '?';
            $this->assign('type', $type_text);
            $this->title = $type_text.'申请';
            $this->display();
        }

    }

    public function order_received ($order_id){
        if($this->checkLogin(1)){
            if(UserService::Received($order_id)){
                returnJSON(1, '已确认收货');
            }else{
                returnJSON(0, '确认失败');
            }
        }else{
            returnJSON(0, '用户未登录', -5);
        }
    }

    public function order_logistics ($order_id) {
        $this->checkLogin();
        $this->title = '物流跟踪';
        UserService::Logistics($order_id);
        $data = UserService::getResponseData()['data'];
        $state_text_case = array('暂无物流状态', '暂无物流状态', '在途中', '已签收', '问题件');
        $data['state_text'] = $state_text_case[$data['State']];
        $this->assign('data', $data);
        $this->display();
    }
}