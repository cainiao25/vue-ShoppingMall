<template>
    <div class="list">
        <teleport to=".app-header">
            <van-nav-bar class="navBar" left-arrow @click-left="back">
                <template #title>
                    <van-search v-model="value" to="/search" shape="round" background="transparent" placeholder="请输入搜索关键词" />
                </template>
                <template #right>
                    <van-button size="small" type="danger">搜索</van-button>
                </template>
            </van-nav-bar>
        </teleport>
        <template v-if="list.length > 0">
            <router-link v-for="item, index in list" :key="index" :to='{ name: "detail", query: { proid: item.proid } }'>
                <van-card :num="item.issale ? item.stock : 0" tag="标签" :price="
                    item.discount != 10
                        ? (item.discount * item.originprice / 10).toFixed(2)
                        : item.originprice
                " :desc="item.desc" :title="item.proname" :thumb="item.img1"
                    :origin-price="item.discount == 10 ? '' : item.originprice">
                    <template #tags>
                        <van-tag plain type="primary">{{ item.sales }}</van-tag>
                    </template>
                </van-card>
            </router-link>
        </template>
        <template v-else>
            <van-empty
                image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0BAMAAADP4xsBAAAAKlBMVEUAAABHcEwAAABUVFT+/v7l5eX6+vqcnJz39/fw8PDX19f29va8vLz///+C0hPqAAAADXRSTlMUAAod63nVL8KXW7JBqff2nwAABRpJREFUaN7Fm01rE1EUhs/MtE0bKqTzCzLzC7LoToRuVEQLXQhCoVDwaxXooroyILgQF4UuXBRBCEgXLgpdiLtAF4KrgtA0ra35L96ZSdJMMudj7kd6dzXm4c17zr1z59x7YEU2wjiGdMRxLPwKSP5TXIfc8GNL6BgKRmwBXQgWwRl0WAd0+JEJOgZyxProOjDD10SHLJk2BUeHIBpRebSQTLDBlIyzMTSUGOXQ9TJovwy6FBljF6JrUHJ4UnQIpUckRNfLo30ZWoNcyAYbdhRbAkYZTWY3GGcHmiVgx44iS8BGDIsjCdZET8kGa6KnZIM90ZOywZ7oyQQEi6InZINN0Xm3wabovGywKTovG6yKzskGC6sHspKA+ZKH5R/YFT0uG2wGMR9IsBrEXCDBsh9jjoDdII4HEmz7ceMI2PbjxhGw7sfIEbDux8gRsO7HyBGwOl9yswZEVgeHBy/Wuw8+bTZKmA0SP743+4PR+yJ3BHg/lj/3x8ajE6kjwPpRbfZz47ItdAS41JskK1PasvQDxurlvf7UuNwRmQ2M1V8z2uPN343g3eHP7K+/IrOBtvptJvPZ8O832Y/4KDGbRlfXE9D9MQMqT5N/6baF6Bptx8vcPAlS9rkgjiR6KdU8OTNT9j4fR6Ci2FGM66l0qHT4SPoDNCW6uzH97/MC2Rk6pJx+UvTBL97tiERXk5lXODsqyQxtC9BYFHfV95/j6f6QiyOgUQyUtF4D/+ySiyOOXqKU7XKBzNDIhy31bXRtXlYf/mNSBNAo7pFZsMU5EuHoJD+O8W8ucjmSoJEEWVDThViXK2rh2qZTBEUfMbNCOXLFoZEEaTKqVhmzfRSdpMAG9dV5KoEGaDSru/R+Zp3JbBS9yi1AgTJ7jUaHaBQv6LWtxUyaCEOrBfU9jV5kngcouslEMY1jj0YXp3Wg4s9sZJIcogLtIegqI2mQIicaaPVrrzl0h/YMQy/xW40k0vskuo6F/4pDH5FLI/gIeoFb6dU4pVcZDD3HzpgUvaaBvtPvn3Holjb6D4e+x6HBFRpw9JkjtCSMLT20IPkCJvmIFZOdMlv0lCG21qYTnViMTZcnwPfWposqGiPzRwE6zB9gVIwMH7vUYmy4WQBkeUqm4zmb1uRkxFa+dGNGB5rbmKFo4+0kjmY3wXPsOxiKNt26K3QN3LxwoPsQ89ckAm36ckehT81eSRU6pKoh+i/SxP46Sz/9138abVS0SNAr1ONAv9RCvIGxBaJeg0fXQaus1f/A1cwoNFWMU2FssOgauWXASoisbI9G44XPHivbI6o4aZJg5dpvHU52xKCxIvNruMvJjoiyVvbz86XxH6PSeMDJpopxg3UIK+gzsn0ejR5DMLJ9svCJsIeHJ7Rsj64EDz0pPvKhZUciNHZQRcqO6NL4WKIcHryaOl4jZXMFfWYQsn32hIP5Lbjs4TGE9ukrLjsyReOyBQdVurIlx2t6sn3JoaCebE90lCmQfVwYRcEBLC/7otBqybExK/ui0GrZYTcje7vQauERPfkcmt5h2bpYEOwU+zGD6xAOL3E4vHpi0xFvdtd8HF5OsueIN8uLYA6vr9lyxJvtVUE7sr1ZX8t0eJnU5RVYhxd3XV43dnhJ2jT/otu5kO7yGr3Dy/8uWxb0I8k2WrhsD3HZ1OKwFUfPkttveyqfJeJmLZctZi4b41y287lsQnTYOumy4VPmt16bqsvmWqctwS4bmV22XzttGnfa6q7boP8fpvCbslhXvKwAAAAASUVORK5CYII="
                description="抱歉,暂无相关商品" />
        </template>
    </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { categoryBrandProList } from "@/api/category.js"
import { showFailToast } from 'vant';
let route = useRoute()
let query = route.query

let list = ref([])

let params = reactive({
    count: 1,
    limitNum: 10,
    ...query,
})
watchEffect(async () => {
    try {
        var res = await categoryBrandProList(params);
        console.log("某分类下的某品牌请求成功", res);

        if (res.code == 200) {
            list.value = res.data;
        } else if (res.code == 10003) {
            list.value = [];
        }
    } catch (err) {
        showFailToast(err.message);
    }
});
</script>

<style lang="scss" scoped></style>