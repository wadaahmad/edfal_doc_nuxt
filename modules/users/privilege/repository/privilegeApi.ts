import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { privilege } from '../type/privilege'
import { Method } from 'axios'

export const usePrivilegeApi = defineStore('privilegeApi', {
    state: () => ({
        data: undefined as Array<privilege> | undefined,
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            const school = useActiveSchool()
            await $axios.$get('users/privileges', { params: payload }).then(res => {
                this.data = res.data
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async del(id: any) {
            const school = useActiveSchool()
            await $axios.delete('users/privileges/'+ id).then(res => {
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
                url = 'users/privileges'
            } else {
                method = 'PUT'
                url = 'users/privileges/' + payload.id
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
