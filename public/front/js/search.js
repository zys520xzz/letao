/**
 * Created by Administrator on 2018/3/7.
 */
$(function () {

    //约定存储键为：search_list

    //列表渲染功能
    //1.从本地缓存中获取到需要渲染的数据

    //获取本地数据，希望这个函数无论如何都返回一个数组，如果没有记录，返回一个[]
    function getHistory() {
        var history = localStorage.getItem("search_list") || '[]';
        var arr = JSON.parse(history);
        return arr;
    }

    //渲染数据
    function reader() {
        var arr = getHistory();
        //console.log(arr);
        $('.lt_history').html(template('tmp',{info:arr}));
    }
    reader();

    //功能二：清空
    //1.给清空按钮注册点击事件（委托）
    //2.清空search_list 这个值
    //3.重新渲染
    $('.lt_history').on('click','.btn_empty', function () {

        //弹出一个确认框
        mui.confirm("你确定要清空所有的历史记录吗？","温馨提示", ["否", "是"],function(e){
            //console.log(e);
            //通过e.index就可以知道点击那个按钮
            if(e.index == 1) {
                //删除缓存
                localStorage.removeItem('search_list');
                //重新渲染
                reader();
            }
        });
    });

    //功能三：单个删除
    //1.给删除按钮注册点击事件
    //2.获取到删除的下标
    //3.获取到web存储中的数组
    //4.删除数组中对应下标那项
    //5.重新设置search_list的值
    //6.重新渲染
    $('.lt_history').on('click','.btn_delete', function () {
        //获取点击下标
        var index = $(this).data("index");
        //获取web存储中的数组
        var arr = getHistory();
        //删除数组中对应下标项
        arr.splice(index,1);
        //重新设置
        localStorage.setItem('search_list',JSON.stringify(arr));

        //重新渲染
        reader();
    });

    //功能4：增加
    //1.给搜索按钮注册事件
    //2.获取到文本框value值
    //3.获取到存储中的数组
    //4.把value值添加到数组中的最前面
    //5.重新设置search_list的值
    //6.跳转到搜索详情页
    $('.lt_search button').on('click',function(){
        //获取input的value值
        var value = $('.lt_search input').val().trim();
        //把input的value置为空
        $('.lt_search input').val('');
        if(value == ''){
            mui.toast('请输入搜索关键字');
            return;
        }
        //web数组
        var arr = getHistory();
        //把value添加到数组的最前面
        //需求1：数组长度不能超多10
        //需求2：如果这个搜索关键字已经存在，需要删除掉，重新添加
        //获取value在数组中的位置
        var index = arr.indexOf(value);
        //判断是否存在
        if(index != -1){
            arr.splice(index,1);
        }
        //判断数组长度是否大于10
        if(arr.length >= 10){
            //删除最后一个
            arr.pop();
        }
        //把value添加arr中
        arr.unshift(value);

        //重置search_list
        localStorage.setItem('search_list',JSON.stringify(arr));

        //页面跳转
        location.href = "searchList.html?key="+value;

    });



});