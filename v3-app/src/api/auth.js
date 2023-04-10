
import request from "@/utils/request"

export const LoginPostAPI = (params) => request.post("/admin/login",params);

