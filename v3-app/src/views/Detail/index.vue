<template>
    <div class="detail">
        <teleport to=".app-header">
            <van-nav-bar class="navBar detail-navBar" left-arrow @click-left="back">
                <template #right>
                    <van-icon name="ellipsis" />
                </template>
            </van-nav-bar>
        </teleport>
        <div class="swiper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="img, index in data.banners" :key="index"><img :src="img" alt=""></van-swipe-item>
            </van-swipe>
        </div>
        <div class="pro-info" v-if="Object.keys(data).length">
            <van-row justify="center">
                <van-col class="col" span="22">
                    <b>{{ data.proname }}</b>
                </van-col>
                <van-col class="col" span="22">
                    {{ data.desc }}
                </van-col>
                <van-col class="col" span="22">
                    折扣价 ¥ {{ (data.originprice * data.discount / 10).toFixed(2) }}
                </van-col>
                <van-col class="col" span="22">
                    原价 ¥ {{ data.originprice }}
                </van-col>
                <van-col class="col" span="22">
                    小计 ¥ {{ ((data.originprice * data.discount / 10) * num).toFixed(2) }}
                </van-col>

            </van-row>
            <div> 购买数量 <van-stepper @change="changeNum" v-model="num" min="1" :max="data.stock" /></div>


        </div>

        <teleport to=".app-footer">
            <van-action-bar>
                <van-action-bar-icon icon="chat-o"
                    :text="'评论(' + pingList.filter(v => v.proid == route.query.proid).length + ')'" @click="showPopup" />
                <van-action-bar-icon icon="cart-o" @click="gotoWhere('/car')" text="购物车" />
                <van-action-bar-icon icon="shop-o" text="店铺" />
                <van-action-bar-button type="danger" text="加入购物车" @click="addToShoppingCar" />
                <van-action-bar-button type="danger" text="立即购买" />
            </van-action-bar>
        </teleport>
        <van-popup v-model:show="show" closeable position="bottom" :style="{ height: '70%' }">
            <div class="popbox">
                <h3>商品评论</h3>
                <div class="edit-box">
                    <van-field v-model="model.message" rows="5" autosize type="textarea" maxlength="500"
                        placeholder="请输入评论内容" show-word-limit class="ping-area" />
                    <div class="ping-star">
                        <van-rate v-model="model.star" />
                    </div>
                    <van-button @click="todoSubmitMessage" block type="primary" class="mt10">发布评论</van-button>
                </div>
                <div class="edit-msg">
                    <div class="edit-list" v-if="pingList.filter(v => v.proid == route.query.proid).length > 0">
                        <div class="edit-item" v-for="(item, index) in pingList.filter(v => v.proid == route.query.proid)"
                            :key="index">
                            <div class="name item ">
                                {{ item.name }}
                            </div>
                            <div class="time item ">
                                {{ dateFormatInit(item.time) }}
                            </div>
                            <div class="star item">
                                评分: <van-rate v-model="item.star" readonly />
                            </div>
                            <div class="content item">
                                {{ item.message }}
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-else>
                        <van-empty description="暂无评论,请先发布评论哦" />
                    </div>
                </div>
            </div>

        </van-popup>
    </div>
</template>

<script setup>

import { showFailToast, showConfirmDialog,showToast  } from 'vant';
import { ref, toRef, reactive, onMounted, watchEffect, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { proDetailAPI } from "@/api/category.js"
import { addCartAPI } from "@/api/cart.js"
import { getorderlist } from '@/api/order'
import { useCommon } from '../../hooks/Common';
import { GoodStore } from "@/stores/good.js"

let { gotoWhere, getUserId, dateFormatInit } = useCommon()
let route = useRoute()
let router = useRouter()
let goodStore = GoodStore()
let pingList = toRef(goodStore, 'pingList')
let userid = getUserId()
let app = getCurrentInstance();
var { getLoginStatus, getLoginUserId, toLogin } = app.appContext.config.globalProperties
// 响应式数据
let query = reactive({
    proid: ""
})
let data = ref({})
let num = ref(1)
let buyinfo = ref(null)
let show = ref(false)
let model = reactive({
    star: 5,
    message: ""
})

// 打开评论页面
let showPopup = () => {
    show.value = true
}
let checkHasBuy = async () => {
    let res = await getorderlist({ userid })
    if (res.code == 200) {
        buyinfo.value = res.data.find((item) => item.proid == route.query.proid)
    }
}
let changeNum = (value) => {
    console.log(value)
    console.log(data.value.stock)
    if (value > data.value.stock) {
        showToast('库存不足')
        num.value = data.value.stock
    }

    if (value < 0) {
        num.value = 1
    }

}
onMounted(() => {
    checkHasBuy()
})

let todoSubmitMessage = async () => {
    
    if (buyinfo.value) {
        let params = {
            ...model,
            time: new Date(),
            proid: route.query.proid,
            name: buyinfo.value.name
        }
        pingList.value.unshift(params)
        goodStore.changePingList([...pingList.value])
        model: reactive({
            star: 5,
            message: ""
        })
    } else {
        showToast('你暂无评论权限,请先购买.')
    }
    // let res = await 
}
// 获取数据
watchEffect(async () => {
    query.proid = route.query.proid //// 监听$route的变化 => 更新 query对象
    console.log(111, query.proid);
    try {
        var res = await proDetailAPI({ proid: query.proid })
        res.data.banners = res.data.banners[0].split(",")
        console.log(res);
        data.value = res.data
    } catch (err) {
        showFailToast(err.message)
    }
})

let addToShoppingCar = async () => {
    let isLogin = getLoginStatus(); //获取登录状态
    let userid = getLoginUserId(); //获取用户id

    console.log(userid, isLogin);
    if (isLogin) {
        try {
            var res = await addCartAPI({ userid: userid, proid: query.proid, num: num.value });
            // console.log(res);
            if (res) {
                showConfirmDialog({
                    title: "提示",
                    message: "加入成功,是否进入购物车!",
                }).then(() => {
                    router.push({ name: "car" })
                }).catch(() => {
                    console.log("error");
                })
            }
        } catch (err) {
            showFailToast(err.message)
        }
    } else {
        toLogin()
    }
}

</script>

<style lang="scss" scoped>
.navBar {
    position: fixed;
    z-index: 99;
}

.detail {
    width: 100%;
    height: 100%;
}

.my-swipe {

    // height: 3rem;
    img {
        width: 100%;
    }
}

.pro-info {
    font-size: 0.36rem;

    .col {
        margin-top: 0.1rem;
    }
}

.popbox {
    padding-top: 40px;

    .title {
        color: #333;
        text-align: center;
    }

    .edit-box {
        padding: 10px;
    }

    .ping-area {
        border: 1px solid #ddd;
        border-radius: 10px;
    }

    .ping-star {
        margin-top: 15px;
    }

    .mt10 {
        margin-top: 10px;
    }
}

.edit-item{
    border: 2px solid #ccc;
    border-radius: 0.1rem;
    padding: 0.1rem;
    margin: 0.1rem;
}
</style>