import { useAuth } from "~/stores/auth";
import type { Plugin } from '@nuxt/types'
export default <Plugin>function (ctx, inject) {
  const auth = useAuth()
  // console.log(ctx.store.state.auth)
  // ctx.store.state.auth
  auth.$patch({
    loggedIn: ctx.store.state.auth.loggedIn,
    user: ctx.store.state.auth.user
  })
}