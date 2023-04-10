
import HomeView from '../views/Home/index.vue'
import CarView from "../views/Car/index.vue"
import CategoryView from "@/views/Category/index.vue"
import MineView from "../views/Mine/index.vue"
import ListView from "../views/List/index.vue"
import DetailView from "../views/Detail/index.vue"
import SearchView from "@/views/Search/index.vue";
import InfoView from "@/views/Info/index.vue";
import OrderView from "@/views/Order/index.vue"
import MainFooter from "@/views/Layout/MainFooter.vue"

var routes = [
    {
        path: '/',
        alias: "/home",
        name: 'home',
        components: {
            default: HomeView,
            footer: MainFooter
        }
    },
    {
        path: '/car',
        name: 'car',
        components: {
            default: CarView,
            footer: MainFooter

        }

    },
    {
        path: '/category',
        name: 'category',
        components: {
            default: CategoryView,
            footer: MainFooter

        }
    },

    {
        path: '/mine',
        name: 'mine',
        components: {
            default: MineView,
            footer: MainFooter

        }
    },
    {

        path: "/list",
        name: "list",
        component: ListView // 默认渲染到default视图
    },
    {

        path: "/detail",
        name: "detail",
        component: DetailView // 默认渲染到default视图
    },
    {

        path: "/search",
        name: "search",
        component: SearchView // 默认渲染到default视图
    },
    {

        path: "/info",
        name: "info",
        component: InfoView // 默认渲染到default视图
    },
    {

        path: "/order",
        name: "order",
        component: () => import("../views/Order/index.vue")
    },
    {

        path: "/confirmOrder",
        name: "confirmOrder",
        component: () => import("../views/Order/confirmOrder.vue")
    },
    {

        path: "/order/detail/:id",
        name: "orderDetail",
        component: () => import("../views/Order/orderDetail.vue")
    },

    {
        path: "/address/list",
        name: "addressList",
        component: () => import("../views/Address/List.vue")
    },
    {

        path: "/address/edit",
        name: "addressEdit",
        component: () => import("../views/Address/Edit.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login/index.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register/index.vue")
    },
    {
        path: "/404",
        name: "notfound",
        component: () => import("../views/NotFound/index.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/404'
    }

]
export default routes