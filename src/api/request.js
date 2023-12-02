//对于axios进行二次封装
import axios from "axios";

//引入进度条
import nprogress from 'nprogress'
//start:进度条开始 done进度结束

import 'nprogress/nprogress.css'
//引入进度条的样式

// import store from '@/store'


///1.利用axios对象的方法create，去创建一个axios实例
///2.request就是axios
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL: '/api',

    //代表请求超时的时间为8秒
    timeout: 8000
})
//请求拦截器：再发请求之前，请求拦截器可以检测的到，可以在请求发送出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要，header请求头

    //进度条开始
    nprogress.start()
    return config
})



//相应拦截器
requests.interceptors.response.use(
    ///成功的回调：服务器相应数据回来以后，响应拦截器可以监测到，可以做一些事情
    (res) => {
        nprogress.done()
        return res.data
    },

    ///响应失败的回调函数
    (err) => {
        return Promise.reject(new Error('faile'))
    }
)



export default requests
