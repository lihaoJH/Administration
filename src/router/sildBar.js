// const getComponent = (name, component) => () =>
//   import(`@/views/${name}/${component}.vue`);

// // let arr = [];
// // export const getRouter = (routerList) => {
  
// let arr=[];
//   routerList.forEach((item) => {
//     if (item.children) {
//       arr.push({
//         path: item.router,
//         redirect: item.children[0].router,
//         meta: { title: item.title },
//         component: getComponent(
//           oneSubStr(item.router),
//           uppStr(oneSubStr(item.router))
//         ),
//       });
//       item.children.forEach((item1) => {
//         arr.push({
//           path: item1.router,
//           meta: { title: item1.title },
//           component: getComponent(
//             oneSubStr(item.router),
//             sonStr(item1.router, 1)
//           ),
//         });
//       });
//     } else {
//       arr.push({
//         path: item.router,
//         meta: { title: item.title },
//         component: getComponent(
//           oneSubStr(item.router),
//           uppStr(oneSubStr(item.router))
//         ),
//       });
//     }
//   });
// // };
// export default arr;

// // export default [
// //   {
// //     //home页
// //     path: "/home",
// //     meta: "首页",
// //     component: getComponent("home", "Home"),
// //   },
// //   {
// //     //订单页
// //     path: "/order",
// //     component: getComponent("order", "Order"),
// //   },
// //   {
// //     //商品页
// //     path: "/goods",
// //     redirect: "goods-list",
// //     component: getComponent("layout", "Layout"),
// //   },
// //   {
// //     //商品列表
// //     path: "/goods-list",
// //     component: getComponent("goods", "GoodsList"),
// //   },
// //   {
// //     //商品添加
// //     path: "/goods-add",
// //     component: getComponent("goods", "GoodsAdd"),
// //   },
// //   {
// //     //商品分类
// //     path: "/goods-classily",
// //     component: getComponent("goods", "GoodsClassly"),
// //   },
// //   {
// //     //店铺管理
// //     path: "/shop",
// //     component: getComponent("shop", "Shop"),
// //   },
// //   {
// //     //账号列表
// //     path: "/account",
// //     redirect: "/account-list",
// //     component: getComponent("layout", "Layout"),
// //   },
// //   {
// //     //账号添加
// //     path: "/account-list",
// //     component: getComponent("account", "AccountList"),
// //   },
// //   {
// //     //账号添加
// //     path: "/account-add",
// //     component: getComponent("account", "AddAccount"),
// //   },
// //   {
// //     //密码修改
// //     path: "/up-password",
// //     component: getComponent("account", "UpPassword"),
// //   },
// //   {
// //     //销售统计
// //     path: "/sell",
// //     redirect: "/sell-goods",
// //     component: getComponent("layout", "Layout"),
// //   },
// //   {
// //     //商品统计
// //     path: "/sell-goods",
// //     component: getComponent("sell", "SellGoods"),
// //   },
// //   {
// //     //订单统计
// //     path: "/sell-order",
// //     component: getComponent("sell", "SellOrder"),
// //   },
// //   {
// //     //个人中心
// //     path: "/user",
// //     component: getComponent("user", "User"),
// //   },
// // ];
// export default [
//   {
//     path:"/",
//     redirect:"/home",
//     component:getComponent("layout","Layout"),
//     children:sildBar
//   },
//   {
//     //home页
//     path: "/home",
//     meta: "首页",
//     component: getComponent("home", "Home"),
//   },
//   {
//     //订单页
//     path: "/order",
//     component: getComponent("order", "Order"),
//   },
//   {
//     //商品页
//     path: "/goods",
//     redirect: "goods-list",
//     component: getComponent("layout", "Layout"),
//   },
//   {
//     //商品列表
//     path: "/goods-list",
//     component: getComponent("goods", "GoodsList"),
//   },
//   {
//     //商品添加
//     path: "/goods-add",
//     component: getComponent("goods", "GoodsAdd"),
//   },
//   {
//     //商品分类
//     path: "/goods-classily",
//     component: getComponent("goods", "GoodsClassly"),
//   },
//   {
//     //店铺管理
//     path: "/shop",
//     component: getComponent("shop", "Shop"),
//   },
//   {
//     //账号列表
//     path: "/account",
//     redirect: "/account-list",
//     component: getComponent("layout", "Layout"),
//   },
//   {
//     //账号添加
//     path: "/account-list",
//     component: getComponent("account", "AccountList"),
//   },
//   {
//     //账号添加
//     path: "/account-add",
//     component: getComponent("account", "AddAccount"),
//   },
//   {
//     //密码修改
//     path: "/up-password",
//     component: getComponent("account", "UpPassword"),
//   },
//   {
//     //销售统计
//     path: "/sell",
//     redirect: "/sell-goods",
//     component: getComponent("layout", "Layout"),
//   },
//   {
//     //商品统计
//     path: "/sell-goods",
//     component: getComponent("sell", "SellGoods"),
//   },
//   {
//     //订单统计
//     path: "/sell-order",
//     component: getComponent("sell", "SellOrder"),
//   },
//   {
//     //个人中心
//     path: "/user",
//     component: getComponent("user", "User"),
//   },
// ];
