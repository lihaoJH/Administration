const fs=require("fs");
const path=require("path")
module.exports=app=>{
    //数据图表
    app.get("/getData/census",(req,res)=>{
        res.send({
            code:0,
            data:{
                xData:["2022-2-1","2022-2-2","2022-2-3","2022-2-4","2022-2-5","2022-2-6","2022-2-7"],
                data:{
                    order: [2000,300,1500,130,200,200,500],
                    volume: [1200,2300,3000,1000,800,600,1000],
                    resgNum: [300,800,400,300,1000,5,500],
                    adminNum: [2,2,2,300,2,2,55],
                }
            }
        })
    })
    //菜单导航
    app.get("/getData/menuList",(req,res)=>{
        res.send({
            code:0,
            data:[ {
                id: "1",
                title: "后台首页",
                router: "/home",
                icon: "el-icon-s-home",
              },
              {
                id: "2",
                title: "订单管理",
                router: "/order",
                icon: "el-icon-s-order",
              },
              {
                id: "3",
                title: "商品管理",
                icon: "el-icon-goods",
                router: "/goods-list",
                children: [
                  {
                    id: "3-1",
                    title: "商品列表",
                    router: "/goods-list",
                  },
                  {
                    id: "3-2",
                    title: "商品添加",
                    router: "/goods-add",
                  },
                  {
                    id: "3-3",
                    title: "商品分类",
                    router: "/goods-classily",
                  },
                ],
              },
              {
                id: "4",
                router: "/shop",
                icon: "el-icon-s-shop",
                title: "店铺管理",
              },
              {
                id: "5",
                icon: "el-icon-s-custom",
                title: "账号管理",
                router: "/account",
                children: [
                  {
                    id: "5-1",
                    router: "/account-list",
                    title: "账号列表",
                  },
                  {
                    id: "5-2",
                    router: "/account-add",
                    title: "添加账号",
                  },
                  {
                    id: "5-3",
                    router: "/up-password",
                    title: "修改密码",
                  },
                ],
              },
              {
                id: "6",
                icon: "el-icon-pie-chart",
                title: "销售统计",
                router: "/sell",
                children: [
                  {
                    id: "6-1",
                    router: "/sell-goods",
                    title: "商品统计",
                  },
                  {
                    id: "6-2",
                    router: "/sell-order",
                    title: "订单统计",
                  },
                ],
              }]
        })
    })
    //订单获取
    app.get("/getData/orderList",(req,res)=>{
        fs.readFile(path.join(__dirname,"../mockData/order.json"), "utf-8", (err, data) => {
            if(err)return res.send({code:1,msg:"数据库出错"});
            res.send({
                code:0,
                data:JSON.parse(data)
            })
        })
    })
    //商品列表
    app.get("/getData/goodsList",(req,res)=>{
      fs.readFile(path.join(__dirname,"../mockData/goods.json"), "utf-8", (err, data) => {
        if(err)return res.send({code:1,msg:"数据库出错"});
        let arr=JSON.parse(data).map(item=>{
          item.imgUrl=`goods_img/${item.imgUrl}`
          return item
        })
        res.send({
            code:0,
            data:arr
        })
    })
    })
    //商品分类
    app.get("/getData/goodsClassily",(req,res)=>{
         fs.readFile(path.join(__dirname,"../mockData/goodsClassily.json"),"utf-8",(err,data)=>{
          if(err)return res.send({code:1,msg:"数据库出错"});
          res.send({code:0,data:JSON.parse(data)});
         })
    });
    //账号列表获取
    app.get("/getData/accountList",(req,res)=>{
      fs.readFile(path.join(__dirname,"../mockData/account.json"),"utf-8",(err,data)=>{
        if(err)return res.send({code:1,msg:"数据读取错误"});
        if(!data)return res.send({code:1,msg:"数据库为空"});
        res.send({code:0,data:JSON.parse(data)});
      })
    })
    //店铺信息获取
    app.get("/getData/shopInfo",(req,res)=>{
      let {id}=req.query;
      if(!id)return res.send({code:5001,msg:"参数错误"});
      fs.readFile(path.join(__dirname,"../mockData/shop.json"),"utf-8",(err,data)=>{
        if(err)return res.send({code:1,msg:"数据库读取失败"});
        if(!data)return res.send({code:1,msg:"数据库为空"});
        data=JSON.parse(data);
        data.map(item=>{
            if(item.userId==id){
                item.imgHeader=`shopHeader_img/${item.imgHeader}`;
                item.imgShop.map(item1=>{
                    item1.url=`shop_img/${item1.url}`;
                  return item1
                })
            }
          return item
        })
        let arr=data.filter(item=>item.userId==id);
        res.send({
          code:0,
          data:arr
        })
      })
    })
}
// console.log(path.join(__dirname,"../mockData/order.json"));
// fs.readFile("../mockData/order.json", "utf-8", (err, data) => {
//     if(err)return console.log(11);;
//     console.log(data);
// })