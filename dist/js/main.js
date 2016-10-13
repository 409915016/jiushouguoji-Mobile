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

    $('.switch-wrapper').eq($('.nav-bar li').index($('.nav-bar li.active'))).show();
    $('.nav-bar li').click(function () {
        var _this = $(this);
        $('.nav-bar li').removeClass('active');
        _this.addClass('active');
        $('.switch-wrapper').hide();
        $('.switch-wrapper').eq($('.nav-bar li').index(_this)).show();
    });

});