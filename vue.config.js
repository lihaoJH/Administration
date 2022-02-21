const path=require("path");
const bodyParser=require("body-parser");
const isProduction=process.env.NODE_ENV==="production";
let feMock;
if(!isProduction){
    feMock=require("./mock/mock");
}
function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports={
    chainWebpack:config=>{
        config.resolve.alias
        .set("@",resolve("src"))
        .set("@assets",resolve("src/assets"))
        .set("@store",resolve("src/store"))
        .set("@components",resolve("src/components"))
        .set("@views",resolve("src/views"))
        .set("@api",resolve("src/api"))
    },
    publicPath:isProduction?"././":"",
    pages:{
        index:{
            entry:"src/main.js",
            template:"pulic/index.html",
            filename:"index.html"
        }
    },
    devServer:{
        open:true, //打开浏览器
        before:app=>{
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:false}));
            if(!isProduction){
                feMock(app);
            }
        }
    }
}