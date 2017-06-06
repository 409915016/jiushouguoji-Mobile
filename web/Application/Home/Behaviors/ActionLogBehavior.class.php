<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/12/1
 * Time: 17:05
 */

namespace Home\Behaviors;


use Think\Behavior;
use Think\Log;

class ActionLogBehavior extends Behavior {

    /**
     * 执行行为 run方法是Behavior唯一的接口
     * @access public
     * @param mixed $params 行为参数
     * @return void
     */
    public function run (&$params) {
        Log::record('Action: '.get_class($params), 'INFO');
    }
}