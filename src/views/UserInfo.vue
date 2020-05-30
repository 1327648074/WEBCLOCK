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
        <el-card style="margin: 10px;width: 800px">
          <div slot="header">
            <span><i class="el-icon-user-solid"></i>个人信息</span>
          </div>
          <el-form ref="form" :model="form" label-width="30%" :rules="rules">
            <el-form-item label="用户名">
              <el-col :span="11">
                <span>{{ form.name }} </span>
              </el-col>
            </el-form-item>
            <el-form-item label="头像">
              <el-col :span="11">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8443/api/img/u"
                  :show-file-list="false"
                  :with-credentials="true"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload"
                  :limit="1"
                >
                  <img v-if="form.psrc" :src="form.psrc" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-form-item>
            <el-form-item label=" 邮箱" prop="email">
              <el-col :span="11">
                <el-input v-model="form.email"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.birthday"
                  style="width: 100%;"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :default-value="time"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <el-col :span="11">
                <el-select v-model="form.sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="11">
                <el-button type="primary" @click="onSubmit"> 保存</el-button>
                <el-button @click="clear"> 重置</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from "../components/commons/AsideBar";
import NavigationBar from "../components/commons/NavigationBar";
export default {
  name: "UserInfo",
  components: { AsideBar, NavigationBar },
  data() {
    return {
      form: {
        name: "sdfsdf",
        email: "",
        sex: "",
        psrc: "",
        birthday: "2015-01-02"
      },
      oldData: {},
      time: new Date("2000-01-01"),
      rules: {
        email: [{ required: true, message: "输入邮箱", trigger: "blur" }],
        sex: [{ required: true, message: "选择性别", trigger: "blur" }],
        birthday: [{ required: true, message: "输入生日", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$axios.post("/user/modify/info", this.form).then(response => {
            alert(response.data.message);
          });
        }
      });
    },
    getUserInfo() {
      this.$axios
        .get("/info")
        .then(reponse => {
          this.oldData = reponse.data;
          this.clear();
        })
        .catch(() => {
          alert("请登录");
          this.$router.replace("/login");
        });
    },
    clear() {
      this.form.name = this.oldData.name;
      this.form.email = this.oldData.email;
      this.form.sex = this.oldData.sex;
      this.form.birthday = this.oldData.birthday;
      this.form.psrc = this.oldData.psrc;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpg";
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
    }
  },
  mounted() {
    this.getUserInfo();
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
