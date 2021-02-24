<script>
// import unip from "./utils/promiseAll.js";
export default {
    onLaunch: function() {
        console.log("App Launch");
        uni.getSetting().then((res) => {
            console.log("res==");
            console.log(res);
        });
        // console.log(unip);
        // unip.getSetting()
        //     .then((res) => {
        //         console.log("res==");
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log("err==");
        //         console.log(err);
        //     });
        // 获取用户信息
        // uin.getSetting({
        //     success: (res) => {
        //         if (res.authSetting["scope.userInfo"]) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //                 success: (res) => {
        //                     console.log("======");
        //                     console.log(res);
        //                     // 可以将 res 发送给后台解码出 unionId
        //                     this.globalData.userInfo = res.userInfo;

        //                     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //                     // 所以此处加入 callback 以防止这种情况
        //                     if (this.userInfoReadyCallback) {
        //                         this.userInfoReadyCallback(res);
        //                     }
        //                 },
        //             });
        //         } else {
        //             console.log("未授权");
        //         }
        //     },
        // });
    },
    onShow: function() {
        console.log("App Show");
    },
    onHide: function() {
        console.log("App Hide");
    },
};
</script>

<style lang="scss">
.bg-contain,
.bg-cover {
    background-repeat: no-repeat;
    background-position: center center;
}
.bg-contain {
    background-size: contain;
}
.bg-cover {
    background-size: cover;
}
</style>
