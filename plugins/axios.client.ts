import { useHelpers } from "~/stores/helpers"
import type { Plugin } from '@nuxt/types'
export default <Plugin>function (ctx, inject) {
    const helper = useHelpers()
    ctx.$axios.onRequest(config => {

        helper.$patch({
            isLoading: true
        })
        // console.log(helper.isLoading)
    })
    ctx.$axios.onResponse(response => {
        helper.$patch({
            isLoading: false
        })
        // console.log(helper.isLoading)
    })
    ctx.$axios.onError(error => {
        helper.$patch({
            isLoading: false
        })
        // const code = parseInt(error.response && error.response.status)
        // if (code === 400) {
        //     redirect('/400')
        // }
    })
}