<template>
    <div>
        <MyHead title="确认订单"></MyHead>
        <div v-if="chooseAddress">
            <van-contact-card :type="addressList.length > 0 ? 'edit' : 'add'" :name=chooseAddress.name
                :tel="chooseAddress.tel + '(' + chooseAddress.address + ')'" @click="addressClick" />
        </div>
        <div v-else>
            <van-contact-card type="add" @click="addressClick" />
        </div>
        <div class="list">
            <van-swipe-cell class="goods-item" v-for="(item, index) in chooseCarts" :key="index">
                <div class="goods-content">
                    <van-card :origin-price="item.originprice" :price="((item.originprice * item.discount) / 10).toFixed(2)"
                        :desc="item.desc" :title="item.proname" class="goods-card" :thumb="item.img1">
                        <template #tags>
                            <van-tag plain type="primary">标签</van-tag>
                        </template>
                        <template #footer>
                            <span>小计 : {{ ((item.originprice * item.discount) / 10 * item.num).toFixed(2) }}</span>
                        </template>
                    </van-card>
                </div>
            </van-swipe-cell>
            <van-submit-bar :disabled="!chooseCarts.length > 0"
                :price="100 * chooseCarts.reduce((prev, item) => { return prev + (item.originprice * item.discount) / 10 * item.num }, 0)"
                button-text="确认订单" @submit="onSubmit" />
        </div>
    </div>
</template>

<script setup>
import { ref, toRef,onMounted } from "vue"
import { showConfirmDialog, showToast } from "vant"
import { GoodStore } from "@/stores/good.js"
import { useCommon } from "../../hooks/Common";
import { deleteCartItem, addOrderAPI } from "@/api/order.js"
import {addressListAPI} from "@/api/address.js"
let { gotoWhere, getUserId } = useCommon()
let goodStore = GoodStore()
let addressList = toRef(goodStore, "addressList")
let chooseAddress = toRef(goodStore, "chooseAddress")
let chooseCarts = toRef(goodStore, "chooseCarts");

let userid = getUserId()
let addressClick = () => {
    // 点击地址 
    gotoWhere("/address/list")
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
        console.log(list);
    }
}
onMounted(()=>{
    getAddressList()
})
let onSubmit = () => {
    showConfirmDialog({
        title: '提示',
        message: "正在支付订单，请确认无误"
    })
        .then(async () => {
            // on confirm
            let res = await addOrderAPI({
                userid,
            })
            if (res.code == 200) {
                let result = await deleteCartItem({
                    userid
                })
                console.log(result);
                goodStore.setChooseCarts([])
                gotoWhere("/order")
            }
        })
        .catch(() => {
            // on cancel
        });
}

</script>

<style lang="scss" scoped>
.list {
    padding: 15px;

    .goods-item {
        margin-top: 15px;
        border-radius: 10px;
    }
}
</style>