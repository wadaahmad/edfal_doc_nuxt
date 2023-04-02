import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { product } from '../type/product'

export const useProductApi = defineStore('productApi', {
    state: () => ({
        data: undefined as Array<product> | undefined,
        meta: Array(),
        link: Array(),
        active_product: undefined as product | undefined
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            const school = useActiveSchool()
            await $axios.$get('edfal/products', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async del(id: any) {
            const school = useActiveSchool()
            await $axios.delete('edfal/products/' + id).then(res => {
                if (this.data != undefined) {
                    var index = this.data.findIndex((data) => data.id == id)
                    this.data.splice(index, 1)
                }
            });
        },
        async store(payload: any) {
            const school = useActiveSchool()
            let method: Method, url: string
            if (payload.id == '') {
                method = 'POST'
                url = 'edfal/products'
            } else {
                method = 'PUT'
                url = 'edfal/products/' + payload.id
            }
            await $axios
                .request({
                    method: method,
                    url: url,
                    data: payload,
                })
                .then((res) => {
                    this.get()
                })
                .catch((error) => {
                    if (error) {
                        // error.response.data.message.forEach((element) => {
                        //     $nuxt.$bvToast.toast(element, {
                        //         title: 'Failed save',
                        //         variant: 'danger',
                        //         solid: true,
                        //     })
                        // })
                    }
                })
        },
    }
})
