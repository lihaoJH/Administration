const fs = require("fs");
const path = require("path");
const url = path.join(__dirname + "/mockList");
const files = fs.readdirSync(url);
const crypto = require("crypto-js");
const mockList = [];
files.forEach((filename) => {
  let model = require(url + "/" + filename);
  mockList.push(model);
});
function handleMock(app) {
  app.use((req, res, next) => {
    let reg = /^(?=.*\/)(?=.*\.).*$/;
    if (!reg.test(req.url)) {
      if (req.url != "/") {
        if (req.url != "/api/login") {
          if (!req.headers.authorization)
            return res.send({ code: 400, msg: "未经授权" });
          let data = req.headers.authorization.split("-");
          let [timeNum, id] = crypto.AES.decrypt(data[1], data[0])
            .toString(crypto.enc.Utf8)
            .split("-");
          let date = new Date().getTime();
          let delayed = 60 * 60 * 1000 + Number(timeNum);
          if(delayed<date){
             return res.send({code:401,msg:"登录已过期"})
          }
        }
      }
    }
    next();
  });
  mockList.forEach((func) => {
    func(app);
  });
}
module.exports = handleMock;
