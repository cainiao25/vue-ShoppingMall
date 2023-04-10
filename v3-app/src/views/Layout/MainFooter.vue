<template>
    <van-tabbar v-model="active" active-color="#f2270c" route @change="onChange">
        <!-- <van-tabbar-item name="home" to="/home" icon="home-o">首页</van-tabbar-item>
              <van-tabbar-item name="search" to="/categroy" icon="search">分类</van-tabbar-item>
              <van-tabbar-item name="friends" to="/car" icon="friends-o">购物车</van-tabbar-item>
              <van-tabbar-item name="setting" to="/mine" icon="setting-o">我的</van-tabbar-item> -->
        <van-tabbar-item v-for="item, index in tabList" :key="index" :to="item.path" :icon="item.icon">{{ item.label
        }}</van-tabbar-item>
</van-tabbar>
</template>

<script setup>

import { reactive } from 'vue';

var tabList = reactive([
  {
    path: "/home",
    label: "首页",
    icon: "home-o",
  },
  {
    path: "/category",
    label: "分类",
    icon: "search",
  },
  {
    path: "/car",
    label: "购物车",
    icon: "friends-o",
  },
  {
    path: "/mine",
    label: "我的",
    icon: "setting-o",
  }
])
</script>

<style lang="scss" scoped></style>