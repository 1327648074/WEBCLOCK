<template>
  <div class="projectcard">
    <el-row style="margin: 60px">
      <el-col :span="16" v-if="scheduleData.length === 0">
        <el-card style="margin: 20px; width: 600px;">
          <div slot="header" class="clearfix">
            <span ><i class="el-icon-magic-stick"></i>温馨提示</span>
          </div>
          <el-tag style="text-align: center" v-show="isEnd"
            >当前你还没有日程，请添加！</el-tag
          ><br>
          <el-button style="float: right;  " type="text" @click="gotoEdit"
            >添加日程</el-button
          >
        </el-card>
      </el-col>
      <el-col :span="16" v-for="(item, index) in scheduleData" :key="index">
        <el-card style="margin: 20px; width: 600px;">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <span style="float: left"
              ><i class="el-icon-magic-stick"></i>已打卡{{
                item.records.length
              }}</span
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showDetail(item)"
              >查看详情</el-button
            >
          </div>
          <div style="padding: 50px;">
            <span class="name"> {{ item.aim }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.start }}~{{ item.end }}</time>
            </div>
            <div v-if="isEnd(item.end)">
              <el-button
                v-if="!isEnable(item.records)"
                type="text"
                class="button"
                @click="showDetail(item)"
                >今日打卡
              </el-button>
              <el-button v-else type="text" :disabled="true" class="button"
                >已打卡</el-button
              >
            </div>
            <div v-else>
              <el-button type="text" :disabled="true" class="button"
                >已结束</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startDate: new Date(), //项目开始日期
      scheduleData: []
    };
  },
  computed: {
    isEnable() {
      return records => {
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        for (const i in records) {
          let date = new Date(records[i].time);
          date.setHours(0, 0, 0, 0);
          if (date - now === 0) {
            return true;
          }
        }
        return false;
      };
    },
    isEnd() {
      return end => {
        return new Date() - new Date(end) <= 0;
      };
    }
  },
  methods: {
    getInfo() {
      this.$axios.get("schedule").then(response => {
        this.scheduleData = response.data;
      });
      // .catch(() => {
      //   alert("请登录");
      //   this.$router.replace("/login");
      // });
    },
    gotoEdit() {
      this.$router.push({ path: "/detail"});
    },
    showDetail(item) {
      this.$router.push({ path: "/edit", query: { item: item } });
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 10px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
