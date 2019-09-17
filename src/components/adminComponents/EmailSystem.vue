<template>
  <div class="emailSystem">
    <el-row type="flex" justify="center">
      <el-col :md="12" :lg="12" :xs="12" :sm="12">
        <b-card
          title="邮件系统"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 100rem;"
          class="left"
        >
          <b-card-text>
            <br />
            <el-form ref="form" label-width="80px">
              <el-form-item label>
                <el-select placeholder="请选择发送邮件对象" v-model="status">
                  <el-option
                    v-for="(item,index) in statusOption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label>
                <el-input type="textarea" :rows="5" placeholder="请输入邮件内容" v-model="mailContent"></el-input>
              </el-form-item>
            </el-form>
          </b-card-text>

          <b-button href="#" variant="primary" @click="sendMail">发送</b-button>
        </b-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailContent: "",
      status: "",
      statusOption: [
        {
          label: "一轮录取 已录取",
          value: 3
        },
        {
          label: "二轮面试 已录取",
          value: 6
        }
      ]
    };
  },
  methods: {
    sendMail() {
      if (this.textarea == "" || this.status == "") {
        this.$message({
          showClose: true,
          message: "信息错误",
          type: "error"
        });
      } else {
        this.$http
          .post("Admin/sendMail", {
            status: this.status,
            mailContent: this.mailContent
          })
          .then(function(data) {
           // console.log(data);
            if (data.body.code == 1) {
              
              this.$message({
                showClose: true,
                message: "发送成功！ 共发送" + data.body.count + "条邮件",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: "该状态无人,请录取后发送邮件",
                type: "error"
              });
            }
          });
      }
    }
  },
  components: {}
};
</script>

<style scope>
.emailSystem {
  margin-top: 30px;
}
</style>
