<template>
  <div class="columnarMain">
    <div id="columnarMain"></div>
  </div>
</template>

<script>
import { init } from "echarts";
export default {
  data() {
    return {
      myChar: "",
    };
  },
  props: ["data"],
  /*data:{
        XData:['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        order:[
            {
            type:"Email"
            data: [150, 232, 201, 154, 190, 330, 410]
        }
        ]
  }*/
  methods: {
    startChar(data) {
      this.myChar = init(document.getElementById("columnarMain"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: data.XData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: data.source.map((item) => {
          return {
            name: item.type,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: item.data,
          };
        }),
       
      };
      this.myChar.setOption(option);
    },
    changeSize() {
      this.myChar.resize();
    },
  },
  mounted() {
    window.addEventListener("resize", this.changeSize);
  },
  watch: {
    data(to) {
      if (to) {
        this.startChar(to);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeSize);
  },
};
</script>

<style lang="less" scoped>
.columnarMain{
    width: 100%;
    height: 100%;
    #columnarMain{
        width: 100%;
        height: 100%;
    }
}
</style>