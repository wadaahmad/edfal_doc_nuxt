<template>
  <div>
    <Navbar />
    <div class="d-flex align-items-stretch">
      <sidebar />
      <div id="page-content-wrapper" class="pl-1">
        <div class="content">

          <Nuxt />

        </div>
      </div>
    </div>
    <b-alert :show="isLoading" class="mx-auto position-fixed fixed-top mt-1 rounded-pill text-center"
      style="z-index: 2000; width: 220px; " variant="light" dismissible>
      <b-spinner small label="Spinning"></b-spinner> <b>
        Loading data</b>
    </b-alert>
  </div>
</template>

<script lang="ts">
import Sidebar from "~/components/Sidebar.vue";
import { useHelpers } from "~/stores/helpers";

export default defineComponent({
  setup() {
    const { isLoading } = useHelpers()
    return {
      isLoading
    }
  },

  layout: 'default',
  components: {
    Sidebar
  },
})
</script>
