var pop_title_style = "background-color: #fff; color:#333;border-bottom: 1px solid #c8c7cc;";
getAll(".my-center-row")[1].addEventListener("click", function (event) {
    //console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            "请修改你的" + this.firstElementChild.innerText,
            pop_title_style
        ],
        className: 'uesr-pop-change',
        content: get(".change-user-name-block").innerHTML
    });
})

getAll(".my-center-row")[2].addEventListener("click", function (event) {
    //console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            "请修改你的" + this.firstElementChild.innerText,
            pop_title_style
        ],
        className: 'uesr-pop-change',
        content: get(".change-user-say-block").innerHTML
    });
})


getAll(".my-center-row")[3].addEventListener("click", function (event) {
    //console.log(this.firstElementChild.innerText);

    layer.open({
        content: "请修改你的性别",
        btn: ['男', '女'],
        yes: function (index) {
            //location.reload();
            layer.close(index);
            console.log(index);
        }
    });
})

getAll(".my-center-row")[4].addEventListener("click", function (event) {
    //console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            "请修改你的" + this.firstElementChild.innerText,
            pop_title_style
        ],
        className: 'uesr-pop-change',
        content: get(".change-user-bday-block").innerHTML
    });
})