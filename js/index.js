//放大图的实现
function get_big_photo() {
    var parent_box = document.getElementById("parent-box");
    var mask = document.getElementById("mask");
    var pre_img = document.getElementById("right-box-img");
    var right_box_img = document.getElementById("right-box-img");
    var right_img = document.getElementById("right-img");
    //默认遮罩层和右侧的预览图片区域都是隐藏不可见的
    //添加鼠标移入的事件，鼠标移入后遮罩层和右侧的预览图出现
    parent_box.addEventListener("mouseover", function (e) {
        mask.style.display = "block";
        pre_img.style.display = "block";
    })
    //添加鼠标移出的事件，鼠标移移出后遮罩层和右侧的预览图隐藏
    parent_box.addEventListener("mouseleave", function (e) {
        mask.style.display = "none";
        pre_img.style.display = "none";
    })

    parent_box.addEventListener("mousemove", function (e) {
        console.log(e.pageX); //鼠标在窗口中的水平偏移量
        console.log(e.pageY); //鼠标在网页窗口中的垂直偏移量

        //此处以mask为例
        console.log(mask.offsetWidth);//获取mask元素的宽度
        console.log(mask.offsetHeight);//获取mask元素的高度

        console.log(this.offsetLeft); //当前对象（parent_box）距离网页左侧的距离
        console.log(this.offsetTop); //当前对象（parent_box）距离网页顶部的距离

        //获取鼠标在相对于parent_box对象中的水平偏移量和垂直偏移量
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        //计算出mask遮罩层元素相对于鼠标移动时的水平偏移量和垂直偏移量
        //水平偏移量 = 鼠标此时的水平偏移量 - 遮罩层宽度的一半
        var maskX = mouseX - mask.offsetWidth / 2;
        //垂直偏移量 = 鼠标此时的垂直偏移量 - 遮罩层高度的一半
        var maskY = mouseY - mask.offsetHeight / 2;

        //保证遮罩层不移出左侧方框
        //此时需要对遮罩层的偏移量进行判断
        //如果水平偏移量大于等于parent_box的宽度-遮罩层的宽度，开始处理
        if (maskX >= this.offsetWidth - mask.offsetWidth) {
            console.log("水平方向超出范围啦~");
            // 超出范围让mask的水平偏移量保持最大偏移量不变
            maskX = this.offsetWidth - mask.offsetWidth;
        } else if (maskX < 0) { //往左侧过多也会超出范围，偏移量会变为负值
            maskX = 0; //此时让偏移量保持为0即可
        }

        //如果垂直偏移量大于等于parent_box的高度-遮罩层的高度，开始处理
        if (maskY >= this.offsetHeight - mask.offsetHeight) {
            console.log("垂直方向超出范围啦~");
            // 超出范围让mask的水平偏移量保持最大偏移量不变
            maskY = this.offsetHeight - mask.offsetHeight;
        } else if (maskY < 0) { //往上方过多也会超出范围，偏移量会变为负值
            maskY = 0; //此时让偏移量保持为0即可
        }

        //对于右侧的预览放大图，我们要先知道前提条件
        //即：遮罩层的偏移量 / 遮罩层的最大偏移量 = 放大图的偏移量 / 放大图的最大偏移量
        //所以右侧放大图的偏移量就等于：
        //放大图的偏移量 = 遮罩层的偏移量 * 放大图的最大偏移量 / 遮罩层的最大偏移量
        var mask_max_X = this.offsetWidth - mask.offsetWidth; //遮罩层的最大水平偏移量
        var mask_max_Y = this.offsetHeight - mask.offsetHeight;//遮罩层的最大垂直偏移量
        //放大图的最大水平偏移量
        var big_max_X = right_img.offsetWidth - right_box_img.offsetWidth;
        //放大图的最大垂直偏移量
        var big_max_Y = right_img.offsetHeight - right_box_img.offsetHeight;
        //放大图的水平偏移量
        var big_img_X = maskX * (big_max_X) / mask_max_X;
        //放大图的垂直偏移量
        var big_img_Y = maskY * (big_max_Y) / mask_max_Y;

        //由于遮罩层和放大图是反方向移动的
        right_img.style.left = -big_img_X + "px";
        right_img.style.top = -big_img_Y + "px";


        mask.style.left = maskX + "px";
        mask.style.top = maskY + "px";
    })
}


