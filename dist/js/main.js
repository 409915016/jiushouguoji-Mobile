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
    get_order_img.src = imgURL;
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

function SetMyOrderNav(navNum) {

    //cookie
    //document.cookie = "myOrderNav=" + navNum;
    //localStorage
    localStorage.setItem("myOrderNav", navNum);

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

消息选择框

baseSelect(String);

*****************/

var baseSelect = function (String) {
    layer.open({
        className: 'user-touch-select',
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

/******************

用户退出

*****************/

function uesrExit() {
    //底部对话框
    layer.open({
        content: '你确定要退出登陆吗？',
        btn: ['退出', '取消'],
        skin: 'footer',
        yes: function (index) {
            baseMsg("退出成功");
            window.location.href = "index.html";
        }
    });
}


/******************
 
就手收到订单测试

*****************/


function TestgetOrderMsg() {
    getOrderMsg();
    baseMsg("加入购物车成功");
    setTimeout(timer, 7000);
}


/******************
 

设置产品详情页内 购物车按钮物品数量
 0 为不显示

*****************/

function setShopCarNum(num) {
    var shop_car_count = $(".product-nav-bar ul li:nth-child(2)")[0];
    shop_car_count.dataset.shopCount = num;
}

function shopCarNumAdd() {
    var shop_car_count = $(".product-nav-bar ul li:nth-child(2)")[0];
    var addNum = Math.abs(shop_car_count.dataset.shopCount) + 1;
    shop_car_count.dataset.shopCount = addNum;


}


$(document).ready(function () {

});




function shopcarTurnAround() {
    TurnAround_img = get("#TurnAround-img");
    imgSrc = get(".swiper-slide:first-child img").src;
    TurnAround_img.src = imgSrc;
    TurnAround_img.style.display = "block";
    TurnAround_img.classList.add("TurnAround-animated");
    TurnAround_img.classList.add("TurnAround-set");

    TurnAround_img.addEventListener("webkitAnimationEnd", function () {
        this.classList.remove("TurnAround-animated");
        this.classList.remove("TurnAround-set");
        this.style.display = "none";
    }, false);

    setTimeout(function () {
        shopCarNumAdd();
        baseMsg("加入购物车成功");
    }, 1000);



}




window.onload = function () {

    //console.log( get("#door-check").checked );


    // shopcar_checkbox = function () {


    // }



    // var alldoor = $(".shopcar-door");
    // console.log(alldoor);
    // alldoor.each(function(element, index) {
    //      console.log(index);



    //      index.addEventListener("click", function(){

    //      })
    // }, this);



    var all_checkbox = $(".shopcar-check-icon ");
    var all_checkbox_input = all_checkbox.find("input");
    var all_checkbox_label = all_checkbox.find("label");

    all_checkbox_input.each(function (element, index) {
        var temp = "check-num";
        //console.log(index);
        //console.log(element);
        $(index).attr('id', temp + element);
    });

    all_checkbox_label.each(function (element, index) {
        var temp = "check-num";
        //console.log(index);
        //console.log(element);
        $(index).attr('for', temp + element);
    });


}