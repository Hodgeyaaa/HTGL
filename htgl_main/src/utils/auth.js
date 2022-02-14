import {TOKEN_TIME, TOKEN_TIME_VALUE} from './constant'
// 设置登录时间
export const setTokenTime = () => {
    localStorage.setItem(TOKEN_TIME, Date.now())
}
// export const getTokenTime = () => {
//     return localStorage.getItem(TOKEN_TIME)
// }
// 判断是否已过期
export const diffTokenTime = () => {
    const currentTime =  Date.now()
    const cache_tokenTime = localStorage.getItem(TOKEN_TIME)
    const cha = currentTime - cache_tokenTime
    return cha > TOKEN_TIME_VALUE
}