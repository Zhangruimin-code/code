$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            //用户昵称的验证
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称的长度必须在1-6个字符'
                }
            }
        })
        //初始化用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败!')
                }
                // 调用 form.val() 快速为表单赋值,必须为表单指定lay-filter属性
                //eg: <form class="layui-form" lay-filter="formUserInfo"></form>
                //登录名称会自动显示在iput框中
                form.val('formUserInfo', res.data)
            }
        });
    }
    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: "POST",
                url: "/my/userinfo",
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败')
                    }
                    layer.msg('更新用户信息成功')
                        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                    window.parent.getUserInfo()
                }
            });
        })
        //重置按钮
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        //初始化用户的基本信息
        initUserInfo()
    })
})