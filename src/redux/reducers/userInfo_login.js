import actionType from "../actions/actionType";
import { getStorage } from '@utils/storage';


const initState = {
    userInfo: getStorage('userInfo')
}

const userInfo = (state = initState, action) => {
    console.log('action', action)
    switch(action.type) {
        case actionType.USER_INFO:
            return {
                ...state,
               userInfo: action.userInfo
            }
        default: 
            return {
                ...state
            }
    }
}

export default userInfo
