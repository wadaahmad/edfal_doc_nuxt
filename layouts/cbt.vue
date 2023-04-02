<template>
  <div>
    <Navbar />
    <div id="wrapper">
      <div id="content-nosidebar">
        <div class="content p-4">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/cbt/Navbar'

export default {
  components: { Navbar },
}
</script>
