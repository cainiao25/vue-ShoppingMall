<template>
    <div>
        <MyHead title="我的订单">
            <van-icon name="revoke" @click="gotopage" />
        </MyHead>

        <div class="navs" v-if="false">
            <van-tabs v-model:active="type">
                <van-tab title="未评论">内容 1</van-tab>
                <van-tab title="已评论">内容 2</van-tab>
            </van-tabs>
        </div>

        <div class="order-list" v-if="list.length > 0">
            <div class="order-item" v-for="(item, index) in list" :key="index"
                @click="gotoWhere('/order/detail/' + item.time)">
                <div class="address">
                    <van-contact-card type="edit" :name="item.data[0].name"
                        :tel="item.data[0].tel + ' (' + item.data[0].province + item.data[0].city + item.data[0].county + item.data[0].addressDetail + ')'"
                        :editable="false" />
                    <div class="time">
                        购买时间:{{ dateFormatInit(item.time * 1) }}
                    </div>

                    <van-card v-for="(v, i) in item.data" :key="i" :origin-price="v.originprice"
                        :price="((v.originprice * v.discount) / 10).toFixed(2)" :desc="v.desc" :title="v.proname"
                        class="goods-card" :thumb="v.img1">
                        <template #tags>
                            <van-tag plain type="primary">标签</van-tag>
                        </template>
                        <template #footer>
                            <span>小计 : {{ ((v.originprice * v.discount) / 10 * v.num).toFixed(2) }}</span>
                        </template>

                    </van-card>
                    <div class="time cred">
                        总计: {{ item.data.reduce((prev, v) => { return prev + (v.originprice * v.discount) / 10 * v.num }, 0)
                        }}
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                description="暂无订单数据" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, toRefs, ref } from 'vue';
import { GoodStore } from "@/stores/good.js"
import { useCommon } from '@/hooks/Common.js';
import { getorderlist } from "@/api/order.js"
let { getUserId, goback, gotoWhere, dateFormatInit } = useCommon()
let userid = getUserId()

const list = ref([])
let goodStore = GoodStore()

let { fromRoute } = toRefs(goodStore) // Ref 对象数组级别的 ref 数据
let gotopage = () => {
    console.log(fromRoute);
    console.log(fromRoute.name);

    if (fromRoute.value.name == "confirmorder") {
        gotoWhere("/car")
    } else {
        goback(-1)
    }
}


// 1.获取订单信息
let getOrderList = async () => {
    let res = await getorderlist({
        userid
    })
    console.log(res);

    if (res.code == 200) {
        // 数组去重
        let arr = []
        let obj = {}
        res.data.forEach((item) => {
            if (!obj[item.time]) {
                obj[item.time] = item.time
                arr.push({
                    time: item.time,
                    data: []
                })
            }
        })

        // 数组合并
        arr.forEach(v => {
            res.data.forEach(item => {
                if (item.time == v.time) {
                    v.data.push(item)
                }
            })
        })
        list.value = arr.reverse()
    }
    console.log(list.value);
}
onMounted(() => {
    getOrderList()
})

</script>

<style lang="scss" scoped>
.order-list {
    padding: 0.15rem;

    .order-item {
        margin-top: 15px;
        background: #ddd;
        border-radius: 10px;
        padding: 10px;

        .time {
            font-size: 0.32rem;
            color: #f40;
            margin: 10px 0;
        }

        .goods-card {
            border-radius: 10px;
        }

        .cred {
            color: #f50;
        }
    }

}
</style>