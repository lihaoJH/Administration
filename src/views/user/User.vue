<template>
  <panel title="管理员信息">
    <div class="item">
      <label for="userId">管理员ID:</label>
      <span id="userId">{{ userInfo.id }}</span>
    </div>
    <div class="item">
      <label for="account">账号: </label>
      <span id="account">{{ userInfo.account }}</span>
    </div>
    <div class="item">
      <label for="admin">用户组:</label>
      <span id="admin">{{ userInfo.admin }}</span>
    </div>
    <div class="item">
      <label for="ctime">创建时间:</label>
      <span id="ctime">{{ userInfo.ctime }}</span>
    </div>
    <div class="item photo">
      <label for="headerPhoto">管理员头像:</label>
      <el-upload
        class="avatar-uploader"
        :action="$Url+'/update/userPhoto'"
        :headers="{
            'Authorization':'Bearer-'+token
        }"
        :data="{id:userInfo.id}"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-avatar
          id="headerPhoto"
          style="width: 100px; height: 100px"
          :src="$Url + userInfo.imgUrl"
          fit="contain"
          shape="square"
        ></el-avatar>
      </el-upload>
    </div>
  </panel>
</template>

<script>
import { mapState,mapMutations} from "vuex";
import Panel from "@components/Panel.vue";
export default {
  name: "User",
  components: {
    Panel,
  },
  computed: {
    ...mapState(["userInfo","token"]),
  },
  methods: {
    handleAvatarSuccess(res,file) {
        if(res.code)return this.$message.error(res.msg);
        this.userInfo.imgUrl=res.data.imgUrl;
        this.updateUserInfo(this.userInfo);
    },
    beforeAvatarUpload(file) {
        const imgREG = /.+(png|jpg|gif|jpeg|webp)$/;
         const isJPG =imgREG.test(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    ...mapMutations(["updateUserInfo"])
  },
};
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  padding-top: 0;
}
.item {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  label {
    display: inline-block;
    text-align: right;
    width: 85px;
    margin-right: 10px;
  }
}
.photo {
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
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
}
</style>