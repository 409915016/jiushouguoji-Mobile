$(function ($) {

    var NavListData;
    var _navBarUl = $(".nav-bar > ul");
    var _navBarLi = $(".nav-bar ul li");
    var _navBarLiA = $(".nav-bar ul li a");

    var api_status;
    var api_msg;
    var nav_banner_imgadr = new Array;
    var nav_banner_imgbid = new Array;


    //product banner and big-img
    $.getJSON("js/getActivityList.json", function (data) {
        //console.log(data);

        api_status = data.status;
        api_msg = data.message;


        if (api_status !== 1) {
            alert("获取数据失败");
            return;
        }
        //console.log(data.data.length); //6
        var product_section_count = data.data.length;

        var product_wrapper = $(".product-wrapper")[0];
        var product_section = $(".base-mt-wrapper")[0];
        //console.log(product_section);
        //copy element
        for (var i = 0; i < product_section_count; i++) {
            var clone = product_section.cloneNode(true);
            //console.log(clone);
            product_wrapper.appendChild(clone);
        }
        product_wrapper.lastChild.remove();


        var all_img = new Array;
        all_img = $(".series-product-imgBox a img");

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
        new Swiper('.swiper-product', {
            slidesPerView: 3,
            spaceBetween: 0,
        })


    });


});