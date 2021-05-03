<template>
  <div>
    <!-- ini fotonya automatis pake cover, kalo mau contain -->
    <!-- nanti banner creatornya harus repot dikit wkwkwk -->
    <!-- makanya agak kepotong sedikit bannernya -->
    <v-carousel :show-arrows="false" height="85vh" cycle>
      <v-carousel-item
        v-for="(banner, i) in banners"
        :key="i"
        :src="banner.image_url"
      >
        <h1 class="text-center banner-title">{{ banner.title }}</h1>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: Array,
  },
}
</script>

<style>
.banner-title {
  background-color: rgb(55, 71, 79, 0.4);
  color: azure;
}
</style>
