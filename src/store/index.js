import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: "",
      psrc: ""
    },
    blog: {
      id: 1,
      title: "无敌",
      content: "不压迫",
      psrc:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589620444742&di=b18814704e78d7fb5a23a72c85390f16&imgtype=0&src=http%3A%2F%2Fdl.ppt123.net%2Fpptbj%2F201603%2F2016030410203187.jpg",
      time: "2020-05-15 18:21:48",
      user: { name: "test1", email: null, sex: null, age: 0, psrc: "null" },
      commentCount: 1,
      likes: 1,
      status: "T"
    }
  },
  mutations: {
    setUser(state, name, psrc) {
      state.user.name = name;
      state.user.psrc = psrc;
    },
    clearUser(state) {
      state.user.name = "";
      state.user.psrc = "";
    },
    setBlog(state, blog) {
      state.blog = blog;
    }
  },
  actions: {
    setUserAction(context, name, psrc) {
      context.commit("setUser", name, psrc);
    },
    clearAction(context) {
      context.commit("clearUser");
    },
    setBlogAction(context, blog) {
      context.commit("setBlog", blog);
    }
  },
  modules: {}
});
