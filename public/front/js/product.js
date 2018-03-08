/**
 * Created by Administrator on 2018/3/8.
 */

$(function () {

    //根据id发送ajax请求
    //获取id
    var id = getSearch("productId");
    //console.log(id);
    //发送ajax请求
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data:{
            id:id
        },
        success: function (info) {
            console.log(info);
            $(".mui-scroll").html(template('tmp',info));

            //重新初始化轮播图
            mui('.mui-slider').slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //重新初始化number
            mui(".mui-numbox").numbox();

        }

    });

});