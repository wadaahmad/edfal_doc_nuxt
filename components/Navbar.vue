<template>
  <b-navbar sticky toggleable="lg" type="light" variant="light">
    <a id="btn-toggle" size="sm" variant="light" v-b-toggle.sidebar><span
        class="navbar-toggler-icon"></span></a>
    <b-navbar-brand class="navbar-doc" style="width:15.5rem" to="/">
      Zchool-DOC
    </b-navbar-brand>
    <b-navbar-nav> </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto pr-3" v-if="$auth.loggedIn">
      <!-- Using 'button-content' slot -->
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <fa icon="fa-regular fa-user" class="icon" /> {{ $auth.user.name }}
        </template>
        <b-dropdown-item @click="$auth.logout()">
          <fa icon="fa-solid fa-power-off" class="icon" /> Sign Out
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<style>
</style>
<script>
export default {
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    async logout() {
      await this.$auth.logout()
      //document.querySelector('body').style.backgroundColor = '#fff'
    },
  },
}
</script>
