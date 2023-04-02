import type { Middleware } from '@nuxt/types'
import { useAuth } from "~/stores/auth";

export default <Middleware>function (ctx) {  
  let auth = useAuth()
  
  var mediaPermission = [5, 6];
  // console.log($auth.user.privilege_id);
  // console.log(mediaPermission.includes($auth.user.privilege_id))
  if (mediaPermission.includes(auth.user?.privilege_id)==false) {
    return ctx.redirect('/forbidden')
  }
}