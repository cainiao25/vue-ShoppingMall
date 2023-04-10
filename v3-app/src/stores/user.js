import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { toRef } from 'vue';

export const useUserStore = defineStore('user', () => {

    let loginInfo = reactive({
        token: "",
        userid: "",
    })

    let token = toRef(loginInfo, "token")
    let userid = toRef(loginInfo, "userid")
    let isLogin = computed(() => {
        return !!loginInfo.token && !!loginInfo.userid
    })
    // 登录之后更新
    let UpdateAuthorityState = async params => {
        // 更新数据
        for (let key in params) {
            let val = params[key]
            loginInfo[key] = val;
        }

        // 存储到localStorage
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo))
    }


    // 退出登录 -> 清除
    let clearAuthorityState = async () => {
        // 更新store
        let params = {
            token: "",
            userid: "",
        }
        for (let key in params) {
            var val = params[key]
            loginInfo[key] = val;
        }
        // 删除本地存储
        localStorage.removeItem("loginInfo", JSON.stringify(loginInfo))
    }


    //  // 每次打开页面 -> 初始化state和数据
    let initAuthorityState = async () => {
        let str = localStorage.getItem("loginInfo");
        if (str) {
            let param = JSON.parse(str);
            for (let key in param) {
                var val = param[key];
                loginInfo[key] = val
            }
        }
    }
    return {
        loginInfo,
        isLogin,
        token,
        userid,
        UpdateAuthorityState,
        clearAuthorityState,
        initAuthorityState,
    }

})
