<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      v-if="showMenu"
    >
      <el-menu-item index="1">信息中心</el-menu-item>
      <el-menu-item index="2">邮件系统</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1", 
      path: this.$route.path,
      showMenu :true
    };
  },
  methods: {
     handleSelect(key, keyPath) {
      //console.log(key, keyPath);

      if (key == 1) {
        this.$router.push({name:'AdminMain'})
      }
      if (key == 2) {
        this.$router.push({name:'EmailSystem'})
      }
    }
  },
  watch:{
    $route :function(newVal,oldVal){
    //  console.log(newVal + ":" + oldVal)
      var path = this.$route.path
    //  console.log(path)
      if (path == '/Login' || path == '/Admin' || path == '/login' || path == '/admin' || path == '') {
        this.showMenu = false
        // console.log("拦截页面：" + path + ":" + this.showMenu)
      }else{
        this.showMenu = true
        // console.log("不拦截页面：" + path + ":" + this.showMenu)
      }
     
    }
  },
  components: {

  }
};
</script>

<style>
</style>
