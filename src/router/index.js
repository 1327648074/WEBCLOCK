import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User";
import Clockdetail from "@/views/Clockdetail";
import Edit from "@/views/Edit";
import Comments from "@/views/Comments";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
    path: "/edit",
    name: "edit",
    component: Edit
  },
  {
    path: "/comment",
    name: "comment",
    component: Comments
  }
];

const router = new VueRouter({
  routes
});

export default router;
