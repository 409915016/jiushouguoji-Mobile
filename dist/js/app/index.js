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
//传入字符串，返回DOM
function parseDom(arg) {
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;
};
//定时执行检查函数的id
var loadingCheckerId;
var searchWrapperisOn = 0;

var loadingP = $('.indexLoadingP');

var offset = $('#offset');
var docheight = $('#docheight');
var winheight = $('#winheight');

//进度条顶部偏移
var scrollTop = $(this).scrollTop();
//文档高度
var scrollHeight = $(document).height();
//当前窗口高度
var windowHeight = $(this).height();

var isPostP = $('#isPostP');

var countP = $('#count');

var LoadingPx = parseInt($(document).height() / 3);

var canRequest = true;

var PageValue = 1;
var MaxPage = 50;
var MinPage = 1;

//每次加载的数量
var NumOfPage = 6;

//本地获取到的商品数据
var goods_recommend = [];
var Height_minus = ( $(document).height() - $(this).height() - $(this).scrollTop() );

function scrollCheck() {
    var canPost = false;
    //偏移
    offset.text($(this).scrollTop());
    //文档长度
    docheight.text($(document).height());
    //窗口高度
    winheight.text($(this).height());
    //文档与窗口差值
    Height_minus = ( $(document).height() - $(this).height() - $(this).scrollTop() );
    countP.text(Height_minus);

    (Height_minus < LoadingPx) ? canPost = true : canPost = false;
    return canPost;

}

function InsertToDoc() {

    if ( (scrollCheck()) && canRequest && (!searchWrapperisOn)) {
        canRequest = false;
        getData(randomNum(MinPage, MaxPage), NumOfPage);
        isPostP.text("■");
        var loadingP = $('.loadingP');
        //加入DOM文档
        //从当前加载位置开始 到加载个数阀值停止
        for (var i = 0; i < NumOfPage; i++) {
            var goods_url = goods_recommend[i].url;
            var goods_imgURL = goods_recommend[i].image;
            var goods_name = goods_recommend[i].name;
            var goods_price = goods_recommend[i].price;
            var goods_stock = goods_recommend[i].stock;
            //判断无货
            if (goods_stock == 0) {
                var html_temp = '<div class="single-goods">' + '<a href="' + goods_url + '">' + '<div class="product-imgBox soldout">' +
                    '<img src="' + goods_imgURL + '" alt=""> ' + '</div>' + '<div class="product-name-price">' +
                    '<p>' + goods_name + '</p>' + '<p>¥<span>' + goods_price + '</span></p>' + '</div>' + '</a>' + '</div>';

            } else {
                //有货
                var html_temp = '<div class="single-goods">' + '<a href="' + goods_url + '">' + '<div class="product-imgBox">' +
                    '<img src="' + goods_imgURL + '" alt=""> ' + '</div>' + '<div class="product-name-price">' +
                    '<p>' + goods_name + '</p>' + '<p>¥<span>' + goods_price + '</span></p>' + '</div>' + '</a>' + '</div>';

            }
            $(parseDom(html_temp)).insertBefore(".indexLoadingP");

        }
        canRequest = true;
    } else {
        isPostP.text("□");
    }

}

function getData(p, n) {
    var num = n;
    var page = p;
    var PostUrl = 'http://wap.jiushouguoji.com/rcm?page=' + page + '&n=' + num;
    $.getJSON(PostUrl, function (data) {
        switch (data.status) {
            case 1 : {
                var t = data.data;
                //每次过来要清空数组
                goods_recommend.splice(0, goods_recommend.length);
                //data.data each
                $(t).each(function (i, element) {
                    var i = {};
                    i.url = element.url;
                    i.name = element.name;
                    i.price = element.price;
                    i.image = element.image;
                    i.stock = element.stock;
                    goods_recommend.push(i);

                });
                //成功获取 1 次后 PageValue 要增加
                PageValue += 1;
            }
        }
        if (data.status == 1) {
        }
    })
}

function loadingChecker() {
    InsertToDoc();
    setTimeout('loadingChecker()', 250);
}

$(document).ready(function () {
    getData(randomNum(MinPage, MaxPage), NumOfPage);
    loadingCheckerId = setTimeout('loadingChecker()', 1300);
});



