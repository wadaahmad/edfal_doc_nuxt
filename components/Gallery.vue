<template>
  <div class="bg-lightblue padding_50">
    <div class="container">
      <div class="content">
        <div
          class="
            align-items-center
            justify-content-center
            text-center text-white
          "
        >
          <h4>Galeri kegiatan</h4>
          <b-row>
              <b-col md="4" v-for="gallery in galleries" :key="gallery.id">
                <div class="gallery bg-white text-dark">
                  <img :src="gallery.content[0].image" />
                  <div class="padding_10 text">
                    <h6>
                      <b>{{ gallery.title }}</b>
                    </h6>
                    {{ gallery.description }}
                  </div>
                  <div class="button">
                    <b-button
                      variant="outline-success"
                      @click="openContent(gallery.id)"
                    >
                      View Gallery
                    </b-button>
                  </div>
                </div>
              </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <b-modal
      id="galleryContent"
      ref="galleryContent"
      title="Gallery"
      size="xl"
      hide-footer
      hide-header
      @hidden="galleryContent = null"
    >
      <div class="row">
        <b-col class="gallery-content" v-if="activeGalleries != null">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="false"
            fade
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->

            <b-carousel-slide
              v-for="content in activeGalleries.content"
              :key="content.id"
              :caption="content.title"
              :text="content.description"
              :img-src="content.image"
            ></b-carousel-slide>
          </b-carousel>
        </b-col>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      activeGalleries: null,
    }
  },
  computed: {
    galleries() {
      return this.$store.state.web.galleries.data
    },
  },
  methods: {
    openContent(id) {
      let data = this.galleries.filter((data) => data.id === id)
      this.id = data[0].id
      this.activeGalleries = data[0]
      this.$bvModal.show('galleryContent')
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
  },
}
</script>