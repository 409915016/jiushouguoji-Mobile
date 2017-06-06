<?php
/**
 * Created by PhpStorm.
 * User: Yiming
 * Date: 2016/10/24
 * Time: 11:39
 */

/**
 * @param $arr
 * @return array
 */
function api_handel ($arr) {
    $result = array_keys($arr);
    foreach(array_keys(array_filter($arr, is_array)) as $item) $result[$item] = api_handel($arr[$item]);
    return array_unique($result);
}

function API ($api_name) {
    return C('API_HOST_NAME') . C($api_name);
}

/**
 * JSON返回方法
 * @param int    $status
 * @param string $massage
 * @param string $data
 */
function returnJSON ($data, $massage, $status) {
    if(is_array($data)){
        $response = $data;
    }else{
        $response['status'] = empty($status) ? !$data ? 0 : 1 : $status;
        $response['message'] = empty($massage) ? $response['status'] == 1 ? '操作成功' : '操作失败' : $massage;
        $response['data'] = $data;
    }
    header('Content-Type:application/json; charset=utf-8');
    exit(json_encode($response, JSON_UNESCAPED_UNICODE));
}

function console_log ($data, $table=false) {
    echo '<script>';
    echo 'console.';
    echo $table ? 'table':'log';
    echo '('. json_encode($data) .')';
    echo '</script>';
}
