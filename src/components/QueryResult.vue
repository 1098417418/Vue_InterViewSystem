<template>
  <div>
    <Form :userInfo="userInfo_"></Form>
  </div>
</template>

<script>
import Form from "./subComponents/Form";
export default {
  data() {
    return {
      userInfo_: {
        id: "",
        name: "",
        phone: "",
        email: "",
        className: "",
        introduce: "",
        preDepartments: "",
        commitTime: "",
        department: "",
        status: ""
      }
    };
  },
  methods: {},
  mounted: function() {
    //获取结果

    //当刷新本页面时 直接从localStorage获取
     if (typeof this.$route.params.userInfo  === "undefined") {
     
      this.userInfo = localStorage.getItem("userInfo");
    } else {
      this.userInfo = this.$route.params.userInfo;
    }


//console.log(this.userInfo)

    //转化为JSON数据
    let jsonData = JSON.parse(this.userInfo);
    //Json对象 引用这些数据 字段会赋值进去
    this.userInfo_ = jsonData;
    // console.log("父组件要发送的数据：" + this.userInfo)
  },
  components: {
    Form
  }
};
</script>

<style>
</style>
