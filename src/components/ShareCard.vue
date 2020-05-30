<template>
  <ul id="ulHeight">
    <li v-for="(item, i) in data" :key="i">
      <el-card
        shadow="hover"
        style="width: 500px; position: relative; left: 30%"
      >
        <div slot="header">
          <span style="float: left;font-size: 15px"
            ><i class="el-icon-user"></i>{{ item.user.name }}</span
          >
          <span style="font-size: 22px">{{ item.title }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="showDetail(item)"
            >查看详情</el-button
          >
        </div>
        <el-image
          v-if="item.psrc != null"
          :src="item.psrc"
          fit="scale-down"
        ></el-image>
        <span style="float: right; font-size: 3px">{{ item.time }}</span>
        <p>{{ item.content }}</p>
        <el-badge
          style="float: right; margin-bottom: 5px"
          :value="item.commentCount"
          class="item"
          type="primary"
        >
          <el-button size="small" @click="showDetail(item)">评论</el-button>
        </el-badge>
        <div style="float: left">
          <el-button
            round
            :icon="iconContent(item.status)"
            size="small"
            v-on:click="handleLikes(item)"
          >
            <span>{{ item.likes }}</span>
          </el-button>
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script>
import qs from "qs";
export default {
  name: "ShareCard",
  buttonType: "",
  props: {
    data: Array,
    isLogin: Boolean
  },
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    iconContent() {
      return function(val) {
        if (val === "T") {
          return "el-icon-star-on";
        } else {
          return "el-icon-star-off";
        }
      };
    }
  },
  methods: {
    handleLikes(item) {
      if (!this.isLogin) {
        alert("请登录");
        return null;
      }
      console.log(item);
      if (item.status === "T") {
        this.$axios
          .post(
            "/ul/delete",
            qs.stringify({
              blogId: item.id
            })
          )
          .then(response => {
            if (response.data.code === 200) {
              item.status = null;
              item.likes = item.likes - 1;
            }
          });
      } else {
        this.$axios
          .post("/ul/show", qs.stringify({ blogId: item.id }))
          .then(response => {
            if (response.data.code === 200) {
              item.status = "T";
              item.likes = item.likes + 1;
            }
          });
      }
    },
    cancel() {
      this.comment = "";
      this.visible = false;
    },
    showDetail(blog) {
      this.$router.push({
        path: `/comment/${blog.id}`
      });
    }
  }
};
</script>

<style scoped>
ul li {
  list-style: none;
  margin: 10px;
}

</style>
