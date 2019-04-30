import Vue from 'vue'
import App from './App.vue'


//导入全局的css
import './assets/statics/site/css/style.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
