<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/12/27
 * Time: 9:58
 */

namespace Home\Widget;


use Org\Mysteries\Teleport;
use Think\Controller;

class TeleportWidget extends Controller {
    public function port(){
        echo Teleport::history();
    }

    public function save(){
        $m = new Teleport();
        $m->save();
    }

    public function pop(){
        Teleport::pop();
    }

    public function lbo(){
        echo Teleport::lbo();
    }

    public function ls(){
        var_dump(cookie('Destination'));
    }
}