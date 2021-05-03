<template>
  <div class="py-4">
    <v-chip-group active-class="primary--text" column>
      <v-chip
        v-for="category in categories"
        :key="category.id"
        @click.prevent="filterProduct(category.id)"
      >
        {{ category.name }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  methods: {
    filterProduct(id) {
      this.$emit('category-changed', id)
    },
  },
}
</script>

<style></style>
