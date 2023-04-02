import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { content } from '../type/content'

export const useContentApi = defineStore('contentApi', {
    state: () => ({
        data: undefined as Array<content> | undefined,
        meta: Array(),
        link: Array(),
        active_article: '',
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            await $axios.$get('edfal/documentations/contents', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                this.data = undefined
                if (error.status == 404) {

                }
            });
        },
        async del(id: any) {
            await $axios.delete('edfal/documentations/contents/' + id).then(res => {
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
                url = 'edfal/documentations/contents'
            } else {
                method = 'PUT'
                url = 'edfal/documentations/contents/' + payload.id
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
