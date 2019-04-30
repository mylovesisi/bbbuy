import Vue from "vue";
import App from "./App.vue";
//导入饿了么UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//导入全局的css
import "./assets/statics/site/css/style.css";
//导入index.vue
import index from "./components/index.vue";
//导入detail.vue
import detail from "./components/detail.vue";
//导入路由
import VueRouter from "vue-router";
//注册路由
Vue.use(VueRouter);
//注册elementUI
Vue.use(ElementUI);
//导入moment
import moment from "moment";
//全局的过滤器
Vue.filter('formDate',value => moment(value).format("YYYY年MM月DD日"))

const router = new VueRouter({
  routes: [
    {
      path: "/index",
      name: "index",
      component: index
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: detail
    },
  ]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
