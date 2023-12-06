// 路由配置信息
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default
    [
        { path: '/', redirect: '/home', component: Home },
        {
            path:'/shopcart',
            component:ShopCart,
            name:'shopcart',
            meta:{
                show:true
                // 显示底下的footer
            }
        },
        {
            path:'/addcartcuccess/:skuNum',
            component:AddCartSuccess,
            name:'addcartcuccess',
            meta:{
                show:true
                // 显示底下的footer
            }
        },
        {
            path: '/detail/:shui',
            component: Detail,
            meta: {
                show: true
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        },
        {
            path: '/search/:keyword?',
            name: "search",
            component: Search,
            meta: {
                show: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        }

    ]