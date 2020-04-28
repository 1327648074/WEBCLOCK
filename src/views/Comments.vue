<template>
    <div class="myMenu" style="background-color: #FFFFFF">
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">欢迎来到打卡系统</el-menu-item>
                    <el-menu-item index="2">用户名</el-menu-item>
                    <el-menu-item index="3" disabled>个人中心</el-menu-item>
                    <el-menu-item index="4"><a href="">注销</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-main class="main">
                <comment :comments="commentData"></comment>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import * as CommentData from "../assets/mockdata";
    import comment from "../components/comment";

    export default {
        components: {
            comment
        },
        data() {
            return {
                commentData: []
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {
            this.commentData = CommentData.comment.data;
        }
    };
</script>

<style>
    .el-header {
        color: #333;
        background-color:#FFFFFF;
        text-align: center;
        line-height: 0px;
    }
    .myMenu /deep/ .el-menu-item {
        color: #333;
        text-align: center;
        line-height: 50px;
        padding: 0 135px;
    }
    .myMenu /deep/ .el-main{
        width:1000px;
        height:825px;
        position: relative;
        top: 0px;
        left: 350px;
        padding:0 0px;
    }
</style>
