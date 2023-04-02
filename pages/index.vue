<template>
  <div class="content-view">
    <app-version />
  </div>
</template>

<script>
import AppVersion from "~/modules/documentation/appVersion/AppVersion.vue";

export default defineComponent({
  components: { AppVersion },
  setup() {
  },
  layout: 'default',
  auth: false,

})
</script>

<style>

</style>
