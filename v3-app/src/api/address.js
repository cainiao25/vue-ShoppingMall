import request from "@/utils/request"

export const addressListAPI = params => request.get("/address/list",{params})
export const delAddressAPI = params => request.post("/address/delete",params)
export const addressAPI = params => request.post("/address/add",params)
export const addressUpdateAPI = params => request.post("address/update",params)