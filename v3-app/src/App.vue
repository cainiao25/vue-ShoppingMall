<template>
  <div class="app-page">
    <div class="app-header">
      <!-- <van-nav-bar title="首页" left-text="返回" left-arrow>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar> -->
    </div>
    <div class="app-main">
      <router-view name="default"></router-view>

    </div>
    <div class="app-footer">
      <router-view name="footer"></router-view>
    </div>
</div>
</template>
<script setup>


</script>
<style scoped>
.app-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;

}

/* .app-header{
  height: 1rem;
  background-color: bisque;
} */
.app-main {
  flex: 1;
  overflow-y: auto;
}
.app-footer{
  height: 1rem;
}
</style>
