<template>
  <div class="bg-dark padding_50">
    <div class="">
      <div class="content text-white">
        <b-row>
          <b-col md="4">
            <h6>SMA TAKHASSUS AL-QUR'AN WONOSOBO</h6>
            Alamat: Jl. K.H. Asy'ari No.29, Kalibeber, Mojotengah, Kabupaten
            Wonosobo, Jawa Tengah 56351
          </b-col>
          <b-col md="4">
            <h6>Contact Person</h6>
            <ul>
              <li>Telp. Kantor : (0286) 3326374 </li>
            </ul>
          </b-col>
          <b-col md="4">
            <h6>Link terkait</h6>
            <ul>
              <li>
                <a
                  href="http://ppdb.al-asyariyyah.com/media.php?module=jenjang&sch=ZA%3D%3D"
                  target="_blank"
                  >PPDB SMA TAKHASSUS AL-QUR'AN
                </a>
              </li>
              <li>
                <a href="http://alumni.smataqwsb.sch.id" target="_blank"
                  >FORUM ALUMNI SMA TAKHASSUS AL-QUR'AN
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/17S4hXrB1jNzHeQi2A4OgnAgstxBt8o2__dw34Fljy5Y/viewform?edit_requested=true"
                  target="_blank"
                  >ABSENSI GURU & KARYAWAN SELAMA COVID
                </a>
              </li>
            </ul>
          </b-col>
        </b-row>
        <div align="center" class="padding_20">Copyright © SMA TAKHASSUS AL-QUR'AN WONOSOBO {{year}}</div>
      </div>
    </div>
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
    year() {
      var d = new Date()
      return d.getFullYear()
    },
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