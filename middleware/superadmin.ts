import { useAuth } from "~/stores/auth";
import type { Middleware } from '@nuxt/types'

export default <Middleware>function (ctx) {
  let auth = useAuth()
  var mediaPermission = [6];
  // console.log($auth.user.privilege_id);
  // console.log(mediaPermission.includes($auth.user.privilege_id))
  if (mediaPermission.includes(auth.user?.privilege_id) == false) {
    return ctx.redirect('/forbidden')
  }
}