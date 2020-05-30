import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import User from "../views/User";
import Clockdetail from "@/views/Clockdetail";
import Edit from "@/views/Edit";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Comments from "@/views/Comments";
import Blog from "@/views/Blog";
import UserInfo from "@/views/UserInfo";
import ChangePwd from "@/views/ChangePwd";
import MyBlog from "@/views/MyBlog";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/detail",
    name: "detail",
    component: Clockdetail
  },
  {
    path: "/userInfo",
    name: "userinfo",
    component: UserInfo
  },
  {
    path: "/changePwd",
    name: "changePwd",
    component: ChangePwd
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/comment/:id",
    name: "comment",
    component: Comments
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit
  },
  {
    path: "/myBlog",
    name: "myBlog",
    component: MyBlog
  }
];

const router = new VueRouter({
  routes
});

export default router;
