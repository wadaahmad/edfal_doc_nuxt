<template>
  <div id="my-container">
    <div class="btn-floating-bottom-right">
      <!-- Our triggering (target) element -->
      <b-button style="padding:5px; width:40px; height:40px; border-radius:20px;" id="popover-reactive-1" variant="success" ref="button">
        <h4 style="margin-bottom:0px;"><i class="fa fa-whatsapp" aria-hidden="true"></i></h4>
      </b-button>
    </div>

    <b-popover
      target="popover-reactive-1"
      triggers="click"
      placement="auto"
      container="my-container"
      ref="popover"
      variant="success"
    >
      <template #title>
        Contact US
      </template>

      <div >
        <span v-for="c in cp" :key="c.id" v-html="c.content"/>
      </div>
    </b-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    }
  },
  computed: {
    articles() {
      return this.$store.state.web.articles.data
    },
    cp() {
      return this.articles.filter((data) => data.article_type_id == 8)
    },
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>