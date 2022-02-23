<template>
  <div class="login-main">
    <div class="box">
      <div class="login-page">
        <h4>系统登录</h4>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" :type="active?'text':'password'" show-password prefix-icon="el-icon-lock" >
              <i slot="suffix" suffix-icon="el-icon-view"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login">
          <input type="submit" value="登录" class="fff" @click="loginSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {login} from "@api/api.js"
export default {
  name: "Login",
  data() {
    return {
      ruleForm: { account: "", password: "" },
      active:true,
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            validator(rule,value,callback){
              let accountReg=/^[a-z|A-z|\u4E00-\u9FA5]{2,6}$/
                if(!accountReg.test(value)){
                  callback(new Error("账号为2-6位字符"));
                }else{
                    callback();
                }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator(rules,value,callback){
              let passwordReg=/^[a-z|A-z|0-9]{2,6}$/
                if(!passwordReg.test(value)){
                  callback(new Error("密码为2-6位字符"));
                }else{
                    callback();
                }
            }
          }
        ],
      },
    };
  },
  methods: {
    loginSubmit() {
      this.$refs["ruleForm"].validate(async (bool) => {
        if (bool) {
       let {data}=  await login(this.ruleForm)
              this.COMMIT_TOKEN({
                token: data.token,
              });
              this.updateUserInfo({
                account: data.account,
                admin: data.admin,
                ctime: data.ctime,
                imgUrl: data.imgUrl,
                id: data.id,
              });
              this.$router.push("/");
        }
      });
    },
    ...mapMutations(["COMMIT_TOKEN", "updateUserInfo"]),
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/login.css");
.login-main {
  width: 100%;
  height: 100%;
  background: linear-gradient(
      120deg,
      rgb(6, 129, 140) 0%,
      rgb(16, 70, 115) 100%
    )
    no-repeat;
  box-sizing: border-box;
}
</style>