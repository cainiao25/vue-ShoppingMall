import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes"
import { useUserStore } from '../stores/user.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


// 进入页面之前 初始化loginInfo isLogin 
router.beforeEach(()=>{
  let store=useUserStore();
  let {initAuthorityState} = store;
  initAuthorityState()
  return true;
})

export default router
