//页面加载完了才执行下面代码
window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
        //鼠标经过小图片盒子， 黄色的遮挡层 和 大图片盒子显示，离开隐藏2个盒子功能
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';

    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';

        })
        //① 黄色的遮挡层跟随鼠标功能。
        //② 把鼠标坐标给遮挡层不合适。因为遮挡层坐标以父盒子为准。
    preview_img.addEventListener('mousemove', function(e) {
        //1.鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log(x)
        console.log(y)

        //2.幅值 
        //3.遮挡层不能超出小图片盒子范围

        //4.如果小于零，就把坐标设置为0
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //遮挡层最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //移动黄色遮挡层，大图片跟随移动功能
        //大图片移动距离 =遮挡层移动距离*大图片最大移动距离/遮挡层最大移动距离
        var bigImg = document.querySelector('.bigImg')
            //大图片最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片移动距离 
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
    var lis = document.querySelectorAll('.list_item li')
    var arrow_prev = this.document.querySelector('.arrow_prev')
    var arrow_next = this.document.querySelector('.arrow_next')
    var index = 0;
    arrow_prev.addEventListener('click', function() {
        index--;
        if (index < 0) index = lis.length - 1;
        currentChange(index)
    })
    arrow_next.addEventListener('click', function() {
        index++;
        if (index >= lis.length) index = 0;
        currentChange(index)
    })

    function currentChange(index) {
        //先清除其余小圆圈的current
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        //留下我自己 当前的li 类名为current
        lis[index].className = 'current';
    }

})