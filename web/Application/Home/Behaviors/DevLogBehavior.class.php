<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/12/1
 * Time: 16:58
 */

namespace Home\Behaviors;


use Think\Behavior;
use Think\Log;

class DevLogBehavior extends Behavior {

    /**
     * 执行行为 run方法是Behavior唯一的接口
     * @access public
     * @param mixed $params 行为参数
     * @return void
     */
    public function run (&$params) {
        Log::record('Dev log : '.$params, 'INFO');
    }
}