<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="paging.currentPage"
    :page-sizes="paging.option"
    :page-size="paging.num"
    layout="total, sizes, prev, pager, next, jumper"
    :total="paging.total"
    :hide-on-single-page="paging.ishide"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: ["orderData"],
  data() {
    return {
      paging: {
        total: 0,
        ishide: false,
        currentPage: 1,
        option:[6,10],
        num:6,
        initVal:false
      },
    };
  },
  watch: {
    orderData(to) {
      let [tableData, arr,isDelete] = to;
      if(!this.initVal){
          this.initVal=true;
          this.paging.num=arr[0];
      }
      this.paging.total = tableData.length;
      this.paging.option = arr;
      this.paging.ishide = tableData.length < this.paging.num;
      if(isDelete){
          this.paging.currentPage=1;
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.paging.num = val;
      let arr = [];
      let tableData = this.orderData[0];
      if (tableData.length > val) {
        for (let i = 0; i < this.paging.num; i++) {
          arr.push(tableData[i]);
        }
      } else {
        arr = tableData;
      }
      this.$emit("sizeChanage", arr, val);
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      let arr = [];
      let tableData = this.orderData[0];
      if (tableData.length > this.paging.num * val) {
        for (
          let i = this.paging.num * (val - 1);
          i < this.paging.num * val;
          i++
        ) {
          arr.push(tableData[i]);
        }
      } else {
        for (let i = this.paging.num * (val - 1); i < tableData.length; i++) {
          arr.push(tableData[i]);
        }
      }
      this.$emit("currentChange", arr);
    },
  },
};
</script>

<style lang="less" scoped>
</style>