<template>
    <van-nav-bar class="navBar" :title="title">
        <template #left>
            <slot v-if="!noback">
                <div class="flexbox" @click="goback">
                    <!-- 组件内部的默认内容 -->
                    <van-icon name="arrow-left"  color="#f40" size="18" />
                    <span class="color">返回</span>
                </div>
            </slot>
        </template>

        <template #right>
            <slot>
                <van-popover v-model:show="showPopover" @select="selectIcon" :actions="actions" placement="bottom-end"
                    theme="dark">
                    <template #reference>
                        <van-icon name="ellipsis" />
                    </template>
                </van-popover>

            </slot>
        </template>
    </van-nav-bar>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router";
import { useCommon } from '../hooks/Common';
const { gotoWhere, goback } = useCommon()
const route = useRoute()
let showPopover = ref(false)
const actions = ref([
    { text: '搜索', icon: 'search', path: "/search", disabled: route.path == "/search" },
    { text: '登录', icon: 'user-o', path: "/login", disabled: route.path == "/login" },
    { text: '我的', icon: 'friends-o', path: "/mine", disabled: route.path == "/mine" },
    { text: '订单', icon: 'gold-coin-o', path: "/order", disabled: route.path == "/order" },
])

const props=defineProps({
     // 接受来自父组件的props 
     title:{
        type:String,
        default:"标题"
     },
     noback:{
        type:Boolean,
        default:false
     }
})
const selectIcon = (action, index) => {
    console.log(action, index);
    gotoWhere(action.path)
}
</script>

<style lang="scss" scoped>
.flexbox {
    display: flex;
    align-items: center;
}

.color {
    color: #f40
}
</style>