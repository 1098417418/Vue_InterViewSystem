// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import Vuex from 'vuex'

import Mint from 'mint-ui'
import Resource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'

import 'jquery/dist/jquery.js'
import 'mint-ui/lib/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Mint)
Vue.use(Resource)
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
Vue.http.options.root = 'http://127.0.0.1:8888/'



Vue.http.interceptors.push((request, next) => {
  request.headers.set('token', localStorage.getItem('token')) //setting request.headers
  request.headers.set('Content-Type', 'application/json') //setting request.headers
 // console.log(request.headers)  
  next((response) => {
    return response
 })
})



const state = {userInfo: null}
const getters = {
  getUserInfo(state){
    return state.userInfo;
  }

}

const mutations = {
  setUserInfo(state,value){
    state.userInfo = value;
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations
});


//过滤器  
//解析时间
Vue.filter('parseDate',function(date) {
  var date = new Date(date);
//  console.log(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours(); //时
  var minute = date.getMinutes(); //分
  var second = date.getSeconds(); //分

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
})

//解析状态
Vue.filter('parseStatus',function(status) {
  if (status == "0") {
    return "已报名";
  }

  if (status == "1") {
    return "一轮面试 已通知";
  }

  if (status == "2") {
    return "一轮面试 已面试";
  }

  if (status == "-2") {
    return "一轮面试 未面试";
  }

  if (status == "3") {
    return "一轮面试 录取";
  }

  if (status == "-3") {
    return "一轮面试 未录取";
  }

  if (status == "4") {
    return "一轮面试 邮件通知 (通知已录取)";
  }

  if (status == "5") {
    return "二轮面试 已面试";
  }

  if (status == "-5") {
    return "二轮面试 未面试";
  }

  
  if (status == "6") {
    return "二轮面试 已录取";
  }

  if (status == "-6") {
    return "二轮面试 未录取";
  }

  
  if (status == "7") {
    return "二轮面试 邮件通知(通知已录取)";
  }

}
  
  )

// 解析录取部门
Vue.filter('parseDepartment',function(value) {
  if (value == "0") {
    return "暂无录取";
  }
  if (value == "1") {
    return "技术部";
  }
  if (value == "2") {
    return "美工部";
  }
  if (value == "3") {
    return "管理部";
  }
  if (value == "4") {
    return "媒体部";
  }
})

// 解析录取部门
Vue.filter('parsePreDepartment',function(value) {
  var str = ''
  value.forEach(item => {
    if (item == "1") {
      str +=  "技术部 ";
    }
    if (item == "2") {
      str +=  "美工部 ";
    }
    if (item == "3") {
      str +=  "管理部";
    }
    if (item == "4") {
      str +=  "媒体部";
    }
    console.log(str)
    return str
  })
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>',
  store: store
})
