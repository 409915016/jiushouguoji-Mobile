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


/******************
 
商品评论页 选星功能
*****************/

window.onload = function () {


    var user_grade_value = {
        order_id: 13156165,
        desccredit: 5,
        servicecredit: 5,
        deliverycredit: 5
    };
    var goods_grade_value = function () {
        this.scores = 5;
        this.result = 3;
        this.content = "";
        this.isanonymous = 1;

    }
     var aaa = [];

    // var goods_grade_value = {
    //         scores: 5,
    //         result: 3,
    //         content: "",
    //         isanonymous: 1
    //     }
    //商店评价
    function set_user_grade() {
        set_user_grade.prototype.set = function (row_num, mark) {
            if (isNumber(row_num) && isNumber(mark)) {
                if (row_num == 1) {
                    user_grade_value.desccredit = mark;

                }
                if (row_num == 2) {
                    user_grade_value.servicecredit = mark;

                }
                if (row_num == 3) {
                    user_grade_value.deliverycredit = mark;
                }
                //console.log(user_grade_value);
            }
        }
        set_user_grade.prototype.return = function () {

        }



    }
    //商品评价
    function set_goods_grade(HTMLDom) {
        var goods_DOM = $(HTMLDom)[0];
        //console.log(goods_DOM);
        //评价输入框
        var goods_contentDOM = $(goods_DOM).find("textarea")[0];
        //console.log(goods_contentDOM);
        var goods_result_rowDOM = $(goods_DOM).find(".add-comment-good")[0];
        //console.log(goods_result_rowDOM);
        var goods_result_DOM = $(goods_result_rowDOM).children(".comment-good");
        //console.log(goods_result_DOM);
        var icon_DOM = goods_result_DOM.children("i");
        //console.log(icon_DOM);
        console.log(goods_DOM);
        var goods_id = goods_DOM.dataset.goodsId; 
        console.log(goods_id);
        var data = new goods_grade_value();


        //用户文字评论
        var content_text;

        //好中差 CSS类名
        var add_class = {
            a: "good",
            b: "no-good",
            c: "bad"
        }
        var remove_class = {
            a: "good-gray",
            b: "no-good-gray",
            c: "bad-gray"
        }

        icon_init(icon_DOM);


        //用户文字评论
        $(goods_contentDOM).keyup(function (content_text) {
            content_text = goods_contentDOM.value.trim();
            goods_grade_value.content = content_text;
            console.log(goods_grade_value.content);

        })


        //好评
        $(goods_result_DOM).click(function (result_class) {
                var _this = $(this)[0];
                var _this_all = $(this).parent().children();
                var _icon = $(this).children("i");
                //当前icon
                var num = $(_this_all).index(_this) + 1;
                // goods_grade_value.result = num;

                
                data.result = num;
                aaa[goods_id] = data;
                console.table(aaa);
                
                console.log(data.result);
                icon_click(num, _this, result_class, icon_DOM);

            })
            //
        $(goods_DOM).click(function (event) {
            //console.log(event.target);

        })
        set_user_grade.prototype.set = function () {

        }

        //初始化所有icon
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
    $(".door-comment-select i").click(function (event) {

        var active_class = "star-red";
        var default_class = "star-gray";
        var _this_i = $(this);
        //door-comment-star
        var _i_parent = _this_i.parent()[0];
        ///door-comment
        var _star_row = _this_i.parent().parent()[0];
        //door-comment-select
        var _star_row_parent = _this_i.parent().parent().parent()[0];
        var row_num = $(_star_row_parent).children().index(_star_row) + 1;
        var num = $(_i_parent).children().index(_this_i) + 1;
        var a = new set_user_grade();
        a.set(row_num, num);
        //remove red
        _this_i.nextAll().removeClass(active_class).addClass(default_class);
        //add red
        _this_i.addClass(default_class).prevAll().addClass(active_class);

        console.log(user_grade_value);


    })
    $(".add-comment-select label").click(function () {
            var anonymous_check = !get("#anonymous").checked;
            if (anonymous_check) {
                goods_grade_value.isanonymous = 1;
            } else {
                goods_grade_value.isanonymous = 0;
            }
            //	console.log(anonymous_check);
        })
        //实例化每件商品的评论

    $(".addComment-product").each(function (i) {
        new set_goods_grade(this);
    })

}