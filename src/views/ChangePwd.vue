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
        <el-card style="width: 800px ;margin: 40px">
          <div slot="header">
            <span><i class="el-icon-setting"></i>密码修改</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="新密码" prop="password">
              <el-input v-model="form.newPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
              <el-input v-model="form.confirmPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import qs from "qs";
import AsideBar from "../components/commons/AsideBar";
import NavigationBar from "../components/commons/NavigationBar";
export default {
  name: "ChangePwd",
  components: { AsideBar, NavigationBar },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.confirmPwd !== "") {
          this.$refs.form.validateField("checkpass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        username: [{ required: true, message: "不能为空" }],
        password: [
          { validator: validatePass, trigger: "blur", required: true }
        ],
        checkpass: [
          { validator: validatePass2, trigger: "blur", required: true }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/user/modify/pwd", qs.stringify({ pwd: this.form.newPwd }))
            .then(reponse => {
              alert(reponse.data.message);
            });
        }
      });
    }
  }
};
</script>

<style scoped></style>
