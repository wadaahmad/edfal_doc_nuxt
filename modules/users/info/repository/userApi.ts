import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { user } from '../type/user'

export const useUserApi = defineStore('userApi', {
    state: () => ({
        data: undefined as Array<user> | undefined,
        meta: Array(),
        link: Array(),
        unregisteredUser: null,
        activeUser: undefined as unknown as user
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            await $axios.$get('users', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async del(id: any) {
            await $axios.delete('users/' + id).then(res => {
                if (this.data != undefined) {
                    var index = this.data.findIndex((data) => data.id == id)
                    this.data.splice(index, 1)
                }
            });
        },
        async getUserById(id: any) {
            await $axios.$get('users/' + id).then(res => {
                this.activeUser = res.data
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async getUnregisteredUser(nik: any, name: any) {
            const school = useActiveSchool()
            await $axios
                .$get('schools/' + school.id + '/users/' + nik, {
                    params: {
                        name: name,
                    },
                })
                .then((res) => {
                    this.unregisteredUser = res.data
                    // this.user.user_id = id
                    // this.user.name = name
                    // this.user.type = type
                    // this.user.privilege_id = type_id
                    // this.$bvModal.show('mod')
                })
                .catch((error) => {
                    //console.log(error)
                })
        },
        async store(payload: any) {
            let method: Method, url: string
            if (payload.id == '') {
                method = 'POST'
                url = 'users'
            } else {
                method = 'PUT'
                url = 'users/' + payload.id
            }
            return await $axios
                .request({
                    method: method,
                    url: url,
                    data: payload,
                })
        },
    }
})
