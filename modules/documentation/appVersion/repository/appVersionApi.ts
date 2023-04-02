import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { appVersion } from '../type/appVersion'

export const useAppVersionApi = defineStore('appVersionApi', {
    state: () => ({
        data: undefined as Array<appVersion> | undefined,
        meta: Array(),
        link: Array(),
        active_article: '',
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            await $axios.$get('edfal/documentations/app-versions', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async del(id: any) {
            await $axios.delete('edfal/documentations/app-versions/' + id).then(res => {
                if (this.data != undefined) {
                    var index = this.data.findIndex((data) => data.id == id)
                    this.data.splice(index, 1)
                }
            });
        },
        async store(payload: any) {
            let method: Method, url: string
            if (payload.id == '') {
                method = 'POST'
                url = 'edfal/documentations/app-versions'
            } else {
                method = 'PUT'
                url = 'edfal/documentations/app-versions/' + payload.id
            }
            await $axios
                .request({
                    method: method,
                    url: url,
                    data: payload,
                })
                .then((res) => {
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
