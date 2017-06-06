<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/28
 * Time: 18:42
 */

namespace Home\Logic;

use Doctrine\Common\Cache\FilesystemCache;
use Thenbsp\Wechat\OAuth\Client;
use Thenbsp\Wechat\Wechat\AccessToken;
use Thenbsp\Wechat\Wechat\Jsapi;

/**
 * Class WeixinAuthLogic
 * @package Home\Logic
 */
class WeixinAuthLogic {

    /**
     * @var string
     */
    private static $AppID = '';

    /**
     * @var string
     */
    private static $AppSecret = '';

    /**
     * @var string
     */
    private $CacheDriver = '';

    /**
     * @var string
     */
    public $AccessToken = '';

    /**
     * @var string
     */
    public $WebAccess = '';

    public $JsApi = '';


    /**
     * WeixinAuthLogic constructor.
     */
    public function __construct () {
        self::setAppID(C('Weixin_AppID'));
        self::setAppSecret(C('Weixin_AppSecret'));
        $this->setCacheDriver(new FilesystemCache('./Application/Runtime/Cache/File'));
    }

    /**
     *
     */
    public function check_jsapi () {
        $jsapi = new Jsapi(new AccessToken(self::getAppID(), self::getAppSecret()));

        $jsapi->setCache($this->getCacheDriver());
        foreach(['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] as $api){
            $jsapi->addApi($api);
        }
        //$jsapi->enableDebug();
        $json = $jsapi->getConfig();

        $this->setJsApi($json);
    }


    /**
     * 网页授权
     * @param $scope
     * @return \Thenbsp\Wechat\OAuth\AccessToken
     */
    public function check_web_access ($scope) {
        $client = new Client(self::getAppID(), self::getAppSecret());
        $code = I('get.code', false);
        if(!$code){
            $client->setScope($scope);
            header('Location: '.$client->getAuthorizeUrl());
        }else{
            $accessToken = $client->getAccessToken($code);

            $web_access = $accessToken->toArray();
            $this->setWebAccess($web_access);

            return $accessToken;
        }
        //
    }

    /**
     * @return mixed
     */
    public function get_user_info (){
        $accessToken = $this->check_web_access();

        if( !$accessToken->isValid() ) {
            $accessToken->refresh();
        }

        return $accessToken->getUser();
    }

    /**
     * @param $scope
     * @return string
     */
    public function getWebAccess ($scope) {
        if(empty($this->WebAccess)){
            $this->check_web_access($scope);
        }
        return $this->WebAccess;
    }

    /**
     * @param string $WebAccess
     */
    public function setWebAccess ($WebAccess) {
        $this->WebAccess = $WebAccess;
    }

    /**
     * global access token
     *
     */
    public function check_access_token () {
        $accessToken = new AccessToken(self::getAppID(), self::getAppSecret());

        if(empty($at = $accessToken->getCache())){

            $accessToken->setCache($this->getCacheDriver());
            $at = $accessToken->getTokenString();

        }

        $this->setAccessToken($at);

    }

    /**
     * @return string
     */
    public function getAccessToken () {
        if(empty($this->AccessToken)){
            $this->check_access_token();
        }
        return $this->AccessToken;
    }

    /**
     * @param string $AccessToken
     */
    public function setAccessToken ($AccessToken) {
        $this->AccessToken = $AccessToken;
    }

    /**
     * @return string
     */
    public static function getAppID () {
        return self::$AppID;
    }

    /**
     * @param string $AppID
     */
    public static function setAppID ($AppID) {
        self::$AppID = $AppID;
    }

    /**
     * @return string
     */
    public static function getAppSecret () {
        return self::$AppSecret;
    }

    /**
     * @param string $AppSecret
     */
    public static function setAppSecret ($AppSecret) {
        self::$AppSecret = $AppSecret;
    }

    /**
     * @return string
     */
    public function getJsApi () {
        if(empty($this->JsApi))
            $this->check_jsapi();
        return $this->JsApi;
    }

    /**
     * @param string $JsApi
     */
    public function setJsApi ($JsApi) {
        $this->JsApi = $JsApi;
    }

    /**
     * @return string
     */
    public function getCacheDriver () {
        return $this->CacheDriver;
    }

    /**
     * @param string $CacheDriver
     */
    public function setCacheDriver ($CacheDriver) {
        $this->CacheDriver = $CacheDriver;
    }


}