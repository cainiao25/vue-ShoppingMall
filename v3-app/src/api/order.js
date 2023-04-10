

import request from "@/utils/request"

export const addOrderAPI = (params) => request.post("/order/addOrder",params);

export const deleteCartItem = (params) => request.get("/order/deleteCartItem",{params});

export const getorderlist = (params) => request.post("/order/orderlist",params);

export const getconfirmOrder = (params) => request.get("/order/confirmOrder",{params});


