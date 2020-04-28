<template>

    <el-container >
        <el-header>
            <el-menu default-active="activeIndex1" mode="horizontal" background-color="#0080ff" text-color="#000" active-text-color="#fff"  >
                <el-menu-item index="0" disabled>欢迎来到打卡系统</el-menu-item>
                <el-menu-item index="1">社区</el-menu-item>
                <el-menu-item index="2" >用户名</el-menu-item>
                <el-menu-item index="3">个人空间</el-menu-item>
                <el-menu-item index="4">注销</el-menu-item>
            </el-menu>
        </el-header>
        <br/>
        <el-container>
            <el-aside style="height: 600px;width:500px">
                <el-tag tabindex="0" color="#42b983" effect="dark">项目名称:  </el-tag><br/>
                <el-tag tabindex="1" color="#42b983" effect="dark">时间周期:  </el-tag><br/>
                <el-tag tabindex="2" color="#42b983" effect="dark">目    的:  </el-tag><br/>
                <el-tag tabindex="3" color="#42b983" effect="dark">计划时间:  </el-tag><br/>
                <el-tag tabindex="4" color="#42b983" effect="dark">已打卡天数:</el-tag>
            </el-aside>

            <el-main style="height: 800px">
                <el-calendar id="calendar">
                    <template
                            slot="dateCell"
                            slot-scope="{date, data}">
                        <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                        <div v-if="data.day.split('-').slice(1)[0] == value" > //判断显示当前页，value是显示当前月份

                        </div>
                    </template>
                </el-calendar>
                <el-button type="success" @click="clock">今日打卡</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-main>
        </el-container>
    </el-container>



</template>

<script>
    export default {
        name: "Clockdetail",
        methods: {
            goBack(){
                this.$router.push('/')
            },

            clock(){
                this.$confirm('是否分享本次打卡？','打卡成功！',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    this.$prompt('分享你的心情吧！','分享',{
                        confirmButtonText: '确  定',
                        cancelButtonText: '取消分享'
                    }).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '已分享 '
                        });
                    })
                }).catch(()=>{

                });

            },

            cancel(){
                this.$confirm('是否取消打卡至打卡社区？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'成功取消打卡',

                    });
                }).catch(()=>{

                });
            }
        }

    }
</script>

<style >
    .el-tag{
        margin-bottom: 70px;
        width: 300px;
        text-align: left;
        margin-left: 0px;

    }
    .el-aside{
        position: relative;
        top:50px
    }

</style>
