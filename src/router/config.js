import Login from '@views/login'

import Home from '@views/home'
import pageList from '@views/pageList';
import dictionaryList from '@views/dictionaryList';

import personalSettings from '@views/personalSettings';
import changpwd from '@views/changpwd';

const RouterList = [
    {
     path: '/',
     name: '',
     component: Home,
    }, {
       path: '/home',
       name: '首页',
       link: '/home',
       component: Home,
       subs: [
          {
             path: '/home/pageList',
             name: '来文管理',
             component: pageList
          }, {
             path: '/home/dictionaryList',
             name: '字典管理',
             component: dictionaryList
          }
       ]
    }, {
        path: '/systemManage',
        name: '系统管理',
        link: '/systemManage',
        component: Home,
        subs: [
           {
              path: '/systemManage/pageList',
              name: '来文管理',
              component: pageList
           }, {
              path: '/systemManage/dictionaryList',
              name: '字典管理',
              component: dictionaryList
           }
        ]
     }, {
      path: '/personalCenter',
      name: '个人中心',
      link: '/personalCenter',
      component: personalSettings,
      subs: [
         {
            path: '/personalCenter/personalSettings',
            name: '个人主页',
            component: personalSettings
         }, {
            path: '/personalCenter/changpwd',
            name: '修改密码',
            component: changpwd
         }
      ]
   }, {
     path: '/login',
     name: '登录',
     component: Login
    }
 ];
 
 
 export default RouterList;
 