const fs=require("fs");
const path =require("path");
const crypto = require("crypto-js");
const md5=require("md5");
module.exports=app=>{
    app.post("/api/login",(req,res)=>{
        let {account,password}=req.body;
        fs.readFile(path.join(__dirname,"../mockData/account.json"),"utf-8",(err,data)=>{
            if(err)return res.send({code:1,msg:"数据读取出错"});
            if(!data)return res.send({code:1,msg:"当前还没有用户注册过"});
            data=JSON.parse(data);
            let [user]=data.filter(item=>item.account==account);
            if(!user)return res.send({code:1,msg:"用户名不存在"})
            console.log(md5(password));
            if(user.password==md5(password)){
                let crypted=crypto.AES.encrypt(`${new Date().getTime()}-${user.id}`,"Bearer").toString();
                res.send({
                    code:0,
                    msg:"登录成功",
                    data:{
                        id:user.id,
                        admin:user.admin,
                        token:crypted,
                        account:user.account,
                        imgUrl:`acc_img/${user.imgUrl}`,
                        ctime:user.ctime
                    }
                })
            }else{
                res.send({code:1,msg:"密码错误"});
            }
        })
    })
}