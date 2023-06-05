import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore('token', () => {
    const token = ref<string|null>(localStorage.getItem('auth_token'))

    function setToken(newToken: string|null) {
        if (typeof newToken === 'string') {
            localStorage.setItem('auth_token', newToken)
        } else {
            localStorage.removeItem('auth_token')
        }

        token.value = newToken
    }

    return {
        token,
        setToken
    }
})
