import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.config.productionTip = false

Vue.use(ElementUI);

//做插件
import {getRequest, postRequest, postKeyValueRequest, putRequest, delRequest} from "./utils/api";

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.postKeyValueRequest = postKeyValueRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.delRequest = delRequest

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
