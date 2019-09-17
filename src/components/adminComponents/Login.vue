<template>
  <div>
    <b-container fluid>
      <b-row align-v="center">
        <b-col sm="12" md="6" offset-md="3">
          <b-card-group deck>
            <b-card
              bg-variant="light"
              header="后台登录"
              header-tag="header"
              footer="@ 2019计算机科研组"
              footer-tag="footer"
            >
              <b-container fluid>
                <b-row class="root">
                  <b-col sm="3">
                    <label>账号</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input type="text" v-model="root"></b-form-input>
                  </b-col>
                </b-row>

                <br />
                <b-row class="password">
                  <b-col sm="3">
                    <label>密码</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input type="password" v-model="password"></b-form-input>
                  </b-col>
                </b-row>
                <br />
                <mt-button type="primary" size="large" @click="login">登录</mt-button>
              </b-container>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      root: "",
      password: ""
    };
  },
  methods: {
    login() {
      var url = "Admin/login?root=" + this.root + "&password=" + this.password;
      this.$http.get(url).then(function(data) {
        var body = data.body;
        if (body.code == 1) {
          this.$message({
            showClose: true,
            message: "欢迎您," + body.admin.root,
            type: "success"
          });

          //写Cookies
          var token = body.token;

          localStorage.setItem("token",token)
          document.cookie =
            "token=" + token + "; expires=" + new Date() + "max-age=" + 60 * 60;
          console.log(body);
          this.$router.push({ name: "AdminMain" });
        } else {
          this.$message({
            showClose: true,
            message: "账号或密码错误",
            type: "error"
          });
        }
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
