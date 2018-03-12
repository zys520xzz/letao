/**
 * Created by HUCC on 2018/3/8.
 */
$(function () {


    //获取购物车信息
    function render() {
        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (info) {
                console.log(info);
                //ajax需要时间
                setTimeout(function () {
                    if(info.error){
                        //此时没有登录,跳转到登录页，登录成功还需要跳回来
                        location.href = "login.html?retUrl="+location.href;
                    }

                    //需要对info进行渲染
                    $("#OA_task_2").html( template("tpl", {info:info}) );

                    //结束下拉刷新
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();


                    //把总金额改成00.00
                    $(".lt_order span").text("00.00");
                }, 1000);


            }
        })
    }


    //配置下拉刷新
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto: true,//页面进入，自动下拉刷新一次
                //indicators:false,//禁用滚动条
                callback: function () {
                    render();

                }
            }
        }
    });


    //删除功能
    $("#OA_task_2").on("tap", ".btn_delete", function () {
        //获取到id
        var id = $(this).data("id");

        mui.confirm("您是否要删除这件商品?", "温馨提示", ["是", "否"], function (e) {
            if(e.index === 0) {

                //发送ajax请求
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data: {
                        id: [id]
                    },
                    success:function (info) {
                        if(info.success) {
                            //触发一次下拉刷新就行
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })



    })



    //修改功能
    //1. 给修改按钮注册点击事件（代理）
    //2. 获取到对应的id
    //3. 根据id查询对应的这件商品信息
    //4. 把查询到的数据显示 mui.confirm框中
    //5. 修改尺码和数量
    //6. 点确定，发送ajax请求，修改到数据库
    //7. 下拉一次

    $("#OA_task_2").on("tap", ".btn_edit", function () {
        //数据
        var data = this.dataset;
        console.log(data);

        var html = template("editTpl", data);

        //替换掉html中所有的换行
        html = html.replace(/\n/g, "");

        //mui.confirm会对所有的换行都替换成<br>
        mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {

            if(e.index === 0){
                //说明点了确定
                //发送ajax请求
                var id = data.id;
                var size = $(".lt_edit_size span.now").text();
                var num = $(".mui-numbox-input").val();

                //一半而言，不会对数据库发生修改的操作，一般用get，get操作仅仅使用来查询。
                $.ajax({
                    type:'POST',
                    url:'/cart/updateCart',
                    data: {
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function (info) {
                        if(info.success) {
                            //下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })

            }

        });



        //给span注册点击tap事件
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        })

        //初始化numbox
        mui(".mui-numbox").numbox();






    });



    //计算总金额
    $("#OA_task_2").on("change", ".ck", function () {


        var total = 0;
        //找到所有选中的checkbox，遍历，计算金额
        $(":checked").each(function () {

            //获取到当前checkbox的数量与价格
            var price = $(this).data("price");
            var num = $(this).data("num");

            total += price * num;

        });
        $(".lt_order span").text(total.toFixed(2));


    });
});