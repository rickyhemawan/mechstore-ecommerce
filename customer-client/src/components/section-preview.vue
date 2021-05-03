<template>
  <div :style="`background-color: ${background};`">
    <v-container class="section-preview" fill-height>
      <v-row align="center" justify="center" height="100%">
        <v-col v-for="product in section" :key="product.id" cols="auto">
          <card-preview-product :product="product" />
        </v-col>
      </v-row>
      <btn-section-categories :name="sectionName" />
    </v-container>
  </div>
</template>

<script>
import BtnSectionCategories from './btn-section-categories.vue'
import CardPreviewProduct from './card-preview-product.vue'
export default {
  components: { CardPreviewProduct, BtnSectionCategories },
  props: {
    background: String,
    sectionName: String,
    section: Array,
  },
}
</script>

<style>
.section-preview {
  min-height: 90vh;
  padding: 5rem 0;
}
</style>
