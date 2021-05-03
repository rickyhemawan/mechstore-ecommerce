<template>
  <div>
    <b-container>
      <banner-form
        title="Edit Banner"
        :form="form"
        @submit="submit"
        showDelete
        @on-delete-clicked="onDeleteClicked"
      />
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
    bannerId() {
      return this.$router.currentRoute.params.id
    },
  },
  methods: {
    ...mapMutations({
      resetForm: 'banner/RESET_FORM',
      resetBanner: 'banner/RESET_BANNER',
      fillForm: 'banner/FILL_FORM',
    }),
    ...mapActions({
      fetchBanner: 'banner/fetchBanner',
      fetchUpdateBanner: 'banner/fetchUpdateBanner',
      fetchDeleteBanner: 'banner/fetchDeleteBanner',
    }),
    submit() {
      this.fetchUpdateBanner({ toast: this.$toast, id: this.bannerId })
    },
    onDeleteClicked() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          this.fetchDeleteBanner({ toast: this.$toast, id: this.bannerId })
        }
      })
    },
  },
  async created() {
    this.resetForm()
    this.resetBanner()
    await this.fetchBanner({ toast: this.$toast, id: this.bannerId })
    this.fillForm()
  },
}
</script>

<style></style>
