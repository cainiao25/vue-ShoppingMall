<template>
    <div class="login">
        <!-- navBar虽然书写时在Login页面中 => 渲染时传递到了.appHeader -->
        <teleport to=".app-header">
            <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="back"></van-nav-bar>
        </teleport>
        <van-form @submit="onSubmit" ref="formLogin" autocomplete="off">
            <van-cell-group inset>
                <van-field v-model="info.tel" name="tel" label="手机号" placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <van-field v-model="info.password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { doUserLoginAPI } from "@/api/user.js";
import { showFailToast, showSuccessToast } from "vant";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js"
let router = useRouter()
let store = useUserStore();
let info = reactive({
    tel: "",
    password: ""
})
let formLogin = ref();
const onSubmit = async () => {
    var { tel, password } = info
    if (tel && password) {
        console.log("准备登录");
        try {
            var res = await doUserLoginAPI({ loginname: tel, password: password })
            showSuccessToast("登录成功")
            console.log(res);
            store.UpdateAuthorityState(res.data)
            router.push("/home")
            return true
        } catch (err) {
            showFailToast(err.message)
            return false
        }
    }
};

</script>

<style lang="scss" scoped></style>