<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="$route.path == '/home' ? '' : '/home'"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item v-for="(item, index) in openList" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userInfo" >
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        @select="handleSelect"
        router
      >
        <el-submenu index="1">
          <template slot="title">欢迎{{userInfo.account}},{{ userInfo.admin }}</template>
          <el-menu-item index="/user" @click="addOpenList(['管理员信息'])">个人中心</el-menu-item>
          <el-menu-item index="/login" @click="RESET_STATE()">注销登录</el-menu-item>
        </el-submenu>
      </el-menu>

      <el-avatar :size="50" fit="contain" :src="$Url+userInfo.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "UserBar",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(["openList", "userInfo"]),
  },
  watch: {
    "$route.path"(to) {
      if (to == "/home") {
        this.addOpenList([]);
      }
    },
  },
  methods: {
    handleSelect(key) {
      if(key=="/login"){
          localStorage.removeItem("token");
          this.$message.success("注销成功");
      }
    },
    headerBtn() {
      if (this.$route.path != "/user") {
        this.$router.replace({
          path: "/user",
        });
        this.addOpenList(["用户管理"]);
      }
    },
    ...mapMutations(["addOpenList","RESET_STATE"]),
  },
  created() {
   
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  padding: 0 50px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  .userInfo {
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    p {
      margin-right: 10px;
    }
  }
}
/deep/.el-submenu__title{
  border: none !important;
}
</style>