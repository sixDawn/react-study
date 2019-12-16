/* 
* Reducer: 数据处理 
*/
import { getStorage } from '@utils/storage';
import * as TYPE from './../action/types'

const initialState = {
    menuName:'首页',
    userInfo: getStorage('userInfo')
}

const ebikeData = (state = initialState, action)=>{
    // 处理数据
    // console.log('state', state)
    console.log('action', action)
    switch (action.type) {
        case TYPE.SWITCH_MENU:
            return {
                ...state, // 旧值
                menuName: action.menuName // 新值
            }
        case TYPE.USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return{
                ...state
            }
    }
}

export default ebikeData
