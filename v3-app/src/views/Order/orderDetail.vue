<template>
    <div>
        <MyHead title="订单详情"></MyHead>
        <div class="order-list">
            <div class="order-item">
                <div class="address" v-if="list.length > 0">
                    <van-contact-card type="edit" :name="list[0].name"
                        :tel="list[0].tel + ' (' + list[0].province + list[0].city + list[0].county + list[0].addressDetail + ')'"
                        :editable="false" />
                </div>
                <div class="time">
                    购买时间: {{ dateFormatInit(time * 1) }}
                </div>
                <van-card v-for="(item, index) in list" :key="index" :num="item.num"
                    :price="(item.discount * item.originprice / 10).toFixed(2)" :desc="item.desc" :title="item.proname"
                    :thumb="item.img1" class="goods-card" @click="gotoWhere('/detail?proid=' + item.proid)"
                    :origin-price="item.originprice">
                    <template #footer>
                        <span>小计 : {{ ((item.originprice * item.discount) / 10 * item.num).toFixed(2) }}</span>
                    </template>
                </van-card>
                <div class="item cred">
                    总计: {{ list.reduce((prev, v) => {
                        return (prev + (v.originprice * v.discount) / 10 * v.num).toFixed(2)
                    }, 0) }}
                </div>
                <div class="btn">
                    <van-button type="danger" size="mini">删除订单</van-button>

                    <van-button type="success" size="mini">取消订单</van-button>

                    <van-button type="default" size="mini">申请退款</van-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { getconfirmOrder } from "@/api/order.js"
import { useRoute } from "vue-router";
import { useCommon } from "@/hooks/Common.js"
import { onMounted, reactive, toRefs } from "vue"
let { getUserId, dateFormatInit, gotoWhere } = useCommon()
let userid = getUserId()
let route = useRoute()

let data = reactive({
    time: route.params.id,
    list: []
})
let { list, time } = toRefs(data)
const getconfirmOrderData = async () => {
    let res = await getconfirmOrder({
        userid, time: route.params.id
    })
    data.list = res.data
    console.log(res);
}
onMounted(() => {
    getconfirmOrderData()
})
</script>

<style lang="scss" scoped>
.order-list {
    padding: 0.15rem;

    .order-item {
        margin-top: 0.15rem;
        background: #eef;
        border-radius: 10px;
        padding: 10px;

        .time {
            color: #666;
            margin: 10px 0;
            font-size: 14px;
        }

        .goods-card {
            border-radius: 10px;
        }

        .cred {
            color: #f50;
        }

        van-button {
            float: left;
        }
    }
}
</style>