/**
 * utils.js  工具函数
 * author:lihao time:2022-02-06
 * 功能：
 *      formateDate---将格林威治时间转换为北京时间;
 *      formateSearch---将localtion.search转变为对象或者对象转为url;
 *      requestAll---ajax的万能请求;
 *      getRandomCode---获取随机的验证码;
 *      tipsBox---提示框；
 *      countDown---倒计时;
 *      dataType---数据类型的判断;
 *      deepClone---深拷贝；
 */
  module.exports= {
    //属性
    //ajax请求
    baseUrl: "http://139.9.177.51:8099",
    // 转换类--------------------
    /**
     * @formateDate 将格林威治时间转换为北京时间
     * @date  格林威治时间格式
     * @num  0. 年月日时分秒； 1.年月日； 2.时分秒
     * @type  String  北京时间格式选择："-"为连字符，"/"为斜杠,等；
     * @addZero 日期前面添零补齐
     * @return  String "2022-01-02 14:00:00" "2022/01/02 14:00:00
     */
    formateDate: function (date,type = "-",num = 0) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let mini = date.getMinutes();
      let s = date.getSeconds();
      if(this.dataType(type)!=="String")throw "type is not String"
      if (num == 0) {
        return `${y}${type}${addZero(m)}${type}${addZero(d)} ${addZero(h)}:${addZero(mini)}:${addZero(s)}`;
      } else if(num==1){
        return `${y}${type}${addZero(m)}${type}${addZero(d)}`;
      }else if(num==2){
        return `${addZero(h)}:${addZero(mini)}:${addZero(s)}`;
      }else{
        throw "error num out of range";
      }
      function addZero(num) {
        return num.toString().padStart(2, "0");
      }
    },
    /**
     * @formateSearch 将localtion.search转变为对象或者对象转为url
     * @data  类型：String||Object，如果是接收的是url则转为对象，否者转为字符串;
     * @return  String||Object,传入String返回Object，否则返回：?key1=value1&key2=value2;
     */
    formateSearch: function (data) {
      let bool = Object.prototype.toString.call(data);
      if (bool.includes("String")) {
        let obj = {};
        data
          .substr(1)
          .split("&")
          .forEach((item) => {
            obj[item.split("=")[0]] = item.split("=")[1];
          });
        return obj;
      } else {
        let str = "";
        for (key in data) {
          str += key + "=" + data[key] + "&";
        }
        return "?" + str.substring(0, str.length - 1);
      }
    },
    /**
     * @requestAll ajax的万能请求：支持post，get，file;
     * @obj  一个对象：type:请求类型,url:请求地址（get不带参数）,
     *                data:对象类型，请求携带的数据，succsee:成功的回调函数;
     * @callback  返回响应文本（对象）;
     */
    requestAll: function (obj) {
      let xhr = new XMLHttpRequest();
      if (obj.type.toLowerCase().includes("post")) {
        xhr.open("POST", obj.url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(obj.data));
      } else if (obj.type.toLowerCase().includes("get")) {
        xhr.open("get", obj.url + this.formateSearch(obj.data));
        xhr.send();
      } else if (obj.type.toLowerCase().includes("file")) {
        xhr.open("post", obj.url);
        const fd = new FormData();
        for (key in obj.data) {
          fd.append(key, obj.data[key]);
        }
        xhr.send(fd);
      } else {
        return alert("你的请求方式不存在");
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
          obj.success(JSON.parse(xhr.responseText));
        }
      };
    },
    /**
     * @getRandomCode 获取随机的验证码
     * @num  验证码的位数 默认4位
     * @return  str String类型 
     */
    getRandomCode: function (num=4) {
      let str = "1234567890AQWERTYUIOPSDFGHJKLMNBVCXZabcdefghjklmnopqrstuvwxyz";
      let str1 = "";
      for (let i = 0; i < num; i++) {
        let num = Math.floor(Math.random() * str.length);
        str1 += str[num];
      }
      return str1;
    },
    /**
     * @tipsBox 弹出框提示框  给用户提示
     * @num 0 成功的提示 1 失败的提示
     * @msg 提示的文字
     * 无返回
     *  */
     tipsBox: function (num = 0, msg) {
      let div = document.createElement("div");
      div.className = "tipsFixed";
      div.innerHTML = `
      <div class="tipsContent">
          <div class="tipsTxt">
              <span class="icon">${num == 0 ? "√" : "!"}</span>
              <p class="txt">${msg}</p>
         </div>
         </div>
      `;
      document.body.appendChild(div);
      setTimeout(() => {
        div.remove();
      }, 1000);
    },
    /**
     * 倒计时
     * @end 结束的时间
     * */
    countDown: function (end) {
      if(!end)throw "countDown cannot be empty";
      if(end.toString().length>13)throw "end time length cannot exceed 13 bits "
      let now="";
      if(end.toString().length==13){
       now=end-(new Date().getTime());
      }else{
        now=end*Math.pow(10,13-end.toString().length)-(new Date().getTime())
      }
     let newSeconds=Math.round(now/1000);
     let d=Math.floor(newSeconds/60/60/24).toString().padStart(2,"0");
      let h=Math.floor(newSeconds/60/60%24).toString().padStart(2,"0");
      let m=Math.floor(newSeconds/60%60).toString().padStart(2,"0");
      let s=Math.floor(newSeconds%60).toString().padStart(2,"0");
      return `${d<=0?"":d+"天"}${h<=0?"":h+":"}${m<=0?"":m+":"}${s<=0?"":s}`
    },
    /**
     * @dataType 数据类型的判断
     * @source 要判断的数据
     * @return string 返回数据类型
     * */
    dataType: function (source) {
      if (source === null) return "Null";
      if (source === undefined) return "Undefined";
      return source.__proto__.constructor.name;
    },
    /**
     * @deepClone 深浅拷贝
     * @source 需要拷贝的引用数据类型
     * @return 一个拷贝后的数据
     *
     */
    deepClone: function (source) {
      if (!source) throw "Deep copy data cannot be empty";
      let obj = null;
      if (
        this.dataType(source) === "Array" ||
        this.dataType(source) === "Object"
      ) {
        obj = Array.isArray(source) ? [] : {};
        for (const key in source) {
          obj[key] = this.deepClone(source[key]);
        }
      } else {
        obj = source;
      }
      return obj;
    },
  };




