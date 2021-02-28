$(function() {
    // 登录页面
    $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        // 注册页面
    $('#link_reg').on('click', function() {
            $('.reg-box').show();
            $('.login-box').hide();
        })
        // 密码验证
        // form表单的验证
    var form = layui.form;
    //弹出层
    var layer = layui.layer;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //两次密码的验证
            repwd: function(value) {
                var pwd = $('.reg-box [name = password]').val()
                if (value != pwd) {
                    return '两次密码输入不一致'
                }
            }
        })
        //注册表单的提交监听事件
    $('.reg-box').on('submit', function(e) {
            //阻止默认行为
            e.preventDefault();
            var data = {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    layui.layer.msg(res.msg);
                }
                layui.layer.msg('注册成功，请登录');
                $('#link_login').click();
            })
        })
        //登录表单提交事件的监听
    $('.login-box').on('submit', function(e) {
        //阻止表单的默认行为
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/login",
            //快速获取表单的值
            data: $('#form-login').serialize(),
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败!');
                }
                layui.layer.msg('登录成功!');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    })

})