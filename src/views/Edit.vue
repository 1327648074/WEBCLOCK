<template>
    <div class="myCalendar">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">欢迎来到打卡系统</el-menu-item>
                    <el-menu-item index="2">用户名</el-menu-item>
                    <el-menu-item index="3"><a href="">个人中心</a></el-menu-item>
                    <el-menu-item index="4"><a href="" target="_blank">注销</a></el-menu-item>
                </el-menu>
                <div class="line"></div>
            </el-header>
            <el-container>
                <el-aside width="1000px">Aside</el-aside>
                <el-main width="200px">
                    <el-calendar v-model="value" width="200px">
                    </el-calendar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                value: new Date()
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-header {
        color: #333;
        text-align: center;
        line-height: 500px;
    }

    .myCalendar /deep/ .el-menu-item {
        color: #333;
        text-align: center;
        line-height: 200px;
        padding: 0 170px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 10px;
    }
    .el-calendar{
        width: 500px;
        height:500px;
    }
    .myCalendar /deep/ .el-calendar-table .el-calendar-day{
        box-sizing: border-box;
        padding: 8px;
        height: 60px;
    }
</style>
