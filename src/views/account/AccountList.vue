<template>
  <panel title="账号列表">
    <el-table
      ref="multipleTable"
      :data="renderData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      class="el-table"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="账号" prop="account" width="150">
      </el-table-column>
      <el-table-column prop="admin" label="用户组" width="250">
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="props">
          <el-row>
            <el-button type="primary" size="mini" @click="changeInfo(props.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="您确定要删除吗？"
              @confirm="singleDelete(props.row)"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                style="margin-left: 10px"
                >删除</el-button
              >
            </el-popconfirm>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="信息编辑"
      :visible.sync="dialogVisible"
      width="30%"
      @click="dialogVisible == false"
    >
      <el-form label-width="80px" :model="user">
        <el-form-item label="账号：">
          <el-input
            placeholder="请输入账号"
            size="small"
            v-model="user.account"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组：" v-show="user.self">
          <el-select v-model="user.admin" placeholder="请选择权限" size="small">
            <el-option label="超级管理员" value="超级管理员"> </el-option>
            <el-option label="普通管理员" value="普通管理员"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="editConfirm"
          >修改</el-button
        >
      </span>
    </el-dialog>
    <div class="block">
      <pagination
        :orderData="[tableData, [5]]"
        @currentChange="getCurrentChange"
      ></pagination>
    </div>
    <el-row style="margin-top: 10px">
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="你确定要删除吗？"
        @confirm="batchDelete"
      >
        <el-button slot="reference" type="danger" style="margin-right: 10px"
          >批量删除</el-button
        >
      </el-popconfirm>
      <el-button type="primary" @click="cancelSelect">取消选中</el-button>
    </el-row>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import Pagination from "@components/Pagination.vue";
import { accountList, userInfoChange, accountBatchDelete } from "@api/api.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AccountList",
  components: {
    Pagination,
    Panel,
  },
  data() {
    return {
      user: {
        account: "",
        admin: "",
        self: false,
      },
      dialogVisible: false,
      tableData: [],
      renderData: [],
      num: 5,
      dialog: {},
      multipleSelection: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    //批量删除
    async batchDelete() {
      if (this.multipleSelection.some((item) => item.id == this.userInfo.id))
        return this.$message.error("自己的信息不能删");
      if (this.multipleSelection.length <= 0)
        return this.$message.error("还没有选择了");
      let id = this.multipleSelection.map((item) => item.id);
      await accountBatchDelete({ id });
      this.renderPage();
    },
    //单个删除
    async singleDelete(data) {
      if (data.id === this.userInfo.id)
        return this.$message.error("不能删除自己哦");
      await accountBatchDelete({ id: data.id });
      this.renderPage();
    },
    //编辑信息弹出框
    changeInfo(data) {
      this.user.self = !(this.userInfo.id == data.id);
      this.dialogVisible = true;
      this.user.account = data.account;
      this.user.admin = data.admin;
      this.user.id = data.id;
    },
    //确定编辑
    async editConfirm() {
       await userInfoChange(this.user);
      this.dialogVisible = false;
      let { data } = await accountList();
      this.tableData = data;
      if (data.length > this.num) {
        for (let i = 0; i < this.num; i++) {
          this.renderData.push(data[i]);
        }
      } else {
        this.renderData = data;
      }
      if (this.user.id == this.userInfo.id) {
        let arr = data.filter((item) => item.id == this.userInfo.id);
        this.updateUserInfo(arr[0]);
      }
    },
    //取消选中
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    //选择改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //页面渲染
    async renderPage() {
      this.renderData = [];
      let { data } = await accountList();
      this.tableData = data;
      if (data.length > this.num) {
        for (let i = 0; i < this.num; i++) {
          this.renderData.push(data[i]);
        }
      } else {
        this.renderData = data;
      }
    },
    //页面改变
    getCurrentChange(data) {
      this.renderData = data;
    },
    ...mapMutations(["updateUserInfo"]),
  },
  created() {
    this.renderPage();
  },
};
</script>

<style lang="less" scoped>
.el-table {
  flex: 1;
  box-sizing: border-box;
}
.block {
  margin-top: 20px;
}
</style>