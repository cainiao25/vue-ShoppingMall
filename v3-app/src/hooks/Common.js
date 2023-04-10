// 自定义hooks
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue"
import moment from 'moment'

export const useCommon = () => {
    const router = useRouter()
    const route = useRoute()
    const goback = () => {
        router.go(-1)
    }
    const gotoSearch = () => {
        router.push("/search")
    }

    const gotoWhere = (url) => {
        router.push(url)
    }
    let getUserId = () => {
        let { getLoginUserId } = getCurrentInstance().appContext.config.globalProperties;
        return getLoginUserId()
    }

    let dateFormatInit = (time,type='YYYY-MM-DD HH:mm:ss')=>{
        return moment(time).format(type)
    }
    return {
        router,
        route,
        goback,
        getUserId,
        gotoSearch,
        gotoWhere,
        dateFormatInit
    }
}