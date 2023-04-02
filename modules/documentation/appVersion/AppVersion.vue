<template>
    <div>
        <div class="bg-white p-2">
            Keterangan :
            <b>New</b> : Penambahan fitur. |
            <b>Change</b> : Perubahan fitur. |
            <b>BugFix</b> : Perbaikan fitur. |
            <b>Revamp</b> : Perubahan sebagian atau seluruhnya disertai dengan penambahan fitur.
        </div>
        <div class="mb-4" v-for="version in appVersions" :key="version.id">
            <h2 class="mb-0">
                {{ 'version - ' + version.version }}
            </h2>
            <div class="mb-2">{{ dateUs(version.date) }}</div>
            <b>Changelog : </b>
            <div v-html="version.changelog"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStringRepo } from '~/repository/stringRepo';
import { useAppVersionApi } from './repository/appVersionApi';

export default defineComponent({
    setup() {
        const appVersionApi = useAppVersionApi()
        const { dateUs } = useStringRepo()
        onMounted(async () => {
            await appVersionApi.get({ app_name: 'smartschool_web' })
        })
        const appVersions = computed(() => appVersionApi.data)
        return {
            appVersions,
            dateUs
        }
    },
})
</script>
