var getOrderMsg = function (imgURL, second, province) {

    var get_order = document.querySelector("#get-order");

    var imgURL = arguments[0] ? arguments[0] : "http://www.atool.org/placeholder.png?size=40x40&bg=fff";
    var second = arguments[1] ? arguments[1] : "8";
    var province = arguments[2] ? arguments[2] : "广东";


    //get-order get-order-animated-set get-order-animated
    //imgURL
    var get_order_img = document.querySelector(".get-order-imgBox img");
    //var get_order_img_url= $(get_order_img_url);
    get_order_img.attributes[0].nodeValue = imgURL;
    //console.log(get_order_img);
    //second
    var get_order_second = document.querySelector(".get-order-second");
    // var get_order_second = $(get_order_second);
    get_order_second.innerHTML = second;
    //console.log(get_order_second);
    //province
    var get_order_province = document.querySelector(".get-order-province");
    //var get_order_province = $(get_order_province);
    get_order_province.innerHTML = province;
    //console.log(get_order_province);

    //display

    get_order.classList.add('get-order-animated-set');
    get_order.classList.add('get-order-animated');

    get_order.addEventListener("webkitAnimationEnd", function(){
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");

        //getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");
    })

    get_order.addEventListener("mozAnimationEnd", function(){
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");

        //getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");
    })

    get_order.addEventListener("MSAnimationEnd", function(){
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");

        //getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");
    })


    get_order.addEventListener("oanimationend", function(){
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");

        //getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");
    })

    get_order.addEventListener("animationend", function(){
        this.classList.remove("get-order-animated-set");
        this.classList.remove("get-order-animated");

        //getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");
    })




    //get_order.style.opacity  = 1;
    //get_order.style.display = "flex";

    get_order = null;
}



$(document).ready(function () {
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



    //我的页面 到 我的订单跳转
    function myOrderNav(navNum) {
        document.cookie = "myOrderNav=" + navNum;
    }
    //$(".has-shop-count ul li").click = function() {
    //console(this);
    //myOrderNav(1);
    // }

    var get = function (name) {
        return document.querySelector(name);
    }

    var getAll = function (name) {
        return document.querySelectorAll(name);
    }

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
        //var test = document.querySelector(".big-banner-imgBox").outerHTML;

    var String_test = "消息测试";
    //弹出层

    var baseMsg = function (String) {
            layer.open({
                className: 'base-msg-pop',
                content: String,
                time: '1.5',
                shade: false
            })
        }
        //baseMsg(String_test);



    //getOrderMsg(imgURL, second, province);
    getOrderMsg("http://www.atool.org/placeholder.png?size=50x50&bg=fff", 10, "黑龙江");


    function timer() {
        getOrderMsg();
        setTimeout(timer, 7000);
    }

    timer();
    


});