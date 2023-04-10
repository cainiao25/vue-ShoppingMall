<template>
    <div class="category">
        <teleport to=".app-header">
            <van-nav-bar class="navBar category-navBar" left-arrow @click-left="back">
                <template #title>
                    <van-search to="/search"  v-model="value" shape="round" placeholder="请输入搜索关键词" />
                </template>
               
            </van-nav-bar>
        </teleport>

        <div class="asideNav">
            <van-sidebar v-model="data.categoryIndex">
                <van-sidebar-item v-for="item, index in data.categoryList" :title="item.trim()" />
            </van-sidebar>
        </div>
        <div class="content">
            <van-grid :gutter="10" :column-num="3">
                <van-grid-item v-for="item, index in data.brandList" :key="index" icon="photo-o" :text="item.brand">
                    <template #default>
                        <router-link :to="{ name: 'list', query: { category: data.category.trim(), brand: item.brand } }"
                            :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center' }">
                            <van-icon name="photo-o" size="16" />
                            <span class="van-grid-item__text title">{{ item.brand }}</span>
                        </router-link>
                    </template>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script setup>

import { reactive, onMounted, watchEffect } from "vue"
import { categoryListAPI, categoryBrandListAPI } from "@/api/category.js"
import { showFailToast } from "vant";
let data = reactive({
    category: "",
    categoryIndex: 0,
    brandList: [],
    categoryList: [],
})

{/* <van-sidebar v-model="data.categoryIndex">
                <van-sidebar-item v-for="item, index in data.categoryList" :title="item.trim()" :key=index />
            </van-sidebar> */}
// 获取分类
let getCategoryList = async () => {
    try {
        var res = await categoryListAPI()
        console.log(res);
        data.categoryList = res.data
        console.log(data.categoryList);
    } catch (err) {
        showFailToast(err.message)
    }
};

// 获取分类下品牌
let getCategoryBrandList = async () => {
    try {
        var res = await categoryBrandListAPI({ category: data.category })
        console.log(res);
        data.brandList = res.data
    } catch (err) {
        showFailToast(err.message)
    }
};

watchEffect(() => {
    // 分类依赖于   分类列表和下标  (初始时,分类列表为[]  下标为0)
    data.category = data.categoryList[data.categoryIndex]
    if (data.category) {
        getCategoryBrandList()
    }
});
// 组件挂载时先获取商品分类列表

onMounted(() => {
    getCategoryList();
});
</script>

<style>
.navBar.category-navBar .van-icon {
    color: #666;
}
</style>
<style lang="scss" scoped>
.category {
    display: flex;
    height: 100%;

    .asideNav {
        height: 100%;
        overflow-y: auto;
    }

    .content {
        flex: 1;

        .title {
            margin-top: 0.1rem;
        }
    }
}
</style>

