function animate(obj, target, callback) {
    //   console.log(callback)
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        //把步长值取整 避免出现小数 正数向上取整 负数向下取整
        var step = (target - obj.offsetLeft) > 0 ? Math.ceil((target - obj.offsetLeft) / 10) : Math.floor((target - obj.offsetLeft) / 10);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写道定时器里面 先判断有没有回调函数
            // if (callback) {
            //     callback();
            // }
            callback && callback(); //短路原理
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10  10是自定义的一个数
        else obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}