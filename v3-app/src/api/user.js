import request from "@/utils/request"

export const doFinishRegisterAPI = (params) => request.post("/user/dofinishregister",params);
export const docheckPhoneAPI = (params) => request.post("/user/docheckphone",params);
export const doCheckCodeAPI = (params) => request.post("/user/docheckcode",params);
export const doSendMsgCodeAPI = (params) => request.post("/user/dosendmsgcode",params);
export const doUserLoginAPI = (params) => request.post("/user/login",params);
