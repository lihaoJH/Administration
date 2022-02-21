import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/store.js"
import NProgress from "nprogress"
import sildBar from "./sildBar"
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const getComponent=(name,component)=>()=>import(`@/views/${name}/${component}.vue`)

const routes=[
      {
        path:"/",
        redirect:"/home",
        component:getComponent("layout","Layout"),
        children:sildBar
      },
      {
        path:"/login",
        component:getComponent("login","Login")
      },
      
    ]

const myRouter=new VueRouter({
  routes
});
  myRouter.beforeEach((to,from,next)=>{
      NProgress.start();
      if(to.path !== "/login" && !store.state.token){
       if(from.path!="/"){
        Vue.prototype.$message.error("请先登录")
       }
        next("/login"); //跳转登录
        NProgress.done()
      }
      next()
  });
  myRouter.afterEach(()=>{
      NProgress.done();
  })

export default myRouter
