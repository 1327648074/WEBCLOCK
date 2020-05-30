<template>
  <el-container>
    <el-header>
      <NavigationBar></NavigationBar>
    </el-header>
    <el-container>
      <el-aside>
        <AsideBar></AsideBar>
      </el-aside>
      <el-main>
        <el-card style="width: 800px;margin: 10px">
          <div slot="header">
            <span><i class="el-icon-lollipop"></i>动态分享</span>
          </div>
          <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="主题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="form.content"
              ></el-input>
            </el-form-item>
          </el-form>
          <span style="text-align: left">图片上传(点击或拖拽)</span>
          <div>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8443/api/img/bg"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              :limit="1"
            >
              <img v-if="form.psrc" :src="form.psrc" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div>
            <el-button type="primary" @click="onSubmit">分 享</el-button>
            <el-button @click="clear">重 置</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from "../components/commons/AsideBar";
import NavigationBar from "../components/commons/NavigationBar";
export default {
  name: "Blog",
  components: { AsideBar, NavigationBar },
  data() {
    return {
      form: {
        title: "",
        content: "",
        commentCount: 0,
        psrc: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    beforeUpload(file) {
      const isJPG = (file.type === "image/png"|| file.type === "image/jpg");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("请上传图片png和JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadSuccess(response) {
      console.log(response);
      this.form.psrc = response;
    },
    clear() {
      this.form.content = "";
      this.form.title = "";
      this.form.psrc = "";
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/blog/my/create", this.form)
            .then(response => {
              if (response.data.code === 200) {
                alert(response.data.message);
                this.clear();
              } else {
                alert(response.data.message);
              }
            })
            .catch(() => {
              alert("分享失败");
            });
        }
      });
    }
  }
};
</script>

<style scoped>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
