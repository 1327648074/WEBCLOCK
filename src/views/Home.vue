<template>
  <div class="home" style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="background-color: #39a6fb;margin: 0;">
        <div class="header" style="margin: 0">
          <div class="left">
            <i class="el-icon-chat-line-round"></i>
            <span style="color: #303133"> 摩卡社区</span>
          </div>
          <div class="right">
            <div class="inlineBlock">
              <el-button
                icon="el-icon-search"
                circle
                style="background-color: unset;display: inline-block"
                @click="handleSearchBtn"
                v-if="false"
              >
              </el-button>
            </div>
            <div class="inlineBlock">
              <el-input v-show="searchVisible" v-model="searchData"></el-input>
            </div>
            <div class="inlineBlock">
              <el-dropdown @command="handleDropdownSelected">
                <span class="el-dropdown-link"
                  >{{ username
                  }}<i class="el-icon-arrow-down el-icon--right"></i
                ></span>
                <el-dropdown-menu slot="dropdown" v-if="!isLogin">
                  <el-dropdown-item icon="el-icon-plus" command="login"
                    >登录</el-dropdown-item
                  >
                  <el-dropdown-item
                    icon="el-icon-circle-plus"
                    command="register"
                    >注册</el-dropdown-item
                  >
                </el-dropdown-menu>
                <el-dropdown-menu slot="dropdown" v-else>
                  <el-dropdown-item icon="el-icon-plus" command="user"
                    >个人主页</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-circle-plus" command="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-main style="margin: 0 ;background-color: #2265a3" id="elMainScroll">
        <!--        <el-carousel-->
        <!--          :interval="5000"-->
        <!--          arrow="always"-->
        <!--          height="600px"-->
        <!--          style="margin: 0"-->
        <!--        >-->
        <!--          <el-carousel-item v-for="item in bgPSrc" :key="item">-->
        <!--            <el-image style="width: 1500px;height: 600px" :src="item" fit="cover"></el-image>-->
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->
        <h1 style="text-align: center">社区分享</h1>
        <ShareCard :data="sharedData" :is-login="isLogin"></ShareCard>
        <el-tag style="text-align: center" v-show="isEnd">没有更多了</el-tag>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import qs from "qs";
import ShareCard from "@/components/ShareCard";
export default {
  name: "Home",
  components: { ShareCard },
  data() {
    return {
      searchVisible: false,
      searchData: "",
      username: "未登录",
      isLogin: false,
      pageCount: 9,
      page: 1,
      loading: false,
      isEnd: false,
      bgPSrc: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590147203123&di=9a748041be4e4fbf657b6d5307a26c34&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1511%2F28%2Fc30%2F15840871_1448702435966.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590147161903&di=2492f59a4b4326eef863e12a7075a664&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2155983538%2C3860699715%26fm%3D214%26gp%3D0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587557467687&di=225338a169c626d9bd9389e485195a5e&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg"
      ],
      sharedData: []
    };
  },
  methods: {
    handleSearchBtn() {
      if (this.searchData === "") {
        this.searchVisible = !this.searchVisible;
      } else {
        this.searchData = "";
        this.searchVisible = false;
      }
    },
    changePage() {
      console.log("滚动加载");
      if (this.page < this.pageCount) {
        this.getBlogBypage(this.page + 1);
      } else {
        this.isEnd = true;
      }
    },
    handleDropdownSelected(command) {
      switch (command) {
        case "login":
          this.$router.push("/login");
          break;
        case "register":
          this.$router.push("/register");
          break;
        case "logout":
          this.$axios.get("/logout").then();
          this.$router.replace("/login");
          break;
        case "user":
          this.$router.replace("/user");
          break;
      }
    },
    getLoginInfo() {
      this.$axios
        .get("/info")
        .then(response => {
          this.username = response.data.name;
          this.isLogin = true;
        })
        .catch(() => {});
    },
    getBlogBypage(page) {
      this.$axios.post("/blog", qs.stringify({ page: page })).then(response => {
        this.sharedData = this.sharedData.concat(response.data.content);
        this.page = response.data.number + 1;
        this.pageCount = response.data.totalPages;
      });
    },
    scroll() {
      let element = window.document.getElementById("elMainScroll");

      // eslint-disable-next-line no-unused-vars
      let bottomOfWindow =
        -element.offsetHeight - element.scrollTop + element.scrollHeight < 50;
      console.log( -element.offsetHeight - element.scrollTop + element.scrollHeight);
      if (bottomOfWindow && this.loading === false && !this.isEnd) {
        this.loading = true;
        this.changePage();
        setInterval(() => {
          this.loading = false;
        }, 1500);
      }
    }
  },
  mounted() {
    this.getLoginInfo();
    this.getBlogBypage(this.page);
    window.document.getElementById("elMainScroll").onscroll = this.scroll;
  }
};
</script>
<style>
.el-card {
  margin: 0px;
}
.header {
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  border: #294d99;
}
.left {
  float: left;
  margin-left: 100px;
  display: inline-block;
}
.right {
  float: right;
  margin-right: 50px;
  display: inline-block;
}
.inlineBlock {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 2px;
  margin-left: 2px;
}
.row {
  width: 100%;
}
</style>
