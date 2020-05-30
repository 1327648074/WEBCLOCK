<template>
  <el-container>
    <el-header>
      <NavigationBar></NavigationBar>
    </el-header>
    <el-container>
      <el-aside> <AsideBar></AsideBar></el-aside>
      <el-main>
        <clockproject></clockproject>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavigationBar from "../components/commons/NavigationBar";
import AsideBar from "../components/commons/AsideBar";
import clockproject from "../components/commons/clockproject";

export default {
  name: "home",
  components: { NavigationBar, AsideBar, clockproject }
};
</script>
<style scoped>
.project-area {
  width: 1000px;
  margin-left: auto;
  margin-top: auto;
}
</style>
