import { defineStore } from 'pinia'
import { useActiveSchool } from '~/stores/activeschool'
import { $axios } from '~/utils/api'
import { Method } from 'axios'
import { menu } from '../type/menu'

export const useMenuApi = defineStore('menuApi', {
    state: () => ({
        data: undefined as Array<menu> | undefined,
        meta: Array(),
        link: Array(),
        active_menu: '',
        search_result: undefined as Array<menu> | undefined,
    }),
    getters: {
    },
    actions: {
        async get(payload: any = null) {
            await $axios.$get('edfal/documentations/menus', { params: payload }).then(res => {
                this.data = res.data
                this.meta = res.meta
                this.link = res.link
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async search(payload: any = null) {
            await $axios.$get('edfal/documentations/menus', { params: payload }).then(res => {
                this.search_result = res.data
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async getActiveMenu(payload: any = null) {
            await $axios.$get('edfal/documentations/menus', { params: payload }).then(res => {
                this.active_menu = res.data[0]
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
        },
        async sorted(payload: any) {
            await $axios.$put('edfal/documentations/menus/sorted', { sort_list: payload }).then((res) => {

            }).catch((err) => {

            })
        },
        async del(id: any) {
            await $axios.delete('edfal/documentations/menus/' + id).then(res => {
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
                url = 'edfal/documentations/menus'
            } else {
                method = 'PUT'
                url = 'edfal/documentations/menus/' + payload.id
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
