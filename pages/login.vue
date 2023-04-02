<template>
  <div>
    <div class="banner">
      <img src="~/assets/img/bgpoligon.jpg" />
      <div class="banner-content">
        <div class="container text-white">
          <nuxt-link to="/">
            <h4 class="text-center text-white">SMART SCHOOL</h4>
          </nuxt-link>
          <login />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRulesRepo } from '~/repository/rulesRepo'
import login from '~/modules/auth/login.vue'
import { useStringRepo } from '~/repository/stringRepo'
export default defineComponent({
  setup() {
  },
  layout: 'blank',
  components: { login },
  
})
</script>