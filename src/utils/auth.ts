// user token
const User_Token = 'user_token'
export const Get_Token = localStorage.getItem(User_Token)
export const Set_Token = (token: string) => localStorage.setItem(User_Token, token)
export const Remove_Token = () => localStorage.removeItem(User_Token)

