<template>
  <div id="app">
    <leftNav></leftNav>
    <div class="main">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/LeftNav'
export default {
  name: 'app',
  components:{
    leftNav
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  float: left;
  width: 95%;
  background-color: #ccc;
  height: 100%;
  /* overflow: hidden; */
}
</style>
