import { combineReducers } from 'redux'
import userInfo from './userInfo'
import dictionary from './dictionary'

// export default userInfo

export default combineReducers({
    userInfo,
    dictionary
})
