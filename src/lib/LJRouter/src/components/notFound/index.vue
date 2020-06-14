<template>
  <div class="not_found">
      <div>
        <span class="title">{{title}}</span>
      </div>
  </div>
</template>
<script>
  export default {
    name:'notFound',
    data() {
      return {title:'404'}
    }
  }
</script>
<style lang="css" scoped>
.title {
  font-size: 20px;
  color: blue;
  font-weight: bolder;
  font-style:italic;
  mix-blend-mode: color;
}
</style>
