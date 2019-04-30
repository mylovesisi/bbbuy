import Vue from 'vue'
import App from './App.vue'
//导入饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入全局的css
import './assets/statics/site/css/style.css'
//导入index.vue
import index from './components/index.vue'
//导入路由
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//注册elementUI
Vue.use(ElementUI);

const router = new VueRouter({
  routes:[{
    path:'/index',
    name:'index',
    component:index
  }]
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
