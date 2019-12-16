import service from './axios.js'
import * as INTER from "./interface.js";

export const LOGIN = data => {
    return service({
        url: INTER.LOGIN,
        method: 'post',
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

export const SelectDocument = data => {
    return service({
        url: INTER.selectDocument,
        method: 'get',
        params: data
    })
}

export const SelectDictionaryType1 = data => {
    return service({
        url: INTER.selectDictionaryType1,
        method: 'get',
        data: data
    })
}

export const SelectAdminList = data => {
    return service({
        url: INTER.selectAdminList,
        method: 'get',
        data: data
    })
}

export const Dictionary = data => {
    return service({
        url: INTER.dictionary,
        method: 'get',
        data: data
    })
}

// 字典
export const SelectDictionary = data => {
    return service({
        url: INTER.selectDictionary,
        method: 'get',
        data: data
    })
}
