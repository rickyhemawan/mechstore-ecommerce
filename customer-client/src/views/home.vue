<template>
  <div>
    <carousel-banner v-if="banners.length > 0" :banners="banners" />
    <section-preview
      v-for="(section, key, index) in sections"
      :key="index"
      :background="background(index)"
      :section="section"
      :sectionName="key"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CarouselBanner from '../components/carousel-banner.vue'
import SectionPreview from '../components/section-preview.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: { CarouselBanner, SectionPreview },
  methods: {
    ...mapActions({
      loadBanners: 'banner/loadBanners',
      loadProducts: 'product/loadProducts',
      loadUser: 'user/loadUser',
      loadCarts: 'cart/loadCarts',
    }),
    background(index) {
      return index % 2 === 0 ? '#fffbe6' : '#212121'
    },
  },
  computed: {
    ...mapState({
      banners: state => state.banner.banners,
    }),
    ...mapGetters({
      sections: 'product/productSections',
    }),
  },
  async created() {
    await this.loadBanners()
    await this.loadProducts()
    await this.loadUser()
    await this.loadCarts()
  },
}
</script>
