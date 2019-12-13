import { createStore } from 'redux'

// import rootReducer from './reducers/index'
import rootReducer from './reducers/index'

//调试工具插件方法 -- redux降级到3.7可使用
 //import { composeWithDevTools } from 'redux-devtools-extension' 
 //export default ()=>createStore(reducer,composeWithDevTools)

// createStore的第一个参数必须是一个reducer，如果是多个，请在reducers目录下先使用combineReducers合并之后再导出
export default createStore(rootReducer)

// export default ()=>createStore(rootReducer)
// const store = configureStore({})
