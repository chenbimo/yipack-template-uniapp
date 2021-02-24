import Vue from "vue";
import App from "./App";
import store from "@/vuex/index.js";

Vue.config.productionTip = false;

App.mpType = "app";

// 插件导入
import "@/autoload/index.js";
// 全局样式
import "@/styles/index.scss";

const app = new Vue({
    store,
    ...App,
});
app.$mount();
