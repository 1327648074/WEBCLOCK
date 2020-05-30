<template>
  <el-container>
    <el-header>
      <el-page-header style="margin: 10px" @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>
    <el-container>
      <el-aside style="margin: 10px;">
        <el-tag tabindex="0" color="#42b983" effect="dark"
          >项目名称： {{ scheduleData.title }} </el-tag
        ><br />
        <el-tag tabindex="1" color="#42b983" effect="dark"
          >时间周期：
          {{ duringTime(scheduleData.start, scheduleData.end) }}天</el-tag
        ><br />
        <el-tag tabindex="2" color="#42b983" effect="dark"
          >目的： {{ scheduleData.aim }}</el-tag
        ><br />
        <el-tag tabindex="3" color="#42b983" effect="dark"
          >计划时间： {{ scheduleData.start }}~{{ scheduleData.end }} </el-tag
        ><br />
        <el-tag tabindex="4" color="#42b983" effect="dark"
          >已打卡天数： {{ scheduleData.records.length }}</el-tag
        >
      </el-aside>

      <el-main v-if="isShow">
        <el-calendar id="calendar">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div class="calendar-day">
              {{
                data.day
                  .split("-")
                  .slice(2)
                  .join("-")
              }}
            </div>
            <i
              class="el-icon-caret-top"
              style="font-size: 1px;color: #67C23A"
              v-if="handleSelected(date) === 1"
            ></i>
            <i
              v-else-if="handleSelected(date) === 2"
              class="el-icon-s-flag"
              style="color: #1989fa; margin: 10px"
            ></i>
            <i
              v-else-if="handleSelected(date) === 3"
              class="el-icon-error"
              style="margin: 10px;color: #909399"
            ></i>
          </template>
        </el-calendar>
        <el-button type="success" @click="clock" v-show="!isClock"
          >今日打卡</el-button
        >
        <el-tag v-show="isClock">{{ tagInfo }}!</el-tag>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import qs from "qs";

  export default {
  name: "Edit",
  data() {
    return {
      scheduleData: {
        records: [{ time: "" }]
      },
      scheduleTime: this.end - this.start,
      isClock: false,
      tagInfo: "",
      isShow: true
    };
  },
  computed: {
    duringTime() {
      return (start, end) => {
        return (new Date(end) - new Date(start)) / (24 * 3600 * 1000);
      };
    }
  },
  methods: {
    async reloadData() {
      this.isShow = false;
      await this.$nextTick();
      this.isShow = true;
    },
    goBack() {
      this.$router.push("/user");
    },
    handleSelected(day) {
      let flag = 0; //默认显示为0
      if (this.isBetween(day)) {
        this.scheduleData.records.forEach(item => {
          //this.attendanceDetailsData是后台返回的数据
          let date = new Date(item.time);
          if (date - day === 0) {
            flag = 2;
            return null;
          }
        });
        if (flag === 2) {
          return flag;
        }
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        if (day < now) {
          flag = 3;
        } else {
          flag = 1;
        }
        return flag;
      }
    },
    getInfo() {
      let data = this.$route.query.item;
      console.log(data);
      if (data === undefined || data.title === undefined) {
        this.$router.replace("/user");
        return;
      }
      this.scheduleData = data;
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      let end = new Date(data.end);
      end.setHours(0, 0, 0, 0);
      if (date > end) {
        this.isClock = true;
        this.tagInfo = "已结束";
        return;
      }
      data.records.forEach(item => {
        let time = new Date(item.time);
        time.setHours(0, 0, 0, 0);
        if (time - date === 0) {
          this.isClock = true;
          this.tagInfo = "今日已打卡";
          return;
        }
      });
      // this.$axios
      //   .get("/schedule/id")
      //   .then(response => {
      //     this.id = response.data.id;
      //     this.start = response.data.start;
      //     this.end = response.data.end;
      //     this.scheduleTime = this.end - this.start;
      //     this.title += response.data.title;
      //     this.alTime = response.data.alTime;
      //     this.timeCircle = response.data.timeCircle;
      //     this.content = response.data.content;
      //   })
      //   .catch(() => {});
    },
    isBetween(time) {
      let start = new Date(this.scheduleData.start);
      let end = new Date(this.scheduleData.end);
      return time >= start && time <= end;
    },
    getNowFormatDate() {
      const date = new Date();
      const seperator1 = "-";
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      return year + seperator1 + month + seperator1 + strDate;
    },
    clock() {
      // this.$confirm("是否分享本次打卡？", "打卡成功！", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     if (this.isClock === false) {
      //       this.alTime += 1;
      //     }
      //     this.isClock = true;
      //
      //     this.$prompt("分享你的心情吧！", "分享", {
      //       confirmButtonText: "确  定",
      //       cancelButtonText: "取消分享"
      //     }).then(() => {
      //       this.$message({
      //         type: "success",
      //         message: "已分享 "
      //       });
      //     });
      //   })
      //   .catch(() => {});
      this.$axios
        .post(
          "/schedule/record",
          qs.stringify({ schedule_id: this.scheduleData.id })
        )
        .then(response => {
          if (response.code === 200) {
            this.isClock = true;
            this.tagInfo = "今日已打卡";
            this.scheduleData.records.push({ time: this.getNowFormatDate() });
            this.reloadData();
          }
        });
    }
    // cancel() {
    //   this.$confirm("是否取消打卡至打卡社区？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "成功取消打卡"
    //       });
    //     })
    //     .catch(() => {});
    // }
  },
  mounted() {
    this.getInfo();
  }
};
</script>

<style>
.el-tag {
  margin-bottom: 70px;
  width: 300px;
  text-align: left;
  margin-left: 0;
}
.el-aside {
  position: relative;
  top: 50px;
}

.is-selected {
  color: #1989fa;
}
.el-header {
  color: #333;
  background-color: #ffffff;
  text-align: center;
  line-height: 0;
}
</style>
