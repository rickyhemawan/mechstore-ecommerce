<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="6">
          <card-home
            :img-src="require('../assets/package.jpg')"
            title="Products"
            description="Create or manage products"
            btn-show="Show All Products"
            btn-add="Add Products"
            to-show="/products"
            to-add="/products/add"
          />
        </b-col>
        <b-col md="6">
          <card-home
            :img-src="require('../assets/banner.jpg')"
            title="Banners"
            description="Create or manage banners"
            btn-show="Show All Banners"
            btn-add="Add Banners"
            to-show="/banners"
            to-add="/banners/add"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import cardHome from '../components/card-home.vue'
export default {
  components: { cardHome },
  name: 'Home',
  methods: {
    toHome() {
      this.$router.push('/about')
    },
  },
}
</script>
