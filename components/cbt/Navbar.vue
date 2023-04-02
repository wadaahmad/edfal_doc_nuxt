<template>
  <b-navbar sticky toggleable="lg" type="light" variant="light">
    <b-navbar-brand>
      <b-navbar-brand >SOALKU</b-navbar-brand>
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item right>
        <div v-if="$auth.loggedIn">
          <i class="fa fa-fw fa-user"></i>{{ $auth.user.first_name }}
        </div>
        <div v-if="!$auth.loggedIn"><i class="fa fa-fw fa-user"></i>Guest</div>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<style>
</style>
<script>
export default {
  mounted() {
    user: this.$store.state.auth.user
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
