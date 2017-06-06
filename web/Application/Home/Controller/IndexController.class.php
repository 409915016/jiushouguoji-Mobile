<?php
namespace Home\Controller;

use Home\Logic\MainLogic;
use Home\Logic\WeixinAuthLogic;
use Home\Service\HotService;
use Home\Service\MainService;
use Org\Mysteries\Teleport;
use Think\Controller;

/**
 * Class IndexController
 * @property string title
 * @package Home\Controller
 */
class IndexController extends Controller {

    private $title = '';

    /**
     * weixin api
     *
     */
    public function weixin_api(){
        $WeixinAuth = new WeixinAuthLogic();
        try{
            $wxcfg = $WeixinAuth->getJsApi();
        }catch(\Exception $e){
            $wxcfg = '';
        }
        $this->wx_config = $wxcfg;
    }

    /**
     * 首页
     */
    public function index () {
        $this->weixin_api();

        Teleport::clear();
        $m = new Teleport();
        $m->save();

        $nav = MainService::getNav();
        $this->assign('top_nav', $nav);
        //获得当前导航
        $nav_current = I('get.nav') ? I('get.nav') : 0;
        $this->assign('nav_current', $nav_current);

        //获取专场信息
        $activity = MainService::getActivity($nav[$nav_current]['id']);
        $this->assign('brand', $activity);

        //获取推荐商品
        $goods = MainService::goodsList();
        $this->assign('goods', $goods);

        $hot = MainService::getHotWord();
        $this->assign('hot', $hot);

        $this->title = '就手国际 - 全球正品大集会';
        $this->display('home');
    }

    /**
     * 活动专场页面
     * @param $aid
     */
    public function activity ($aid) {
        Teleport::clear();
        $m = new Teleport();
        $m->save();

        $act = MainService::getActivityGoods($aid);

        $this->assign('act', $act);
        $this->title = '就手国际 - 全球正品大集会';
        $this->display();
    }

    /**
     * 商品详情页面
     * @param $id
     */
    public function goodsDetail ($id) {
        $this->weixin_api();

        //商品详情
        if(!$detail = MainService::goodsDetail($id)){
            $this->error("没有id为{$id}的商品, 再看看别的吧! ");
        }
        $this->assign('detail', $detail);

        $has_cluster = $detail['cluster'] > 0 ? 1 : 0;
        $this->assign('has_cluster', $has_cluster);
        //是否有拼团
        //if($has_cluster){
            $member_list = HotService::ClusterList($detail['id']);
            $this->assign('member_list', $member_list);
        //}

        //推荐商品
        $related = MainService::relatedGoods($id);
        $this->assign('related_goods', $related);
        //评论
        $comments = MainService::getGoodsComments($id);
        $this->assign('comments', $comments);


        $this->title = $detail['name'];
        $this->display('goods_detail');
    }

    public function collect ($id, $act) {
        if(UserController::checkLogin(1)){
            $act == 'add'
                ? MainService::FavoritesAdd($id, MainService::FAVORITES_COLLECT)
                ? returnJSON(1, '已添加收藏')
                : returnJSON(0, '收藏重复')
                : $act == 'cancel'
                ? MainService::FavoritesCancel($id, MainService::FAVORITES_COLLECT)
                    ? returnJSON(1, '已取消收藏')
                    : returnJSON(0, '请添加收藏')
                : returnJSON(0, $act . '? 那是什么?');
        }else{
            returnJSON(0, '请先登录', -5);
        }
    }

    public function wish ($id, $act) {
        if(UserController::checkLogin()){
            $act == 'add'
                ? MainService::FavoritesAdd($id, MainService::FAVORITES_WISH)
                ? returnJSON(1, '已添加心愿单')
                : returnJSON(0, '心愿单重复')
                : $act == 'cancel'
                ? MainService::FavoritesCancel($id, MainService::FAVORITES_WISH)
                    ? returnJSON(1, '已取消心愿单')
                    : returnJSON(0, '请添加心愿单')
                : returnJSON(0, $act . '? 那是什么?');
        }else{
            returnJSON(0, '请先登录', -5);
        }
    }

    public function alert ($id, $act) {
        if(UserController::checkLogin(1)){
            $act == 'add'
                ? MainService::FavoritesAdd($id, MainService::FAVORITES_ALERT)
                ? returnJSON(1, '已添加到货提醒')
                : returnJSON(0, '到货提醒重复')
                : $act == 'cancel'
                ? MainService::FavoritesCancel($id, MainService::FAVORITES_ALERT)
                    ? returnJSON(1, '已取消到货提醒')
                    : returnJSON(0, '请添加到货提醒')
                : returnJSON(0, $act . '? 那是什么?');
        }else{
            returnJSON(0, '请先登录', -5);
        }
    }

    public function goodsComments ($id) {
        if(IS_AJAX){
            $data = MainService::getGoodsComments($id, I('get.page'));
            if(count($data) > 0){
                returnJSON(['data'=>$data,'status'=>1]);
            }else{
                returnJSON(0);
            }
        }

        $comments = MainService::getGoodsComments($id);

        $comments_info = MainService::getGoodsEvaluationInfo($id);

        $this->assign('comments_info', $comments_info);
        $this->assign('comments', $comments);
        $this->title = '评论详情';
        $this->display('comment');
    }


    public function getDistrict ($id) {
        $url = API('GetDistrict');
        $fields['id'] = $id;
        $response = MainLogic::getData($url, $fields);
        if($response['status'] == 1) {
            $data = array_column($response['data'], 'name', 'id');
            returnJSON($data);
        } else {
            var_dump($response);
        }
    }

    public function autoWord ($word) {
        returnJSON(MainService::autoWord($word));
    }

    public function searchGoods ($word) {
        $result = MainService::searchGoods($word,1);
        $this->assign('list', $result);

        $this->assign('keyword', $word);

        if (empty($result)){
            //获取推荐商品
            $goods = MainService::goodsList();
            $this->assign('goods', $goods);
        }

        $this->display('search_result');
    }

    public function searchGoodsAjax(){
        $get = I('get.');
        $goods = MainService::searchGoods($get['key'],$get['page']);

        $result = array();
        foreach($goods as $item){
            $result[] = array(
                'url' => "/detail/{$item['id']}",
                'name' => $item['name'],
                'price' => $item['price'],
                'image' => $item['image'],
                'stock' => $item['stock']
            );
        }

        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode(array('status'=>1, 'data' => $result, 'message' => 'success'), JSON_UNESCAPED_UNICODE));
    }
}