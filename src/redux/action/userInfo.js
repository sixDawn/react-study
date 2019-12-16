import actionType from './types'
import { saveStorage } from '@utils/storage';


export const setUserInfo = (userInfo) => {
    saveStorage('userInfo', userInfo);
    return ({ 
        type: actionType.USER_INFO,
        userInfo
        /* payload: {
            id
        } */
    })
}
