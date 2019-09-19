<template>
  <div         v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  <el-alert
    title="提交服务器需要时间，请勿重复点击提交!  请耐心等待"
    type="success"
    center
    show-icon>
  </el-alert>
    <Form v-on:childUserInfo="commitUserInfo" :userInfo="userInfo"
    ></Form>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Form from "./subComponents/Form";
export default {
  data() {
    return {
      userInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        className: "",
        introduce: "",
        preDepartments: [],
        commitTime: "",
        department: "",
        status: ""
      },
      loading : false
    };
  },
  methods: {
    commitUserInfo(userInfo) {
      //console.log(userInfo);
      this.loading = true
      var name = userInfo.name;
      var phone = userInfo.phone;
      var email = userInfo.email;
      var className = userInfo.className;
      var preDepartments = userInfo.preDepartments;
      var introduce = userInfo.introduce;

      // 如果数据不符合 弹出错误信息
      if (
        name.length == 0 ||
        phone.length != 11 ||
        email.length == 0 ||
        className.length == 0 ||
        preDepartments.length == 0 ||
        introduce.length == 0
      ) {
        this.$message({
          showClose: true,
          message: "请检查数据是否正确",
          type: "error"
        });
         this.loading = false
        return;
      } else {
        //数据符合 提交到后台
        var userInfo = {
          name: name,
          phone: phone,
          email: email,
          className: className,
          preDepartments: preDepartments,
          introduce: introduce
        };

        var json = JSON.stringify(userInfo);
        //console.log(json);
        this.$http.post("user", json).then(function(data) {
          console.log(data);
          if (data.body.code == 1) {
            var id = data.body.Id;

            this.$message({
              showClose: true,
              message: "报名成功！请勿重复报名" + "  Id: " + id,
              type: "success"
            });
             this.loading = false
            return;
          } else {
            this.$message({
              showClose: true,
              message: "提交失败,请联系管理员",
              type: "error"
            });
             this.loading = false
          }
        });
      }
      this.loading = false
    }
  },
  components: {
    Form: Form
  }
};
</script>

<style>
</style>
