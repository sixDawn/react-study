import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
                        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(
    rootReducer,
    enhancer
)

// const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers())

export default store


// createStore的第一个参数必须是一个reducer，如果是多个，请在reducers目录下先使用combineReducers合并之后再导出
// export default createStore(rootReducer)

// export default ()=>createStore(rootReducer)
// const store = configureStore({})
