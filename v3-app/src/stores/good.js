import { defineStore } from "pinia";



export const GoodStore =  defineStore('good',{
    // 开启数据持久化
    persist: true,

    
    state:()=>{
        return {
            chooseCarts:[],  // 提交到订单的页面的数据 
            addressList:[],  // 地址列表 
            chooseAddress:null , // 选择的地址 
            fromRoute:{},
            pingList:[] , // 所有的商品评论数据 
        }
    },

    actions:{
        setChooseCarts(payload){
            this.chooseCarts = payload
        },
        setAddressList(payload){
            this.addressList = payload;
        },
        setChooseAddress(payload){
            this.chooseAddress = payload;
        },
        setFromRoute(payload){
            this.fromRoute = payload;
        },
        changePingList(payload){
            this.pingList = payload
        }
    }
})

