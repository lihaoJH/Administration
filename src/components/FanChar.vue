<template>
  <div>
    <div id="fanMain"></div>
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
        title:"Access From",
        source:[
            {
            name:"Email"
            value: 150
        }
        ]
  }*/
  methods: {
    startChar(data) {
      this.myChar = init(document.getElementById("fanMain"));
      let option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: data.title,
            type: "pie",
            radius: "50%",
            data: data.source,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
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
  }
};
</script>

<style lang="less" scoped>
#fanMain{
    width: 100%;
    min-height: 400px;
}
</style>