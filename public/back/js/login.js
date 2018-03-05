/**
 * Created by Administrator on 2018/3/2.
 */

//1.等待页面加载完成
//2.防止全局变量污染
$(function () {

    //1.检验表单
    $("form").bootstrapValidator({

        //要求用户名不能为空 2-6
        // 密码不能为空 密码的长度在6-12
        fields:{ //字段校验
            //对应form中的name属性
            username:{
                //给username配置校验规则
                validators:{
                    //非空的规则
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message:'长度要在2-6位'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },

            password: {
                validators: {
                    //非空的规则
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度要在6-12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        },

        //配置小图标，成功 失败 校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    //2.给表单注册一个校验成功的事件，成功的时候阻止表单的默认提交，使用ajax进行
    $("form").on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();

        //发送ajax请求登录
        $.ajax({
            type:'post',
            url: '/employee/employeeLogin',
            data: $("form").serialize(),
            dataType: 'json',
            success: function(info){
                //console.log(info);
                if(info.error === 1000){
                    //把username这个字段改成校验失败
                    $('form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                }
                if(info.error === 1001){
                    $('form').data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
                }
                if(info.success) {
                    location.href = "index.html";
                }
            }
        })

    });


    //3.重置表单，清除所有的样式
    $("[type='reset']").on('click', function () {
        $('form').data('bootstrapValidator').resetForm(true);
    })


});