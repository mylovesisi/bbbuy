import Vue from "vue"
import App from "./App.vue"
//导入饿了么UI
import ElementUI from "element-ui"
import { Message } from "element-ui"
Vue.prototype.Message = Message
import "element-ui/lib/theme-chalk/index.css"
//导入全局的css
import "./assets/statics/site/css/style.css"
//注册elementUI
Vue.use(ElementUI)
//导入全局的moment
import moment from "moment"
//全局的过滤器
//全局的axios 且设置基地址
import axios from "axios"
axios.defaults.baseURL = "http://111.230.232.110:8899"
//添加到原型中
Vue.prototype.$axios = axios
//注册使用axios
Vue.filter("formDate", (value,formatData) =>{
  if(formatData){
    return moment(value).format(formatData)
  }else{
    return moment(value).format("YYYY年MM月DD日")
  }
})
import router from "./router"
new Vue({
  render: h => h(App),
  router
}).$mount("#app")
