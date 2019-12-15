import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { CartList } from './views';   // import CartList from './views/CartList'

import store from './views/CartList/store';

// window.store = store


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CartList/>
      </Provider>
    )
  }
}

{/* <CartList store={store} /> */}