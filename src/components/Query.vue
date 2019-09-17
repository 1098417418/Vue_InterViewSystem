<template>
  <div>
    <b-container fluid>
      <b-row class="name">
        <b-col sm="3">
          <label>姓名</label>
        </b-col>
        <b-col sm="9">
          <b-form-input  type="text" v-model="name"></b-form-input>
        </b-col>
      </b-row>

      <br />
      <b-row class="phone">
        <b-col sm="3">
          <label>手机号码</label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="phone"></b-form-input>
        </b-col>
      </b-row>
      <br />
      <mt-button type="primary" size="large" @click="queryResult">结果查询</mt-button>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:"",
      phone:""
    }
  },
  methods: {
    queryResult(){
      //数据不符合
      if(this.name.length == 0 || this.phone.length !=11){

                  this.$message({
            showClose: true,
            message: "请检查数据是否正确",
            type: "error"
          });
        return;
      }else{
        var url = "user?name= " + this.name  + "&phone=" + this.phone 
        this.$http.get(url)
        .then(function(data){
          
          var body = data.body

          if(body.code == 1){
            var userInfo = JSON.stringify(body.userInfo)
          localStorage.setItem("userInfo",userInfo)
           this.$router.push(
              {
              name: "QueryResult", //跳转Vue Compoent的名字
               params:{userInfo : userInfo}  //携带的参数
              }
            )
          }else{
                  this.$message({
            showClose: true,
            message: "无法获取该数据",
            type: "error"
          });
        return;
          }
        })
      }
    }
  },
  components: {

  }
}
</script>

<style>
</style>
