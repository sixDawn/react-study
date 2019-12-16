import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from '@views/login'
import Home from '@views/home'


class App extends Component {

  componentDidMount () {
    // console.log('App', this.props)
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
  // console.log('state',state)
  return {
    userInfo: state.userInfo
  }
}
export default connect(mapStateToProps)(App)


/* <Route path='/login' component={Login}/>
  <Route path='/' component={Home}/>*/
