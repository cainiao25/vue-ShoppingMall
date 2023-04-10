import request  from '@/Utils/request';

export const recommendListAPI = params => request.get("/pro/recommendlist",{params})
export const proSearchAPI = params => request.get("/pro/search",{params})
export const proHotwordAPI = params => request.get("/pro/hotword",{params})
