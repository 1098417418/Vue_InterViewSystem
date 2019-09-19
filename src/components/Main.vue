<template>
  <div>
    <b-card
      title="当前用户"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 200rem;"
      class="mb-2"
    >
      <b-card-text>
        <h4>
          <b-button variant="primary">ID:{{currentUserInfo.currentId}}</b-button>
          <b-button variant="primary">名字:{{name}}</b-button>
        </h4>
        <h4><b-button variant="primary">通知信息:{{currentUserInfo.notifyMessage}}</b-button></h4>
      </b-card-text>
      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center"
          v-for="(item,index) in userInfos"
          :key="index"
        >
          {{item.name}}
          <b-badge variant="primary" pill>{{item.id}}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import { resolve } from "url";
export default {
  data() {
    return {
      currentUserInfo: '',
      size: '',
      name: '',
      userInfos: '',
    };
  },
  created: function() {
    this.getCurrentIdAndUserInfo();
    this.init();
  },
  destroyed: function(){
    this.close();
  },
  methods: {

    //通过get请求获取数据
    getCurrentIdAndUserInfo() {
      this.$http.get("CurrentIdAndUserInfo").then(function(data) {
        var body = data.body;
        this.parseData(body)
      });
    },

    //解析数据
    parseData(data){
       // console.log(data)
        data = JSON.parse(data + '')
        this.currentUserInfo = data.currentUserInfo;
        this.size = data.size;
        this.userInfos = data.userInfos;
        this.name = data.name;
        
    },


    //websocket
    init: function() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket("ws://cofa.top:8888/websocket");
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function() {
      console.log("socket连接成功");
    },
    error: function() {
      console.log("连接错误");
    },
    getMessage: function(msg) {
      // console.log(111);
     // console.log(msg.data);
      //解析数据
      this.parseData(msg.data)
    },
    send: function() {
      this.socket.send(params);
    },
    close: function() {
      console.log("socket已经关闭");
    }

    //websocket end
  },
  components: {},
  watch: {
    currentId: function(newVal, oldVal) {
      this.getCurrentUserInfo();
    }
  }
};
</script>

<style>
</style>
