

const menuGroups = [
    {
      name: '首页',
      path: '/home',
      menus: [
         {
            name:"来文管理",
            path:"/home/pageList"
         }, {
            name:"字典管理",
            path:"/home/dictionaryList"
         },
      ]
   }, {
      name: '个人中心',
      path: '/personalCenter',
      component: personalSettings,
      menus: [
         {
            name: '个人主页',
            path: '/personalCenter/personalSettings',
         }, {
            name: '修改密码',
            path: '/personalCenter/changpwd',
         }
      ]
   },
 ];
 
 
 export default menuGroups;
 