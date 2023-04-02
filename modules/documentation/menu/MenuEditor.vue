<template>
    <div>
        <b-form-group>
            <b-form-input autofocus  placeholder="Create new menu" v-model="rdata.name" @keyup.enter="store"></b-form-input>
        </b-form-group>
    </div>
</template>
<script lang="ts">
import { usePopup } from '~/repository/popup'
import { useMenuApi } from './repository/menuApi'
import { menu } from './type/menu'
export default defineComponent({
    props: {
        parent_id: { type: Number },
        menu: {
            type: Object as () => menu
        }
    },
    emits: ['store'],
    setup(props, { emit }) {
        const rdata = reactive({
            id: '',
            name: '',
            parent_id: 0
        })
        const menuApi = useMenuApi()
        onMounted(() => {
            if (props.parent_id != undefined)
                rdata.parent_id = props.parent_id
            if (props.menu != undefined)
                Object.entries(props.menu).forEach((val: any, idx: any) => {
                    rdata[val[0] as keyof typeof rdata] = val[1] as never
                })
        })
        async function store() {
            await menuApi.store(rdata).then((res) => {
                emit('store', res.data.data)
            }).catch((err) => {
                usePopup().toast('Failed save', "FAILED", "danger")
            })

        }
        return {
            rdata,
            store
        }
    },
})
</script>