//轮播图列表左右切换的功能实现
function list_index() {
    //点击左侧的按钮 图片左移
    var left_arr = document.getElementById("left-arr");
    //点击右侧的按钮 图片右移
    var right_arr = document.getElementById("right-arr");
    //获取轮播图列表
    var menu = document.getElementById("menu-list");

    // 获取menu的初始位置
    var init_left = menu.offsetLeft - left_arr.offsetWidth;
    //为左侧按钮添加点击事件
    left_arr.addEventListener("click", function (e) {
        console.log(this.offsetWidth);
        console.log(init_left);
        if (init_left >= 15) {
            return false;
        }
        menu.style.left = init_left + 75 + "px";
        init_left = parseInt(menu.style.left);
    })
    //监听右侧按钮的点击事件
    right_arr.addEventListener("click", function (e) {
        console.log(this.offsetWidth);
        console.log(init_left);
        if (init_left <= -285) {
            return false;
        }
        menu.style.left = init_left - 75 + "px";
        init_left = parseInt(menu.style.left);
    })
}


//点击图片缩略图显示对应的大图
function getImg() {
    //获取每一个图片元素的对象
    var imglist = document.querySelectorAll("#menu-list .list-one-img");
    //获取上方大图对象
    var leftimg = document.getElementById("left-img");
    //获取右侧放大图的元素对象
    var rightimg = document.getElementById("right-img");
    //打印一下，看看是否获取到了9张图片
    console.log(imglist.length);
    //首先获取第一个元素，因为默认第一个元素有选中边框
    var init_active = imglist[0];
    //遍历图片列表
    for (let i = 0; i < imglist.length; i++) {
        //为每个图片添加点击事件
        imglist[i].addEventListener("click", function (e) {
            //点击当前图片，我们要把前一个选中边框去掉
            init_active.classList.remove("active-img");
            //然后指向当前点击的元素对象
            init_active = this;
            //为当前点击的元素设置选中边框
            init_active.classList.add("active-img");
            // 获取当前点击的元素的图片路径
            var this_path = this.getElementsByTagName("img")[0].src;
            console.log(this_path);
            //分别为左侧大图和右侧放大图设置图片路径
            leftimg.src = this_path;
            rightimg.src = this_path;
        })
    }
}

//定义函数渲染页面数据并进行相关控件的绑定
function full_goods_data() {
    //渲染顶部标题
    let nav_path = goodData.path;
    nav_path.forEach(element => {
        let atag = document.createElement("a");
        atag.href = element.url;
        atag.innerHTML = element.title;
        let divtag = document.createElement("div");
        divtag.classList.add("list-one");
        divtag.append(atag);
        let midnav = document.getElementsByClassName("mid-nav")[0];
        midnav.append(divtag);
    });
}


