import { createStore, compose } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';

// 引入所有的reducer
import reducer from "../reducers/userInfo_login";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = composeWithDevTools({})

export default ()=>createStore(reducer, /* preloadedState, */ composeEnhancers())
