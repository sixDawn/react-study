import actionType from './actionType'
import { saveStorage } from '@utils/storage';


export const setUserInfo = (userInfo) => {
    saveStorage('userInfo', userInfo);
    return { 
        type: actionType.USER_INFO,
        userInfo
    }
}
