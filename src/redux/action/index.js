/*
* Action类型:用户事件操作 
*/
import * as TYPE from "./types";
import { saveStorage } from '@utils/storage';

export const switchMenu = (menuName) => {
    return ({ 
        type: TYPE.SWITCH_MENU,
        menuName 
    })
}

export const setUserInfo = (userInfo) => {
    saveStorage('userInfo', userInfo);
    return ({ 
        type: TYPE.USER_INFO,
        userInfo
    })
}


export const addNum = (num) => ({ type: 'ADDNUM', data: num })
