/**
 * Created by Administrator on 2018/3/6.
 */

$(function () {

    //渲染列表与分页
    var page = 1;
    var pageSize = 5;

    //渲染函数
    function reader(){
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
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
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked: function(a,b,c,p){
                        //设置当前页
                        page = p;
                        //重新渲染
                        reader();
                    }
                });
            }
        })
    }

    reader();

    //添加分类功能
    $('.btn_add').on('click', function () {
        $('#firstModal').modal('show');
    });

    //初始化表单校验
    var $form = $('form');
    $form.bootstrapValidator({

        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //校验规则
        fields:{
            categoryName: {
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
                    }
                }
            }
        }

    });

    //给表单注册校验成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function (info) {

                if(info.success){
                    //关闭模态框
                    $('#firstModal').modal('hide');
                    //重置表单的样式和内容
                    $form.data('bootstrapValidator').resetForm(true);

                    //重新渲染第一页
                    page = 1;
                    reader();

                }
            }
        })

    });
});