import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store.js";
import NProgress from "nprogress";
import { getData, newRouter } from "./rights";

import "nprogress/nprogress.css";

Vue.use(VueRouter);

const getComponent = (name, component) => () =>
  import(`@/views/${name}/${component}.vue`);

const routes = [
  {
    path: "/login",
    component: getComponent("login", "Login"),
  },
];


const myRouter = new VueRouter({
  routes,
});

export const getRouter = (data) => {
  if (localStorage.getItem("token")) {
    let {
      userInfo: { role },
    } = JSON.parse(localStorage.getItem("token"));
    data = data.filter((item) => getData(item, role));
    newRouter(data, myRouter, routes);
  }
};

// console.log(JSON.parse(localStorage.getItem("token")).routerList);
if (localStorage.getItem("token")) {
  if (JSON.parse(localStorage.getItem("token")).routerList.length) {
    let { routerList } = JSON.parse(localStorage.getItem("token"));
    getRouter(routerList);
  }
}
myRouter.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== "/login" && !store.state.token) {
    if (from.path != "/") {
      Vue.prototype.$message.error("请先登录");
    }
    next("/login"); //跳转登录
    NProgress.done();
  }
  next();
});
myRouter.afterEach(() => {
  NProgress.done();
});

export default myRouter;
