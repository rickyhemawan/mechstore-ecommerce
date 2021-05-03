<template>
  <div>
    <b-container>
      <h1 class="mb-4">Banners</h1>
      <b-row>
        <b-col v-for="banner in banners" :key="banner.id" md="6">
          <card-banner
            @on-edit="onEdit"
            @update-status="updateStatus"
            :banner="banner"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import cardBanner from '../components/card-banner.vue'
export default {
  components: { cardBanner },
  computed: {
    ...mapState({
      banners: state => state.banner.banners,
    }),
  },
  methods: {
    ...mapActions({
      fetchAllBanners: 'banner/fetchAllBanners',
      fetchUpdateStatus: 'banner/fetchUpdateStatus',
    }),
    updateStatus(payload) {
      this.fetchUpdateStatus({ toast: this.$toast, ...payload })
    },
    onEdit({ id }) {
      this.$router.push(`/banners/${id}`)
    },
  },
  async created() {
    await this.fetchAllBanners({ toast: this.$toast })
  },
}
</script>

<style></style>
