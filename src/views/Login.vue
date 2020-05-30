<template>
  <div id="background">
    <el-card class="box-card">
      <el-button style="float: right" icon="el-icon-caret-right" type="text" @click="gotoRegister">还没注册？请注册</el-button>
      <br>
      <br>
      <h2>用户登录</h2>

      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        prefix-icon="el-icon-user-solid"
      ></el-input
      ><br /><br />
      <el-input
        v-model="loginForm.password"
        placeholder="请输入密码"
        show-password
        prefix-icon="el-icon-edit"
      ></el-input
      ><br /><br />
      <div>
        <el-input
          v-model="loginForm.verify"
          placeholder="请输入验证码"
          prefix-icon="el-icon-edit"
          style="width: 200px;margin-left: 0px"
        >
        </el-input
        ><img
          :src="imgSrc(rand)"
          style="margin-left: 10px"
        />
        <el-button type="text" @click="reGetImage">换一张</el-button>
      </div>
      <br>
      <el-button
        round
        icon="el-icon-thumb"
        type="primary"
        :loading="loading"
        v-on:click="login"
        >登录</el-button
      >

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        verify: ""
      },
      rand: Math.random(),
      loading: false,
      isAdmin: false,
      base: "http://localhost:8443/api/verifyCode?"
    };
  },
  computed: {
    imgSrc() {
      return rand => {
        return this.base + rand;
      };
    }
  },
  methods: {
    reGetImage() {
      this.rand = Math.random();
    },
    gotoRegister(){
      this.$router.push("/register");
    },
    login() {
      this.loading = true;
      this.$axios
        .post("/login", this.loginForm)
        .then(response => {
          if (response.data.code === 200) {
            if (this.isAdmin) {
              this.$router.push({ name: "Manage" });
            } else {
              this.$router.push({ name: "Home" });
            }
          } else {
            this.loading = false;
            this.$alert(response.data.message, {
              customClass: "alter",
              center: true
            });
            this.reGetImage();
          }
        })
        .catch(e => {
          this.loading = false;
          this.$alert(e, { customClass: "alter", center: true });
        });
    },
    test() {
      this.$axios.get("/test").then(response => {
        console.log(response);
      });
    }
  },
  mounted() {}
};
</script>
<style>
.box-card {
  width: 400px;
  margin: auto;
  transform: translateY(50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.alter {
  width: 200px;
}
#background {
  background-image: url("../assets/bg2.jpg");
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
}
body {
  margin: 0;
}
</style>
