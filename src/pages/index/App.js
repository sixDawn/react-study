import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { getDictionary } from "@/redux/actions/dictionary";

import Login from '@views/login'
import Home from '@views/home'

class App extends Component {

  componentDidMount () {
    this.props.getDictionary()
  }

  render() {
    const { userInfo } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path='/login' render={(props) => {
              return !userInfo 
              ? <Login {...props}></Login>
              : <Redirect to="/" />
            }} />
            <Route path='/' render={(props) => {
              return userInfo 
              ? <Home {...props}></Home>
              : <Redirect to="/login" />
            }}/>
        </Switch>
      </Router>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}
export default connect(mapStateToProps, { getDictionary })(App)

/* <Route path='/login' component={Login}/>
  <Route path='/' component={Home}/>*/
