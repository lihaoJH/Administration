<template>
  <panel title="账号添加">
    <el-form
      ref="user"
      :model="userAdd"
      :rules="userRules"
      style="width: 300px"
      label-width="100px"
      size="small"
    >
      <el-form-item label="账号：" prop="account">
        <el-input v-model="userAdd.account"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password" >
        <el-input v-model="userAdd.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="权限选择：" prop="admin">
        <el-select v-model="userAdd.admin" placeholder="请选择用户权限">
          <el-option label="普通管理员" value="普通管理员"></el-option>
          <el-option label="超级管理员" value="超级管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-row >
            <el-button type="primary" @click="addUser">添加</el-button>
            <el-button @click="$refs.user.resetFields()">重置</el-button>
          </el-row>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import {addNewUser} from "@api/api.js";
export default {
  name: "AddAccount",
  components: {
    Panel,
  },
  data() {
    return {
      userAdd: {
        account: "",
        password: "",
        admin: "",
      },
      userRules: {
        account: [
          { required: true, message: "请输入账号" },
          {
            validator(rule, value, callback) {
              let accountReg = /^[a-z|A-z|\u4E00-\u9FA5]{2,6}$/;
              if (!accountReg.test(value)) {
                callback(new Error("账号为2-6位字符"));
              } else {
                callback();
              }
            },
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator(rules, value, callback) {
              let passwordReg = /^[a-z|A-z|0-9]{2,6}$/;
              if (!passwordReg.test(value)) {
                callback(new Error("密码为2-6位字符"));
              } else {
                callback();
              }
            },
          },
        ],
        admin:[
          {required:true,message:"请选择权限"}
        ]
      },
    };
  },
  methods:{
      addUser(){
        this.$refs["user"].validate(async bool=>{
          if(bool){
          let {msg}= await addNewUser(this.userAdd);
          this.$message.success(msg);
          this.$refs.user.resetFields();
          this.$router.replace({
            path:"/account-list"
          })
          }
        })
      },
  }
};
</script>

<style lang="less" scoped>
</style>