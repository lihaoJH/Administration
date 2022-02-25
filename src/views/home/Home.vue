<template>
  <div class="content1">
    <div class="card">
      <div class="item">
        <p class="el-icon-document icon"></p>
        <div class="data">
          <p class="title">总订单</p>
          <p class="num">102400</p>
        </div>
      </div>
      <div class="item">
        <p class="el-icon-coin icon"></p>
        <div class="data">
          <p class="title">总销售额</p>
          <p class="num">102400</p>
        </div>
      </div>
      <div class="item">
        <p class="el-icon-s-order icon"></p>
        <div class="data">
          <p class="title">今日订单数</p>
          <p class="num">102400</p>
        </div>
      </div>
      <div class="item">
        <p class="el-icon-money icon" icon></p>
        <div class="data">
          <p class="title">今日销售额</p>
          <p class="num">102400</p>
        </div>
      </div>
    </div>
    <div class="census">
      <line-char :data="charData"></line-char>
    </div>
  </div>
</template>

<script>
import LineChar from "@components/LineChar.vue"
import {census } from"@api/api.js"
export default {
  name: "Home",
  components:{
    LineChar
  },
  data(){
    return {
        charData:""
    }
  },
  methods: {
    
  },
  async created() {
    let { data } = await census();
      this.charData=data;
  },
};
</script>

<style lang="less" scoped>
.content1 {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  .item {
    display: flex;
    width: calc(25% - 15px);
    height: 100px;
    background-color: #fff;
    box-sizing: border-box;
    .icon {
      width: 40%;
      height: 100%;
      text-align: center;
      line-height: 100px;
      font-size: 60px;
      color: skyblue;
    }
    .data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      font-weight: bold;
      .title {
        color: #dedede;
        margin-bottom: 5px;
      }
      .num {
        font-size: 14px;
      }
    }
  }
}
.census {
  flex: 1;
  margin-top: 40px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
</style>