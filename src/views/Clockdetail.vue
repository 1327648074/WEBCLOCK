<template>
    <div class="myMenu" style="background-color: #FFFFFF">
        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">欢迎来到打卡系统</el-menu-item>
                    <el-menu-item index="2"><a href="">社区</a></el-menu-item>
                    <el-menu-item index="3" disabled>用户名</el-menu-item>
                    <el-menu-item index="4"><a href="">个人中心</a></el-menu-item>
                    <el-menu-item index="5"><a href="">注销</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-main class="main">
                <div class="ruleForm">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :label-position="labelPosition">
                        <el-form-item label="打卡项目" prop="name">
                            <el-input v-model="ruleForm.name" style="width:50%"></el-input>
                        </el-form-item>
                        <el-form-item label="目  标" prop="aim">
                            <el-input v-model="ruleForm.aim" style="width:50%"></el-input>
                        </el-form-item>
                        <el-form-item label="打卡周期" required>
                            <el-col :span="9">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="1">-</el-col>
                            <el-col class="line" :span="1">-</el-col>
                            <el-col class="line" :span="1">-</el-col>
                            <el-col :span="9">
                                <el-form-item prop="date2">
                                    <el-date-picker placeholder="选择结束日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="标  签" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox-button label="学习" name="type"></el-checkbox-button>
                                <el-checkbox-button label="旅行" name="type"></el-checkbox-button>
                                <el-checkbox-button label="运动" name="type"></el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition:"top",
                date1: '',
                date2: '',
                ruleForm: {
                    name: '',
                    aim: '',
                    date1: '',
                    date2: '',
                    type: []
                },
                rules: {
                    name: [
                        { required: true, message: '请输入打卡项目名称', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    aim: [
                        { required: true, message: '请输入打卡目标', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个打卡性质', trigger: 'change' }
                    ],
                }
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .el-header {
        color: #333;
        background-color: #ffffff;
        text-align: center;
        line-height: 0px;
    }
    .myMenu /deep/ .el-main {
        width: 1000px;
        height: 700px;
        position: relative;
        top: 50px;
        left: 350px;
        padding: 0 0px;
    }
    .myMenu /deep/ .el-menu-item {
        color: #333;
        text-align: center;
        line-height: 50px;
        padding: 0 135px;
    }

    .el-main /deep/ .ruleForm {
        position: relative;
        top: 50px;
    }

    .ruleForm /deep/ .el-form-item__error {
        position: relative;
        left: 0px;
    }

    .ruleForm /deep/ .el-button {
        margin: 20px;
        position: relative;
        top: 50px;
    }
    .ruleForm /deep/ .el-col-1{
        width:1%
    }
</style>
