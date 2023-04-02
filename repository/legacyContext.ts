export function useLegacyContext() {
    const ctx = computed(() => {
        let result: any
        useNuxtApp().vue2App
        result = useNuxtApp().vue2App
        return result
    })
    return {
        ctx
    }
}