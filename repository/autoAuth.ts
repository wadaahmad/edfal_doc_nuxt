import { Context } from "@nuxt/types";
import { useAuth } from "~/stores/auth";

export function useAutoAuth(ctx:Context) {
    onMounted(() => {
        const auth = useAuth()
        var query_auth_token = ctx.route.query.auth_token || null
        if (query_auth_token != null) {
            // this.$auth.setUserToken('Bearer ' + query_auth_token)
            // this.$axios
            //     .$get('/user', {
            //         headers: { Authorization: 'Bearer ' + query_auth_token },
            //     })
            //     .then((res) => {
            //         this.$auth.setUser(res.data)
            //     })
        }
    })
}