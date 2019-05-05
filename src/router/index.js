import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";
//导入index.vue
import index from "@/components/index.vue";
//导入detail.vue
import detail from "@/components/detail.vue";
//导入购物车
import cart from "@/components/cart.vue";
//导入登录页面
import login from "@/components/login.vue";
//导入订单列表
import userorderlist from "@/components/userorderlist.vue";
//导入订单详情
import orderDetail from "@/components/orderDetail.vue";
//导入用户信息
import userInfo from "@/components/userInfo.vue";
import user from "@/components/user.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
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
    {
      path: "/cart/:id",
      name: "cart",
      component: cart
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/user",
      name: "user",
      component: user,
      children: [
        {
          // 以 / 开头的嵌套路径会被当作根路径 不要加/
          path: "userorderlist",
          component: userorderlist,
          name: "userorderlist"
        },
        {
          // 以 / 开头的嵌套路径会被当作根路径 不要加/
          path: "userInfo",
          component: userInfo,
          name: "userInfo"
        },
        {
          // 以 / 开头的嵌套路径会被当作根路径 不要加/
          path: "orderDetail",
          component: orderDetail,
          name: "orderDetail"
        },
        {
          // 以 / 开头的嵌套路径会被当作根路径 不要加/
          path: "",
          redirect: userInfo,
          name: "userInfo"
        },
      ]
    }
  ]
});
//路由的拦截
router.beforeEach((to, from, next) => {
  //如果访问登录的路由可以执行下一个
  if (to.name === "user") {
     Vue.prototype.$axios.get("http://111.230.232.110:8899/site/account/islogin")
      .then(res => {
        if (res.data.code == "logined") {
          Message({
            type: "success",
            message: "已经登录"
          });
          next();
        } else if (res.data.code == "nologin") {
           Message({
            type: "warning",
            message: "请先登录"
          });
          next({
            name: "login"
          });
        }
      });
    // const logins = window.localStorage.getItem("islogin")
    // if (!logins) {
    //   Message({
    //     type: "warning",
    //     message: "请先登录"
    //   })
    //   next({
    //     name: "login"
    //   })
    // } else {
    //   next()
    // }
  } else {
    next();
  }
});
export default router;
