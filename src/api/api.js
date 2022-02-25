//axios的接口处理
import {get,post,file} from "./request.js";
//登录接口
export const login=(login)=>post('/api/login',login);
//左侧菜单
export const sildMenu=()=>get('/getData/menuList');
//数据图表
export const census=()=>get('/getData/census');
//订单数据图标
export const orderCensus=()=>get("/getData/orderCensus")
//订单列表
export const orderList=()=>get('/getData/orderList');
//商品列表
export const goodsList=()=>get("/getData/goodsList");
//商品分类
export const goodsClassily=()=>get("/getData/goodsClassily");
//商品分类名修改
export const upDateCateName=(val)=>post("/update/cateName",val);
//删除商品分类名
export const deleteCateName=(val)=>post("/delete/cateName",val);
//添加商品分类名
export const addCateName=(val)=>post("/add/cateName",val);
//商品添加
export const addShop=(val)=>file("/add/shopPhoto",val);
//商品信息修改
export const goodsInfoChange=(val)=>file("/update/goods",val);
//商品删除
export const deleteGoods=(val)=>post("/delete/goods",val);
//账号列表
export const accountList=()=>get("/getData/accountList");
//账号修改
export const userInfoChange=(val)=>post("/update/userInfo",val);
//批量删除账号
export const accountBatchDelete=(val)=>post("/delete/account",val)
//用户头像修改
export const userPhotoChange=(val)=>post("/update/userPhoto",val);
//添加新账号
export const addNewUser=(val)=>post("/add/user",val);
//密码修改
export const passwordChange=(val)=>post("/update/password",val);

//店铺信息获取
export const shopList=(val)=>get("/getData/shopInfo",val);
//店铺图片删除
export const deleteShopImg=(val)=>post("/delete/shopImg",val);

//店铺信息修改
export const changeShopInfo=(val)=>post("/update/shopInfo",val);