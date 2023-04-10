<template>
    <div class="address">
        <teleport to=".app-header">
            <van-nav-bar class="navBar detail-navBar" title="地址编辑" left-arrow @click-left="back">
                <template #left>
                    <van-icon name="arrow-left" size="22" color="#666666" />
                </template>
            </van-nav-bar>
        </teleport>
        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" />
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { areaList } from '@vant/area-data';
import { addressAPI, addressListAPI, delAddressAPI, addressUpdateAPI } from '@/api/address.js'
import { useRoute, useRouter } from "vue-router";

let route = useRoute();
let router = useRouter();
let query = route.query;
let { getLoginUserId } = getCurrentInstance().appContext.config.globalProperties;
let userid = getLoginUserId()

const searchResult = ref([]);
let addresslist = ref([]);

let addressList = async () => {
    let userid = getLoginUserId()
    try {
        var res = await addressListAPI({ userid });
        console.log(res.data);
        res.data.forEach(v => {
            addresslist.value.push({
                addressid: v.addressid,
                name: v.name,
                tel: v.tel,
                address: `${v.county}  ${v.addressDetail}`,
                isDefault: v.isDefault,
            })
        });
        console.log(addresslist.value[query.index]);
    } catch (err) {
        console.log(err);;
    }
}
addressList()

const onSave = async (info) => {
    info.userid = userid
    try {
        if (query.index) {
            info.addressid = addresslist.value[query.index].addressid
            let res = await addressUpdateAPI(info)
            if (res.code == 200) {
                router.push('/info')
            }
        } else {
            let res = await addressAPI(info)
            if (res.code == 200) {
                router.push('/info')
            }
        }
    } catch (err) {
        console.log(err);
    }
};


const onDelete = async () => {
    console.log(addresslist.value[query.index].addressid);
    if (query.index) {
        let res = await delAddressAPI({
            addressid: addresslist.value[query.index].addressid
        })
        console.log(res);
        if (res.code == 200) {
            router.push('/info')
        }
    }
};


const onChangeDetail = (val) => {
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
};


</script>

<style lang="scss" scoped></style>