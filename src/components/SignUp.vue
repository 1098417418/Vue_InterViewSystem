<template>
  <div>
    <Form v-on:childUserInfo="commitUserInfo" :userInfo="userInfo"></Form>
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
      }
    };
  },
  methods: {
    commitUserInfo(userInfo) {
      console.log(userInfo);
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
        console.log(json);
        this.$http.post("user", json).then(function(data) {
          console.log(data);
          if (data.body.code == 1) {
            var id = data.body.Id;

            this.$message({
              showClose: true,
              message: "报名成功！请勿重复报名" + "  Id: " + id,
              type: "success"
            });
            return;
          } else {
            this.$message({
              showClose: true,
              message: "提交失败,请联系管理员",
              type: "error"
            });
          }
        });
      }
    }
  },
  components: {
    Form: Form
  }
};
</script>

<style>
</style>
