//axios的业务处理
import axios from "axios";
import Vue from "vue";
import router from "../router/router.js";
import { Loading } from "element-ui";
import state from "../store/state";
// import { Alert } from "element-ui" //自定义错误页面
import store from "../store/store";

axios.defaults.timeout = 6000;
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://127.0.0.1:3000"; //开发环境的接口地址
  // axios.defaults.baseURL="";
} else {
  axios.defaults.baseURL = ""; //生产环境的接口地址
}
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; //设置编码
let loading = null;
//请求拦截
axios.interceptors.request.use(
  (config) => {
    loading = Loading.service({
      text: "正在加载中...",
      fullscreen: true,
    });
    if (store.state.token) {
      config.headers["Authorization"]="Bearer-"+store.state.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截
axios.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      if (loading) {
        loading.close();
      }
      const { code, msg, data } = response.data;
      if (code === 0) {
        resolve({ msg, data });
        if (msg && msg.includes("登录")) {
          Vue.prototype.$message({ message: msg, type: "success" });
        }
      } else {
        if (code == 401) {
          Vue.prototype.$message.error(msg);
          localStorage.removeItem("token");
          setTimeout(() => {
            router.replace({
              path: "/login",
            });
          }, 1000);
        }
        if (code == 400) {
          setTimeout(() => {
            state.userInfo = {};
            // Vue.prototype.$message({ message: msg, type: "error" });
            localStorage.removeItem("token");
          }, 1000);
        }
        Vue.prototype.$message({message:msg,type:"error"});
        reject(msg);
      }
    });
  },
  (error) => {
    if (loading) {
      loading.close();
    }
    if (!error.response) {
      if (error.message.includes("timeout")) {
        // message(1,"请求超时，请检查互联网连接")
      } else {
        // message(1,"请检查网络内部错误")
      }
      return;
    }
    const status = error.response.code;
    switch (status) {
      case 500:
        // message(1,"服务器内部错误");
        break;
      case 404:
        // message(1,"未找到远程服务器");
        break;
      case 401:
        // this.$message.error(error.response.msg);
        // localStorage.removeItem("token");
        // setTimeout(()=>{
        //    this.$touter.push("/login");
        // },1000)
        break;
      case 400:
        // message(1,"数据异常");
        break;
      default:
        // message(1,error.response.data.message);
        break;
    }
    return Promise.reject(error);
  }
);
//get请求的封装
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求的封装
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
//post请求的封装
export function file(url, params) {
  axios.defaults.headers.post["Content-Type"] =
    "multipart/form-data;charset=UTF-8";
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
