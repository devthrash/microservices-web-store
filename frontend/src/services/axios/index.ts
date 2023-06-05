import axios from 'axios';
// import { useToastsStore } from "@/stores/toasts";
import { useTokenStore } from "@/stores/token";
import { useRoute, useRouter } from "vue-router";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_HOST,
});

export default instance
export const registerInterceptors = () => {
    const route = useRoute()
    const router = useRouter()
    const tokenStore = useTokenStore()

    instance.interceptors.request.use((config) => {
        if (tokenStore.token) {
            config.headers.Authorization = `Bearer ${tokenStore.token}`
        }

        return config
    })

    instance.interceptors.response.use((res) => res, async (error) => {
        // const store = useToastsStore()

        if (error.response?.status === 401) {
            tokenStore.setToken(null)
            await router.push({ name: 'login', query: { redirect: route.fullPath }, })
        }

        // if (error.response?.status !== 404 && error.response?.status !== 401) {
        //     store.pushToast(error.response?.data?.message || error.message)
        // }

        return Promise.reject(error)
    })
}
