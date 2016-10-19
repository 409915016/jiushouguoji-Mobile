var get = function (name) {
    return document.querySelector(name);
}

var getAll = function (name) {
    return document.querySelectorAll(name);
}


/******************

就手收到订单弹出层

getOrderMsg(imgURL, second, province);

imgURL : imgURL

second : number

province : String

*****************/

var getOrderMsg = function (imgURL, second, province) {

    var get_order = document.querySelector("#get-order");
    var imgURL = arguments[0] ? arguments[0] : "http://www.atool.org/placeholder.png?size=40x40&bg=fff";
    var second = arguments[1] ? arguments[1] : "8";
    var province = arguments[2] ? arguments[2] : "广东";
    //imgURL
    var get_order_img = document.querySelector(".get-order-imgBox img");
    get_order_img.attributes[0].nodeValue = imgURL;
    //second
    var get_order_second = document.querySelector(".get-order-second");
    get_order_second.innerHTML = second;
    //province
    var get_order_province = document.querySelector(".get-order-province");
    get_order_province.innerHTML = province;
    //display
    //get-order get-order-animated-set get-order-animated
    get_order.classList.add('get-order-animated-set');
    get_order.classList.add('get-order-animated');

    get_order.addEventListener("webkitAnimationEnd", function () {
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");
    })

    get_order.addEventListener("animationend", function () {
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");


    })
    get_order = null;
}




/******************

我的页面 到 我的订单跳转

设置 Cookie

*****************/

function myOrderNav(navNum) {
    document.cookie = "myOrderNav=" + navNum;
}

/******************

消息弹出层

baseMsg(String);

*****************/

var baseMsg = function (String) {
    layer.open({
        className: 'base-msg-pop',
        content: String,
        time: '2',
        shade: false
    })
}


/******************

首页返回顶部

SrolltoTop();

*****************/
var SrolltoTop = function () {
    // reference to stackoverflow 
    // http://stackoverflow.com/questions/14249998/jquery-back-to-top
    // hide #back-top first
    $("#back-to-top").hide();
    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $("#back-to-top").show(100);

            } else {
                $("#back-to-top").hide(100);
            }
        });

        // scroll body to 0px on click
        $("#back-to-top").click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 220);
            return false;
        });
    });

}


$(document).ready(function () {

    //首页返回顶部
    SrolltoTop();

    //左边铃铛

    $(".search-bar-menu").hide();
    $(".search-bar-more").click(function () {
        $(".search-bar-menu").toggle("show");
    });

    $(".main-wrapper").click(function () {
        $(".search-bar-menu").hide();
    });

    //优惠券 页面切换
    //通用组件
    //选择器与页面同级
    $('.switch-wrapper').hide();
    $('.switch-wrapper').eq($('.nav-bar li').index($('.nav-bar li.active'))).show();
    $('.nav-bar li').click(function () {
        var _this = $(this);
        $('.nav-bar li').removeClass('active');
        _this.addClass('active');
        $('.switch-wrapper').hide();
        $('.switch-wrapper').eq($('.nav-bar li').index(_this)).show();
    });



    //评论页 页面切换
    $('.comment-single').hide();
    $('.comment-single').eq($('.comment-select > span').index($('.comment-select > span.active'))).show();
    $('.comment-select > span').click(function () {
        var _this = $(this);
        $('.comment-select > span').removeClass('active');
        _this.addClass('active');
        $('.comment-single').hide();
        $('.comment-single').eq($('.comment-select > span').index(_this)).show();
    });



    $(".has-shop-count ul li").on("click", function () {
        console.log(this);
        var all_li = $(".has-shop-count li");
        var this_li = this;
        var li_index = $(this).index() + 1;
        console.log(li_index);
        myOrderNav(li_index);
        console.log("设置cookie成功");
        window.location.href = "myOrder.html";
    })





    //getOrderMsg(imgURL, second, province);
    getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");


    function timer() {
        getOrderMsg();
        baseMsg("加入购物车成功");
        setTimeout(timer, 7000);
    }

    timer();



});