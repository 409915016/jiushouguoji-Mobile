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
    var imgURL = arguments[0] ? arguments[0] : "http://fakeimg.pl/100x100/fff/000?text=AB";
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


var NewOrderMsg = function (imgURL, text) {

    var get_order = document.querySelector("#get-order");
    var imgURL = arguments[0] ? arguments[0] : "http://fakeimg.pl/100x100/fff/000?text=AB";
    var second = arguments[1] ? arguments[1] : "就手国际7秒前收到来自北京的一张订单";
    //imgURL
    var get_order_img = document.querySelector(".get-order-imgBox img");
    get_order_img.src = imgURL;
    //second
    // var get_order_second = document.querySelector(".get-order-second");
    // get_order_second.innerHTML = second;
    //province
    // var get_order_province = document.querySelector(".get-order-province");
    // get_order_province.innerHTML = province;

    var get_order_text = document.querySelector("#get-order p");
    get_order_text.innerHTML = text;

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
        //弹出消息 css class
        className: 'user-touch-select',
        //显示字符
        content: String,
        //消息提示时间
        time: '2',
        //遮罩层
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
    //baseMsg("加入购物车成功");
    setTimeout('TestgetOrderMsg()', 7000);
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


/******************


 添加到购物车 动画逻辑

 *****************/

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


/******************

 检查注册密码是否重复
 返回
 true
 false
 *****************/

function check_password_retype() {
    var a = false;
    var i = get("#sign-password").value.trim();
    var j = get("#sign-password-retype").value.trim();
    var verify_lenth = 5;
    if ((i == j) && (i.toString().length > verify_lenth) && (j.toString().length > verify_lenth)) {
        a = true;
    } else {
        a = false;
    }
    return a;
}

/******************

 检查输入是否为空
 返回
 true
 false
 *****************/
function check_input_empty(inputElement) {
    var i = false;
    //var _this = this;

    var s = inputElement.value.trim();
    //console.log(s);
    if (s == "") {
        i = false;
    } else {
        i = true;
    }

    return i;


}


var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}


var goods_grade_value = function () {
    this.scores = 5;
    this.result = 3;
    this.content = "";
    this.isanonymous = 1;

}
var door_grade_value = function () {
    this.order_id = 13156165,
        this.desccredit = 5,
        this.servicecredit = 5,
        this.deliverycredit = 5
};


//商品评价
function set_goods_grade(HTMLDom) {
    //单件商品评价块
    var goods_DOM = $(HTMLDom)[0];
    //评价输入框
    var goods_contentDOM = $(goods_DOM).find("textarea")[0];
    var goods_result_rowDOM = $(goods_DOM).find(".add-comment-good")[0];
    var goods_result_DOM = $(goods_result_rowDOM).children(".comment-good");
    var icon_DOM = goods_result_DOM.children("i");
    var goods_id = goods_DOM.dataset.goodsId;
    //goods id 列表
    goodsid.push(goods_id);
    var data = new goods_grade_value();
    icon_init(icon_DOM);
    //用户文字评论
    var content_text;
    //用户文字评论
    $(goods_contentDOM).keyup(function (content_text) {
        content_text = goods_contentDOM.value.trim();
        data.content = content_text;
    })
    //好评
    $(goods_result_DOM).click(function (result_class) {
        var _this = $(this)[0];
        var _this_all = $(this).parent().children();
        var _icon = $(this).children("i");
        var num = $(_this_all).index(_this) + 1;
        data.result = num;
        commentPostData[goods_id] = data;
        icon_click(num, _this, result_class, icon_DOM);
    })

    //初始化icon
    function icon_init(iconAll) {
        $(iconAll).each(function (i) {
            // console.log(this);
            // console.log(i);
            if (i == 0) {
                $(this).addClass("good-gray");
            }
            if (i == 1) {
                $(this).addClass("not-good-gray");
            }
            if (i == 2) {
                $(this).addClass("bad-gray");
            }

        })
    }

    //激活icon
    function icon_click(i, iconWrap, result_class, iconAll) {
        // i 是传入的序号
        var iconDOM = $(iconWrap).children("i");
        icon_init(iconAll);
        if (i == 1) {
            iconDOM.removeClass("good-gray");
            iconDOM.addClass("good");
        }
        if (i == 2) {
            iconDOM.removeClass("not-good-gray");
            iconDOM.addClass("not-good");
        }
        if (i == 3) {
            iconDOM.removeClass("bad-gray");
            iconDOM.addClass("bad");
        }
    }

}
//商店评价
function set_door_grade(row_num, mark, orderid) {

    if (isNumber(row_num) && isNumber(mark)) {
        if (row_num == 1) {
            data.desccredit = mark;
        }
        if (row_num == 2) {
            data.servicecredit = mark;
        }
        if (row_num == 3) {
            data.deliverycredit = mark;
        }
        data.order_id = orderid
    }
    commentPostData["order"] = data;

}


