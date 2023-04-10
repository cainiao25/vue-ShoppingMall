import request from "@/utils/request"

export const addCartAPI = (params) => request.post("/cart/add", params)
export const removeCartAPI = (params) => request.post("/cart/remove", params)
export const removeCartAllAPI = (params) => request.post("/cart/removeall", params)
export const selectAllAPI = (params) => request.post("/cart/selectall", params)
export const cartListAPI = (params) => request.post("/cart/list", params)
export const cartSelectoneAPI = (params) => request.post("/cart/selectone", params)
export const cartUpdatenumAPI = (params) => request.post("/cart/updatenum", params)

