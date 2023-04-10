<template>
    <div class="userInfo">
        <teleport to=".app-header">
            <van-nav-bar class="navBar detail-navBar" left-arrow @click-left="back" title="用户信息">
                <template #right>
                    <van-icon name="ellipsis" />
                </template>
            </van-nav-bar>
        </teleport>

        <!-- 编辑地址 -->
        <div class="address-edit" v-if="isEdit">
            <van-icon name="cross" @click="close" />
            <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
                :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
                @delete="onDelete" :address-info=AddressInfo @change-detail="onChangeDetail" />
        </div>
        <!-- 新增地址 -->
        <div class="address-edit" v-if="isAdd">
            <van-icon name="cross" @click="close" />
            <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
                :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onAdd"
                @delete="onDelete" @change-detail="onChangeDetail" />
        </div>
        <!-- 地址列表 -->
        <div class="info-list" v-if="isShow">

            <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" default-tag-text="默认"
                @add="onAddList" @edit="onEdit">
                <template #default >
                    <van-button type="primary" to="/order">确定支付</van-button>
                </template>
            </van-address-list>

        </div>
    </div>
</template>

<script setup>
import { areaList } from '@vant/area-data';
import { ref, getCurrentInstance, onMounted, reactive, watchEffect, watch, nextTick } from "vue";
// import { addressListAPI, addressAddAPI, addressUpdateAPI, addressDeleteAPI } from "@/api/address.js"
import { useRouter } from 'vue-router';
import { showToast } from "vant"
let { getLoginUserId } = getCurrentInstance().appContext.config.globalProperties
let router = useRouter()
let isEdit = ref(false)
let isAdd = ref(false)
let isShow = ref(true)
let searchResult = ref([]);
let userid = getLoginUserId()
let infoList = ref({
    userid,
    name: "",
    tel: "",
    province: "",
    city: "",
    county: "",
    addressDetail: "",
    isDefault: ""
})
let addressId = ref()
let chosenAddressId = ref(addressId);
let list = reactive([]);

let getInfoList = async () => {
    var res = await addressListAPI({ userid })
    console.log(res);
    infoList = res.data
    infoList.forEach(item => {
        let listItem = reactive({})
        listItem.name = item.name;
        listItem.tel = item.tel;
        listItem.address = item.province + item.city + item.county + item.addressDetail
        listItem.isDefault = item.isDefault
        list.push(listItem)
    })
}
console.log(list, infoList);

onMounted(() => {
    getInfoList()
})
// nextTick(()=>{
//     getInfoList()
// })
const onAddList = async (content) => {
    console.log(content);
    isShow.value = false;
    isAdd.value = true

    // console.log(res);
}
const onAdd = async (content) => {
    console.log(content, 'add');
    var res = await addressAddAPI({
        userid,
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        isDefault: false,
    })
    console.log(res);
    isAdd.value = false;
    isShow.value = true

};
const onEdit = async (content, index) => {
    addressId = infoList[index].addressid
    console.log(addressId);
    isShow.value = false
    isEdit.value = true
    let AddressInfo = {
        province: list.province, //省份
        city: list.city, //城市
        country: list.area, //区县
        addressDetail: list.address, //详细地址
    };

}
const onSave = async (content) => {
    var result = await addressUpdateAPI({
        addressId,
        userid,
        name: content.name,
        tel: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        addressDetail: content.addressDetail,
        isDefault: false,
    })
    isEdit.value = false
    isShow.value = true
    console.log(content.name, result);

}
const onDelete = async (content, index) => {

    var res = await addressDeleteAPI({ addressid: addressId })
    console.log(res);
    if (res.code == 200) {
        isEdit.value = false;
        isShow.value = true
    }
}
let close = () => {
    isEdit.value = false;
    isAdd.value = false;
    isShow.value = true

}
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
}

</script>

<style lang="scss" scoped></style>