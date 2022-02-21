<template>
  <panel title="商品列表" >
    <el-table :data="render" style="width: 100%" size="medium" class="el-table">
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID :">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类 :">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片 :">
              <el-avatar
                shape="square"
                size="medium"
                fit="fill"
                :src="$Url + props.row.imgUrl"
              ></el-avatar>
            </el-form-item>
            <el-form-item label="商品评价 :">
              <span>{{ props.row.rating * 20 }}分</span>
            </el-form-item>
            <el-form-item label="商品描述 :">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称 :">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格 :">
              <span>{{ props.row.price }}元</span>
            </el-form-item>
            <el-form-item label="创建时间 :">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品数量 :">
              <span>{{ props.row.sellCount }}份</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" width="100">
        <template #default="props">
          <span>{{ props.row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template #default="props">
          <el-avatar
            shape="square"
            :size="50"
            fit="fill"
            :src="$Url + props.row.imgUrl"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc" width="300">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="props">
          <el-row>
            <el-button
              type="primary"
              size="mini"
              @click="goodsChange(props.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="goodsDelete(props.row)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="goodsInfo" size="mini" ref="goods">
        <el-form-item label="商品名称：" :label-width="formLabelWidth">
          <el-input
            v-model="goodsInfo.name"
            style="max-width: 300px"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类型：" :label-width="formLabelWidth">
          <el-select v-model="goodsInfo.category" placeholder="请选择商品类型">
            <el-option
              :label="item"
              :value="item"
              v-for="item in dilog.categoryList"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格：" :label-width="formLabelWidth">
          <el-input v-model="goodsInfo.price" style="max-width: 100px">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片：" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="AvatarUploadChange"
            :auto-upload="false"
          >
            <img :src="dilog.imgUrl" class="avatar" />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="goodsInfo.goodsDesc"
            :autosize="{ minRows: 2 }"
            style="max-width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品评分：" :label-width="formLabelWidth">
          <el-rate
            v-model="goodsInfo.rating"
            :change="ratingChange"
            :icon-classes="dilog.iconClass"
            void-icon-class="iconfont icon-face"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          >
          </el-rate>
        </el-form-item>
        <el-form-item label="商品库存：" :label-width="formLabelWidth">
          <el-input v-model="goodsInfo.sellCount" style="width: 100px">
            <span slot="suffix">份</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startUpdateGoods">确 定</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <pagination
        :orderData="[tableData, [5],isDelete]"
        @currentChange="getCurrentChange"
      ></pagination>
    </div>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import Pagination from "@components/Pagination.vue";
import {
  goodsList,
  goodsClassily,
  goodsInfoChange,
  deleteGoods,
} from "@api/api.js";
import { mapState } from "vuex";
export default {
  name: "GoodsList",
  components: {
    Pagination,
    Panel,
  },
  data() {
    return {
      num: 5,
      render: [],
      tableData: [],
      isDelete:false,
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dilog: {
        iconClass: [
          "iconfont icon-sad",
          "iconfont icon-normal",
          "iconfont icon-face",
        ],
        imgUrl: "",
      },
      goodsInfo: {
        name: "",
        category: "",
        goodsDesc: "",
        price: "",
        sellCount: "",
        rating: 0,
      },
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ratingChange(val){
      console.log(val);
    },
    //确定修改
    async startUpdateGoods() {
      for (let key in this.goodsInfo) {
        if (!this.goodsInfo[key]) return this.$message.error("信息不能为空");
      }
      let fd = new FormData();
      for (let key in this.goodsInfo) {
        fd.append(key, this.goodsInfo[key]);
      }
      let { msg } = await goodsInfoChange(fd);
      this.$message.success(msg);
      this.dialogFormVisible = false;
      this.getGoodsList();
      delete this.goodsInfo.file;
    },
    //删除商品
     goodsDelete(data) {
      this.$confirm("确定要删除此商品吗？")
        .then(async (_) => {
          let { msg } = await deleteGoods({id:data.id});
          this.$message.success(msg);
          this.isDelete=true;
          this.getGoodsList();
          
          done();
        })
        .catch((_) => {});
    },
    //商品图片改变
    AvatarUploadChange(file) {
      let reg = /.+(png|jpg|gif|jpeg|webp)$/;
      if (!reg.test(file.raw.type))
        return this.$message.error("请上传一张图片");
      if (file.size / 1024 / 1024 > 2)
        return this.$message.error("图片大小不能超过2m");
      this.dilog.imgUrl = URL.createObjectURL(file.raw);
      this.goodsInfo.file = file.raw;
    },
    //页码改变
    getCurrentChange(arr) {
      this.render = arr;
    },
    //商品编辑
    goodsChange(data) {
      Object.assign(this.goodsInfo, data);
      this.dialogFormVisible = true;
      this.dilog.imgUrl = this.$Url + data.imgUrl;
    },
    //获取商品列表
    async getGoodsList() {
      this.render = [];
      let { data } = await goodsList();
      data=data.map(item=>{
        delete item.ratings
        return item
      } )
      this.tableData = data;
      this.isDelete=false;
      if (data.length > this.num) {
        for (let i = 0; i < this.num; i++) {
          this.render.push(data[i]);
        }
      }
    },
  },
  async created() {
    this.getGoodsList();
    let { data } = await goodsClassily();
    this.dilog.categoryList = data.map((item) => item.cateName);
  },
};
</script>

<style lang="less" scoped>
.el-table {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}

.demo-table-expand {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 150px;
  box-sizing: border-box;
  .el-form-item {
    margin: 0;
    height: 30px;
    justify-content: space-between;
  }
}
.el-rate {
  line-height: 32px;
  /deep/.iconfont {
    font-size: 20px;
  }
}
.block {
  margin-top: 20px;
  padding: 0 20px;
  width: 100%;
  height: auto;
  box-sizing: border-box;
}
</style>