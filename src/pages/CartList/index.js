import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux'
import { CartList } from '@views';   // import CartList from './views/CartList'
import store from '@views/CartList/store';


class App extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <CartList/>
        </Provider>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

