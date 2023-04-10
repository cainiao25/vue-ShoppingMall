
import request from "@/utils/request"

export const categoryBrandListAPI = (params) => request.get("/pro/categorybrandlist",{params});
export const categoryListAPI = (params) => request.get("/pro/categorylist",{params});
// export const searchAPI = (params) => request.get("/pro/search",{params});
// export const ListAPI = (params) => request.get("/pro/list",{params});
export const categoryBrandProList = (params) => request.get("/pro/categorybrandprolist",{params});


// 注意: 动态路径参数
// /pro/detail/:proid
// /pro/detail/pro_2850eecd-2ff3-462e-b594-32c9a3830979
export const proDetailAPI = (params) => request.get("/pro/detail/"+params.proid);



