<template>
  <el-container style="height: 100%">
    <el-header style="background-color: #39a6fb;margin: 0;">
      <el-page-header style="margin: 10px" @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>

    <div class="myMenu" style="margin: 0 ;background-color: #2265a3; height: 100%">
      <comment
        style="width: 600px;margin: 0 auto;"
        :blog="blogData"
        :commentData="comments"
        :page="page"
        :pageCount="pageCount"
        @changePage="getCommentsData"
      ></comment>
    </div>
  </el-container>
</template>

<script>
import qs from "qs";
import comment from "@/components/comment";
export default {
  components: {
    comment
  },
  data() {
    return {
      blogData: {},
      comments: [],
      blogId: 0,
      page: 0,
      pageCount: 10
    };
  },
  mounted() {
    this.blogId = this.$route.params.id;
    this.getData();
    this.getCommentsData(1);
  },
  methods: {
    getData() {
      this.$axios
        .post("/blog/id", qs.stringify({ blogId: this.blogId }))
        .then(response => {
          this.blogData = response.data;
        });
    },
    goBack() {
      this.$router.back();
    },
    getCommentsData(page) {
      this.$axios
        .post("/comment", qs.stringify({ blogId: this.blogId, page: page }))
        .then(response => {
          console.log(response.data.content);
          this.comments = response.data.content;
          this.page = response.data.number + 1;
          this.pageCount = response.data.totalPages;
        });
    }
  }
};
</script>

<style>
.main {
  color: #333;
  background-color: #ffffff;
  text-align: center;
  line-height: 0px;
}
.myMenu /deep/ .el-menu-item {
  color: #333;
  text-align: center;
  line-height: 50px;
  padding: 0 135px;
}
.myMenu /deep/ .el-main {
  width: 1000px;
  height: 825px;
  position: relative;
  top: 0px;
  left: 350px;
  padding: 0 0px;
}
</style>
