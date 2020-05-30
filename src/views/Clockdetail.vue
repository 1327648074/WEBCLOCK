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
        <el-card style="margin: 10px; text-align: left;width: 600px">
          <div slot="header" style="text-align: center">
            <span><i class="el-icon-ice-cream"></i>日程创建</span>
          </div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            :label-position="labelPosition"
          >
            <el-form-item label="打卡项目" prop="name">
              <el-input v-model="ruleForm.name" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="目  标" prop="aim">
              <el-input v-model="ruleForm.aim" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="标  签" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox-button
                  label="学习"
                  name="type"
                ></el-checkbox-button>
                <el-checkbox-button
                  label="旅行"
                  name="type"
                ></el-checkbox-button>
                <el-checkbox-button
                  label="运动"
                  name="type"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from "../components/commons/AsideBar";
import NavigationBar from "../components/commons/NavigationBar";
export default {
  components: { AsideBar, NavigationBar },
  data() {
    const validateDate = (rule, value, callback) => {
      if (value === []) {
        callback(new Error("请选择日期"));
      } else {
        if (new Date().setHours(0, 0, 0, 0) > new Date(value[0])) {
          callback(new Error("开始日期错误"));
        }
        callback();
      }
    };
    return {
      labelPosition: "top",
      date1: "",
      date2: "",
      ruleForm: {
        name: "",
        aim: "",
        date: [],
        type: []
      },
      rules: {
        name: [
          { required: true, message: "请输入打卡项目名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        aim: [
          { required: true, message: "请输入打卡目标", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        date: [{ required: true, trigger: "change", validator: validateDate }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个打卡性质",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("创建!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.ruleForm.date);
      this.$axios
        .post("/schedule/create", {
          title: this.ruleForm.name,
          start: this.ruleForm.date[0],
          end: this.ruleForm.date[1],
          aim: this.ruleForm.aim,
          count: 0,
          tag: JSON.stringify(this.ruleForm.type)
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false;
            this.$emit("onSubmit");
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
.ruleForm /deep/ .el-col-1 {
  width: 1%;
}
</style>
