<template>
    <div>
        <h3>Ubah password</h3>
        <b-form-group label="New password">
            <b-form-input v-model="rdata.password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="Tulis ulang password">
            <b-form-input v-model="rdata.repassword" type="password"></b-form-input>
        </b-form-group>
        <b-button class="btn-main" @click="store">Simpan</b-button>
    </div>
</template>
<script lang="ts">
import { usePopup } from '~/repository/popup'
import { useUserApi } from './info/repository/userApi'

export default defineComponent({
    props: {
        userId: {
            required: true,
            type: Number
        }
    },
    setup(props, ctx) {
        const rdata = reactive({
            password: '',
            repassword: ''
        })
        const userApi = useUserApi()
        async function store() {
            if (rdata.password == '')
                return usePopup(ctx).msgBoxOk('Mohon lengkapi seluruh data.')
            if (rdata.password != rdata.repassword)
                return usePopup(ctx).msgBoxOk('Password tidak sama.')
            await userApi.store({
                id: props.userId,
                password: rdata.password
            })
            usePopup(ctx).toast('Data berhasil tersimpan.')
        }
        return {
            rdata,
            store
        }
    },
})
</script>
