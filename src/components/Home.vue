<template>
  <div>
    <home-header></home-header>
    <router-view class="mainContent"></router-view>
     <home-bottom></home-bottom>
  </div>
</template>

<script>

import HomeHeader from './publicComponents/HomeHeader.vue'
import HomeBottom from './publicComponents/HomeBottom.vue'

export default {
  name: 'Home',
  data () {
    return {
     
    }
  },
  components: {HomeHeader:HomeHeader,HomeBottom}
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainContent{
  margin-top:0px;
  margin-bottom: 60px;
  max-height: 100%  
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
