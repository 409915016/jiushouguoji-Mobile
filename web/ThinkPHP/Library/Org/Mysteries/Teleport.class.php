<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/12/23
 * Time: 11:50
 */

namespace Org\Mysteries;


class Teleport {

    private $Destination = '';

    /**
     * Teleport constructor.
     * @param string $where
     */
    public function __construct ($where) {
        $this->Destination = !$where ? self::getCurrentUrl() : $where;
    }


    public function save () {
        $arr_address = cookie("Destination") ? cookie("Destination") : array();
        $arr_address = array_merge($arr_address, array($this->Destination));
        cookie("Destination", array_unique($arr_address), array('expire' => 3600));
    }

    public static function activate (){
        $arr_address = cookie("Destination");

        if($address = array_pop($arr_address)){
            cookie("Destination", $address);
            header("Location: {$address}");
        }else{
            header("Location: /home");
        }
    }

    public static function history (){

        if($address = array_pop(cookie("Destination"))){
            return $address;
        }else{
            return '/home';
        }
    }

    public static function pop (){
        $arr = cookie("Destination");
        array_pop($arr);
        cookie("Destination", $arr);
    }

    public static function clear () {
        cookie("Destination", null);
    }

    public static function lbo (){
        $d = cookie("Destination");
        array_pop($d);
        return end($d);
    }

    /**
     * 获取当前 URL
     */
    private function getCurrentUrl () {
        $protocol = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443))
            ? 'https://' : 'http://';

        return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    }

    /**
     * @return string
     */
    public function getDestination () {
        return $this->Destination;
    }

    /**
     * @param $where
     */
    public function setDestination ($where) {
        $this->Destination = $where ;
    }
}

