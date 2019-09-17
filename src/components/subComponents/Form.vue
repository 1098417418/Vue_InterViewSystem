<template>
  <div>
    <mt-field
      label="ID"
      placeholder="ID"
      v-model="userInfo.id"
      value="userInfo.id"
      v-if="userInfo.id !== ''"
      readonly
    ></mt-field>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="userInfo.name" aria-required="true"></mt-field>
    <mt-field
      label="手机号"
      placeholder="请输入手机号"
      type="tel"
      v-model="userInfo.phone"
      aria-required="true"
    ></mt-field>
    <mt-field
      label="邮箱"
      placeholder="请输入邮箱"
      type="email"
      v-model="userInfo.email"
      aria-required="true"
    ></mt-field>
    <mt-field
      label="班级"
      placeholder="17计科2班"
      type="text"
      v-model="userInfo.className"
      aria-required="true"
    ></mt-field>

    <!-- <mt-checklist
      title="预选部门"
      align='left'
      v-model="value"
      :options="options"
    ></mt-checklist>-->

    <br />

    <b-form-group label="想加入的部门">
      <b-form-checkbox-group id="checkbox-group-2" v-model="value" name="flavour-2">
        <b-form-checkbox
          v-for="(item,index) in options"
          :key="index"
          :value="item.value"
        >{{item.label}}</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <!-- <div>Selected: <strong>{{ value }}</strong></div> -->

    <br />

    <mt-field
      label="提交时间"
      placeholder="提交时间"
      type="text"
      :value="userInfo.commitTime|parseDate"
      v-if="userInfo.commitTime !== ''"
      readonly
    ></mt-field>

    <mt-field
      label="录取部门"
      placeholder="录取部门"
      type="text"
      :value="userInfo.department|parseDepartment"
      v-if="userInfo.department !== ''"
      readonly
    ></mt-field>
    <mt-field
      label="状态"
      placeholder="状态"
      type="text"
      :value="userInfo.status|parseStatus"
      v-if="userInfo.status !==''"
      readonly
    ></mt-field>
    <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="userInfo.introduce"></mt-field>

    <hr />
    <br />
    <mt-button type="primary" size="large" @click="sendUserInfoToParent">提交</mt-button>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
  data() {
    return {
      value: [],
      options: [
        {
          label: "技术部",
          value: 0
        },
        {
          label: "美工部",
          value: 1
        },
        {
          label: "管理部",
          value: 2
        },
        {
          label: "媒体部",
          value: 3
        }
      ]
    };
  },

  watch: {
    userInfo(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.userInfo = newVal;
        //把预选课程 通过 userInfo获取
        this.value = this.userInfo.preDepartments;
      }
    }
  },

  methods: {
    //发送数据给父组件
    sendUserInfoToParent() {
      this.userInfo.preDepartments = this.value;
      //  console.log(this.userInfo.preDepartments);
      this.$emit("childUserInfo", this.userInfo);
    }
  },
  components: {}
};
</script>

<style scope>
</style>
