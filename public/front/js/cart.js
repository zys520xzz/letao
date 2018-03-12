/**
 * Created by HUCC on 2018/3/8.
 */
$(function () {


    //��ȡ���ﳵ��Ϣ
    function render() {
        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (info) {
                console.log(info);
                //ajax��Ҫʱ��
                setTimeout(function () {
                    if(info.error){
                        //��ʱû�е�¼,��ת����¼ҳ����¼�ɹ�����Ҫ������
                        location.href = "login.html?retUrl="+location.href;
                    }

                    //��Ҫ��info������Ⱦ
                    $("#OA_task_2").html( template("tpl", {info:info}) );

                    //��������ˢ��
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();


                    //���ܽ��ĳ�00.00
                    $(".lt_order span").text("00.00");
                }, 1000);


            }
        })
    }


    //��������ˢ��
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto: true,//ҳ����룬�Զ�����ˢ��һ��
                //indicators:false,//���ù�����
                callback: function () {
                    render();

                }
            }
        }
    });


    //ɾ������
    $("#OA_task_2").on("tap", ".btn_delete", function () {
        //��ȡ��id
        var id = $(this).data("id");

        mui.confirm("���Ƿ�Ҫɾ�������Ʒ?", "��ܰ��ʾ", ["��", "��"], function (e) {
            if(e.index === 0) {

                //����ajax����
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data: {
                        id: [id]
                    },
                    success:function (info) {
                        if(info.success) {
                            //����һ������ˢ�¾���
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })



    })



    //�޸Ĺ���
    //1. ���޸İ�ťע�����¼�������
    //2. ��ȡ����Ӧ��id
    //3. ����id��ѯ��Ӧ�������Ʒ��Ϣ
    //4. �Ѳ�ѯ����������ʾ mui.confirm����
    //5. �޸ĳ��������
    //6. ��ȷ��������ajax�����޸ĵ����ݿ�
    //7. ����һ��

    $("#OA_task_2").on("tap", ".btn_edit", function () {
        //����
        var data = this.dataset;
        console.log(data);

        var html = template("editTpl", data);

        //�滻��html�����еĻ���
        html = html.replace(/\n/g, "");

        //mui.confirm������еĻ��ж��滻��<br>
        mui.confirm(html, "�༭��Ʒ", ["ȷ��", "ȡ��"], function (e) {

            if(e.index === 0){
                //˵������ȷ��
                //����ajax����
                var id = data.id;
                var size = $(".lt_edit_size span.now").text();
                var num = $(".mui-numbox-input").val();

                //һ����ԣ���������ݿⷢ���޸ĵĲ�����һ����get��get��������ʹ������ѯ��
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
                            //����ˢ��
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })

            }

        });



        //��spanע����tap�¼�
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        })

        //��ʼ��numbox
        mui(".mui-numbox").numbox();






    });



    //�����ܽ��
    $("#OA_task_2").on("change", ".ck", function () {


        var total = 0;
        //�ҵ�����ѡ�е�checkbox��������������
        $(":checked").each(function () {

            //��ȡ����ǰcheckbox��������۸�
            var price = $(this).data("price");
            var num = $(this).data("num");

            total += price * num;

        });
        $(".lt_order span").text(total.toFixed(2));


    });
});