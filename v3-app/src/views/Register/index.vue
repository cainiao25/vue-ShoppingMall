<template>
    <div class="register">
        <van-form ref="formAdd" class="register-form" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="info.tel" name="tel" label="手机号" placeholder="手机号" :rules="telRules" />
                <van-field v-model="info.password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />

                <van-field v-model="info.code" 
                center 
                clearable 
                name="code" label="短信验证码" 
                placeholder="请输入短信验证码"
                :rules="codeRules">
                    <template #button>
                        <van-button size="small" type="primary" @click="sendMsgCode">发送验证码</van-button>
                    </template>
                </van-field>
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
import { ref, reactive } from 'vue';
import { doFinishRegisterAPI, docheckPhoneAPI, doCheckCodeAPI, doSendMsgCodeAPI } from "@/api/user.js"
import { showSuccessToast, showFailToast } from 'vant';
import {useRouter} from "vue-router";

let router = useRouter();
let info = reactive({
    tel: "",
    password: "",
    code: "",
})
const validatorTel = async (val) => {
    console.log("接收手机号", val);
    try {
        var res = await docheckPhoneAPI({ tel: val })
        console.log(res);
        showSuccessToast("可以使用的手机号")
        return true
    } catch (err) {
        showFailToast(err.message)
        console.log(111);
        return false
    }
}

let telRules = [
    { required: true, message: '请填写手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: "请填写正确的手机号" },
    { validator: validatorTel, message: "该账号已被注册" },
]
const validatorCode = async (val) =>{
    console.log("接收到验证码",val);
    try{
        var res = await doCheckCodeAPI({tel:info.tel,telcode:val})
        console.log(res);
        showSuccessToast("可以使用的验证码")
        return true
    }catch(err){
        // console.log(err.message);
        showFailToast(err.message)
        return false
    }
}
let codeRules=[
    {required:true,message:"请输入验证码"},
    {validator:validatorCode,message:"请输入正确的验证码"}
]
let sendMsgCode = async () => {
    try {
        var res = await doSendMsgCodeAPI({ tel: info.tel })
        console.log(res);
        showSuccessToast("验证码发送成功")
        info.code = res.data
        return true
    } catch (err) {
        showFailToast(err.message)
        return false
    }
}

let formAdd = ref();
let onSubmit = async () => {
    console.log(111, formAdd.value);
    var res = formAdd.value.getValidationStatus()
    console.log(res);
    if (res.tel == "passed" && res.password == "passed"  && res.code == "passed") {
        try {
            var res = await doFinishRegisterAPI({ tel: info.tel, password: info.password })
            console.log(res);
            showSuccessToast("注册成功")
            router.push("/login")
            return true;

        } catch (err) {
            showFailToast(err.message);

            return false
        }
    }
}

</script>

<style lang="scss" scoped>
.register {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;

    // sass在解析为css时,将&替换为父选择器
    // &-form => .register-form
    &-form {
        margin-top: 50px;
    }

}
</style>