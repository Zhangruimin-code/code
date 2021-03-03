$(function() {
    //调用用户的基本信息
    getUserInfo()
        //获取用户的基本信息

    //点击退出，提示退出功能
    $('#loginOut').on('click', function() {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户基本信息失败');
            }
            //调用渲染的数据
            renderAvatar(res.data)
        }
    });
}


//渲染数据
function renderAvatar(user) {

    //获取用户的名称
    var name = user.nickname || user.username;
    //设置用户名称
    $('#welcome').html('欢迎  ' + name)
    if (user.user_pic !== null) {
        //头像显示，文本隐藏
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.avatar').hide()
    } else {
        //头像隐藏，文本显示
        $('.layui-nav-img').hide()
            //获取第一个字符并转换成大写
        var first = name[0].toUpperCase()
        $('.avatar').html(first).show()
    }
}