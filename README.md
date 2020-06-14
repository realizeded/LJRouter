# LJRouter(仿vue-router)
## 项目背景
为了加深对vue-router原理,所以在看了vue-router大概原理后实现了LJRouter
## 目录结构
```
├─assets
├─components
│  ├─tagone
│  └─tagtwo
└─lib
    └─LJRouter
        └─src
            ├─components
            │  ├─LJLink
            │  ├─LJView
            │  └─notFound
            ├─history
            │  ├─Hashhistory.js
            │  └─Htmlhistory.js
            ├─util
            │  └─util.js
            ├─createMatcher.js
            ├─index.js
            └─install.js

```

* LJ-Link组件(router-link)
* hash模式,根据hash进行组件切换
* history模式,通过replaceState、pushState来进行url切换,而不会重新发起请求,并且通过popState监听状态的变化(当你使用history.go使会触发)
## API
* push
* replace
* back
* addRoutes - 动态添加路由规则
* beforeEach - 全局前置路由
## 例子(使用方法和vue-router一样)
```
import LJRouter from "./lib/LJRouter/src";
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
```
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <lj-view></lj-view>
    <button @click="go">tagone</button>
    <button @click="back">back</button>
    <button @click="replace">tagtwo</button>
    <div><span>lj-link</span></div>
    <lj-link :to="'/tagtwo'" :tag="'div'">tagtwo</lj-link>
    <lj-link :to="'/tagone'" :tag="'span'">tagone</lj-link>
  </div>
</template>
```
```
 methods:{
    go() {
      this.$router.push({path:'/tagone',query:{name:12}})
    },
    back() {
      this.$router.back();
    },
    replace() {
      this.$router.replace({path:'/tagtwo'});
    }
  }
```
## 总结
通过LJRouter的编写,加深了对vue-router的了解
## 缺点
* LJ-View(router-view)组件未实现多个LJ-View(notrouter-view)嵌套的问题
* 有一些api也未实现,优化也不够
## 追加
* 增加not-found组件,当没有相对应的规则时,会展示该组件
