<template>
    <div>
        <teleport to=".app-header">
            <van-nav-bar class="navBar detail-navBar" title="收货地址" left-arrow @click-left="back">
                <template #left>
                    <van-icon name="arrow-left" size="22" color="#666666" />
                </template>
            </van-nav-bar>
        </teleport>
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
            @select="sel">
            <template #default>
                <van-button type="primary" to="/order">确定支付</van-button>
            </template>
        </van-address-list>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { showToast, showFailToast } from 'vant';
import { addressListAPI, addressAPI, addressUpdateAPI, delAddressAPI } from "@/api/address.js"
import { useRouter } from "vue-router";

let router = useRouter();
let { getLoginUserId } = getCurrentInstance().appContext.config.globalProperties;
let chosenAddressId = ref('1');
let list = ref([]);
let userList = []
let userInfo = []
let onAdd = () => router.push('/address');
let onEdit = (item, index) => {
    console.log(index);
    router.push({ name: 'address', query: { index } })
};

let addressList = async () => {
    let userid = getLoginUserId()
    try {
        var res = await addressListAPI({ userid });
        console.log(res.data);
        userList = res.data
        res.data.forEach(v => {
            list.value.push({
                id: v.addressid,
                name: v.name,
                tel: v.tel,
                address: `${v.county}  ${v.addressDetail}`,
                isDefault: v.isDefault,
            })
        });
    } catch (err) {
        showFailToast(err.message);
    }
}
let sel = (item, index) => {
    console.log(userList.value,1111);
    userList.filter((v, i) => {
        if (index == i) {
            userInfo = v;
            console.log(userInfo);
            localStorage.setItem("userInfo",JSON.stringify(userInfo))
        }
    })
}

addressList()
</script>

<style lang="scss" scoped></style>