/**
 * Created by Administrator on 2018/3/9.
 */
$(function () {

$(".btn_login").on('click', function () {
    var username = $("[name=username]").val();
    var password = $("[name=password]").val();

    if(!username){
        mui.toast("请输入用户名");
        return;
    }
    if(!password){
        mui.toast("请输入密码");
        return;
    }

    $.ajax({
        type:'post',
        url: '/user/login',
        data: {
            username: username,
            password: password
        },
        success: function (info) {
            if(info.error) {
                mui.toast(info.message);
            }

            if(info.success) {

                //判断，如果有retUrl参数，说明需要调回去， retUrl对应的地址去，
                //如果没有，默认去 user.html
                if(location.search.indexOf("retURL") != -1){
                    //说明有，跳转到retUrl指定的页面
                    location.href = location.search.replace("?retURL=","");
                }else {
                    //说明没有，跳转到用户中心
                    location.href = 'user.html';
                }
            }

        }
    });

})

});