<template>
  <div>
    <el-table :data="userInfos" type="flex" justify="center">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="班级">
              <span>{{ props.row.className }}</span>
            </el-form-item>

            <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>

            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>

            <el-form-item label="提交时间">
              <span>{{ parseTime(props.row.commitTime)}}</span>
            </el-form-item>

            <el-form-item label="自我介绍">
              <span>{{ props.row.introduce }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable></el-table-column>
      <el-table-column label="名字" prop="name" sortable></el-table-column>
      <el-table-column label="状态" prop="status" :formatter="parseStatus" sortable></el-table-column>
      <el-table-column label="预选部门" prop="preDepartments" :formatter="parsePreDepartment" sortable></el-table-column>

      <el-table-column label="录取部门" prop="department" :formatter="parseDepartment" sortable></el-table-column>

      <el-table-column label="班级" prop="className" sortable></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="editUserInfo(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.status != 0"
            v-b-modal.currentUserInfoModal
            icon="el-icon-edit"
            circle
          >编辑</el-button>
          <el-button
            @click="notifyInterViewOper(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.status == 0"
            v-b-modal.notifyInterViewModal
            icon="el-icon-edit"
            circle
          >通知面试</el-button>
        </template>

        <!-- 查看用户信息 并且修改信息模态框 -->
        <b-modal id="currentUserInfoModal">
          <el-form ref="form" :model="currentUserInfo" label-width="80px">
            <el-form-item label="ID">
              <el-input v-model="currentUserInfo.id" readonly></el-input>
            </el-form-item>

            <el-form-item label="名字">
              <el-input v-model="currentUserInfo.name" readonly></el-input>
            </el-form-item>

            <el-form-item label="班级">
              <el-input v-model="currentUserInfo.className" readonly></el-input>
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input v-model="currentUserInfo.phone" readonly></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="currentUserInfo.email" readonly></el-input>
            </el-form-item>

            <el-form-item label="自我介绍">
              <el-input
                type="textarea"
                v-model="currentUserInfo.introduce"
                readonly
                :autosize="{ minRows: 4, maxRows: 8}"
              ></el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select placeholder="请选择状态" v-model="currentUserInfo.status">
                <el-option
                  v-for="(item,index) in statusOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="录取部门" v-if="currentUserInfo.status == '6'">
              <el-radio v-model="currentUserInfo.department" label="1">技术部</el-radio>
              <el-radio v-model="currentUserInfo.department" label="2">美工部</el-radio>
              <el-radio v-model="currentUserInfo.department" label="3">管理部</el-radio>
              <el-radio v-model="currentUserInfo.department" label="4">媒体部</el-radio>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateStatus">确定修改</el-button>
            </el-form-item>
          </el-form>
        </b-modal>

<!-- 通知信息模态框 -->
        <b-modal id="notifyInterViewModal">
          <el-form ref="form" :model="notifyInterView" label-width="80px">
            <el-form-item label="ID">
              <el-input v-model="notifyInterView.currentId" readonly></el-input>
            </el-form-item>

            <el-form-item label="通知信息">
              <el-input
                type="textarea"
                v-model="notifyInterView.notifyMessage"
                :autosize="{ minRows: 2, maxRows: 4}"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="confirmNotify">确定通知</el-button>
            </el-form-item>
          </el-form>
        </b-modal>
      </el-table-column>
    </el-table>

    <br />
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "",
      userInfos: [],
      currentUserInfo: { status: 0 },
      pageInfo: "",
      total: 100,
      perPage: 10,
      currentPage: 1,
      pageSize: 20,
      notifyMessage: "",
      notifyInterView: {
        currentId: "",
        notifyMessage: ""
      },
      statusOption: [
        {
          label: "已报名",
          value: 0
        },
        {
          label: "一轮面试 已通知",
          value: 1
        },
        {
          label: "一轮面试 已面试",
          value: 2
        },
        {
          label: "一轮面试 未面试",
          value: -2
        },
        {
          label: "一轮面试 录取",
          value: 3
        },
        {
          label: "一轮面试 未录取",
          value: -3
        },
        {
          label: "一轮面试 邮件通知 (通知已录取)",
          value: 4
        },
        {
          label: "二轮面试 已面试",
          value: 5
        },
        {
          label: "二轮面试 未面试",
          value: -5
        },
        {
          label: "二轮面试 已录取",
          value: 6
        },
        {
          label: "二轮面试 未录取",
          value: -6
        },
        {
          label: "二轮面试 邮件通知(通知已录取)",
          value: 7
        }
      ]
    };
  },
  created: function() {
    //定时器  10秒更新一次数据
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        //执行任务
        this.getAllUserInfo();
      }, 10000);
    }
    this.getAllUserInfo();
  },
  destroyed: function() {
    clearInterval(this.timer);
  },
  methods: {

    //获取信息
    getAllUserInfo() {
      this.$http
        .get(
          "Admin/getAllUserInfo?pageNum=" +
            this.currentPage +
            "&pageSize=" +
            this.pageSize,
          { credentials: true }
        )
        .then(function(data) {
          //console.log(data);
          if (data.body.code == 1) {
            this.size = data.body.size;
            this.pageInfo = data.body.pageInfo;
            this.userInfos = this.pageInfo.list;
            this.total = this.pageInfo.total;
            this.currrent = this.pageInfo.pageNum;
            this.perPage = this.pageInfo.perPage;
          }
        });

    },

    //更新状态
    updateStatus() {
      this.$http
        .post("Admin/updateStatus", {
          id: this.currentUserInfo.id,
          status: this.currentUserInfo.status,
          department: this.currentUserInfo.department
        })
        .then(function(data) {
          //   console.log(data);
          if (data.body.code == 1) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
              type: "error"
            });
          }
        });
        this.currentUserInfo.department = ''
    },

    //解析时间
    parseTime(val) {
      var date = new Date(val);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();

      var h = date.getHours(); //时
      var m = date.getMinutes(); //分
      var s = date.getSeconds(); //分

      return `${y}-${m}-${d} ${d}:${m}:${s}`;
    },

    //解析状态
    parseStatus(val) {
      var status = val.status;

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
        return "一轮录取";
      }

      if (status == "-3") {
        return "一轮未录取";
      }

      if (status == "4") {
        return "一轮邮件通知 (通知已录取)";
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
        return "已二轮邮件通知(通知已录取)";
      }
    },
    //解析预选部门
    parsePreDepartment(val) {
      var str = "";
      var preDepartments = val.preDepartments;

      preDepartments.forEach(item => {
        if (item == "1") {
          str += "技术部  ";
        }
        if (item == "2") {
          str += "美工部  ";
        }
        if (item == "3") {
          str += "管理部  ";
        }
        if (item == "4") {
          str += "媒体部  ";
        }
      });
      return str;
    },
    //解析部门
    parseDepartment(val) {
      var value = val.department;
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
    },
    //编辑用户信息
    editUserInfo(row) {
      //console.log(row);
      this.currentUserInfo = row;
    },
    //通知面试
    notifyInterViewOper(row) {
      // console.log(row);
      this.notifyInterView.currentId = row.id;
    },
    //确认通知
    confirmNotify() {
      //内容不匹配
      if (this.notifyInterView.notifyMessage.length == 0) {
        this.$message({
          showClose: true,
          message: "请输入通知内容再通知",
          type: "error"
        });
      } else {
        //发送请求
        this.$http
          .post("Admin/notifyNextInterView", {
            currentId: this.notifyInterView.currentId,
            notifyMessage: this.notifyInterView.notifyMessage
          })
          .then(function(data) {
            // console.log(data);
            if (data.body.code == 1) {
              this.$message({
                showClose: true,
                message: "已通知！请稍等",
                type: "success"
              });
              //修改通知 该Id的状态设置为1
              this.userInfos.forEach(item => {
                //  console.log(item.id == this.notifyInterView.currentId);
                if (item.id == this.notifyInterView.currentId) {
                  item.status = 1;
                }
              });
            }
          });
      }
    }
  },
  components: {},
  watch: {
    currentPage: function(newVal, oldVal) {
      if (newVal != oldVal) {
        // console.log(newVal);
        this.getAllUserInfo();
      }
    }
  }
};
</script>

<style scope>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
