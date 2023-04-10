// 1. 引入你需要的组件
// import { Button } from 'vant';
// import { Col, Row } from 'vant';
// import { Icon } from 'vant';
// import { Toast } from 'vant';
// import { Form, Field, CellGroup } from 'vant'
// import { NavBar } from 'vant'
// import { Tabbar, TabbarItem } from 'vant';

import router from "@/router/index.js"
import { useUserStore } from "@/stores/user.js";


// 插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码

export default {
    install(app, options) {

        // console.log(app);
        // console.log(options);

        // 3. Vant 注册你需要的组件
        // app.use(Button);
        // app.use(Col);
        // app.use(Row);
        // app.use(Icon);
        // app.use(Toast);
        // app.use(Form);
        // app.use(Field);
        // app.use(CellGroup);
        // app.use(NavBar);
        // app.use(Tabbar);
        // app.use(TabbarItem);


        // 注册全局组件(自定义组件)
        // app.component()

        // app.directive()

        // app.provide()



        // 全局属性
        // vue2 中 => new Vue()  实例化对象  => 给所有的实例化对象新增属性或方法如何添加
        // import {Message} from "element-ui";
        // Vue.prototype.$message = Message
        // this.$message()  等价于 Message()

        // app.config.globalProperties   一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。
        app.config.globalProperties.msg = "hello";
        // 这使得 msg 在应用的任意组件模板上都可用，并且也可以通过任意组件实例的 this 访问

        app.config.globalProperties.back = () => {
            console.log("back方法被调用");
            router.back();
        };


        // 在根应用定义的全局属性和方法 
        // 1. 在模板template可以直接用
        // 2. 但是在Vue的script中无法直接使用(setup)  => 为什么(方法存在当前实例app上)

        app.config.globalProperties.getLoginStatus = () =>{
            let store = useUserStore()
            return store.isLogin
        }
        app.config.globalProperties.getLoginUserId = ()=>{
            let store = useUserStore();
            return store.userid
        }
        app.config.globalProperties.toLogin=(isRemRoute=true)=>{
            if(isRemRoute){
                router.push({name:"login",query:{ReturnURL:encodeURIComponent(router.currentRoute.value.fullpath)}})
            }else{
                router.push({name:"login"})
            }
        }

    }
}