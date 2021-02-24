import Vue from "vue";
import Vuex from "vuex";
import config from "@/config/index";
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
Vue.mixin({
    data() {
        return {
            unavbar: {
                backgroundStyle: { backgroundColor: "#000000" },
                backTextStyle: { color: "#000000" },
                titleColor: "#ffffff",
                isBack: false,
                borderBottom: false,
            },
            statusBarHeight: systemInfo.statusBarHeight,
        };
    },
    mounted() {},
    computed: {
        ...Vuex.mapState(["loginData", "userInfo", "tabbarLists", "shippingAddress", "testFaceDetail", "kai", "headimgurl", "pulldownLoad"]),
        topHeight() {
            return this.statusBarHeight + this.navBarHeight;
        },
    },
    methods: {
        ...Vuex.mapMutations(["save"]),
        getQuery(query) {
            let str = "";
            let arr = [];
            for (let prop in query) {
                if (query.hasOwnProperty(prop)) {
                    arr.push(prop + "=" + query[prop]);
                }
            }
            str += "?" + arr.join("&");
            return str;
        },
        checkLogin() {
            if (!uni.getStorageSync("openid")) {
                uni.navigateTo({
                    url: "/pages/auth",
                });
            }
        },
        isLogin(data) {
            /**
             * 一般用户直接请求接口认证
             */
            if (!this.userInfo.id) {
                this.goto("loginCheck", "", data);
            }
        },

        async goto(type, url, data, auth) {
            /**
             * type 跳转类型 navigateTo navigateBack redirectTo switchTab
             * url 跳转到哪
             * from 来自哪里
             * data 查询参数
             * auth 是否认证
             * 一般用于点击跳转认证
             */
            let _types = ["", "loginCheck", "reLaunch", "navigateTo", "navigateBack", "redirectTo", "switchTab"];

            /**
             * 底部导航路由
             */
            let _tabbars = ["/pages/index/index", "/pages/courseMall/index", "/pages/index/test-face", "/pages/user/index", "/pages/index/enterprise-wechat"];

            if (_types.includes(type) === false) {
                this.msg("跳转类型错误");
                return;
            }

            // 地址栏拼接参数
            let _data = this.getQuery(data || {});

            /**
             * 如果需要认证，且未登录
             */
            if (auth === true && !this.userInfo.id) {
                uni.navigateTo({
                    url: "/pages/auth/index" + _data,
                });
                return;
            }

            if (_tabbars.includes(url) === true) {
                uni.switchTab({
                    url: url,
                });
                return;
            }

            if (type === "") {
                if (_tabbars.includes(url)) {
                    uni.switchTab({
                        url: url,
                    });
                    return;
                } else {
                    uni.reLaunch({
                        url: url + _data,
                    });
                    return;
                }
            }

            // 登录判断专用
            if (type === "loginCheck") {
                uni.navigateTo({
                    url: "/pages/auth/index" + _data,
                });
                return;
            }

            if (type === "navigateTo") {
                uni.navigateTo({
                    url: url + _data,
                });
                return;
            }
            if (type === "navigateBack") {
                uni.navigateBack();
                return;
            }
            if (type === "redirectTo") {
                uni.redirectTo({
                    url: url + _data,
                });
                return;
            }
            if (type === "switchTab") {
                uni.switchTab({
                    url: url,
                });
                return;
            }
        },
        goUrl(url, query, isAuth) {
            if (isAuth === true && !this.userInfo.id) {
                uni.navigateTo({
                    url: "/pages/auth/index",
                });
            } else {
                uni.navigateTo({
                    url: url + this.getQuery(query),
                });
            }
        },
        goBack(url, query, isAuth) {
            if (isAuth === true && !this.userInfo.id) {
                uni.navigateTo({
                    url: "/pages/auth/index",
                });
            } else {
                uni.navigateBack();
            }
        },
        redirectTo(url, query, isAuth) {
            if (isAuth === true && !this.userInfo.id) {
                uni.redirectTo({
                    url: "/pages/auth/index",
                });
            } else {
                uni.redirectTo({
                    url: url + this.getQuery(query),
                });
            }
        },
        switchTab(url, query) {
            uni.switchTab({
                url: url + this.getQuery(query),
            });
        },
        tabbarBeforeSwitch(index) {
            console.log("index");
            console.log(index);
            return true;
        },
        /**
         * 自定义返回
         */
        on_customBack(e) {
            uni.navigateBack();
        },
        msg(title) {
            uni.showToast({
                title: title,
                icon: "none",
                duration: 1500,
                mask: true,
            });
        },
        _loading(title) {
            uni.showLoading({
                title: title,
                mask: true,
            });
        },
        // 秒转换时分秒
        seconds2his(seconds) {
            let second = Number(seconds);
            if (_isInteger(second)) {
                let h = Math.floor(second / 3600);
                let i = Math.floor((second - h * 3600) / 60);
                let s = Math.floor(second - h * 3600 - i * 60);
                h = h < 10 ? "0" + h : h;
                i = i < 10 ? "0" + i : i;
                s = s < 10 ? "0" + s : s;

                return h + ":" + i + ":" + s;
            } else {
                return "";
            }
        },
        uploadFile(file) {
            return new Promise((resolve, reject) => {
                let sign = help.sign();
                uni.uploadFile({
                    url: config.host + "/HomePage/uploads",
                    filePath: file,
                    name: "uploadFile",
                    header: {
                        accessToken: sign.loginData.token,
                        noncestr: sign.noncestr,
                        timestamp: sign.timestamp,
                        signature: sign.signature,
                    },
                    success: (res) => {
                        console.log("3");
                        console.log(res);
                        if (res.errMsg === "uploadFile:ok") {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    },
                    fail(err) {
                        console.log(4);
                        console.log(err);
                        console.log(config.host + "/HomePage/uploads");
                        reject(err);
                    },
                });
            });
        },
    },
});
