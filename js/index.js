window.addEventListener('load', function() {
    // 1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
    //获取元素
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    //鼠标经过就显示 鼠标离开就隐藏
    focus.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        // 鼠标经过focus 就停止定时器  即停止轮播
        clearInterval(timer);
        timer = null; //清楚定时器变量

    });
    focus.addEventListener('mouseleave', function() {
            arrowl.style.display = 'none';
            arrowr.style.display = 'none';
            // 鼠标离开focus 就开启定时器
            timer = setInterval(function() {
                // 此时我们使用手动调用右侧按钮点击事件 arrowr.click()
                arrowr.click()

            }, 2000)

        })
        //2.动态生成小圆圈
        //     ② 核心思路：小圆圈的个数要跟图片张数一致
        // ③ 所以首先先得到ul里面图片的张数（图片放入li里面，所以就是li的个数）
    var ul = focus.querySelector(' ul');
    var ol = focus.querySelector(' ol');

    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // ⑤ 创建节点 createElement(‘li’)
        //创建一个小li 
        var li = document.createElement('li');
        //记录当前小圆圈的索引号
        li.setAttribute('index', i);
        //把li插入ol
        // ⑥ 插入节点 ol. appendChild(li)
        ol.appendChild(li);

        //3.小圆圈的排他思想  在生成小圆圈的同时绑定事件
        li.addEventListener('click', function() {
            //干掉所有人留下我自己
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己 当前的li 类名为current
            this.className = 'current';
            //4.点击小圆圈滚动图片 注意是ul 移动 而不是小li
            // 滚动图片的核心算法： 点击某个小圆圈 ， 就让图片滚动 小圆圈的索引号乘以图片的宽度做为ul移动距离
            // 此时需要知道小圆圈的索引号， 我们可以在生成小圆圈的时候，给它设置一个自定义属性，点击的时候获取这个自定义属性即可
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            var target = -index * focus.offsetWidth;
            animate(ul, target)
        })
    }
    // ⑦ 第一个小圆圈需要添加 current 类
    ol.children[0].className = 'current';

    //6.克隆第一张图片（li)放到ul后面  加true 深克隆 复制里面的子节点 false 浅克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first)
        //5.点击右侧按钮一次，就让图片滚动一张
    var num = 0;

    //12. 节流阀 防止轮播图按钮连续点击造成播放过快。
    var flag = true;

    //7.控制小圆圈的播放 最简单的做法是再声明一个变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，因此要声明全局变量。
    var circle = 0;
    arrowr.addEventListener('click', function() {
            if (flag) {
                // console.log(target);
                flag = false;
                //如果走到了最后一张图片 要快速复原
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                var target = -num * focus.offsetWidth;
                animate(ul, target, function() {
                    // 利用回调函数 动画执行完毕， flag = true 打开水龙头

                    flag = true; //打开
                })

                //8.点击右侧按钮， 小圆圈跟随变化
                circle++;
                //如果circle == 4 就 从新复原为 0
                circle = circle == ol.children.length ? 0 : circle;

                circleChange()
            }
        })
        //9.左侧按钮
    arrowl.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到了第一张图片 要快速复原
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            if (num >= 0) {
                var target = -num * focus.offsetWidth;
                animate(ul, target, function() {
                    flag = true;
                })
            }

            //8.点击右侧按钮， 小圆圈跟随变化
            circle--;

            //如果circle < 0 就 从新复原为 ol.children.length
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange()
        }


    })

    //10.封装小圆圈排他思想函数
    function circleChange() {
        //先清除其余小圆圈的current
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下我自己 当前的li 类名为current
        ol.children[circle].className = 'current';
    }

    //11.定时自动跳转 自动播放轮播图，实际就类似于点击了右侧按钮
    var timer = setInterval(function() {
        // 此时我们使用手动调用右侧按钮点击事件 arrowr.click()
        arrowr.click()

    }, 2000)

})