//点击对应搭配生成对应的价格
function get_price() {
    let colorLists = document.querySelectorAll(".color-list div");
    let memeoryLists = document.querySelectorAll(".memory-list div");
    let classifyLists = document.querySelectorAll(".classify-list div");
    let wayLists = document.querySelectorAll(".way-list div");
    let init_priceLists = document.querySelector(".price-box .first-title .price");
    var init_price = init_priceLists.getElementsByTagName("span")[1];
    var totalPrice = goodData.goodsDetail.price; //初始价格
    init_price.innerHTML = goodData.goodsDetail.price;
    let colorFlag = {
        obj: colorLists[0],
        index: 0
    };
    let memoryFlag = {
        obj: memeoryLists[0],
        index: 0
    };
    let classifyFlag = {
        obj: classifyLists[0],
        index: 0
    };
    let wayFlag = {
        obj: wayLists[0],
        index: 0
    };
    var priceLists = goodData.goodsDetail.crumbData; //搭配列表
    colorLists.forEach((element, i) => {
        console.log(i);
        element.addEventListener("click", function (e) {
            totalPrice -= priceLists[0].data[colorFlag.index].changePrice;
            //点击当前元素，我们要把前一个选中边框去掉
            colorFlag.obj.classList.remove("active-goods");
            //然后指向当前点击的元素对象
            colorFlag.obj = this;
            //为当前点击的元素设置选中边框
            colorFlag.obj.classList.add("active-goods");
            colorFlag.index = i;
            totalPrice += priceLists[0].data[colorFlag.index].changePrice;
            console.log(totalPrice);
            init_price.innerHTML = totalPrice;
        })
    });
    memeoryLists.forEach((element, i) => {
        console.log(i);
        element.addEventListener("click", function (e) {
            totalPrice -= priceLists[1].data[memoryFlag.index].changePrice;
            //点击当前元素，我们要把前一个选中边框去掉
            memoryFlag.obj.classList.remove("active-goods");
            //然后指向当前点击的元素对象
            memoryFlag.obj = this;
            //为当前点击的元素设置选中边框
            memoryFlag.obj.classList.add("active-goods");
            memoryFlag.index = i;
            totalPrice += priceLists[1].data[memoryFlag.index].changePrice;
            console.log(totalPrice);
            init_price.innerHTML = totalPrice;
        })
    });
    classifyLists.forEach((element, i) => {
        console.log(i);
        element.addEventListener("click", function (e) {
            totalPrice -= priceLists[2].data[classifyFlag.index].changePrice;
            //点击当前元素，我们要把前一个选中边框去掉
            classifyFlag.obj.classList.remove("active-goods");
            //然后指向当前点击的元素对象
            classifyFlag.obj = this;
            //为当前点击的元素设置选中边框
            classifyFlag.obj.classList.add("active-goods");
            classifyFlag.index = i;
            totalPrice += priceLists[2].data[classifyFlag.index].changePrice;
            console.log(totalPrice);
            init_price.innerHTML = totalPrice;
        })
    });
    wayLists.forEach((element, i) => {
        console.log(i);
        element.addEventListener("click", function (e) {
            totalPrice -= priceLists[3].data[wayFlag.index].changePrice;
            //点击当前元素，我们要把前一个选中边框去掉
            wayFlag.obj.classList.remove("active-goods");
            //然后指向当前点击的元素对象
            wayFlag.obj = this;
            //为当前点击的元素设置选中边框
            wayFlag.obj.classList.add("active-goods");
            wayFlag.index = i;
            totalPrice += priceLists[3].data[wayFlag.index].changePrice;
            console.log(totalPrice);
            init_price.innerHTML = totalPrice;
        })
    });
}

//购物车数量实现
function get_membet() {
    var inputEle = document.querySelector(".cart-box .number input");
    var valueNum = Number(inputEle.value); //获取数量
    console.log(typeof valueNum);
    var addbtn = document.getElementById("add");
    var subbtn = document.getElementById("sub");
    addbtn.addEventListener("click", function (e) {
        console.log(valueNum);
        inputEle.value = ++valueNum;
        // totalPrice *= valueNum;
        // init_price.innerHTML = totalPrice;
    })
    subbtn.addEventListener("click", function (e) {
        if (valueNum == 1) {
            return false;
        }
        inputEle.value = --valueNum;
        // totalPrice *= valueNum;
        // init_price.innerHTML = totalPrice;
    })
}

//定义主函数
function main() {
    get_big_photo();
    list_index();
    getImg();
    full_goods_data();
    get_price();
    get_membet();
}

//调用主函数
main();