const Mock = require("mockjs");
const fs=require("fs");
const path=require("path");

let obj = Mock.mock({
  "list|50": [
    {
      "num|1300000000000-1990000000000":1445564824154 ,
      "startTime": "@dateTime('HH:mm:ss')",
      "tell": /^1[3-9][0-9]{9}$/,
      "user": "@cname",
      "adress": "@county(true)",
      "endTime": "19:32:00",
      "other|1": ["微辣","轻度辣","中辣","特辣","变态辣"],
      "price|100-200.2":110.11,
      "status|1":["已受理","未受理"],
    },
  ],
});

fs.readFile(path.join(__dirname,"../mockData/order.json"),"utf-8",(err,data)=>{
    if(err)return;
    data=JSON.parse(data);
    let arr=obj.list;
    let arr1=data.concat(arr);
    fs.writeFile(path.join(__dirname,"../mockData/order.json"),JSON.stringify(arr1),err=>{
        if(err)return;
    })
})
