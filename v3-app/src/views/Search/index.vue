<template>
    <div>
        <div class="search-bar">
            <MyHead title="搜索"></MyHead>
            <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch" item.keyword
                @cancel="onCancel" />
        </div>
        <div class="list" v-if="flag">
            <div class="list-box" v-if="list.length > 0">
                <div class="item" v-for="item, index in list" :key="index">
                    <van-card num="2" :price="item.originprice.toFixed(2)" :desc="item.desc" :title="item.proname"
                        :thumb="item.img1" @click="gotoWhere('/detail?proid=' + item.proid)">
                        <template #tags>
                            <van-tag plain type="primary">{{ item.category }}</van-tag>

                        </template>
                        <template #footer>
                            <van-button size="mini">按钮</van-button>
                            <van-button size="mini">按钮</van-button>
                        </template>
                    </van-card>
                </div>
            </div>
            <div v-else>
                <van-empty image="search" description="咱没有搜索到数据" />
            </div>
        </div>
        <div class="nosearch" v-else>
            <div class="hot-list" v-if="hotlist.length > 0">
                <h2>热门搜索</h2>
                <div v-for="item, index in hotlist.sort((a, b) => { return b.num - a.num }).slice(0, 10)" :key="index"
                    @click="onSearch(item.keyword)">
                    <van-swipe-cell class="hot">
                        <van-cell :border="false" :title="item.keyword">{{ item.num }}</van-cell>
                        <template #left>
                            <van-icon name="info-o" />
                        </template>
                        <template #right>
                            <van-button square type="danger" text="删除" @click="delone"/>
                        </template>
                    </van-swipe-cell>
                </div>
            </div>
            <div class="empty" v-else>
                <van-empty image="search" description="没有热门搜索记录" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { proSearchAPI, proHotwordAPI } from "@/api/pro.js"
import { showToast } from "vant"
import { useCommon } from "../../hooks/Common";
let { gotoWhere } = useCommon()
const list = ref([])
let keyword = ref("")
let flag = ref(false)
let hotlist = ref([])
const onSearch = async (val) => {
    if (!val) {
        showToast("关键字不能为空", val)
        return false
    }
    flag.value = true
    let res = await proSearchAPI({
        keyword: val,
        limitNum: 20,
        count: 1,
    })
    if (res.code == 200) {
        list.value = res.data
        showToast('搜索成功')
    }
    console.log(list);
}
const onCancel = () => {
    keyword.value = ""
    flag.value = false;
    getHotList()
}
let getHotList = async () => {
    var res = await proHotwordAPI()
    console.log(res);
    if (res.code == 200) {
        hotlist.value = res.data
    }
}
onMounted(() => {
    getHotList()
})
</script>

<style lang="scss" scoped>
.hot {
    font-size: 0.28rem;
}
</style>