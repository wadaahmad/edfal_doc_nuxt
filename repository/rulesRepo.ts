import { Context } from "@nuxt/types"
import { useActiveSchool } from '~/stores/activeschool'
import { useAuth } from "~/stores/auth"
export function useRulesRepo() {
    const activeSchool = useActiveSchool()
    const sch = activeSchool.info
    const schInfo = computed(() => activeSchool.info)
    const isUseClassGroup = computed(()=>schInfo.value?.use_class_group)
    const route = useRoute()
    const router = useRouter()
    const auth = useAuth()
    const pathSarpras = computed(() => route.path.includes('/inventory'))
    const pathMaster = computed(() => route.path.includes('/masters'))
    const pathWeb = computed(() => route.path.includes('/web'))
    const userProducts = computed(() => auth.user?.privilege_products)
    const userAccessProduct = computed(() => auth.user?.access_products)
    const userPrivilege = computed(() => auth.user?.privilege_id != undefined ? auth.user.privilege_id.split(',') : [0])
    const userPrivilegeNames = computed(() => auth.user?.privilege_name != undefined ? auth.user.privilege_name.split(',') : [])
    const showSarprasPanel = computed(() => {
        if (userAccessProduct.value?.length > 0) {
            var isRegister = userAccessProduct.value.filter((data: any) => data.id == 3)
            return isRegister.length > 0 ? true : false
        }
        return false
    })
    const showPerpusPanel = computed(() => {
        if (userAccessProduct.value?.length > 0) {
            var isRegister = userAccessProduct.value.filter((data: any) => data.id == 4)
            return isRegister.length > 0 ? true : false
        }
        return false
    })
    const accessedTeacherStudent = computed(() => {
        var permission = [9, 10]
        if (auth.loggedIn) {

            if (permission.includes(userPrivilege.value))
                return true
        }
        return false
    })
    const accessedSarpras = computed(() => {
        //sarpras dan admin
        var permission = [4, 6]
        if (auth.loggedIn) {
            if (permission.includes(userPrivilege.value) && pathSarpras.value)
                return true
        }
        return false
    })
    const accessedMaster = computed(() => {
        //kepsek dan admin
        var permission = [8, 6]
        if (auth.loggedIn) {
            if (permission.includes(userPrivilege.value) && pathMaster.value)
                return true
        }
        return false
    })
    const accessedAdmin = computed(() => {
        // admin
        var permission = [6]
        if (auth.loggedIn) {
            if (permission.includes(userPrivilege.value))
                return true
        }
        return false
    })
    const accessedWeb = computed(() => {
        // admin
        var permission = [1, 2, 3, 4, 5, 6, 7]
        if (auth.loggedIn) {
            if (permission.includes(userPrivilege.value) && pathWeb.value)
                return true
        }
        return false
    })
    const isMedia = computed(() => {
        userPrivilege.value == 5 ? true : false
    })
    function isGrantedProduct(productpath: string) {
        // var productpath = route.name?.split('-')[0]
        // console.log(productpath)
        var isPrivilege = userProducts.value.filter((data: any) => data.path == productpath)
        if (isPrivilege.length > 0 && route.path.includes('/' + productpath))
            return true
        if (userPrivilegeNames.value == 'admin' && productpath == 'masters' && route.path.includes('/' + productpath))
            return true
        return false
    }
    function isGrantedAccess(privilege: string) {
        return userPrivilegeNames.value.includes(privilege)
    }
    function isGrantedPath(ctx: Context) {
        var productpath = ctx.route.name?.split('-')[0]
        // console.log(productpath)
        var isPrivilege = userProducts.value.filter((data: any) => data.path == productpath)
        if (isPrivilege.length > 0)
            return true
        return false
    }
    return {
        sch,
        schInfo,
        route,
        router,
        auth,
        pathSarpras,
        pathMaster,
        pathWeb,
        userProducts,
        userAccessProduct,
        showSarprasPanel,
        showPerpusPanel,
        accessedTeacherStudent,
        accessedSarpras,
        accessedMaster,
        accessedAdmin,
        accessedWeb,
        isMedia,
        isUseClassGroup,
        isGrantedProduct,
        isGrantedPath,
        isGrantedAccess
    }
}