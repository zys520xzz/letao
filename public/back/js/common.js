/**
 * Created by Administrator on 2018/3/2.
 */

$(function () {
    //禁用进度环
    NProgress.configure({
        showSpinner: false
    })

    $(document).ajaxStart(function () {
        //进度条加载效果
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        },500);

    });

    
    //二级菜单的显示与隐藏
    $('.second').prev().on('click', function () {
        $(this).next().slideToggle();
    });

    //找到icon_menu注册点击事件
    $('.icon_menu').on('click', function () {
        //让侧边栏隐藏
        $('.lt_aside').toggleClass('now');
        //让main的padding-left:0
        $('.lt_main').toggleClass('now');
    });

    //退出功能
    $('.icon_logout').on('click', function () {
        //显示模态框
        $('#logoutModal').modal('show');

    });

    //不要在事件里面注册事件
    $('.btn_logout').on('click',function(){
        //需要告诉服务器，我需要退出，让服务器把对应的session销毁

        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            success: function (info) {
                if(info.success){
                    //退出成功，才跳转到登录页
                    location.href = 'login.html';
                }
            }
        })
    });

    //如果不是登录页，发送ajax请求，查询管理员是否登录
    if(location.href.indexOf("login.html") == -1) {
        $.ajax({
            type:'get',
            url: '/employee/checkRootLogin',
            success: function (info) {
                if(info.error ===400){
                    location.href = 'login.html';
                }
            }
        })
    };

});