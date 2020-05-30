<template>
  <div id="background">
    <el-card class="box-card">
      <h2>用户注册</h2>
      <el-form :model="registerForm" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="registerForm.checkpass"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="registerForm.sex" label="男">男</el-radio>
          <el-radio v-model="registerForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item prop="email" label="邮件">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="getCheckCode" :disabled="!isEnable">{{
            content
          }}</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-input v-model="registerForm.checkCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="register" :loading="loading">提交</el-button>
          <el-button v-on:click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkpass !== "") {
          this.$refs.form.validateField("checkpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        name: "",
        pwd: "",
        checkpass: "",
        sex: "男",
        email: "",
        checkCode: ""
      },
      isEnable: true,
      content: "获取验证码",
      loading: false,
      countDown: 60,
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur", required: true }
        ],
        checkpass: [
          { validator: validatePass2, trigger: "blur", required: true }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        checkCode: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    register() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/register", this.registerForm).then(response => {
            if (response.data.code === 200) {
              this.$alert("注册成功");
              this.$router.push({ name: "login" });
            } else {
              this.$alert("注册失败");
            }
          });
        } else {
          console.log("error submit");
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    getCheckCode() {
      this.isEnable = false;
      this.$refs["form"].validateField(["email"], error => {
        if (!error) {
          this.$axios
            .post("/mail", qs.stringify({ email: this.registerForm.email }))
            .then(response => {
              console.log(response.data.message);
            });
          this.setTime();
        } else {
          this.$alert("邮箱错误");
          this.isEnable = true;
        }
      });
    },
    setTime() {
      if (this.countDown === 0) {
        this.isEnable = true;
        this.content = "获取验证码";
        this.countDown = 60;
        return "结束";
      } else {
        this.content = "重新发送(" + this.countDown + ")";
        this.countDown = this.countDown - 1;
      }
      setTimeout(this.setTime, 1000);
    }
  }
};
</script>

<style scoped>
.box-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  bottom: 400px;
  position: relative;
}
.alter {
  width: 200px;
}
#background {
  background-image: url("../assets/bg2.jpg");
  overflow: auto;
}
body {
  margin: 0;
}
</style>
