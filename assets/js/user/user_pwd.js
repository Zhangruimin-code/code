$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: "POST",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('更新密码失败!');
                    }
                    layui.layer.msg('更新密码成功');
                    //表单重置
                    $('.layui-form')[0].reset()
                        //修改密码后，需要重新登录
                    window.parent.location.href = '/login.html'
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