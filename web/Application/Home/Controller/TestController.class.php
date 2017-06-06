<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/29
 * Time: 10:50
 */

namespace Home\Controller;


use Home\Logic\MainLogic;
use Home\Logic\WeixinAuthLogic;
use Home\Service\HotService;
use Home\Service\MainService;
use Home\Service\UserService;
use Org\Mysteries\Teleport;
use Thenbsp\Wechat\OAuth\AccessToken;
use Think\Controller;

class TestController extends Controller {
    private static $val = '';

    public function test(){
        $a = new WeixinAuthLogic();
        $aa = $a->get_user_info();
        var_dump($aa);
    }

    public function test1(){
        Teleport::pop();
        $a = cookie('Destination');
        var_dump($a);
    }

    public function test2(){
        echo Teleport::history();
    }

    /**
     * @return string
     */
    public static function getVal () {
        if(empty(self::$val)){
            self::check_val();
        }
        return self::$val;
    }

    /**
     * @param string $val
     */
    public static function setVal ($val) {
        self::$val = $val;
    }

    public function set_the_val(){
        self::setVal('123123123');
        cookie('c_val', self::getVal());
    }

    public function check_val(){
        self::set_the_val();
    }



    public function openid_test () {
        $w = new WeixinAuthLogic('http://test.jiushouguoji.com/test');
        $w::getOpenID();
    }

    public function ha ($a) {
        $str =  $a && 'e';
        var_dump($str);
    }
    public function weixin_api_test(){
        $WeixinAuth = new WeixinAuthLogic();

        $this->ticket = $WeixinAuth::getTicket();
        $this->nonce = $WeixinAuth::getNonce();
        $this->timestamp = $WeixinAuth::getTimestamp();
        $this->url = 'http://' . $_SERVER['HTTP_HOST'] .'/'. $_SERVER['PATH_INFO'];
        $this->signature = $WeixinAuth::getSignature();

        $this->display('Test/test');
    }

    public function broadcast_test () {
        $html = "
            <!doctype html>
            <html lang='en'>
            <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <title>test web socket</title>
            </head>
            <body>
                <ul id='broadcast'></ul>
            </body>
            <script>
                var view_list = document.getElementById('broadcast');
                var view_list_item = function(data){
                    var elm_li = document.createElement('li');
                    var elm_span = document.createElement('span');
                    var t_node = document.createTextNode(data);
                    elm_span.appendChild(t_node);
                    elm_li.appendChild(elm_span);
                    return elm_li;
                }
                var ws_init = function(){
                    var ws = new WebSocket('ws://www.jiushouguoji.com:7272');
                    ws.onopen = function(){
                        view_list.appendChild(view_list_item('state-open'));
                    }
                    ws.onmessage = function(e){
                        console.log('state-onmessage');
                        view_list.appendChild(view_list_item(e.data));
                        if(e.data['type']=='ping'){
                            ws.send('{\"type\":\"pong\"}');
                        }
                    }
                    ws.onclose = function(){
                        view_list.appendChild(view_list_item('state-close'));
                        ws = ws_init();
                    }
                }
                ws_init();
            </script>
            </html>
        ";
        $this->show($html);
    }
    public function test_get(){
        var_dump(I('get.'));
    }
}