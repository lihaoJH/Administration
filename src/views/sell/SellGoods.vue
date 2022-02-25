<template>
  <div class="sellGoods">
    <div>
        <el-form size="small" :inline="true">
      <el-form-item label="时间范围" label-width="80px">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-right: 10px"
        >
        </el-date-picker>
        <el-form-item>
          <el-button type="primary"> 查询</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    </div>
    <div class="g2">
        <columnar-char :data="charData"></columnar-char>
    </div>
   
  </div>
</template> 

<script>
import Panel from "@components/Panel.vue";
import { Chart } from "@antv/g2";
import {census } from"@api/api.js"
import ColumnarChar from "@components/ColumnarChar.vue"
export default {
  name: "SellGoods",
  components: {
    Panel,ColumnarChar
  },
  data() {
    return {
      charData:"",
      value1:""
    };
  },
 async created(){
    let {data}=await census()
    this.charData=data
 }
 
};
</script>

<style lang="less" scoped>
.g2{
    flex: 1;
    padding: 30px;
    padding-top: 50px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
}
.sellGoods{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>