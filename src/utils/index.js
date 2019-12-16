import store from "@/redux/store"

/**
 * 根据id匹配字典的文字
 * @param {*} id 字典id
 * 返回字典文字 label
 */
export const getDectionaryLable = id => {
    const note = store.getState().dictionary.filter(item => {
        return id === item.id
    })
    if (note.length > 0) {
        return note[0].label
    } else {
        return '-'
    }
    
}