import { computed } from "vue-demi";
import { useAuth } from "~/stores/auth";

export function useAuthRepo() {
    const auth = useAuth()
    const authUser = computed(() => auth.user)
    return {
        auth,
        authUser
    }
}