<template>
  <div>
    <b-container>
      <banner-form title="Add Banner" :form="form" @submit="submit" />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BannerForm from '../components/banner-form.vue'
export default {
  components: { BannerForm },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      form: state => state.banner.form,
    }),
  },
  methods: {
    ...mapMutations({
      resetForm: 'banner/RESET_FORM',
      resetProduct: 'banner/RESET_PRODUCT',
    }),
    ...mapActions({
      fetchCreateBanner: 'banner/fetchCreateBanner',
    }),
    submit() {
      this.fetchCreateBanner({ toast: this.$toast })
    },
  },
  created() {
    this.resetForm()
    this.resetProduct()
  },
}
</script>

<style></style>
