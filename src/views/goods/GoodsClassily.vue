<template>
  <panel title="商品分类">
    <el-button
      type="primary"
      size="small"
      slot="btn"
      @click="dialogVisible = true"
      v-if="userInfo.role==='super'"
      >添加分类</el-button
    >
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-width="80px">
        <el-form-item label="分类名称" size="small">
          <el-input v-model="addClassily.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="addClassily.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button size="small" type="primary" @click="addClassilyList"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table
      :data="rebder"
      style="width: 100%"
      class="el-table"
      :default-sort="{ prop: 'id' }"
    >
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="300">
        <template #default="props">
          <el-input
            v-model="props.row.cateName"
            v-if="props.row.flag"
          ></el-input>
          <p v-else>{{ props.row.cateName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template #default="props">
          <el-switch
            v-model="props.row.state"
            :disabled="!props.row.flag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template #default="props">
          <el-row :invaild="true">
            <el-button
              type="success"
              v-if="props.row.flag"
              size="small"
              @click="cateNameChange(props.row)"
              >完成</el-button
            >
            <el-button
              size="small"
              v-else
              @click="props.row.flag = !props.row.flag"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="cateNameDelete(props.row.id)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <pagination
        :orderData="[tableData, [5, 10],isDelete]"
        @currentChange="getCurrentChange"
        @sizeChanage="getSizeChange"
      ></pagination>
    </div>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import Pagination from "@components/Pagination.vue";
import {mapState}from "vuex"
import { addCateName, goodsClassily,deleteCateName,upDateCateName,upDateSwitchChange } from "@api/api.js";
export default {
  name: "GoodsClassly",
  components: {
    Pagination,
    Panel,
  },
  data() {
    return {
      rebder: [],
      tableData: [],
      num: 5,
      isDelete:false,
      dialogVisible: false,
      addClassily: {
        cateName: "",
        state: 0,
      },
    };
  },
  methods: {
    getCurrentChange(arr) {
      this.rebder = arr;
    },
    getSizeChange(arr, val) {
      this.rebder = arr;
      this.num = val;
    },
    //修改商品分类名
   async cateNameChange(data) {
      await upDateCateName(data);
      this.renderPage();
    },
    //删除商品分类名
    async cateNameDelete(id) {
      await deleteCateName({ id });
      this.isDelete=true;
      this.renderPage();
    },
    //页面重排
    async renderPage() {
      let { data } = await goodsClassily();
      this.rebder = [];
      data.map(item=>{
          item.flag=false;
        return item;
      })
      this.tableData = data;
      this.isDelete=false;
      if (data.length > this.num) {
        for (let i = 0; i < this.num; i++) {
          this.rebder.push(data[i]);
        }
      }else{
        this.rebder=data;
      }
    },
    //商品添加分类的取消弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //商品添加分类
    async addClassilyList() {
      //非空验证
      for (let key in this.addClassily) {
        if (this.addClassily[key].toString() == "") {
          return this.$message.error("分类名不能为空");
        }
      }
      //发起添加请求
      await addCateName(this.addClassily);
      this.dialogVisible = false;
      this.renderPage();
    },
  },
  computed:{
    ...mapState(["userInfo"])
  },
  created() {
    this.renderPage();
  },
};
</script>

<style lang="less" scoped>
.wbg {
  padding: 20px;
}
.title {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.el-table {
  flex: 1;
  box-sizing: border-box;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.block {
  width: 100%;
  margin-top: 20px;
}
</style>