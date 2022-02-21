<template>
  <panel title="修改密码">
    <el-form
      ref="userPassword"
      :model="userPassword"
      :rules="userRules"
      style="width: 300px"
      label-width="120px"
      size="small"
    >
      <el-form-item label="原密码：" prop="oldPassword">
        <el-input v-model="userPassword.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="userPassword.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="confirmPassword">
        <el-input v-model="userPassword.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button type="primary" @click="changePassword">确定</el-button>
          <el-button @click="$refs.user.resetFields()">重置</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import {passwordChange} from "@api/api.js";
import {mapState,mapMutations} from "vuex";
export default {
  name: "UpPassword",
  data() {
    return {
      userPassword: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      userRules: {
        oldPassword: [
          {
            required:true,message:"请输入原密码"
          }
        ],
        newPassword: [
          {required:true,message:"请输入新密码"},
          {
            validator(rule,value,callback){
              let reg=/^[a-zA-Z0-9]{3,6}$/;
              if(!reg.test(value)){
                callback(new Error("密码为3-6位字符"));
              }else{
                callback();
              }
            }
          }
        ],
        confirmPassword: [
          {required:true,message:"请再次输入新密码"},
          {
            validator:(rule,value,callback)=>{
              if(value!==this.userPassword.newPassword){
                  callback(new Error("两次密码不一致"));
              }else{
                callback();
              }
            }
          }
        ],
      },
    };
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods: {
    changePassword() {
      this.$refs.userPassword.validate(async bool=>{
        if(bool){
            this.userPassword.id=this.userInfo.id;
            let {msg}=await passwordChange(this.userPassword);
            this.$message.success(msg);
            this.RESET_STATE();
            this.$router.push("/login")
        }
      })
    },
    ...mapMutations(["RESET_STATE"])
  },
  components: {
    Panel,
  },
};
</script>

<style lang="less" scoped>
</style>