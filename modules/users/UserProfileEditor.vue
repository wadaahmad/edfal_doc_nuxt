<template>
    <div>
        <h3>Data Profile</h3>
        <div class="alert alert-info">
            <b>Note : </b>
            Data profile tidak berhubungan dengan data kepegawaian atau kesiswaan, anda bebas berkreasi untuk
            berinteraksi ke pengguna lain.
        </div>
        <b-form-group label="Nama">
            <b-form-input v-model="rdata.name" placeholder="nama"></b-form-input>
        </b-form-group>
        <b-form-group label="Bio">
            <b-form-input v-model="rdata.bio" placeholder="Bio / Quote"></b-form-input>
        </b-form-group>
        <b-form-group label="Photo">
            <b-form-file v-model="rdata.photoFile" @change="uploadPhoto"></b-form-file>
            <img :src="rdata.photo" width="50px" />
        </b-form-group>
        <b-row>
            <b-col>
                <b-form-group label="Wa/No.Hp">
                    <b-form-input v-model="rdata.cellphone" placeholder="No hp"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Twitter">
                    <b-form-input v-model="rdata.twitter" placeholder="ex: @fulan.edfal"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Instagram">
                    <b-form-input v-model="rdata.instagram" placeholder="ex: @fulan.edfal"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Facebook">
                    <b-form-input v-model="rdata.facebook" placeholder="ex: @fulan.edfal"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <div>
            <b-button class="btn-main" @click="store">Simpan</b-button>
        </div>

    </div>
</template>
<script lang="ts">
import { useImageApi } from '~/repository/images/imageApi'
import { useAuth } from '~/stores/auth'
import { useUserApi } from './info/repository/userApi'

export default defineComponent({
    setup(props, ctx) {
        const rdata = reactive({
            id: '',
            name: '',
            bio: '',
            photoFile: '',
            photo: '',
            cellphone: '',
            twitter: '',
            instagram: '',
            facebook: '',

        })
        const userApi = useUserApi()
        const auth = useAuth()
        onMounted(() => {
            rdata.id = auth.user?.id
            rdata.name = auth.user?.name
            rdata.photo = auth.user?.photo
            rdata.bio = auth.user?.bio
            rdata.cellphone = auth.user?.cellphone
            rdata.twitter = auth.user?.twitter
            rdata.instagram = auth.user?.instagram
            rdata.facebook = auth.user?.facebook
        })
        async function uploadPhoto(e: any) {
            var files = e.target.files || e.dataTransfer.files
            files = Array.from(files)
            let { data } = await useImageApi().uploadImage(files)
            // console.log(data)
            rdata.photo = data[0].url
        }
        async function store() {
            await userApi.store(rdata)
            location.reload()

        }
        return {
            rdata,
            store,
            uploadPhoto
        }

    },
})
</script>
