// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: (res) => {
            if (res.status !== 0) return layui.layer.msg("数据请求失败！");
            console.log(res);

            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
    });
};
// 渲染用户头像
const renderAvatar = (user) => {
    // 获取用户名字
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
};
getUserInfo()
$("#btnLogout").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});