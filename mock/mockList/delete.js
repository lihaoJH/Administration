
const fs=require("fs");
const path=require("path");

module.exports=app=>{
    //商品删除
    app.post("/delete/goods",(req,res)=>{
        let {id}=req.body;
        fs.readFile(path.join(__dirname,"../mockData/goods.json"),"utf-8",(err,data)=>{
            if(err)return res.send({code:1,msg:"数据库读取错误"});
            if(!data)return res.send({code:1,msg:"数据为空"});
            data=JSON.parse(data);
            if(!data.some(item=>item.id==id))return res.send({code:1,msg:"此商品不存在"});
            let index=data.findIndex(item=>item.id==id);
            data.splice(index,1);
            let jsonStr=JSON.stringify(data);
            fs.writeFile(path.join(__dirname,"../mockData/goods.json"),jsonStr,(err)=>{
                if(err)return res.send({code:1,msg:"数据库写入错误"});
                res.send({code:0,msg:"删除商品成功"});
            })

        })
    });
    //删除商品分类名  
    app.post("/delete/cateName",(req,res)=>{
        let {id}=req.body;
        fs.readFile(path.join(__dirname,"../mockData/goodsClassily.json"),"utf-8",(err,data)=>{
            if(err)return res.send({code:1,msg:"数据库读取错误"});
            if(!data)return res.send({code:1,msg:"数据为空"});
            data=JSON.parse(data);
            if(!data.some(item=>item.id==id))return res.send({code:1,msg:"此分类名不存在"});
            let index=data.findIndex(item=>item.id==id);
            data.splice(index,1);
            let jsonStr=JSON.stringify(data);
            fs.writeFile(path.join(__dirname,"../mockData/goodsClassily.json"),jsonStr,(err)=>{
                if(err)return res.send({code:1,msg:"数据库写入错误"});
                res.send({code:0,msg:"删除分类名成功"});
            })

        })
    });
    //删除用户
    app.post("/delete/account",(req,res)=>{
        let {id}=req.body;
        if(!id)return res.send({code:5001,msg:"参数错误"});
        let arr=Array.isArray(id)?id:[id];
        fs.readFile(path.join(__dirname,"../mockData/account.json"),"utf-8",(err,data)=>{
            if(err)return res.send({code:1,msg:"数据库出错"});
            if(!data)return res.send({code:1,msg:"数据库为空"});
            data=JSON.parse(data);
            arr.forEach(item=>{
                let index=data.findIndex(item1=>item1.id==item);
                data.splice(index,1); 
            })
            let jsonStr=JSON.stringify(data);
            fs.writeFile(path.join(__dirname,"../mockData/account.json"),jsonStr,(err)=>{
                if(err)return res.send({code:1,msg:"数据库出错"});
                res.send({
                    code:0,
                    msg:"删除成功"
                })
            })

        })
    });  
    //删除店铺图片
    app.post("/delete/shopImg",(req,res)=>{
        let {id,uid}=req.body;
        if(!id&&!uid)return res.send({code:5001,msg:"参数错误"});
        fs.readFile(path.join(__dirname,"../mockData/shop.json"),"utf-8",(err,data)=>{
            if(err)return res.send({code:1,msg:"数据库读取出错"});
            if(!data)return res.send({code:1,msg:"数据库为空"});
            data=JSON.parse(data);
            let arr=JSON.parse(JSON.stringify(data.find(item=>item.userId==id)));
            data.map(item=>{
                if(item.userId==id){
                    let index=item.imgShop.findIndex(item1=>item1.uid==uid);
                    item.imgShop.splice(index,1);
                }
                return item
            })
            arr.imgShop.forEach(item=>{
                if(item.uid==uid){
                    fs.unlink(path.join(__dirname,`../../public/mockImg/shop_img/${item.url}`),err=>{
                        if(err)return res.send({code:1,msg:"图片删除失败"})
                    })
                }
            })
            let jsonStr=JSON.stringify(data);
            fs.writeFile(path.join(__dirname,"../mockData/shop.json"),jsonStr,err=>{
                if(err)return res.send({code:1,msg:"数据库写入失败"});
                res.send({code:0})
            })
        })
    }) 
}