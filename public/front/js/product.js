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

            //可以选择尺码
            $('.size span').on('click',function(){
                $(this).addClass("now").siblings().removeClass("now");
            });

        }

    });

    //功能二：加入购物车
    //给按钮注册点击事件
    //2.获取productid，num，size，发送ajax请求
    $(".btn_add_cart").on("click",function(){
        var size = $(".size span.now").text();
        var num = $(".num input").val();

        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                producId:id,
                num: num,
                size: size
            },
            success: function (info) {
                //console.log(info);
                if(info.error){
                    //跳转到登录页
                    location.href = "login.html?retURL="+location.href;
                }
            }
        });

    });


});