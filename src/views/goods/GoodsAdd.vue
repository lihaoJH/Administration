<template>
  <panel title="商品添加">
    <el-form label-width="80px" size="small" class="el-form-goods">
      <el-form-item label="商品名称">
        <el-input v-model="goods.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="goods.category" placeholder="请选择商品分类">
          <el-option
            :label="item"
            v-for="item in goods.classily"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品价格">
           <el-input-number v-model="goods.price"  :min="1" :max="10" ></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
          :auto-upload="false"
          ref="upload"
        >
          <img v-if="goods.imageUrl" :src="goods.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          v-model="goods.desc"
          placeholder="暂时保密"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="shopAdd">添加商品</el-button>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
import Panel from "@components/Panel.vue";
import { addShop, goodsClassily } from "@api/api.js";
export default {
  name: "GoodsAdd",
  components: {
    Panel,
  },

  data() {
    return {
      goods: {
        name: "",
        price: 0,
        category: "",
        classily: [],
        desc: "",
        imageUrl: "",
        file: null,
      },
    };
  },
  methods: {
    //商品添加
    async shopAdd() {
      let obj = {
        name: this.goods.name,
        price: this.goods.price,
        category: this.goods.category,
        goodsDesc: this.goods.desc || "暂时保密",
        file: this.goods.file,
      };
      let fromData = new FormData();
      for (let key in obj) {
        fromData.append(key, obj[key]);
      }
      await addShop(fromData);
      for (let key in this.goods) {
        if (key != "classily") {
          this.goods[key] = "";
        }
      }
    },
    //图片改变调用
    beforeAvatarUpload(file) {
      const imgREG = /.+(png|jpg|gif|jpeg|webp)$/;
      const isJPG = imgREG.test(file.raw.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        return this.$message.error("上传头像图片格式有错!");
      }
      if (!isLt2M) {
        return this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.goods.file = file.raw;
      return (this.goods.imageUrl = URL.createObjectURL(file.raw));
    },
  },
  watch: {
    "goods.price"(to) {
      if (Number(to) < 0 || !Number(to)) {
        this.goods.price = 0;
      }
    },
  },
  async created() {
    let { data } = await goodsClassily();
    data = data.filter((item) => {
      return item.state == 1;
    });
    this.goods.classily = data.map((item) => {
      return item.cateName;
    });
  },
};
</script>

<style lang="less" scoped>
.el-form-goods {
  flex: 1;
  max-width: 300px;
  
}
.avatar-uploader,
.el-upload {
  width: 178px;
  height: 178px;
}
.avatar-uploader {
  border: 1px dashed #aaa;
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>