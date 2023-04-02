<template>
    <div>

    </div>
</template>
<script lang="ts">
import { useNuxtApp } from '@nuxt/bridge/dist/runtime/app';
import { useAsyncData, useLazyAsyncData } from '@nuxt/bridge/dist/runtime/asyncData';
import { sendRedirect } from 'h3';
import { onMounted } from 'vue';
import { usePopup } from '~/repository/popup';
import { useAuth } from '~/stores/auth';

export default defineComponent({
    auth: false,
    layout: 'blank',
    setup(props, ctx) {
        // console.log(ctx.att)
        const router = useRouter()
        const context = useNuxtApp()
        const body = context.ssrContext?.req.body
        const config = context.nuxt2Context.$config
        const auth = useAuth()
        useLazyAsyncData('', async () => {
            let credentials = {
                username: body.username,
                password: body.password,
                grant_type: "password",
                client_id: config.client_id,
                client_secret: config.client_secret,
            };
            await context.nuxt2Context.$auth.loginWith('local', { data: credentials }).then((res: any) => {
            }).catch((err: any) => {

            })


        })
        onMounted(async () => {
            if (auth.loggedIn) {
                router.push('/')
            } else {
                const ok = await usePopup().msgBoxOk("Login gagal, username/password salah", "Failed login", "danger")
                if (ok)
                    router.push('/login')
            }


        })

    }
})
</script>