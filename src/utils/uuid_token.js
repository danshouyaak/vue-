// 引入uuid
import {v4 as uuidv4} from 'uuid'
// 生成一个随机的字符串  且每次执行不能发生变化  游客身份持久存储
export const getUUID = () =>{
    // 看本地存储有没有用户信息  有就不生成 
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有 就生成游客身份一次 进行本地存储
    if (!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 一定要有返回值 外面调用的是个函数
    return uuid_token
}