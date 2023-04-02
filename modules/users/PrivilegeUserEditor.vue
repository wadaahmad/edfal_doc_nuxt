<template>
    <div>
        <b-form-group label="Hak akses">
            <multiselect v-if="privileges != undefined" v-model="rdata.selectedPrivilege" placeholder="Pilih hak akses"
                :multiple="true" label="name" track-by="id" :options="privileges"></multiselect>
        </b-form-group>
        <b-button variant="info" class="btn-main" @click="store">
            Simpan
        </b-button>
        <b-button @click="$emit('cancel', true)">
            Cancel
        </b-button>
    </div>
</template>
<script lang="ts">
import Multiselect from 'vue-multiselect'
import { usePrivilegeApi } from './privilege/repository/privilegeApi'
import { useUserApi } from './info/repository/userApi'
import { privilege } from './privilege/type/privilege'
import { usePopup } from '~/repository/popup'

export default defineComponent({
    components: { Multiselect },
    props: {
        userId: {
            required: true,
            type: Number
        },
        privilegeId: String || null
    },
    emits: ['store', 'cancel'],
    setup(props, ctx) {
        const rdata = reactive({
            selectedPrivilege: Array() as Array<privilege>
        })
        const privilegeApi = usePrivilegeApi()
        const userApi = useUserApi()
        onMounted(async () => {
            await privilegeApi.get()
            if (props.privilegeId != null) {
                rdata.selectedPrivilege = privileges.value?.filter((data) => props.privilegeId?.split(',').includes(data.id.toString())) as Array<privilege>
            }
        })
        const privileges = computed(() => privilegeApi.data)
        async function store() {
            var privilegeIds = Array()
            rdata.selectedPrivilege.forEach((data) => {
                privilegeIds.push(data.id)
            })
            await userApi.store({
                id: props.userId,
                privilege_ids: privilegeIds
            })
            usePopup(ctx).toast("Data tersimpan")
            ctx.emit('store', true)
        }
        return {
            rdata,
            privileges,
            store
        }
    },
})
</script>
