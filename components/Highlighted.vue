<template>
  <div class="bg-white padding_20 text-center text-white">
    <div>
      <b-row class="padding_20 text-left">
        <div class="box_overflow_horisontal">
          <NuxtLink
            class="box_w300_h300 bg-dark text-white thumbnail_fit"
            v-for="item in highlighted"
            :key="item.id"
            :to="`/articles?content=` + item.id"
          >
            <img :src="item.image" />
            <div class="padding_10">
              <h6 class="">{{ item.thumbail_title }}</h6>
              <div class="text">
                {{ item.thumbail_text }}
              </div>
              <div class="meta">
                <i class="fa fa-fw fa-user"></i> {{ item.created_by_name }} ({{
                  item.created_by_privilege
                }}) <i class="fa fa-fw fa-calendar"></i> {{ item.updated_at }}
              </div>
            </div>
          </NuxtLink>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    articles() {
      return this.$store.state.web.articles.data
    },
    highlighted() {
      return this.articles.filter((data) => data.highlighted == 1)
    },
  },
}
</script>