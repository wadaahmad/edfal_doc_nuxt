<template>
    <div>
        <user-profile-photo-view :photo="user.photo"></user-profile-photo-view>
        {{ user.name }}
        <div>
            <span class="text-small">
                {{ user.access_privilege_name }}
                <span v-if="user.privilege_name != null">- {{ user.privilege_name }}</span></span>
        </div>
        <span class="text-small">{{ user.bio }}</span>
        <div style="font-size:18px;" class="content-center">
            <span class="m-2" v-if="user.cellphone != ''"><a :href="sosmedUrlGenerator('whatsapp', user.cellphone)"
                    target="_blank"><fa icon="fa-brand fa-whatsapp" class="icon" /></a>  </span>
            <span class="m-2" v-if="user.twitter != ''"><a :href="sosmedUrlGenerator('twitter', user.twitter)"
                    target="_blank"><fa icon="fa-brand fa-twitter" class="icon" /></a> </span>
            <span class="m-2" v-if="user.facebook != ''"><a :href="sosmedUrlGenerator('facebook', user.facebook)"
                    target="_blank"><fa icon="fa-brand fa-facebook" class="icon" /></a> </span>
            <span class="m-2" v-if="user.instagram != ''"><a :href="sosmedUrlGenerator('instagram', user.instagram)"
                    target="_blank"><fa icon="fa-brand fa-instagram" class="icon" /></a> </span>

        </div>
    </div>
</template>
<script lang="ts">
import { imageHelper } from '~/repository/images/imageHelper'
import { urlHelper } from '~/repository/urlHelper'
import { user } from './info/type/user'
import UserProfilePhotoView from './UserProfilePhotoView.vue'

export default defineComponent({
    components: { UserProfilePhotoView },
    props: {
        user: {
            required: true,
            type: Object as () => user
        }
    },
    setup(props) {
        const { getThumbnail } = imageHelper
        const { sosmedUrlGenerator, sosmedList } = urlHelper
        return {
            getThumbnail,
            sosmedList,
            sosmedUrlGenerator
        }
    },
})
</script>
