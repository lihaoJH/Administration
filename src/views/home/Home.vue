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
    <div id="census-main" class="census"></div>
  </div>
</template>

<script>
import {init} from "echarts";
import {census } from"@api/api.js"
export default {
  name: "Home",
  methods: {
    initCharts({ xData, data }) {
      let myChart = init(document.getElementById("census-main"));
      myChart.setOption({
        title: {
          text: "数据统计",
          left: "3%",
          top: "3%",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: "3%",
          data: ["订单", "销售额", "注册人数", "管理员人数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          boundaryGap: false,
          data: xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "Total",
            data: data.order,
          },
          {
            name: "销售额",
            type: "line",
            stack: "Total",
            data: data.volume,
          },
          {
            name: "注册人数",
            type: "line",
            stack: "Total",
            data: data.resgNum,
          },
          {
            name: "管理员人数",
            type: "line",
            stack: "Total",
            data: data.adminNum,
          },
        ],
      });
    },
  },
  async created() {
    let { data } = await census();
    this.initCharts(data);
  },
};
</script>

<style lang="less" scoped>
.content1 {
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
  margin-top: 40px;
  width: 100%;
  height: 400px;
  background-color: #fff;
  overflow: hidden;
}
</style>