import { defineStore } from 'pinia'
import { user } from '~/modules/users/info/type/user'

export const useAuth = defineStore('auth', {
    state: () => ({
        loggedIn: false,
        user: undefined as user | undefined,
    }),
    getters: {
    },
    actions: {
    },
})
