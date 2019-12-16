import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import RouterList from './config'

function getRouterList() {
   let arr = [];
   RouterList.forEach(item => {
      if(item.subs) {
         arr = [...arr, ...item.subs];
      }
   })
   
   return arr
}

class HomeRouter extends Component {
   render() {
      const routers = getRouterList();
      return(
         <Switch>
            <Redirect
               exact
               from='/'
               to="/systemManage"/>
            <Redirect
               exact
               from='/systemManage'
               to="/systemManage/pageList"/>
            {
               routers.map((item, index) => {
                  return (
                     <Route path={item.path} key={item.path} component={item.component} />
                  )
               })
            }
         </Switch>
      )
   }
}

export default HomeRouter

