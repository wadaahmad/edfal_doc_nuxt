<template>
  <div>
    <b-col
      size="lg"
      class="bg-white radius_20 padding_20 text-black text-center"
    >
      <h4>Pengumuman</h4>
      <b-row class="padding_20 text-left">
        <div size="lg" class="box_overflow_vertical">
          <NuxtLink
            class="box_w300_h100 thumbnail"
            style="margin-right:none;"
            v-for="item in pengumuman"
            :key="item.id"
            :to="`/articles?content=` + item.id"
          >
            <img :src="item.thumbail_image" />
            <h6>{{ item.thumbail_title }}</h6>
            <div class="text">
              {{ item.thumbail_text }}
            </div>
            <div class="meta">
              <i class="fa fa-fw fa-user"></i> {{ item.created_by_name }} ({{
                item.created_by_privilege
              }}) <i class="fa fa-fw fa-calendar"></i> {{ item.updated_at }}
            </div>
          </NuxtLink>
        </div>
      </b-row>
    </b-col>
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
    pengumuman() {
      return this.articles.filter((data) => data.article_type_id == 1)
    },
  },
}
</script>