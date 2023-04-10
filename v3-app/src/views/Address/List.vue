<template>
    <div>
        <MyHead title="地址列表"></MyHead>
        <van-address-list v-model="chosenAddressId" :list="addressList" :disabled-list="disabledList" default-tag-text="默认"
            @add="onAdd" @edit="onEdit" @select="selectAddress" />

    </div>
</template>

<script setup>

// 获取地址列表 

import { onMounted, ref, toRef } from 'vue';
import { useCommon } from '../../hooks/Common';
import { addressListAPI, addressUpdateAPI } from "@/api/address.js"
import { GoodStore } from "../../stores/good";
import qs from "qs"
const goodStore = GoodStore()
let { getUserId ,gotoWhere} = useCommon()
let userid = getUserId()
const chosenAddressId = ref('');   // 默认选择 

const addressList = toRef(goodStore, "addressList")
// 添加地址
const onAdd = async(item,index)=>{
    gotoWhere("/address/edit?type=1")
}
// 编辑地址
const onEdit = async(item,index)=>{
    console.log(item,index);
    gotoWhere("/address/edit?type=2&"+qs.stringify(item))
}
// 获取地址列表
let getAddressList = async () => {
    let res = await addressListAPI({ userid })
    console.log(res);
    if (res.code == 200) {
        let list = res.data.map((item) => {
            item.address = item.province + item.city + item.county + item.addressDetail
            item.id = item.addressid;  // 唯一标致 
            return item
        })
        // 将拿到的数据存到pinia
        goodStore.setAddressList(list)
    }
}
// 选择地址
const selectAddress = async (item, index) => {
    console.log(item, index);
    chosenAddressId.value = item.addressid
    goodStore.setChooseAddress(item)
    let res = await addressUpdateAPI({
        addressid: item.addressid,
        userid,
        isDefault: true
    })
    console.log(res);
    let isDefaultList = addressList.value.filter(v => v.isDefault)// 默认的
    isDefaultList.forEach(async v => {
        let res = await addressUpdateAPI({
            addressid: v.addressid,
            userid,
            isDefault: false
        })
    })
    setTimeout(() => {
        gotoWhere("/confirmOrder")
    }, 500)
}
onMounted(() => {
    getAddressList()
})
</script>

<style lang="scss" scoped></style>