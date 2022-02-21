<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header" v-if="title">
        <span>{{title}}</span>
        <slot name="btn"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: "Panel",
  props:["title"]
};
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    flex: 1;
      overflow-y:scroll ;
      &::-webkit-scrollbar{
          width: 0;
      }
  }
</style>