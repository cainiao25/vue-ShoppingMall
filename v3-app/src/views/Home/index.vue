<template>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="home">
            <teleport to=".app-header">
                <van-nav-bar class="navBar">
                    <template #left>
                        <router-link to="/category">
                            <van-icon
                                name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgAgMAAAAdw9KTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUdwTP///////////waf0AoAAAADdFJOUwDjSYAlncUAAAAbSURBVBjTY5j/Hwq+MdTDmH+RmUgK6AuGhcsAU5tyB6Ji+x0AAAAASUVORK5CYII=" /></router-link>
                    </template>
                    <template #title>
                        <van-search to="/search" v-model="value" shape="round" background="transparent"
                            placeholder="请输入搜索关键词" />
                    </template>
                </van-nav-bar>
            </teleport>
            <teleport to=".app-page">
                <div class="slider-bg"></div>
            </teleport>

            <div class="swiper">
                <van-swipe :autoplay="3000" lazy-render>
                    <van-swipe-item class="swiper-item" v-for="image in images" :key="image">
                        <img :src="image" />
                    </van-swipe-item>
                </van-swipe>
            </div>

            <div class="goods">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="row">
                    <van-cell class="col" span="10" v-for="item, index in list" :key="index">
                        <router-link :to='{ name: "detail", query: { proid: item.proid } }'>
                            <img :src="item.img1" alt="">
                            <p class="title">{{ item.proname }}</p>
                            <p class="price">{{ (item.discount * item.originprice / 10).toFixed(2) }}</p>
                        </router-link>
                    </van-cell>
                </van-list>
            </div>
        </div>
    </van-pull-refresh>
</template>
<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { recommendListAPI } from "@/api/pro.js"
import { showFailToast } from 'vant';
const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];


let list = ref([])
let params = reactive({
    count: 1,
    limitNum: 10,
})
let isFresh = ref(false)
let loading = ref(false)
let finished = ref(false)
watchEffect(async () => {
    console.log("watchEffect被触发", params.count);
    try {
        var res = await recommendListAPI(params)
        console.log(res, ...res.data, res.data);
        if (res) {
            // 懒加载 -> 瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。
            list.value.push(...res.data)
            loading.value = false
            if (params.count >= 10) {
                finished.value = true
            }
        }
    } catch (err) {
        showFailToast(err.message)
    }
})
let onLoad = async () => {
    // 监听到达底部  -> 默认开启加载
    setTimeout(() => {
        params.count++

    }, 1000)
}
let onRefresh = () => {
    setTimeout(async () => {
        list.value = [];//刷新时清空list
        params.count++// 页码重置为1
        try {
            var res = await recommendListAPI(params);
            if (res) {
                console.log(list.value);
                list.value.push(...res.data);
                console.log(list.value);

                isFresh.value = false
            }
        } catch (err) {
            showFailToast(err.message)
        }
    }, 1000)
}
</script>

<style lang="scss" scoped>
.home {
    padding-bottom: 1rem;
}

.navBar {
    background-color: transparent;
}

.goods {
    background-color: #fff;
}

.swiper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    //   background: #f66;
}

.swiper-item img {
    width: 100%;
    height: 100%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .col {
        width: 47%;
        margin-top: 0.15rem;

        .title {
            font-size: 0.2rem;
            width: 100%;
            // background-color: #f1503b;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .price {
            text-align: left;
            color: #f1503b;
        }

        img {
            width: 100%;
            margin: 0.15rem;
        }
    }
}

.slider-bg {
    background-image: -webkit-gradient(linear,
            left bottom,
            left top,
            from(#f1503b),
            color-stop(50%, #c82519));
    background-image: -webkit-linear-gradient(bottom, #f1503b, #c82519 50%);
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    position: absolute;
    top: 0;
    left: -25%;
    height: 3.25rem;
    width: 150%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    z-index: -1;
}
</style>