/************
 *
 WebSocket 订单广播
 *
 **************/

var ws;

function connect() {
    // 创建websocket
    ws = new WebSocket("ws://www.jiushouguoji.com:7272");
    // 当有消息时根据消息类型显示不同信息
    ws.onmessage = onmessage;
    ws.onclose = function () {
        console.log("连接关闭，定时重连");
        connect();
    };
    ws.onerror = function () {
        console.log("出现错误");
    };
}

function onmessage(e) {
    //console.log(e);
    //console.log(e.data);

    var data = eval("(" + e.data + ")");
    switch (data['type']) {
        case 'BroadcastOrder':
            //console.log(data['content']);
            // console.log(data['content'].image);
            // console.log(data['content'].title);
            NewOrderMsg(data['content'].image, data['content'].title);
            break;
        case 'ping':
            ws.send('{"type":"pong"}');
            break;
    }
}

/***************
 *
 *拼团倒计时
 * *
 ****************/
function CountDown() {
    var countdown = $(".groupbuy-details-countdown");
    var hour = $(".countdown-h");
    var minute = $(".countdown-m");
    var second = $(".countdown-s");

    if (typeof(t) == "undefined") {
        console.log("没有设置时间");
        return;
    }
    if (t === 0) {
        console.log("时间到了");
        countdown.hide();
        return;
    } else {
        countdown.show();
    }

    t = t - 1;
    var d = Math.floor(t / 60 / 60 / 24);
    var h = Math.floor(t / 60 / 60 % 24);
    var m = Math.floor(t / 60 % 60);
    var s = Math.floor(t % 60);

    console.log(t);
    console.log(h + "时" + m + "分" + s + "秒");
    console.log(s.toString().length);

    if (s.toString().length == 1) {
        s = "0" + s;
    }
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    if (h.toString().length == 1) {
        h = "0" + h;
    }
    hour.text(h);
    minute.text(m);
    second.text(s);
}


/***************
 *
 *拼团倒计时设置函数
 * *
 ****************/
function SetCountDown(t) {
    window.t = t;
    setInterval(CountDown, 1000);
}
/******************
 *
 * 产品详情页 倒计时
 *
 **************** */



function detailCountDown(dom) {
    //t = 100;
    //t = time;

    var singleTime = $(dom).find(".count-down-time");
    var t = singleTime.attr("time");
    if (typeof(t) == "undefined") {
        console.log("没有设置时间");
        return;
    }
    if (t == 0) {
        console.log("时间到了");
        $(dom).remove();
        return;
    } else {
        $(dom).show();
    }

    t = t - 1;
    singleTime.attr("time", t);
    var h = Math.floor(t / 60 / 60 % 24);
    var m = Math.floor(t / 60 % 60);
    var s = Math.floor(t % 60);

    //console.log( t);
    console.log(h + "时" + m + "分" + s + "秒");
    //console.log(s.toString().length);

    if (s.toString().length == 1) {
        s = "0" + s;
    }
    if (m.toString().length == 1) {
        m = "0" + m;
    }
    if (h.toString().length == 1) {
        h = "0" + h;
    }
    singleTime.text(h + ":" + m + ":" + s);

}

function detailCountDownGo() {

    if ($(document).find(".group-buy-member-list").length != 0) {
        var allgroupbuy = $(".group-buy-member");
        allgroupbuy.each(function (i) {
            //var t = $(this).find('.count-down-time').attr('time');
            detailCountDown($(this));
                if( $(".group-buy-member").length == 0 ) {
                    $(".product-group-buy").remove();
                }
            }
        )
    } else {
        console.log("没有拼团哇");
    }
}


window.onload = function () {


}

