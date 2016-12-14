
//搜索页关闭 在成功弹出搜索页之后调用
function search_wrapper_close() {
    //禁止页面滑动
    //body.preventDefault();
    get(".layui-m-layermain .search-bar-back").addEventListener("click", function () {
        layer.closeAll();
        window.scrollTo(0, 0);
    })
}

var search_wrapper = get(".product-search-wrapper").innerHTML;
//点击假的搜索栏 弹出页面
get(".fake-product-search").addEventListener("click", function () {
    layer.open({
        type: 1,
        content: search_wrapper,
        anim: false,
        style: 'position:fixed; top:0; left:0; width: 100%; height: 100%; padding:10px 0; border:none;',
        success: search_wrapper_close,
    });
    //页面弹出后获取输入焦点
    var search_keyword = $(".layui-m-layermain #product-search");
    search_keyword.focus();
    search_keyword.keyup(function () {
        //console.log(this.value);
    });
})

//加载后再设置文字大小
$("body > div.wrapper > div.nav-bar > ul > li > a").css("font-size", "14px");


//顶部导航
$(".nav-bar ul li").removeClass("active");
$(".nav-bar ul li:first-child").addClass("active");
$(".nav-buttom-bar ul li a i").removeClass("active");
$(".nav-buttom-bar ul li:first-child a i").addClass("active");
//首页返回顶部
SrolltoTop();
//左边铃铛点击弹出下拉菜单
//$(".search-bar-menu").hide();
$(".search-bar-more").click(function () {
    $(".search-bar-menu").fadeToggle("fast", "linear");
});
$(".main-wrapper").click(function () {
    $(".search-bar-menu").hide();
});


var goods_recommend = [];
$.getJSON('js/goods.json', function (data){

    switch (data.status) {

        case 1 : {
            console.table(data.data);
            var t = data.data;
            //data.data each
            $(t).each(function (i ,element) {
                var i = {};
                //var m = ['id', 'name','price','image'];

                i.id = element.id;
                i.name = element.name;
                i.price = element.price;
                i.image = element.image;
                goods_recommend.push(i);

            })
            console.table(goods_recommend);
        }
    }


    if(data.status == 1) {


    }



})
