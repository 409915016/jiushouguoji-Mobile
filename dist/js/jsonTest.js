$(function ($) {

    var NavListData;
    var _navBarUl = $(".nav-bar > ul");
    var _navBarLi = $(".nav-bar ul li");
    var _navBarLiA = $(".nav-bar ul li a");

    var api_status;
    var api_msg;
    var nav_banner_imgadr = new Array;
    var nav_banner_imgbid = new Array;
    //nav bar 
    // $.getJSON("js/getNavList.json", function (data) {
    //     // console.log(data);
    //     // console.log("NavList 有" + data.data.length + "组数据");
    //     var navCount = data.data.length;
    //     NavListCount = data.data.length; //导航数量

    //     api_status = data.status;
    //     api_msg = data.message;


    //     if (api_status !== 1) {
    //         alert("获取数据失败");
    //         return;
    //     }

    //     // console.log(data.status);
    //     // console.log(data.message);
    //     // console.log(data.data);
    //     // console.log(data.data.length);
    //     // console.log(data.data[0]);
    //     // console.log(data.data[0].id);
    //     // console.log(data.data[0].name);
    //     // console.log(data.data[0].m_banner);
    //     // console.log("第一组 " + data.data[0].m_banner.length);
    //     // console.log(data.data[0].m_banner[0]);
    //     // console.log(data.data[0].m_banner[0].banner);
    //     // console.log(data.data[0].m_banner[0].bid);

    //     //开始循环有多少个导航 传入的是data数组


    //     data.data.forEach(function (element, index) {

    //         // console.log("导航的id是 " + element.id); //nav id
    //         // console.log("导航名称 " + element.name); //nav name

    //         nav_banner_imgadr[index] = element.m_banner[0].banner;
    //         nav_banner_imgbid[index] = element.m_banner[0].bid;

    //         var nav = $(".nav-bar > ul");
    //         var _newNavLi = document.createElement("li");
    //         var _newNavLiA = document.createElement("a");

    //         _newNavLiA.text = element.name;
    //         _newNavLiA.dataset.navId = element.id;
    //         _newNavLiA.href = "";
    //         _newNavLi.appendChild(_newNavLiA);
    //         // if (navCount = 4) {
    //         //     _newNavLi.style.width = "20%";
    //         // }
    //         nav[0].appendChild(_newNavLi);
    //         // console.log(_newNavLiA);
    //         // console.log(_newNavLi);
    //     });

    //     // console.log(nav_banner_imgadr);
    //     // console.log(nav_banner_imgbid);
    //     $(".nav-bar ul li").removeClass("active");
    //     $(".nav-bar ul li:first-child").addClass("active");

    //     $(".big-banner-imgBox img")[0].src = nav_banner_imgadr[0];





    // }); //getJSON end


    //product banner and big-img
    $.getJSON("js/getActivityList.json", function (data) {
        console.log(data);

        api_status = data.status;
        api_msg = data.message;


        if (api_status !== 1) {
            alert("获取数据失败");
            return;
        }
        //console.log(data.data.length); //6
        var product_section_count = data.data.length;

        var product_wrapper = $(".product-wrapper")[0];
        var product_section = $(".product-section")[0];
        //console.log(product_section);
        //copy element
        for (var i = 0; i < product_section_count; i++) {
            var clone = product_section.cloneNode(true);
            //console.log(clone);
            product_wrapper.appendChild(clone);
        }
        product_wrapper.lastChild.remove();


        var all_img = new Array;
        all_img = $(".product-imgBox a img");

        //6
        data.data.forEach(function (element, index, array) {
            // console.log( $(".product-imgBox a img")[index]); 
            // console.log(element.cover);
            // console.log(all_img[index]);
            // console.log(all_img[index].src);
            all_img[index].src = element.cover;
            //console.log(all_img);


        })

        //重新实例化
        var index_Swiper = new Swiper('.swiper-product', {
            slidesPerView: 3,
            spaceBetween: 0,
        });

    });


});