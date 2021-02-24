import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 测脸数据详情
        testFaceDetail: {},
        // 收货地址
        shippingAddress: {},
        // 用户登录数据
        loginData: {},
        // 用户信息
        userInfo: {},
        // 默认头像
        headimgurl: "https://jianlian-1303209326.cos.ap-nanjing.myqcloud.com/2d8de582ce484784aefcfe06cd3d4544.png",
        // 静态存储地址
        staticUrl: "https://jianlian-1303209326.cos.ap-nanjing.myqcloud.com/",
        kai: 0,
        // 下拉加载
        pulldownLoad: {
            iconType: "circle",
            loadText: {
                loadmore: "轻轻上拉",
                loading: "努力加载中",
                nomore: "实在没有了",
            },
        },
    },
    mutations: {
        // 通用保存
        save: (state, params) => {
            // 判断路径
            if (!params.path) return;
            // 判断数据
            if (!params.data) return;
            // 分割路径
            let keyPath = params.path.split(".");
            // 路径长度
            let keyLength = keyPath.length;
            // 状态别名
            let keySave = state;
            // 默认通过
            let isPass = true;
            // 循环赋值
            for (let i = 0; i < keyLength - 1; i++) {
                keySave = keySave[keyPath[i]];
                if (!keySave) {
                    isPass = false;
                    break;
                }
            }

            // 提前返回
            if (!isPass) return;
            let keyLast = keyPath[keyLength - 1];
            // 判断动作
            if (params.action) {
                if (params.action === "-") keySave[keyLast] = keySave[keyLast] - params.data;
                if (params.action === "+") keySave[keyLast] = keySave[keyLast] + params.data;
                if (params.action === "*") keySave[keyLast] = keySave[keyLast] * params.data;
                if (params.action === "/") keySave[keyLast] = keySave[keyLast] / params.data;
                return;
            }
            keySave[keyLast] = params.data;
        },
    },
});

export default store;
