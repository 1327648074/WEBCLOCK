<!--评论模块-->
<template>
  <div class="container">
    <div class="comment">
      <el-card>
        <div class="info">
          <img class="avatar" :src="blog.user.psrc" width="36" height="36" />
          <div class="right">
            <div class="name">{{ blog.user.name }}</div>
            <div class="date">{{ blog.title }}</div>
          </div>
        </div>
        <el-image
          v-if="blog.psrc != null"
          :src="blog.psrc"
          fit="scale-down"
        ></el-image>
        <div class="content">{{ blog.content }}</div>
        <div class="control">
          <span
            class="like"
            :class="{ active: isLike(blog.status) }"
            @click="likeClick(blog)"
          >
            <i class="iconfont icon-like"></i>
            <span class="like-num">{{ blog.likes + "人赞" }}</span>
          </span>
          <span class="comment-reply" @click="showCommentInput(blog)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
      </el-card>
      <div class="reply" style="margin: 0 ;background-color: #fffefd">
        <el-card v-if="commentData.length > 0">
          <div class="item" v-for="(item, i) in commentData" :key="i">
            <div class="reply-content">
              <span class="from-name">{{ item.user.name }}</span
              ><span>: </span>
              <span>{{ item.content }}</span>
            </div>
            <div class="reply-bottom">
              <span>{{ item.time }}</span>
            </div>
          </div>
        </el-card>
        <div v-else><span>暂无评论</span></div>
        <el-pagination
          class="row"
          layout="prev, pager, next"
          :total="pageCount * 10"
          ref="pagination"
          :current-page="1"
          v-on:prev-click="changePage"
          v-on:next-click="changePage"
          v-on:current-change="changePage"
          v-if="commentData.length > 0"
        />
        <div class="write-reply" @click="showCommentInput(blog)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === blog.id">
            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            >
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment"
                >确定</el-button
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: {
    blog: Object,
    commentData: Array,
    page: Number,
    pageCount: Number
  },
  components: {},
  data() {
    return {
      inputComment: "",
      showItemId: ""
    };
  },
  computed: {
    isLike() {
      return status => {
        return status === "T";
      };
    }
  },
  methods: {
    /**
     * 点赞
     */
    likeClick(item) {
      console.log(item);
      if (item.status === "T") {
        this.$axios
          .post(
            "/ul/delete",
            qs.stringify({
              blogId: item.id
            })
          )
          .then(response => {
            if (response.data.code === 200) {
              item.status = null;
              item.likes = item.likes - 1;
            }
          })
          .catch(() => {
            alert("请登录");
          });
      } else {
        this.$axios
          .post("/ul/show", qs.stringify({ blogId: item.id }))
          .then(response => {
            if (response.data.code === 200) {
              item.status = "T";
              item.likes = item.likes + 1;
            }
          })
          .catch(() => {
            alert("请登录");
          });
      }
    },
    changePage(val) {
      this.$emit("changePage", val);
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = "";
    },

    /**
     * 提交评论
     */
    commitComment() {
      if (this.inputComment === "") {
        this.$message("未填写内容");
      } else {
        this.$axios
          .post("/comment/create", {
            blogId: this.blog.id,
            content: this.inputComment
          })
          .then(response => {
            console.log(response.data.message);
            this.changePage(1);
          })
          .catch(() => {
            alert("请登录");
          });
      }
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item) {
      this.inputComment = "";
      this.showItemId = item.id;
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "../../public/scss/index";

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border: 1px solid $border-first;
      position: relative;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      top: 50px;
      .item {
        margin: 0 10px;
        padding: 30px 0;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .from-name {
            color: $color-main;
          }
          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: $text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          /*background-color: #67C23A;*/
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
