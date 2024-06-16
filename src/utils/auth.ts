import Cookies from 'js-cookie'

// 设置用户Token到Cookie
const TOKEN_KEY: string = 'token'
export const getToken = () => Cookies.get(TOKEN_KEY)
export const setToken = (token: string) => Cookies.set(TOKEN_KEY, token)
export const removeToken = () => Cookies.remove(TOKEN_KEY)
