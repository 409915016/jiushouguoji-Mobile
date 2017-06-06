<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/26
 * Time: 17:31
 */

namespace Home\Service;


use Home\Logic\MainLogic;
use Home\Logic\WeixinAuthLogic;
use Think\Log;

class UserService{
    const MY_COLLECT = 0;
    const MY_WISH = 1;
    const MY_ALERT = 2;

    const WEIXIN_NO_BIND = -3;

    private static $isLogin = false;
    public static $response_data = array();

    /**
     * @return array
     */
    public static function getResponseData()
    {
        return self::$response_data;
    }

    /**
     * @param array $response_data
     */
    public static function setResponseData($response_data)
    {
        self::$response_data = $response_data;
    }

    /**
     * @return int
     */
    public static function getIsLogin()
    {
        return self::$isLogin;
    }

    /**
     * @param int $isLogin
     */
    public static function setIsLogin($isLogin)
    {
        self::$isLogin = $isLogin;
    }

    public static function getMark () {
        $url = API('getMark');

        $response = MainLogic::getData($url);
        self::setResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function WaitingEvolution ($order_id) {
        $url = API('WaitingEvolution');
        $fields['order_id'] = $order_id;
        $response = MainLogic::getData($url, $fields);
        if($response['status'] == 1 && !$response['data']){
            return true;
        }else{
            return false;
        }
    }

    public function Login(){
        $url = API('Login');
        $fields = I('post.');

        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            self::setIsLogin(true);
            return true;
        }
        return false;
    }

    public static function weixin_login($union_id){
        $url = API('Login');
        $fields['username'] = $union_id;
        $fields['type'] = 5;

        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            self::setIsLogin(true);
            return true;
        }
        return false;
    }

    public static function Logout(){
        $url = API('Logout');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            self::setIsLogin(false);
            return true;
        }else{
            return false;
        }
    }

    public static function SMSVerify($mobile){
        $url = API('SMSVerify');
        $fields['mobile'] = $mobile;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function Register(){
        $url = API('Register');
        $fields = I('post.');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function ThirdBind () {
        $url = API('ThirdBind');
        $fields = I('post.');
        $fields['type'] = 1; //weixin: 1, QQ: 2

        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function Info(){
        $url = API('UserInfo');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function Favorites($type){
        $url = API('Favorites');
        $fields['type'] = $type;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function ResetPassword(){
        $url = API('ResetPassword');
        $fields = I('post.');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function UserOrder($status){
        $url = API('Order');
        $fields['type'] = $status;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }
    }

    public static function OrderDetail($id){
        $url = API('OrderDetail');
        $fields['order_id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }
    }

    public static function OrderCancel($id){
        $url = API('OrderCancel');
        $fields['order_id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function GetDistrict($id){
        $url = API('GetDistrict');
        $fields['id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){

            return $response['data'];
        }
    }

    public static function AddressList(){
        $url = API('AddressList');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }
    
    public static function AddressAdd(){
        $url = API('AddressAdd');
        $fields = I('post.');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }
    
    public static function AddressSetDefault($id){
        $url = API('AddressSet');
        $fields['id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return $response['data'];
        }else{
            return false;
        }
    }
    
    public static function AddressDelete($id){
        $url = API('AddressDel');
        $fields['id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }
    
    public static function GetAddress($id){
        $url = API('AddressGet');
        $fields['id'] = $id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return $response['data'];
        }else{
            return false;
        }
    }

    public static function Footprint($p, $n){
        $url = API('Footprint');

        $fields['p'] = $p;
        $fields['n'] = $n;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function Coupon($type){
        $url = API('Coupon');
        $fields['type'] = $type;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function SelectCoupon ($order_id) {
        $url = API('SelectCoupon');
        $fields['order_id'] = $order_id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function OrderComment(){
        $url = API('OrderComment');
        $fields['jsonData'] = ''. json_encode(I('post.'));
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }
    public static function Edit($data){
        $url = API('UserEdit');
        $fields = !$data ? I('post.') : $data;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function Refund(){
        $url = API('Refund');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function cart(){
        $url = API('Cart');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function CartEdit($id, $n){
        $url = API('CartEdit');
        $fields['id'] = $id;
        $fields['n'] = $n;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function CartDel($id, $goods_id){
        $url = API('CartDel');
        $fields['id'] = $id;
        $fields['goods_id'] = $goods_id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function CartAdd($goods_id, $n){
        $url = API('CartAdd');
        $fields['goods_id'] = $goods_id;
        $fields['n'] = $n;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function CartStatus($id, $status){
        $url = API('CartEditStatus');
        $fields['id'] = $id;
        $fields['status'] = $status;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);

        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function CreateOrder(){
        $url = API('CreateOrder');
        $response = MainLogic::getData($url);
        self::setResponseData($response);

        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function ConfirmOrder($address_id, $massage){
        $url = API('ConfirmOrder');
        $fields['address_id'] = $address_id;
        $fields['massage'] = $massage;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function OrderPay($order_id, $open_id, $coupon_num){
        $url = API('Pay');

        $fields['openid'] = $open_id;
        $fields['channel'] = 5;
        $fields['order_id'] = $order_id;
        $fields['coupon_num'] = $coupon_num;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function AvailableCoupon ($goods_id) {
        $url = API('AvailableCoupon');
        $fields['goods_id'] = $goods_id;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function ClusterList ($type, $page, $n) {
        $url = API('GetClusterList');
        $fields['type'] = $type;
        $fields['page'] = $page;
        $fields['n'] = $n;
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            $data = $response['data'];
            return $data;
        }else{
            return false;
        }
    }

    public static function OrderRefund () {
        $url = API('OrderRefund');
        $fields = I('post.');
        $response = MainLogic::getData($url, $fields);
        self::setResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function Received ($order_id) {
        $url = API('Received');
        $fields['order_id'] = $order_id;
        $response = MainLogic::getData($url, $fields);
        self::getResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }

    public static function Logistics ($order_id) {
        $url = API('Logistics');
        $fields['order_id'] = $order_id;
        $response = MainLogic::getData($url, $fields);
        self::getResponseData($response);
        if($response['status'] == 1){
            return true;
        }else{
            return false;
        }
    }
}