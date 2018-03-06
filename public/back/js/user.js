/**
 * Created by Administrator on 2018/3/6.
 */

$(function () {

    //发送ajax请求，获取用户数据，渲染到页面中
    var page = 1; //当前页
    var pageSize = 5; //每页的条数

    //封装ajax函数
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('tbody').html(template('tmp',info));

                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//如果使用了bootstrap3版本，必须指定
                    currentPage:page, //设置当前页
                    totalPages: Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5, //设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a, b, c, p) {
                        //修改一下page的值
                        page = p;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    }
    render();

    //启用禁用用户
    $('tbody').on('click','.btn', function () {

        //显示模态框
        $('#userModal').modal('show');

        //获取到点击的按钮所在的用户id
        var id = $(this).parent().data('id');

        var isDelete = $(this).hasClass('btn-success')?1:0;

        $('.btn_confirm').off().on('click', function () {

            //发送ajax请求
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id:id,
                    isDelete:isDelete
                },
                success: function (info) {
                    //console.log(info);
                    if(info.success){
                        //关闭模态框
                        $('#userModal').modal('hide');
                        //重新渲染
                        render();
                    }
                }
            });

        });

    });


});