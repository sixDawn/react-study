import service from './axios.js'
import * as INTER from "./interface.js";

export const LOGIN = data => {
    return service({
        url: INTER.LOGIN,
        method: 'post',
        data: data
    })
}

// 字典
export const Dictionary = data => {
    return service({
        url: INTER.Dictionary,
        method: 'get',
        data: data
    })
}

export const UpdateAdmin = data => {
    return service({
        url: INTER.updateAdmin,
        method: 'post',
        data: data
    })
}

export const ChangePwd = data => {
    return service({
        url: INTER.changePwd,
        method: 'post',
        data: data
    })
}
