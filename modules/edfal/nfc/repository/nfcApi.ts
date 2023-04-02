import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import axios from 'axios'
import { Method } from 'axios'
import { schoolActor } from '../type/schoolActor'

export const useNfcApi = defineStore('nfcApi', {
    state: () => ({
        data: null,
        user: undefined as unknown as schoolActor,
    }),
    getters: {
    },
    actions: {
        async get() {
            await axios.get('http://localhost:3399', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
                this.data = res.data.value;
            }).catch((error) => {
                if (error.status == 404) {
    
                }
            });
        },
        async getUserBySmartCard() {
            const school = useActiveSchool()
            return await $axios.$get('schools/' + school.id + '/users/smartcards/' + this.data)
            // .then(res => {
            //     this.user = res.data
            // }).catch((error) => {
            //     if (error.status == 404) {
    
            //     }
            // });
        },
        async store(payload: any) {
            const school = useActiveSchool()
            let method: Method, url: string
            if (payload.id == '') {
                method = 'POST'
                url = 'edfal/banners'
            } else {
                method = 'PUT'
                url = 'edfal/banners/' + payload.id
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
