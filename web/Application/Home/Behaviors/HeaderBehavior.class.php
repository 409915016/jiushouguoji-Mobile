<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/26
 * Time: 11:44
 */

namespace Home\Behaviors;


use Think\Behavior;

class HeaderBehavior extends Behavior {

    /**
     * 执行行为 run方法是Behavior唯一的接口
     * @access public
     * @param mixed $params 行为参数
     * @return void
     */
    public function run (&$params) {
        $interval = 300;
        header("Pragma: private");
        header("Cache-Control:max-age=$interval, pre-check=$interval");
        header("Expires: " . gmdate("D, d M Y H:i:s",time()+$interval)." GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    }
}