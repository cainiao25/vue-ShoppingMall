<template>
    <div class="car">
        <teleport to=".app-header">
            <MyHead title="购物车"></MyHead>
        </teleport>
        <!-- 已经登录 -->
        <template v-if="getLoginStatus()">
            <van-swipe-cell class="carItem" v-for="item, index in list" :key="index">
                <div class="cartList">
                    <van-checkbox @change="changeOneHandler(item)" v-model="item.flag"
                        checked-color="#ee0a24"></van-checkbox>
                    <van-card :num="item.num" :price="item.originprice.toFixed(2)" :desc="item.proname" title="商品标题"
                        :thumb="item.img1" class="cart-card">
                        <template #tags>
                            <van-tag plain type="primary">标签</van-tag>
                        </template>
                        <template #num>
                            <van-stepper @change="value => changeCarNum(value, item.cartid)" v-model="item.num"
                                button-size="20" disable-input />
                        </template>
                        <template #footer>
                            <van-button size="mini" @click="delOne(item, index)">删除</van-button>
                        </template>
                    </van-card>

                </div>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="delOne(item, index)" />
                </template>
            </van-swipe-cell>

        </template>
        <template v-else>
            <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                description="描述文字" />
        </template>
        <van-submit-bar class="totalBar" :price="total" button-text="提交订单" @submit="onSubmit" :disabled="!list.some(v=>v.flag)">
            <van-checkbox v-model="checkAll" checked-color="#ee0a24">全选</van-checkbox>
            <template #tip>
                <span v-if="checkAll" @click="clearAll">一键清空</span>
            </template>
        </van-submit-bar>
    </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watchEffect } from "vue"

import { cartListAPI, removeCartAPI, cartSelectoneAPI, removeCartAllAPI, cartUpdatenumAPI } from "@/api/cart.js"
import { showFailToast, showConfirmDialog, showNotify, List } from "vant";
import { useRouter } from "vue-router";
import { GoodStore } from "@/stores/good.js"
import { useCommon } from "../../hooks/Common";
let { getLoginUserId, getLoginStatus } = getCurrentInstance().appContext.config.globalProperties
let goodStore = GoodStore()

let list = ref([])
let orderList = [];
let {gotoWhere} = useCommon()
let router = useRouter()
// console.log(list.value.length==0);
// 获取购物车的数据
let userid = getLoginUserId()
// 获取购物车的数据
let getCartList = async () => {
    console.log(userid);
    try {
        let res = await cartListAPI({ userid: userid })

        list.value = res.data
        orderList = res.data
        console.log(orderList);

    } catch (err) {
        list.value = []
        showFailToast(err.message)
    }
}
// 单选
let changeOneHandler = async item => {
    console.log("点击了", item);
    let res = await cartSelectoneAPI({
        cartid: item.cartid,
        flag: item.flag,
    })
    console.log(res);
}
// 全选
let checkAll = computed({
    get() {
        var flag = list.value.every(v => v.flag)
        console.log("flag", flag);
        return list.value.length > 0 ? flag : false
    },
    set(val) {
        list.value.forEach(v => {
            v.flag = val

        })
    }
})
// 设置总计
let total = computed(() => {
    let sum = 0;
    list.value.forEach(v => {
        if (v.flag) {
            sum += (v.originprice * v.num)
        }
    })
    return sum * 100
})
// 单删
let delOne = async (item, index) => {
    console.log(item, index);
    var res = await removeCartAPI({ cartid: item.cartid })
    console.log(res);
    if (res.code == 200) {
        list.value.splice(index, 1)
    }
}
// 全删
let clearAll = () => {
    showConfirmDialog({
        title: '友情标题',
        message: '好不容易选好的再考虑考虑呗',
    }).then(async () => {
        console.log(111);
        // on confirm
        let res = await removeCartAllAPI({ userid })
        if (res.code == 200) {
            list.value = []
            showNotify({ type: 'success', message: '清除成功' });
        }
    }).catch(() => {
        // on cancel
        console.log(222);

    });
}
// 更新购物车数量
let changeCarNum = async (num, cartid) => {
    let res = await cartUpdatenumAPI({ num, cartid });
    console.log(res);

}
// 提交订单
let onSubmit = async () => {
    // var res = await orderAddOrderAPI({ userid })
    // console.log(res);
    // let orderTime = res.time
    // console.log(orderTime);
    // // localStorage.setItem("orderList", JSON.stringify(orderList))
    // localStorage.setItem("orderTime", JSON.stringify(orderTime))
    // router.push({ name: "info" })
    goodStore.setChooseCarts(list.value.filter(item => item.flag))
    gotoWhere("/confirmorder")
}
onMounted(() => {
    getCartList()
})
</script>

<style lang="scss" scoped>
::v-deep .carItem {
    background-color: #f6f6f6;
    margin-top: 0.1rem;

    .cartList {
        display: flex;
        width: 100%;

        .van-checkbox {
            // width: 10%;
            // padding: 0 0.3rem;
            // margin-left: 50%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }

        .van-card {
            width: 90%;
            // .cart-card{
            // }
        }
    }
}

.delete-button {
    height: 100%;
}

.bottom-button {
    width: 160px;
    height: 40px;
}

.totalBar {
    bottom: 1rem;
}

.app-footer {
    height: 100%;
}
</style>