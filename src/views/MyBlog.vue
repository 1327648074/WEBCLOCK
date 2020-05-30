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
        <ShareCard
          style="float: left"
          :data="sharedData"
          :is-login="isLogin"
        ></ShareCard>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from "../components/commons/AsideBar";
import NavigationBar from "../components/commons/NavigationBar";
import ShareCard from "@/components/ShareCard";
import qs from "qs";
export default {
  name: "MyBlog",
  components: { AsideBar, NavigationBar, ShareCard },
  data() {
    return {
      sharedData: [
      ],
      isLogin: false,
      pageCount: 9,
      page: 1,
      loading: false,
      isEnd: false
    };
  },
  methods: {
    getBlogBypage(page) {
      this.$axios
        .post("/blog/my/self", qs.stringify({ page: page }))
        .then(response => {
          this.sharedData = this.sharedData.concat(response.data.content);
          this.page = response.data.number + 1;
          this.pageCount = response.data.totalPages;
        })
        .catch(() => {
          this.$message("请登录");
          this.$router.replace("/login");
        });
    },
    changePage() {
      console.log("滚动加载");
      if (this.page < this.pageCount) {
        this.getBlogBypage(this.page + 1);
      } else {
        this.isEnd = true;
      }
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          2;
        if (bottomOfWindow && this.loading === false && !this.isEnd) {
          this.loading = true;
          this.changePage();
          setInterval(() => {
            this.loading = false;
          }, 2000);
        }
      };
    }
  },
  mounted() {
    this.getBlogBypage(this.page);
    this.scroll();
  }
};
</script>

<style scoped></style>
