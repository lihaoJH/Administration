<template>
  <panel>
    <el-form
      :inline="true"
      :model="formInline"
      size="mini"
      class="demo-form-inline"
    >
      <el-form-item label="订单号">
        <el-input v-model="formInline.num" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.tell" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.status" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="未受理" value="未受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
          <el-option label="无" value=""></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="formInline.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryOrder">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="renderData"
      border
      style="width: 100%"
      :size="num == 10 ? 'mini' : 'samll'"
    >
      <el-table-column prop="num" label="订单号"> </el-table-column>
      <el-table-column prop="startTime" label="下单时间"> </el-table-column>
      <el-table-column prop="tell" label="手机号" >
      </el-table-column>
      <el-table-column prop="user" label="收货人"> </el-table-column>
      <el-table-column prop="adress" label="配送地址" >
      </el-table-column>
      <el-table-column prop="endTime" label="送达时间"> </el-table-column>
      <el-table-column prop="other" label="用户备注"> </el-table-column>
      <el-table-column prop="price" label="订单金额"> </el-table-column>
      <el-table-column prop="status" label="订单状态"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" fixed="right">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <pagination
        :orderData="[orderData, [6, 10],isDelete]"
        @sizeChanage="getSizeChange"
        @currentChange="getCurrentChange"
      ></pagination>
    </div>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import Pagination from "@components/Pagination.vue";
import {orderList } from "@api/api.js"
export default {
  name: "Order",
  components: {
    Pagination,
    Panel,
  },
  data() {
    return {
      isDelete:false,
      formInline: {
        num: "",
        user: "",
        tell: "",
        status: "",
        date: "",
      },
      orderData: [],
      renderData: [],
      tableData: [],
      num: 6,
    };
  },
  methods: {
    getSizeChange(arr, val) {
      this.renderData = arr;
      this.num = val;
    },
    getCurrentChange(arr) {
      this.renderData = arr;
    },
    queryOrder() {
      this.renderData = [];
      if (this.query.length > this.num) {
        for (let i = 0; i < this.num; i++) {
          this.renderData.push(this.query[i]);
        }
      } else {
        this.renderData = this.query;
      }
      this.orderData = this.query;
      this.isDelete=true;
    },
    handleClick(data) {
      console.log(data);
    },
  },
  watch: {
    formInline: {
      handler(to) {
        for (let key in to) {
          if (to[key]) {
            return;
          }
        }
        this.num = 6;
        this.queryOrder();
        this.orderData = this.tableData;
      },
      deep: true,
    },
  },
  computed: {
    query() {
      let obj = {};
      for (let key in this.formInline) {
        if (this.formInline[key]) {
          obj[key] = this.formInline[key];
        }
      }
      return this.tableData.filter((item) => {
        let bool = true;
        for (let key in obj) {
          if (!String(item[key]).includes(obj[key])) {
            bool=false;
          }
        }
        return bool;
      });
    },
  },
  async created() {
    let { data } = await orderList();
    this.renderData = [];
    this.tableData = data;
    this.orderData = data;
    if (data.length > this.num) {
      for (let i = 0; i < this.num; i++) {
        this.renderData.push(data[i]);
      }
    } else {
      this.renderData = data;
    }
  },
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
}
</style>