<template>
    <div>
        <MyHead :title="type == 1 ? '新增地址' : '编辑地址'"></MyHead>
        <van-address-edit :area-list="areaList" :show-delete="route.query.type == 2" show-set-default show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
            @change-detail="onChangeDetail" :address-info="addressInfo" />
    </div>
</template>

<script setup>
import { areaList } from '@vant/area-data';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { addressUpdateAPI, delAddressAPI } from "@/api/address.js"
import { useCommon } from '../../hooks/Common';
import { GoodStore } from '../../stores/good';
import { showSuccessToast } from 'vant';
let { goback } = useCommon()
let route = useRoute()
let addressInfo = ref([])
let type = route.query.type //1.新增 2.修改
const onSave = async (value) => {
    console.log(value);
    let res = await addressUpdateAPI({
        ...value
    })
    console.log(res);
    if (res.code == 200) {
        if (type == 1) {
            showSuccessToast("添加成功")
            goback()

        } else if (type == 2) {
            showSuccessToast("修改成功")
            goback()
        }
    }
}
// 编辑才会有删除 
const onDelete = async (item) => {
    let res = await delAddressAPI({
        addressid: item.addressid
    })
    if (res.code == 200) {
        goback()
    }
    console.log(res);
}
onMounted(() => {
    if (type == 2) {
        addressInfo.value = route.query
    }

    // console.log(addressInfo.value);
})
</script>

<style lang="scss" scoped></style>