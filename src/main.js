import Vue from 'vue'
import App from './App'
import tagone from './components/tagone/index.vue';
import tagtwo from './components/tagtwo/index.vue';
import hello from './components/HelloWorld.vue';
import LJRouter from "./lib/LJRouter/src";
Vue.config.productionTip = false
Vue.use(LJRouter)
let router = new LJRouter({
  mode:'hash',
  routes:[
    {
      path:'/',component:hello
    },
    {
      path:'/tagone',component:tagone
    },
    {
      path:'/tagtwo',component:tagtwo
    }
  ]
});
/*router.beforeEach(function(from,to,next) {
  let path = to.path;
  if(path==='/tagtwo') {
    next();
  }else {
    next('/tagtwo')
  }
});*/

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
