<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="''"
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, i) in navList"
            :key="i"
            :index="item.name"
          >
            {{ item.navItem }}
          </el-menu-item>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      navList: [
        { name: "", navItem: "欢迎来到摩卡用户中心" },
        { name: "/", navItem: " 主页" },
        { name: "/user", navItem: "个人中心" },
        { name: "/login", navItem: "注销" }
      ]
    };
  },
  methods: {
    handleSelect(index) {
      if (index === "/login") {
        this.$axios.get("/logout").then(repsonse => {
          alert(repsonse.data.message);
        });
      }
    }
  }
};
</script>

<style scoped></style>
