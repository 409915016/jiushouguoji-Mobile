<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/24
 * Time: 17:04
 */

namespace Home\Logic;


use Think\Log;

class MainLogic{

    /**
     * 获取API数据的方法
     * @param $url
     * @param string $fields
     * @param int $chanel
     * @return mixed
     */
    public static function getData($url, $fields='', $chanel=0){
        $ch = curl_init();

        $fields['token'] = session_id();
        $fields['chanel'] = $chanel > 0 ? $chanel : 'wap';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        $response = curl_exec($ch);
        curl_close($ch);
        Log::record(''.json_encode($fields), 'DevLog');
        return json_decode($response, true);
    }

    public static function simple_curl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if(substr($url, 0, 8) == "https://"){
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https请求 不验证证书
        }

        $response = curl_exec($ch);
        curl_close();
        return json_decode($response, true);
    }

}