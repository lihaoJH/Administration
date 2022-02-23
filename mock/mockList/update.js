const fs = require("fs");
const path = require("path");
const multer = require("multer");
const md5 = require("crypto-js/md5");

module.exports = (app) => {
  // 商品分类修改
  app.post("/update/cateName", (req, res) => {
    let { id, cateName, state } = req.body;
    fs.readFile(
      path.join(__dirname, "../mockData/goodsClassily.json"),
      "utf-8",
      (err, data) => {
        if (err) return res.send({ code: 1, msg: "数据库出错" });
        data = JSON.parse(data);
        if (!data.some((item) => item.id == id))
          return res.send({ code: 1, msg: "分类名不存在" });
        data.map((item) => {
          if (item.id == id) {
            item.cateName = cateName;
            item.state = state;
          }
          return item;
        });
        let jsonStr = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, "../mockData/goodsClassily.json"),
          jsonStr,
          (err) => {
            if (err) return res.send({ code: 1, msg: "数据库写入出错" });
            res.send({ code: 0, msg: "分类名修改成功" });
          }
        );
      }
    );
  });
  // 商品修改
  app.post("/update/goods", (req, res) => {
    let imgUrl1 = null;
    let shopInfo = null;
    let upload = multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          shopInfo = req.body;
          console.log(shopInfo);
          fs.unlink(
            path.join(__dirname, `../../public/mockImg/${shopInfo.imgUrl}`),
            (err) => {
              if (err) return;
            }
          );
          callback(
            null,
            path.join(__dirname, "../../public/mockImg/goods_img")
          );
        },
        filename(req, file, callback) {
          let { ext } = path.parse(file.originalname);
          imgUrl1 = new Date().getTime() + ext;
          callback(null, imgUrl1);
        },
      }),
    }).single("file");
    upload(req, res, (err) => {
      if (err) return res.send({ code: 1, msg: "数据库出错" });
      let { name, category, id, goodsDesc, price, sellCount, rating, ctime } =
        req.body;
      fs.readFile(
        path.join(__dirname, "../mockData/goods.json"),
        "utf-8",
        (err, data) => {
          if (err) return res.send({ code: 1, msg: "数据库读取错误" });
          if (!data) return res.send({ code: 1, msg: "数据库为空" });
          data = JSON.parse(data);
          if (!data.some((item) => item.id == id))
            return res.send({ code: 1, msg: "此商品不存在" });
          data.map((item) => {
            if (item.id == id) {
              item.name = name;
              item.category = category;
              item.goodsDesc = goodsDesc;
              item.sellCount = sellCount;
              item.price = price;
              item.rating = rating;
              item.ctime = ctime;
              if (imgUrl1) {
                item.imgUrl = imgUrl1;
              }
            }
            return item;
          });
          let jsonStr = JSON.stringify(data);
          fs.writeFile(
            path.join(__dirname, "../mockData/goods.json"),
            jsonStr,
            (err) => {
              if (err) return res.send({ code: 1, msg: "数据库写入失败" });
              res.send({
                code: 0,
                msg: "修改成功",
              });
            }
          );
        }
      );
    });
  });
  //用户信息修改
  app.post("/update/userInfo", (req, res) => {
    let { id, account, admin } = req.body;
    if (!id || !account || !admin)
      return res.send({ code: 5001, msg: "参数错误" });
    fs.readFile(
      path.join(__dirname, "../mockData/account.json"),
      "utf-8",
      (err, data) => {
        if (err) return res.send({ code: 1, msg: "数据库出错" });
        if (!data) return res.send({ code: 1, msg: "数据库为空" });
        data = JSON.parse(data);
        data = data.map((item) => {
          if (item.id == id) {
            item.account = account;
            item.admin = admin;
          }
          return item;
        });
        let jsonStr = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, "../mockData/account.json"),
          jsonStr,
          (err) => {
            if (err) return res.send({ code: 1, msg: "数据库出错" });
            res.send({ code: 0, msg: "修改成功" });
          }
        );
      }
    );
  });
  //用户头像修改
  app.post("/update/userPhoto", (req, res) => {
    let imgUrl = null;
    let upload = multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          let userInfo = req.body;
          if (!userInfo.imgUrl.includes("default")) {
            fs.unlink(
              path.join(__dirname, `../../public/mockImg/${userInfo.imgUrl}`),
              (err) => {
                if (err) return;
              }
            );
          }
          callback(null, path.join(__dirname, "../../public/mockImg/acc_img"));
        },
        filename(req, file, callback) {
          let { ext } = path.parse(file.originalname);
          imgUrl = new Date().getTime() + ext;
          callback(null, imgUrl);
        },
      }),
    }).single("file");
    upload(req, res, (err) => {
      let { id } = req.body;
      if (err) return res.send({ code: 1, msg: "图片数据添加失败" });
      fs.readFile(
        path.join(__dirname, "../mockData/account.json"),
        "utf-8",
        (err, data) => {
          if (err) return res.send({ code: 1, msg: "数据库出错" });
          if (!data) return res.send({ code: 1, msg: "数据库为空" });
          data = JSON.parse(data);
          if (!data.some((item) => item.id == id))
            return res.send({ code: 1, msg: "当前用户不存在" });
          data = data.map((item) => {
            if (item.id == id) {
              item.imgUrl = imgUrl;
            }
            return item;
          });
          let jsonStr = JSON.stringify(data);
          fs.writeFile(
            path.join(__dirname, "../mockData/account.json"),
            jsonStr,
            (err) => {
              if (err) return res.send({ code: 1, msg: "数据库出错" });
              res.send({
                code: 0,
                msg: "头像修改成功",
                data: { imgUrl: `acc_img/${imgUrl}` },
              });
            }
          );
        }
      );
    });
  });
  //用户密码修改
  app.post("/update/password", (req, res) => {
    let { id, newPassword, oldPassword } = req.body;
    if (!id && !newPassword && !oldPassword)
      return res.send({ code: 5001, msg: "参数错误" });
    fs.readFile(
      path.join(__dirname, "../mockData/account.json"),
      "utf-8",
      (err, data) => {
        if (err) return res.send({ code: 1, msg: "数据库出错" });
        if (!data) return res.send({ code: 1, msg: "数据库为空" });
        data = JSON.parse(data);
        if (
          !data.some(
            (item) => item.id == id && item.password == md5(oldPassword)
          )
        )
          return res.send({ code: 1, msg: "你的密码错误" });
        data.map((item) => {
          if (item.id == id) {
            item.password = `${md5(newPassword)}`;
          }
          return item;
        });
        let jsonStr = JSON.stringify(data);
        fs.writeFile(
          path.join(__dirname, "../mockData/account.json"),
          jsonStr,
          (err) => {
            if (err) return res.send({ code: 1, msg: "数据库出错" });
            res.send({
              code: 0,
              msg: "密码修改成功",
            });
          }
        );
      }
    );
  });
  //店铺头像修改
  app.post("/update/shopHeader", (req, res) => {
    let imgUrl1 = null;
    let upload = multer({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          let { oldImg } = req.body;
          if (!oldImg.includes("default")) {
            fs.unlink(
              path.join(__dirname, `../../public/mockImg/${oldImg}`),
              (err) => {
                if (err) return;
              }
            );
          }
          callback(
            null,
            path.join(__dirname, `../../public/mockImg/shopHeader_img`)
          );
        },
        filename(req, file, callback) {
          let { ext } = path.parse(file.originalname);
          imgUrl1 = new Date().getTime() + ext;
          callback(null, imgUrl1);
        },
      }),
    }).single("file");
    upload(req, res, (err) => {
      let { id } = req.body;
      if (!id) return res.send({ code: 5001, msg: "参数错误" });
      fs.readFile(
        path.join(__dirname, "../mockData/shop.json"),
        "utf-8",
        (err, data) => {
          if (err) return res.send({ code: 1, msg: "数据库读取出错" });
          if (!data) return res.send({code:1,msg:"数据库为空"});
            data=JSON.parse(data);
          data.map(item=>{
            if(item.userId==id){
                item.imgHeader=imgUrl1;
            }
            return item;
          });
          let jsonStr=JSON.stringify(data);
          fs.writeFile(path.join(__dirname,"../mockData/shop.json"),jsonStr,err=>{
            if(err)return res.send({code:1,msg:"数据库错误"});
            res.send({code:0,data:{
              imgUrl:`shopHeader_img/${imgUrl1}`
            }})
          })
        }
      );
    });
  });
 //店铺信息修改
 app.post("/update/shopInfo",(req,res)=>{
   let info=req.body;
   if(!info)return res.semd({code:5001,msg:"参数错误"});
   fs.readFile(path.join(__dirname,"../mockData/shop.json"),"utf-8",(err,data)=>{
     if(err)return res.send({code:1,msg:"数据库读取错误"});
     if(!data)return res.send({code:1,msg:"数据库为空"});
     data=JSON.parse(data);
     data.map(item=>{
       if(item.userId==info.id){
         delete info.id;
         Object.assign(item,info);
       }
       return item;
     })
     let jsonStr=JSON.stringify(data);
     fs.writeFile(path.join(__dirname,"../mockData/shop.json"),jsonStr,err=>{
       if(err)return res.send({code:1,msg:"数据库写入失败"});
       res.send({code:0,msg:"信息修改成功"});
     })
   })
 })

};
