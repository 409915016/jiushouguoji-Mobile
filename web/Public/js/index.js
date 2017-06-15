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

var RCMcanRequest = true;
var SearchcanRequest = true;

var PageValue = 1;
var SearchPageValue = 2;
var MaxPage = 50;
var MinPage = 1;

//首页推荐每次加载的数量
var NumOfPage = 6;
var SearchNumOfPage = 20;//后端规定20

//本地获取到的商品数据
var goods_recommend = [];
var goods_search = [];
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
//精品加载更多
function RCMInsertToDoc() {

    if ((scrollCheck()) && RCMcanRequest && (!searchWrapperisOn)) {
        canReqRCMcanRequestuest = false;
        RCMgetData(randomNum(MinPage, MaxPage), NumOfPage);
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

            //首页
            if ($(".loading-more").length) {
                //精品推荐添加到文档
                console.log("精品推荐添加到文档");
                $(parseDom(html_temp)).insertBefore(".indexLoadingP");
            }
        }
        RCMcanRequest = true;
    } else {
        isPostP.text("□");
    }

}

//精品推荐获取数据
function RCMgetData(p, n) {
    var num = n;
    var page = p;
    var PostUrl = '/rcm?page=' + page + '&n=' + num;
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
    })
}

//搜索结果添加到文档
function SearchInsertToDoc() {

    if ((scrollCheck()) && SearchcanRequest && (!searchWrapperisOn)) {
        SearchcanRequest = false;
        SearchgetData(SearchPageValue, SearchNumOfPage);
        //isPostP.text("■");
        //var loadingP = $('.loadingP');
        //加入DOM文档
        //从当前加载位置开始 到加载个数阀值停止
        for (var i = 0; i < SearchNumOfPage; i++) {
            var goods_url = goods_search[i].url;
            var goods_imgURL = goods_search[i].image;
            var goods_name = goods_search[i].name;
            var goods_price = goods_search[i].price;
            var goods_stock = goods_search[i].stock;
            //判断无货
            if (goods_stock == 0) {
                var html_temp = '<a href="' + goods_url + '" class="base-product-label">' + '<div class="label-product-imgBox soldout">' +
                    '<img src="' + goods_imgURL + '" alt=""> ' + '</div>' + '<div class="label-product-info">' +
                    '<p>' + goods_name + '</p>' + '<p>¥<span>' + goods_price + '</span></p>' + '</div>' + '</a>';

            } else {
                //有货
                var html_temp = '<a href="' + goods_url + '" class="base-product-label">' + '<div class="label-product-imgBox">' +
                    '<img src="' + goods_imgURL + '" alt=""> ' + '</div>' + '<div class="label-product-info">' +
                    '<p>' + goods_name + '</p>' + '<p>¥<span>' + goods_price + '</span></p>' + '</div>' + '</a>';
            }
            //搜索结果页
            if ($(".searchresult").length) {
                //搜索结果添加到文档
                console.log("搜索结果添加到文档");
                $(parseDom(html_temp)).insertBefore(".end-text");
            }
        }
        SearchcanRequest = true;
    } else {
        //isPostP.text("□");
    }

}

//搜索结果异步数据
function SearchgetData(p, n) {
    var page = p;
    var num = n;//后端规定20 无法改变
    var key = $(".base-nav-bar p[data-key]").data("key");
    var PostUrl = '/search_ajax?key=' + key + '&page=' + page;
    console.log(PostUrl);
    $.getJSON(PostUrl, function (data) {
        console.log(data);
        switch (data.status) {
            case 1 : {
                var t = data.data;
                //每次过来要清空数组
                goods_search.splice(0, goods_search.length);
                //data.data each
                $(t).each(function (i, element) {
                    var i = {};
                    i.url = element.url;
                    i.name = element.name;
                    i.price = element.price;
                    i.image = element.image;
                    i.stock = element.stock;
                    goods_search.push(i);
                });
                //成功获取 1 次后 SearchPageValue 要增加
                SearchPageValue += 1;
                //console.log(SearchPageValue);
            }
            case 0 : {


            }
        }
    })

}

function loadingChecker() {
    RCMInsertToDoc();
    SearchInsertToDoc();
    setTimeout('loadingChecker()', 250);
}

$(document).ready(function () {
    if ($(".loading-more").length) {
        RCMgetData(randomNum(MinPage, MaxPage), NumOfPage);
        SearchcanRequest = false;
    }
    if ($(".searchresult").length) {
        SearchgetData(SearchPageValue, SearchNumOfPage);
        RCMcanRequest = false;
    }
    loadingCheckerId = setTimeout('loadingChecker()', 1300);
});

