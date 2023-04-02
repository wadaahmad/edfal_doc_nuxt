import { defineStore } from 'pinia'
import { schools } from '~/modules/schools/info/type/schools'
import { $axios } from '../utils/api'

export const useActiveSchool = defineStore('activeschool', {
    state: () => ({
        info: undefined as schools | undefined,
        id: 0,
    }),
    getters: {
    },
    actions: {
        async setActiveSchool(id: number = 0, codename: string = '') {
            var idSch = id != 0 ? id : this.id

            await $axios.$get('schools', { params: { id_sekolah: idSch, codename: codename } }).then(res => {
                if (Array.isArray(res.data)) {
                    res.data = res.data[0]
                }
                this.info = res.data
                this.id = res.data.id_sekolah
            }).catch((error) => {
                if (error.status == 404) {

                }
            });
            //await 
        },
        async getSchoolDetail(payload: any) {
            await $axios.$get('schools', { params: payload }).then(res => {
                this.info = res.data[0]
                this.id = res.data[0].id
            }).catch((error) => {
                console.log(error)
                if (error.status == 404) {

                }
            });
        }
    },
})
