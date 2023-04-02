<template>
    <div>
        <b-button variant="outline-dark" @click="rdata.showEditor = true" v-if="auth.loggedIn">
            <fa icon="fa-solid fa-pencil" class="icon" /> Edit
        </b-button>
        <b-button variant="outline-dark" @click="rdata.showHintEditor = true" v-if="auth.loggedIn">
            <fa icon="fa-solid fa-robot" :class="['icon',{'text-success':contents?.route_name != null}]" /> Hint
        </b-button>
        <div class="content-view">
            <div v-if="contents != undefined">
                <span v-html="contents?.content" />
                <div class="text-right">
                    <i>updated at {{ dateUs(contents?.updated_at) }}</i>
                </div>
            </div>
            <div v-else>
                <img src="https://files.edfal.com/img/onprogress.png" style="max-width:100%" />
                <h2>Documentations is in progress</h2>
                we will updated soon.!
            </div>
        </div>

        <b-modal hide-footer v-model="rdata.showEditor" size="lg">
            <jodit-editor v-model="rdata.content" />
            <b-button @click="store">save</b-button>
        </b-modal>
        <b-modal hide-footer v-model="rdata.showHintEditor" size="lg">
            <b-form-input placeholder="Route Name" v-model="rdata.route_name"></b-form-input>
            <jodit-editor v-model="rdata.hint" />
            <b-button @click="store">save</b-button>
        </b-modal>

    </div>
</template>
<script lang="ts">
import JoditEditor from '~/components/forms/JoditEditor.vue'
import { useContentApi } from '~/modules/documentation/content/repository/contentApi'
import { useStringRepo } from '~/repository/stringRepo'
import { useAuth } from '~/stores/auth'
export default defineComponent({
    components: { JoditEditor },
    auth: false,
    setup() {
        const rdata = reactive({
            id: '',
            content: '',
            menu_id: '',
            route_name: '',
            hint: '',
            showEditor: false,
            showHintEditor: false,
        })
        const route = useRoute()
        const contentApi = useContentApi()
        const { dateUs } = useStringRepo()
        const auth = useAuth()
        var menuId = route.params.id || ''

        useLazyAsyncData('', async () => {
            await getContent()
        })
        const contents = computed(() => contentApi.data != undefined ? contentApi.data[0] : contentApi.data)
        async function getContent() {
            await contentApi.get({ menu_id: menuId })
            if (contents.value != undefined) {
                rdata.route_name = contents.value?.route_name
                rdata.hint = contents.value?.hint
                rdata.content = contents.value?.content
                rdata.id = contents.value?.id
            }
        }
        async function store() {
            rdata.menu_id = menuId
            await contentApi.store(rdata)
            await getContent()
            rdata.showEditor = false
            rdata.showHintEditor = false
        }
        return {
            auth,
            rdata,
            contents,
            store,
            dateUs
        }
    },
})
</script>
