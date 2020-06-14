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

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    console.log(this._router);
  },
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
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
