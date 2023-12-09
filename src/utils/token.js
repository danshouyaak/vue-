export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}
// 清除本地token的函数
export const removeToken = ()=>{
    return localStorage.removeItem('TOKEN')
}