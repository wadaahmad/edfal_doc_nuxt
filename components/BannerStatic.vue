<template>
  <div class="banner">
    <img v-if="isApp" src="~/assets/img/bgwave.jpg" />
    <img v-else src="~/assets/img/bgwave.jpg" />
    <div class="banner-content">
      <div class="container text-center text-white">
        <h4>E-Sarpras</h4>
        <p class="mb-4">Ajukan pengambilan atau peminjaman barang</p>
        <b-col size="lg">
          <b-input-group>
            <template #prepend>
              <b-input-group-text class="btn-default btn-main"
                ><i class="fa fa-fw fa-search"></i
              ></b-input-group-text>
            </template>
            <b-form-input
              v-model="search"
              placeholder="Cari barang yg akan diambil atau dipinjam."
              class="search-main"
              type="text"
              @keyup="guestFilter"
            ></b-form-input>
            <template #append v-if="showItem">
              <b-button variant="danger" @click="searchClear">X</b-button>
            </template>
          </b-input-group>
          <div
            class="p-2 bg-white text-dark text-left"
            v-if="showItem"
            style="position: relative; height: 150px; overflow-y: scroll"
          >
            <div
              v-for="item in items"
              :key="item.id"
              @click="itemAdd(item.inventory_id)"
              
            >
              <div
                v-if="
                  item.is_usable == 1 &&
                  item.is_undertaken != 1 &&
                  item.is_taken != 1
                "
              >
                <div
                  v-if="selectedInv.includes(item.inventory_id)"
                  class="bg-info text-white p-1"
                >
                  <i>{{ item.inventory_id }}</i> - {{ item.name }}
                </div>
                <div class="p-1" v-else>
                  <i>{{ item.inventory_id }}</i> - {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4" v-if="selectedInv.length > 0">
            <div class="alert alert-primary">
              <b> Item dipilih : {{ countSelected }}</b>
              <span v-for="inv in selectedInv" :key="inv">
                {{ inv }}
              </span>
            </div>
            <b-button
              variant="primary"
              class="btn-main mt-2"
              @click="goItemProcess"
              ><i class="fa fa-paper-plane" /> Proses barang
            </b-button>
          </div>
          <div class="mt-4" v-else>
            <b-button variant="primary" class="btn-main" to="/orders"
              ><i class="fa fa-shopping-cart" /> Pesan barang</b-button
            >
            <!-- <b-button variant="primary" class="btn-main"
              ><i class="fa fa-phone" /> Contact Us</b-button
            > -->
          </div>
          <div class="footer">
            Powered by © SMA TAKHASSUS AL-QUR'AN WONOSOBO {{ year }}
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedInv: [],
    }
  },
  computed: {
    showItem() {
      let param = this.$store.state.inventory.items.params.name
      if (param != '') {
        return true
      }
      return false
    },
    invString() {
      return this.selectedInv.join(',')
    },
    countSelected() {
      return this.selectedInv.length
    },
    year() {
      var d = new Date()
      return d.getFullYear()
    },
  },
  methods: {
    itemAdd(invId) {
      let index = this.selectedInv.findIndex((data) => data == invId)
      if (index > -1) {
        this.selectedInv.splice(index, 1)
      } else {
        this.selectedInv.push(invId)
      }
    },
    goItemProcess() {
      this.$store.commit('inventory/items/setParamOnlyAvailable', '')
      this.$router.push('/items?inv=' + this.invString)
    },
  },
}
</script>