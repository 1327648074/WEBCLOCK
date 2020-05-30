<template>
  <el-container>
    <el-aside>
      <el-row class="tac">
        <el-col :span="70">
          <el-menu
            router
            default-active="/index"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="userInfo">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>我的信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title"> 我的日程</span>
            </el-menu-item>
            <el-menu-item index="myBlog">
              <i class="el-icon-setting"></i>
              <span slot="title">我的动态</span>
            </el-menu-item>
            <el-menu-item index="detail">
              <i class="el-icon-ice-cream"></i>
              <span slot="title"> 创建日程</span>
            </el-menu-item>
            <el-menu-item index="blog">
              <i class="el-icon-lollipop"></i>
              <span slot="title"> 分享动态</span>
            </el-menu-item>
            <el-menu-item index="changePwd">
              <i class="el-icon-setting"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </el-container>
</template>
<script>
export default {
  name: "AsideBar"
};
</script>

<style scoped>
.tac {
  padding: 0 10px;
  box-sizing: border-box;
  overflow-y: hidden;
}
</style>
