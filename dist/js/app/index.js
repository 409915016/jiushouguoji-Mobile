
//搜索页关闭 在成功弹出搜索页之后调用
function search_wrapper_close() {
    //禁止页面滑动
    //body.preventDefault();
    get(".layui-m-layermain .search-bar-back").addEventListener("click", function () {
        layer.closeAll();
        window.scrollTo(0, 0);
    })
}



//传入字符串，返回DOM
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;

};



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
//


var offset = $('#offset');
var docheight = $('#docheight');
var winheight = $('#winheight');

//进度条顶部偏移
var scrollTop = $(this).scrollTop();
//文档高度
var scrollHeight = $(document).height();
//当前窗口高度
var windowHeight = $(this).height();

var isPostP =  $('#isPostP');

var countP =  $('#count');

var isPostPx = 600;

var isPost = true;

var PageValue = 1;

//每次加载的数量
var OnesLodingNum = 6;
//当前加载的位置
var LodingNumFlag = 0;


//本地获取到的商品数据
var goods_recommend = [];

var Height_minus = ( $(document).height() - $(this).height() - $(this).scrollTop() );

function scrol_test() {
    //偏移
    offset.text($(this).scrollTop());
    //文档长度
    docheight.text($(document).height());
    //窗口高度
    winheight.text($(this).height());
    Height_minus = ( $(document).height() - $(this).height() - $(this).scrollTop() );
    countP.text(Height_minus);
    if ( (Height_minus < isPostPx) && isPost ){

        getData(PageValue, OnesLodingNum);
        isPost = false;
        isPostP.text("■");
        var tepWrapper = $(".loading-more")[0];
        //加入DOM文档
        //从当前加载位置开始 到加载个数阀值停止
        for (var i = 0; i < OnesLodingNum ; i++)
        {
            console.log(goods_recommend);
            console.log(LodingNumFlag);
            var goods_url = goods_recommend[i].url;
            var goods_imgURL = goods_recommend[i].image;
            var goods_name = goods_recommend[i].name;
            var goods_price = goods_recommend[i].price;

            var html_temp = '<div class="single-goods">' + '<a href="' + goods_url + '">' + '<div class="product-imgBox">' +
                '<img src="' + goods_imgURL + '" alt=""> ' + '</div>' + '<div class="product-name-price">' +
                '<p>' + goods_name + '</p>' + '<p>¥<span>' + goods_price + '</span></p>' + '</div>' + '</a>' + '</div>';

            $( parseDom(html_temp)).appendTo(tepWrapper);

        }
        isPost = true;
    } else  {
        isPostP.text("□");
    }

}

function getData(p , n) {
    var num = n;
    var page = p;
    var PostUrl = 'http://wap.jiushouguoji.com/rcm?page=' + page + '&n=' + num ;
    $.getJSON(PostUrl, function (data){
        switch (data.status) {
            case 1 : {
                //console.table(data.data);
                var t = data.data;
                //data.data each
                //每次过来要清空数组
                goods_recommend.splice(0,goods_recommend.length);
                //console.table(goods_recommend);
                $(t).each(function (i ,element) {
                    var i = {};
                    //var m = ['id', 'name','price','image'];
                    i.url = element.url;
                    i.name = element.name;
                    i.price = element.price;
                    i.image = element.image;
                    goods_recommend.push(i);

                })
                //console.table(goods_recommend);
                //成功获取一次后 PageValue 要增加

                PageValue += 1;
            }
        }

        if(data.status == 1) {
        }
    })
}

function loadingChecker() {
    scrol_test();
    setTimeout('loadingChecker()', 100)
}


$(document).ready(function(){
    getData();
    loadingChecker();

});

