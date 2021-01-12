import Cookies from 'js-cookie'

/**
 * @method : 是否开启权限校验
 *          1、本地开发模式       ----> false
 *          2、在线打包发布模式    ----> true
 */
export const verifySwitch = process.env.NODE_ENV === 'production'

// 获取登录 Cookie token
export function getCookie(key) {
    if (verifySwitch == true) {
        return Cookies.get(key, { domain: '' })
    } else {
        return Cookies.get(key)
    }
}

// 存入 Cookie token
export function setCookie(key, val) {
    if (verifySwitch == true) {
        Cookies.set(key, val, { domain: '' })
    } else {
        Cookies.set(key, val)
    }
}