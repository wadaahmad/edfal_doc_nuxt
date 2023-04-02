import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { proposalContent } from '../type/proposalContent'

export const useProposalContentApi = defineStore('proposalContentApi', {
    state: () => ({
        data: undefined as Array<proposalContent> | undefined,
        meta: Array(),
        link: Array(),
        active_article: '',
    }),
    getters: {
    },
    actions: {
        async get(productId: number, proposalId: number, payload: any = null) {
            const school = useActiveSchool()
            await $axios.$get('edfal/products/' + productId + '/proposals/' + proposalId + '/contents', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async del(productId: number, proposalId: number, id: any) {
            const school = useActiveSchool()
            await $axios.delete('edfal/products/'+ productId  +'/proposals/' + proposalId + '/contents/' + id).then(res => {
                if (this.data != undefined) {
                    var index = this.data.findIndex((data) => data.id == id)
                    this.data.splice(index, 1)
                }
            });
        },
        async store(productId: number, proposalId: number, payload: any) {
            const school = useActiveSchool()
            let method: Method, url: string
            if (payload.id == '') {
                method = 'POST'
                url = 'edfal/products/'+ productId  +'/proposals/' + proposalId + '/contents'
            } else {
                method = 'PUT'
                url = 'edfal/products/'+ productId  +'/proposals/' + proposalId + '/contents/' + payload.id
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
