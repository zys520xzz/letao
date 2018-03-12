/**
 * Created by Administrator on 2018/3/8.
 */

$(function () {

    //根据id发送ajax请求
    //获取id
    var productId = getSearch("productId");
    //console.log(id);
    //发送ajax请求
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data: {
            id: productId
        },
        success:function (info) {
            //给info添加一个数组
            /*var tempArr = info.size.split("-");
             var arr = [];
             for(var i = +tempArr[0]; i <= tempArr[1]; i++){
             arr.push(i);
             }
             info.sizeArray = arr;*/



            console.log(info);
            $(".mui-scroll").html( template("tpl", info) );

            //重新初始化轮播图
            mui(".mui-slider").slider();

            //重新初始化numbox
            mui(".mui-numbox").numbox();

            //可以选择尺码
            $(".size span").on("click", function () {
                $(this).addClass("now").siblings().removeClass("now");
            });


        }
    });

    //功能二：加入购物车
    //给按钮注册点击事件
    //2.获取productid，num，size，发送ajax请求
    $(".btn_add_cart").on("click",function(){
        var size = $(".size span.now").text();
        var num = $(".mui-numbox-input").val();
        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId:productId,
                num: num,
                size: size
            },
            success: function (info) {
                //console.log(info);
                if(info.error){
                    //跳转到登录页
                    location.href = "login.html?retURL="+location.href;
                }

                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"], function (e) {
                        if(e.index == 0){
                            location.href = "cart.html";
                        }
                    })
                }

            }
        });

    });


});