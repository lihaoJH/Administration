<template>
  <panel title="店铺管理">
    <el-row slot="btn">
      <el-button type="primary" size="small" @click="shopInfoSave">保存</el-button>
    </el-row>
    <div>
      <el-form
        ref="shop"
        :model="shop"
        label-width="80px"
        style="max-width: 500px"
        size="small"
      >
        <el-form-item label="店铺名称">
          <el-input placeholder="店铺名称" v-model="shop.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="shop.notice"
            :autosize="{ minRows: 2 }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="$imgUrl + '/update/shopHeader'"
            :data="shopImgData"
            :headers="{
              Authorization: 'Bearer-' + token,
            }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="uploadImgBefore"
            :on-change="shopImgUploadChange"
            auto-upload
          >
            <img
              v-if="shop.imgHeader"
              :src="$Url + shop.imgHeader"
              fit="cover"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            :action="$imgUrl + '/add/shopImg'"
            list-type="picture-card"
            auto-upload
            :on-change="shopImgUploadChange"
            :before-upload="uploadImgBefore"
            ref="uPshopImg"
            :headers="{
              Authorization: 'Bearer-' + token,
            }"
            :file-list="shop.imgShop"
            :data="shopImgData"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div
              slot="file"
              slot-scope="{ file }"
              style="width: 100%; height: 100%"
            >
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
                fit="contain"
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!shop.disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialog.visible" style="max-width:1000px;margin:auto;">
            <img width="100%" :src="dialog.imgUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input placeholder="配送费" v-model="shop.freight"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input
            placeholder="配送时间"
            v-model="shop.freightTime"
          ></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input
            placeholder="配送快递"
            v-model="shop.freightType"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input placeholder="店铺评分" v-model="shop.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input placeholder="销量" v-model="shop.sales"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="shop.type">
            <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
            <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="shop.startTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </panel>
</template> 

<script>
import Panel from "@components/Panel.vue";
import { shopList, deleteShopImg,changeShopInfo } from "@api/api.js";
import { mapState } from "vuex";
export default {
  name: "Shop",
  components: {
    Panel,
  },
  data() {
    return {
      dialog: {
        visible: false,
        imgUrl: "",
        disabled: false,
      },
      shopImgData: {},
      shop: {
        name: "",
        notice: "",
        imgHeader: "",
        imgShop: [],
        type: [],
        startTime: [],
        freight: "",
        freightTime: "",
        freightType: "",
        score: "",
        sales: "",
      },
    };
  },
  methods: {
    //店铺图片改变
    shopImgUploadChange(file) {
      if (file.status == "ready") {
        this.shopImgData.id = this.userInfo.id;
        this.shopImgData.uid = file.uid;
        this.shopImgData.oldImg = this.shop.imgHeader;
      }
    },
    //店铺图片上传之前
    uploadImgBefore(file) {
      let imgREG = /.+(png|jpg|gif|jpeg|webp)$/;
      let isJPG = imgREG.test(file.type);
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        return this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        return this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //店铺图片删除
    async handleRemove(file) {
      await deleteShopImg({ id: this.userInfo.id, uid: file.uid });
      this.getShopInfo();
    },
    //店铺图片放大
    handlePictureCardPreview(file) {
      this.dialog.visible = true;
      this.dialog.imgUrl = file.url;
    },
    //店铺头像
    handleAvatarSuccess(res, file) {
      this.shop.imgHeader = res.data.imgUrl;
    },
    //店铺信息保存
   async shopInfoSave(){
      let obj=JSON.parse(JSON.stringify(this.shop));
      delete obj.imgHeader;
      delete obj.imgShop;
      obj.id=this.userInfo.id;
      await changeShopInfo(obj);
    },
    //获取店铺信息
    async getShopInfo() {
      let { data } = await shopList({ id: this.userInfo.id });
      data = data.map((item) => {
        if (item.imgShop) {
          item.imgShop = item.imgShop.map((urlItem) => {
            urlItem.url = this.$Url + urlItem.url;
            return urlItem;
          });
        } else {
          item.imgShop = [];
        }
        item.type=item.type?item.type:[];
        return item;
      });
      Object.assign(this.shop, data[0]);
    },
  },
  computed: {
    ...mapState(["userInfo", "token"]),
  },
  created() {
    this.getShopInfo();
  },
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload-list__item-thumbnail {
  width: auto;
}
</style>