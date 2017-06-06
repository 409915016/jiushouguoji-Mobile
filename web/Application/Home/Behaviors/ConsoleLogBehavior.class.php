<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/11/22
 * Time: 11:45
 */

namespace Home\Behaviors;


use Think\Behavior;

class ConsoleLogBehavior extends Behavior {

    /**
     * 执行行为 run方法是Behavior唯一的接口
     * @access public
     * @param mixed $params 行为参数
     * @return void
     */
    public function run (&$params) {
        $controllers = array('Index', 'Hot', 'User');

        foreach($controllers as $ctrl){
            $ctrl = 'Home\\Controller\\'.$ctrl.'Controller';
            $log = empty($ctrl::getLog()) ? '' : $ctrl::getLog();
        }

        echo '<script>';
        echo 'console.log(' . json_encode($log) . ');';
        echo '</script>';

    }

    private static function log_array($arr){
        if(is_array($arr))
            foreach($arr as $i){
                if(self::log_array($i) == 'bottom'){
                    echo 'console.table(' .json_encode($arr). ');';
                }
            }
        return 'bottom';
    }
}