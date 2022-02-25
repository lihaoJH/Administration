const fs = require("fs");
const multer = require("multer");
const path = require("path");
const utils=require("../utils");
const md5=require("md5");
module.exports = (app) => {
  //添加商品分类名
  app.post("/add/cateName", (req, res) => {
    let { cateName, state } = req.body;
    fs.readFile(
      path.join(__dirname, "../mockData/goodsClassily.json"),
      "utf-8",
      (err, data) => {
        if (err) return res.send({ code: 1, msg: "数据库出错" });
        if (!data) {
          data = [];
        } else {
          data = JSON.parse(data);
        }
        let id = data.length?data.length:1;
        while (data.some((item) => item.id == id)) {
          id++;
        }
        let obj = {
          cateName,
          state,
          id,
        };
        data.push(obj);
        let jsonStr = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, "../mockData/goodsClassily.json"),
          jsonStr,
          { encoding: "utf8" },
          (err) => {
            if (err) return res.send({ code: 1, msg: "数据写入失败" });
            res.send({ code: 0, msg: "添加成功" });
          }
        );
      }
    );
  });
  //商品添加
  app.post("/add/shopPhoto", (req, res) => {
    let imgUrl = null;
    let shopInfo = null;
    let upload = multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          shopInfo = req.body;
          callback(
            null,
            path.join(__dirname, "../../public/mockImg/goods_img")
          );
        },
        filename(req, file, callback) {
          let { ext } = path.parse(file.originalname);
          imgUrl = new Date().getTime() + ext;
          callback(null, imgUrl);
        },
      }),
    }).single("file");
    upload(req, res, (err) => {
      if (err) return res.send({ code: 1, msg: "图片数据添加失败" });
      let { name, price, category, goodsDesc } = shopInfo;
      fs.readFile(
        path.join(__dirname, "../mockData/goods.json"),
        "utf-8",
        (err, data) => {
          if (err) return res.send({ code: 1, msg: "数据库出错" });
          if (!data) {
            data = [];
          } else {
            data = JSON.parse(data);
          }
          let id = data.length?data.length:1;
          while (data.some((item) => item.id == id)) {
            id++;
          }
          let obj = {
            id,
            name,
            price,
            category,
            goodsDesc,
            ctime: new Date(),
            imgUrl,
            rating: 5,
            sellCount: 100,
          };
          data.push(obj);
          let jsonStr = JSON.stringify(data);
          fs.writeFile(
            path.join(__dirname, "../mockData/goods.json"),
            jsonStr,
            (err) => {
              if (err) return res.send({ code: 1, msg: "数据库写入出错" });
              res.send({ code: 0, msg: "商品添加成功" });
            }
          );
        }
      );
    });
  });
  //添加新用户
  app.post("/add/user",(req,res)=>{
      let {account,password,admin}=req.body;
      fs.readFile(path.join(__dirname,"../mockData/account.json"),"utf-8",(err,data)=>{
        if (err) return res.send({ code: 1, msg: "数据库出错" });
        if (!data) {
          data = [];
        } else {
          data = JSON.parse(data);
        }
        if(data.some(item=>item.account==account))return res.send({code:1,msg:"该用户已存在"})
        let id = data.length?data.length:1;
        while (data.some((item) => item.id == id)) {
          id++;
        }
        
        let obj={
          account,password:md5(password),admin,id,ctime:utils.formateDate(new Date(),"/",1),imgUrl:`default.jpg`
        }
        switch (admin) {
          case "普通管理员":
              obj.role="nomal"
            break;
          case "超级管理员":
            obj.role="super"
            break;
        
          default:
            break;
        }
        data.push(obj);
        let jsonStr=JSON.stringify(data);
        fs.writeFile(path.join(__dirname,"../mockData/account.json"),jsonStr,err=>{
          if (err) return res.send({ code: 1, msg: "数据写入失败" });
          res.send({ code: 0, msg: "添加成功" });
        })
      })
  })
  //添加店铺图片
   app.post("/add/shopImg",(req,res)=>{
    let imgUrl = null;
    let upload = multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          callback(
            null,
            path.join(__dirname, "../../public/mockImg/shop_img")
          );
        },
        filename(req, file, callback) {
          let { ext } = path.parse(file.originalname);
          imgUrl = new Date().getTime() + ext;
          callback(null, imgUrl);
        },
      }),
    }).single("file");
    upload(req, res, (err) => {
      let { id, uid } = req.body;
      let { originalname, filename, size } = req.file;
      if(err)return res.send({code:1,msg:"图片资源出错"});
      if(!id&&!uid)return res.send({code:5001,msg:"参数错误"});
      fs.readFile(path.join(__dirname,"../mockData/shop.json"),"utf-8",(err,data)=>{
        if(err)return res.send({code:1,msg:"数据库错误"});
        if(!data)return res.send({code:1,msh:"数据库为空"});
        data=JSON.parse(data);
        data.map(item=>{
            if(item.userId==id){
              let obj={
                name:originalname,
                url:filename,
                size,
                uid
              }
              item.imgShop=item.imgShop?item.imgShop:[];
              item.imgShop.push(obj);
            }
          return item
        })
        let jsonStr=JSON.stringify(data);
        fs.writeFile(path.join(__dirname,"../mockData/shop.json"),jsonStr,err=>{
          if(err)return res.send({code:1,msg:"数据库写入出错"});
          res.send({code:0})
        })
      })
    })
   })
};
