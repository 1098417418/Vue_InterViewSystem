<template>
  <div class="row" >
    <mt-tabbar v-model="selected" fixed>
      <router-link to="Main" tag="span" class="col-md-4 col-sm-4">
        <mt-tab-item id="主页">
          <img slot="icon" src="../../assets/home.png" />
          主页
        </mt-tab-item>
      </router-link>
      <router-link to="SignUp" tag="span" class="col-md-4 col-sm-4">
        <mt-tab-item id="报名">
          <img slot="icon" src="../../assets/报名.png" />
          报名
        </mt-tab-item>
      </router-link>
      <router-link to="Query" tag="span" class="col-md-4 col-sm-4">
        <mt-tab-item id="查询">
          <img slot="icon" src="../../assets/查询.png" />
          查询
        </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected:''
    };
  },
  methods: {},
  components: {}
};
</script>

<style>
</style>
