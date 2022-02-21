<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        :default-active="arrt"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        @open="haddlnOpen"
        @close="haddlnClose"
        @select="haddlnSelect"
        text-color="#eee"
        active-text-color="#3884d3"
        unique-opened
        router
      >
        <div class="header">
          <div class="header-src"><i class="el-icon-dish"></i></div>
          <p>外卖商家中心</p>
        </div>
        <template v-for="item in cardList">
          <el-submenu
            :index="item.router ? item.router : item.id"
            v-if="item.children"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item1.router"
                v-for="item1 in item.children"
                :key="item1.id"
                >{{ item1.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            :index="item.router ? item.router : item.id"
            v-else
            :key="item.id"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {sildMenu} from "@api/api.js";
export default {
  name: "SildMenu",
  data() {
    return {
      arrt: "/home",
      cardList: [],
    };
  },
  methods: {
    haddlnOpen(key) {
      if (this.$route.path != key) {
        this.$router.push(key);
      }
      this.addOpenList(this.getTitle(key));
    },
    haddlnClose() {
      this.addOpenList([]);
    },
    haddlnSelect(key) {
      if (key != "/home") {
        this.addOpenList(this.getTitle(key));
      } else {
        this.addOpenList([]);
      }
    },
    getTitle(key) {
      let arr = [];
      let obj = this.cardList.find((item) =>
        JSON.stringify(item).includes(key)
      );
      arr.push(obj.title);
      if (obj.children) {
        arr.push(
          obj.children.find((item) => JSON.stringify(item).includes(key)).title
        );
      }
      return arr;
    },
    //获取数据
    async getSildMenu() {
      let { data } = await sildMenu();
      if (this.userInfo.admin === "超级管理员") {
        this.cardList = data;
      } else {
        this.cardList = data.filter((item) => item.title != "账号管理");
      }
    },
    ...mapMutations(["addOpenList"]),
  },
  watch: {
    $route(to, from) {
      this.arrt = to.path;
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.getSildMenu();
    this.arrt = this.$route.path;
    if (this.$route.path == "/home") {
      this.addOpenList([]);
    }
  },
};
</script>

<style lang="less" scoped>
.tac {
  width: 200px;
  height: 100%;
  .el-col {
    width: 100%;
    height: 100%;
  }
  .el-menu-vertical-demo {
    width: 100%;
    height: 100%;
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 60px;
  color: #fff;
  box-sizing: border-box;
  .header-src {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    font-size: 25px;
    color: #285778;
    background-color: #1296db;
  }
}
</style>