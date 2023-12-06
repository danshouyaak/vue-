// 路由配置信息
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";
export default
    [
        { path: '/', redirect: '/home', component: Home },
        {
            path: '/center',
            component: Center,
            name: 'center',
            meta: {
                show: true
                // 显示底下的footer
            },
            // 二级路由
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {path:'/center',redirect:'/center/myorder' ,component:MyOrder}
            ]
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            name: 'paysuccess',
            meta: {
                show: true
                // 显示底下的footer
            }
        },
        {
            path: '/pay',
            component: Pay,
            name: 'pay',
            meta: {
                show: true
                // 显示底下的footer
            }
        },
        {
            path: '/trade',
            component: Trade,
            name: 'trade',
            meta: {
                show: true
                // 显示底下的footer
            }
        },
        {
            path: '/shopcart',
            component: ShopCart,
            name: 'shopcart',
            meta: {
                show: true
                // 显示底下的footer
            }
        },
        {
            path: '/addcartcuccess/:skuNum',
            component: AddCartSuccess,
            name: 'addcartcuccess',
            meta: {
                show: true
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
            name: 'login',
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