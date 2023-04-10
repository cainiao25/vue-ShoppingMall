
import axios from "axios";
import { showSuccessToast, showFailToast } from 'vant';
import router from "@/router/index";
import _ from "lodash";
import { useUserStore } from "@/stores/user.js";  // 引入pinia模块
// 创建实例时配置默认值
const instance = axios.create({
    // baseURL: 'http://121.89.205.189:3000/admin',
    baseURL: 'http://localhost:3001/api',
    // baseURL: 'http://43.138.81.225:5566/api',
    timeout: 5000,
});

// 创建实例后修改默认值
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //FormData

// 拦截器
// 在请求或响应被 then 或 catch 处理前拦截它们。

// 添加请求拦截器 (在请求发送之前可以执行一系列操作)
instance.interceptors.request.use(function (config) {
    // console.log("请求拦截",config);

    // var str = localStorage.getItem("authorityInfo");
    // if(str){
    //     var data = JSON.parse(str);
    //     var token = data.token;
    //     // console.log("请求拦截token",token);
    //     config.headers.token = token;
    // }

   // 使用时在解析数据  
   let store = useUserStore();
   let { isLogin, token,userid } = store;

   if(isLogin&&token){
    config.headers.token = token
   }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


function tokenTips(){
    // Message.error("token过期,请重新登录!");   //错误提示
    // store.dispatch("authority/exitLoginStatus")   //清除数据  
    router.replace({path:"/login",query:{ReturnURL:router.currentRoute.value.fullPath}})  //重新登录
}

var debounceTokenTips = _.debounce(tokenTips,300);


// 添加响应拦截器  (在服务器响应之后(响应的结果可能是成功,也可能是失败的),数据被Promise实例存储之前)
instance.interceptors.response.use(function (response) {

    // console.log("router",router);
    // console.log(response);

    // response => axios初始的响应数据 => {config,headers,data,request,status=200,statusText}

    // 2xx 范围内的状态码都会触发该函数。   (2xx响应成功  -> 后端会给前端返回数据 -> 前端传递不同的数据,对应的结果也有多种可能 -> 登录成功 / 未注册 /密码有误)
    // 对响应数据做点什么
    // console.log("response",response);
    // return response.data;   // {code:200,message:'xxxx'}

    var isSuccess = response.data.code == 200  || response.data.code == 10003;   //请求成功
    var isTokenBreak = response.data.code ==  10119;  // token过期

   
    if(isSuccess){   //  后端会给前端返回数据 -> 接口返回的结果时成功的(登录成功)
        return response.data;  //直接返回数据
    }else if(isTokenBreak){  //token过期

        // debounceTokenTips();
        
        showFailToast("token过期,请重新登录!");
        // router.currentRoute. => 当前路由信息的ref对象 -> 当前路由  -> fullPath
        router.replace({path:"/login",query:{ReturnUrl:encodeURIComponent(router.currentRoute.value.fullPath)}})  //重新登录
        return null;    

    }else{
        // 后端会给前端返回数据   接口返回的结果是失败的(未注册 /密码有误)

        // 弹出提示信息
        // Message({
        //     message:response.data.message,
        //     type:"error"
        // })
    
        throw new Error(response.data.message);    //创建了一个错误的对象,存储错误的信息  err.message
    }

}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);  // 返回失败状态的Promise实例
});

export default instance;  //默认暴露