export const USER_INFO = { }

const storage = window.localStorage

/**
 * 设置本地存储
 * @param key
 * @param value
 * @returns {*}
 */
export function saveStorage (key, value) {
    if (!value) {
      storage.removeItem(key)
      return value
    }
    if (value.constructor === Object) {
        storage.setItem(key, JSON.stringify(value))
    }
    if (typeof(value) === 'string') {
        storage.setItem(key, value)
    }
  return value
}

/**
 * 获取本地存储
 * @param key
 * @returns {*}
 */
export function getStorage (key) {
    let res = null
    try {
      res = JSON.parse(storage.getItem(key))
    } catch (err) {
      res = storage.getItem(key)
    }
  return res
}

/**
 * 删除本地存储
 * @param key
 * @returns {string}
 */
export function removeStorage (key) {
  storage.removeItem(key)
  return ''
}

