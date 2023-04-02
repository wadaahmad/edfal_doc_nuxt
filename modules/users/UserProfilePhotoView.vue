<template>
    <div>
        <h1 style="font-size:50px; " v-if="image == ''" class="txt-main">
            <fa icon="fa-solid fa-circle-user" />
        </h1>
        <div v-else><img :src="getThumbnail(image)"
                style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover;" /></div>
    </div>
</template>
<script lang="ts">
import { imageHelper } from '~/repository/images/imageHelper'
import { useUserApi } from './info/repository/userApi'

export default defineComponent({
    props: {
        userId: {
            type: Number
        },
        photo: {
            type: String
        },
    },
    setup(props, ctx) {
        const userApi = useUserApi()
        const { getThumbnail } = imageHelper
        onMounted(async () => {
            if (props.userId != undefined) {
                await userApi.getUserById(props.userId)
            }
        })
        const image = computed(() => {
            if (props.photo != undefined)
                return props.photo
            if (props.userId != undefined)
                return userApi.activeUser.photo
            return ''
        })
        return {
            image,
            getThumbnail
        }
    },
})
</script>
