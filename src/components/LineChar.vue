<template>
<div class="lineChar">
     <div id="charMain"></div>
</div>
   
  
</template>

<script>
import { init } from "echarts";
export default {
    name:"LineChar",
  data() {
    return {
      myChar: "",
    };
  },
  props: ["data"],
  /*data:{
        XData:['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        source:[
            {
            type:"Email"
            data: [150, 232, 201, 154, 190, 330, 410]
        }
        ]
  }*/
  methods: {
    startChar(data) {
      this.myChar = init(document.getElementById("charMain"));
      let option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: data.source.map((item) => {
            return item.type;
          }),
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
          boundaryGap: false,
          data: data.XData,
        },
        yAxis: {
          type: "value",
        },
        series: data.source.map((item) => {
          return {
            name: item.type,
            type: "line",
            stack: "Total",
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
.lineChar{
    margin-top: 20px;
    width: 100%;
    height: 400px;
    overflow: hidden;
    #charMain{
        width: 100%;
        height: 100%;
    }
}
</style>