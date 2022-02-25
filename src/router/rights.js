const getComponent = (name, component) => () =>
  import(`@/views/${name}/${component}.vue`);

const errorRouter=[
  {
    path:"/404",
    component:getComponent("404","404")
  },
  {
    path:"*",
    redirect:"/404"
  }
]

export const getData = function (data, role) {
  if (data.role.includes(role)) {
    if (data.children) {
      let obj = {
        children: [],
      };
      data.children.forEach((item) => {
        getData(item, role) ? obj.children.push(getData(item, role)) : "";
      });
      data.children = obj.children;
      return data;
    } else {
      return data;
    }
  } else {
    return "";
  }
};

export const oneSubStr = function (str) {
  return str.substr(1);
};
export const uppStr = function (str) {
  return str[0].toUpperCase() + str.substr(1);
};
export const sonStr = function (str, num = 0) {
  str = str.substr(1);
  return num == 0
    ? str.split("-")[0] + uppStr(str.split("-")[1])
    : uppStr(str.split("-")[0]) + uppStr(str.split("-")[1]);
};

export const newRouter = (routerList,myRouter,routes) => {
    let arr=[];
  routerList.forEach((item) => {
    if (item.children) {
      arr.push({
        path: item.router,
        redirect: item.children[0].router,
        meta: { title: item.title },
        component: getComponent(
          oneSubStr(item.router),
          uppStr(oneSubStr(item.router))
        ),
      });
      item.children.forEach((item1) => {
        arr.push({
          path: item1.router,
          meta: { title: item1.title },
          component: getComponent(
            oneSubStr(item.router),
            sonStr(item1.router, 1)
          ),
        });
      });
    } else {
      arr.push({
        path: item.router,
        meta: { title: item.title },
        component: getComponent(
          oneSubStr(item.router),
          uppStr(oneSubStr(item.router))
        ),
      });
    }
  });

  let newRouterData = [
    {
      path: "/",
      redirect: "/home",
      component: getComponent("layout", "Layout"),
      children: arr,
    },
  ];
  myRouter.addRoutes([...routes, ...newRouterData,...errorRouter]);
};
