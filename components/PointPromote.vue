<template>
  <div class="row align-items-center justify-content-center text-center">
    <div class="container">
      <b-row>
        <b-col> OOO </b-col>
        <b-col> OOO </b-col>
      </b-row>
    </div>
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