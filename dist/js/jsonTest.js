$(function($) {



    var NavListData;
    var _navBarUl = $(".nav-bar > ul");
    var _navBarLi = $(".nav-bar ul li");
    var _navBarLiA = $(".nav-bar ul li a");

    var api_status;
    var api_msg;
    var nav_banner_imgadr = new Array;
    var nav_banner_imgbid = new Array;
    $.getJSON("js/getNavList.json", function(data) {
        console.log(data);
        console.log("NavList 有" + data.data.length + "组数据");
        var navCount = data.data.length;
        NavListCount = data.data.length; //导航数量

        api_status = data.status;
        api_msg = data.message;


        if (api_status !== 1) {
            alert("获取数据失败");
        }

        // console.log(data.status);
        // console.log(data.message);
        // console.log(data.data);
        console.log(data.data.length);
        // console.log(data.data[0]);
        // console.log(data.data[0].id);
        // console.log(data.data[0].name);
        // console.log(data.data[0].m_banner);
        console.log("第一组 " + data.data[0].m_banner.length);
        // console.log(data.data[0].m_banner[0]);
        // console.log(data.data[0].m_banner[0].banner);
        // console.log(data.data[0].m_banner[0].bid);

        //开始循环有多少个导航 传入的是data数组
        data.data.forEach(function(element, index) {

            console.log("导航的id是 " + element.id); //nav id
            console.log("导航名称 " + element.name); //nav name

            nav_banner_imgadr[index] = element.m_banner[0].banner;
            nav_banner_imgbid[index] = element.m_banner[0].bid;

            var nav = $(".nav-bar > ul");
            var _newNavLi = document.createElement("li");
            var _newNavLiA = document.createElement("a");

            _newNavLiA.text = element.name;
            _newNavLiA.dataset.navId = element.id;
            _newNavLiA.href = "";
            _newNavLi.appendChild(_newNavLiA);
            if (navCount = 4) {
                _newNavLi.style.width = "20%";
            }
            nav[0].appendChild(_newNavLi);
            console.log(_newNavLiA);
            console.log(_newNavLi);
        });

        console.log(nav_banner_imgadr);
        console.log(nav_banner_imgbid);
        $(".nav-bar ul li").removeClass("active");
        $(".nav-bar ul li:first-child").addClass("active");

    })

})