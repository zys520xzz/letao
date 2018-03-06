/**
 * Created by Administrator on 2018/3/6.
 */

$(function () {

    //渲染二级分类列表以及分页
    var page = 1;
    var pageSize = 8;

    //渲染函数
    function render(){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('tbody').html(template('tmp',info));

                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked: function (a,b,c,p) {
                        page = p;
                        render();
                    }
                });
            }
        });
    }
    render();

    //添加分类的功能
    //1. 点击添加分类，显示模态框, 加载一级分类的数据
    $(".btn_add").on("click", function () {
        $("#secondModal").modal("show");

        $.ajax({
            type:'GET',
            url:"/category/queryTopCategoryPaging",
            data: {
                page:1,
                pageSize:100
            },
            success:function (info) {
                console.log(info);

                $(".dropdown-menu").html( template("ftmp",info) );
            }
        });
    });

    //2. 给dropdown-menu下的所有的
    $(".dropdown-menu").on("click", "a", function () {

        var text = $(this).text();
        $(".dropdown_text").text(text);

        var id = $(this).parent().data("id");

        $("[name='categoryId']").val(id);

        //让categoryId的校验通过
        $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });


    //3. 初始化图片上传
    //3.1 引入js文件 （jquery、 ui.widgt.js 、fileupload）
    //3.2 准备一个input:file的文本框，   name和data-url
    //3.3 初始化  fileupload

    $("#fileupload").fileupload({
        dataType: 'json',
        //图片上传结束后，会调用的回调函数
        done:function (e, data) {
            //上传后的图片地址
            var pic = data.result.picAddr;

            //显示出来
            $(".img_box img").attr("src", pic);

            //给hidden设置一个value
            $("[name='brandLogo']").val(pic);

            //让brandLogo校验成功
            $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });



    //4. 表单校验功能
    var $form = $("form");
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入品牌的名称'
                    }
                }
            },
            brandLogo: {
                validators:{
                    notEmpty:{
                        message:'请上传品牌的图片'
                    }
                }
            }
        },
        excluded:[]
    });


    //5. 添加二级分类
    $form.on("success.form.bv", function (e) {
        e.preventDefault();


        $.ajax({
            type:'POST',
            url:"/category/addSecondCategory",
            data: $form.serialize(),
            success:function (info) {
                if(info.success) {
                    //关闭模态框
                    $("#secondModal").modal("hide");
                    //重新渲染第一页
                    page = 1;
                    render();

                    //重置样式
                    $form.data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("请选择一级分类");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        })
    })
});