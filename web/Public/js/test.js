getAll(".my-center-row")[1].addEventListener("click", function (event) {
    console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            this.firstElementChild.innerText,
            'background-color: #FF4351; color:#fff;'
        ],
        content: '标题风格任你定义。'
    });
})

getAll(".my-center-row")[2].addEventListener("click", function (event) {
    console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            this.firstElementChild.innerText,
            'background-color: #FF4351; color:#fff;'
        ],
        content: '标题风格任你定义。'
    });
})


getAll(".my-center-row")[3].addEventListener("click", function (event) {
    console.log(this.firstElementChild.innerText);

    layer.open({
        content: "请选择性别",
        btn: ['男', '女'],
        yes: function (index) {
            location.reload();
            layer.close(index);
        }
    });
})

getAll(".my-center-row")[4].addEventListener("click", function (event) {
    console.log(this.firstElementChild.innerText);

    layer.open({
        title: [
            this.firstElementChild.innerText,
            'background-color: #FF4351; color:#fff;'
        ],
        content: '标题风格任你定义。'
    });
})