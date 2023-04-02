<template>
  <!-- Sidebar -->
  <b-collapse id="sidebar" v-model="data.sidebarShow">
    <div id="sidebar-wrapper">
      <div class="list-group list-group-flush p-3">
        <div class="content-box text-center mb-3">
          <user-profile-view :user="authUser"></user-profile-view>
          <NuxtLink to="/dashboard" class="
              mt-2
              ml-2
              my-1
              text-mini
              list-group-item-action
              flex-column
              align-items-start
            ">
            <div class="d-flex w-100 justify-content-start align-items-center">
              <fa icon="fa-solid fa-house-chimney" class="icon"/>
              <span class="menu-collapsed">Dashboard</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink to="/dashboard/profiles" class="
              my-1
              ml-2
              text-mini
              list-group-item-action
              flex-column
              align-items-start
            ">
            <div class="d-flex w-100 justify-content-start align-items-center">
              <fa icon="fa-regular fa-user" class="icon"/>
              <span class="menu-collapsed">Data Profile</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <NuxtLink to="/dashboard/newpassword" class="
              my-1
              ml-2
              text-mini
              list-group-item-action
              flex-column
              align-items-start
            ">
            <div class="d-flex w-100 justify-content-start align-items-center">
              <fa icon="fa-solid fa-lock" class="icon"/>
              <span class="menu-collapsed">Ubah password</span>
              <span class="submenu-icon ml-auto"></span>
            </div>
          </NuxtLink>
          <div class="mt-3">
            <span class="btn btn-danger" @click="$auth.logout()">Log out <fa icon="fa-solid fa-power-off" class="icon" /></span>
          </div>
        </div>
        <!-- <li
            class="
            mt-3
              list-group-item
              sidebar-separator-title
              text-muted
              d-flex
              align-items-center
              menu-collapsed
            "
          >
            <small>MAIN MENU </small>
          </li> -->
        <NuxtLink v-if="authUser?.privilege_name == 'admin'" to="/masters" class="
            bb-main
            list-group-item list-group-item-action
            text-mini
            flex-column
            align-items-start
          ">
          <div class="d-flex w-100 justify-content-start align-items-center">
            <fa icon="fa-solid fa-crosshairs" class="icon"/>
            <span class="menu-collapsed">Master</span>
            <span class="submenu-icon ml-auto"></span>
          </div>
        </NuxtLink>

      </div>
    </div>
  </b-collapse>
  <!-- /#sidebar-wrapper -->
</template>
<script lang="ts">
import { useAuthRepo } from "~/modules/auth/repository/authRepo"
import UserProfileView from "~/modules/users/UserProfileView.vue"
import { useLegacyContext } from "~/repository/legacyContext"

export default defineComponent({
  components: { UserProfileView },
  setup(props) {
    const data = reactive({
      sidebarShow: true,
    })
    const { ctx } = useLegacyContext()
    const { authUser } = useAuthRepo()
    onMounted(() => {
      if (window.innerWidth < 768) {
        data.sidebarShow = false
        ctx.value.$emit('bv::toggle::collapse', 'sidebar')
        // this.$root.$emit('bv::toggle::collapse', 'sidebar')
      }
    })
    function clickSidebar() {
      if (window.innerWidth < 768) {
        data.sidebarShow = false
        ctx.value.$emit('bv::toggle::collapse', 'sidebar')
      }
    }
    return {
      data,
      clickSidebar,
      authUser
    }
  }

})

</script>