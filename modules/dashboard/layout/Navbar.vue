<template>
  <b-navbar sticky  type="light" variant="light">
    <a
      id="btn-toggle"
      v-if="$auth.loggedIn"
      size="sm"
      variant="light"
      v-b-toggle.sidebar
      ><span class="navbar-toggler-icon"></span
    ></a>

    <b-navbar-brand to="/" class="txt-main">
      SMARTSCHOOL
    </b-navbar-brand>


  </b-navbar>
</template>

<style>
</style>
<script lang="ts">
export default {
}
</script>
