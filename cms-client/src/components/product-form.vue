<template>
  <div>
    <h1>{{ title }}</h1>
    <b-form @submit.prevent="submit">
      <b-row class="my-3">
        <b-col>
          <b-form-input
            type="text"
            placeholder="Product Name"
            required
            v-model="form.name"
          ></b-form-input>
        </b-col>
        <b-col cols="auto">
          <b-dropdown
            id="dropdown-form"
            :text="form.category || 'Select Category'"
            ref="dropdown"
          >
            <b-dropdown-form>
              <b-form-input
                size="sm"
                placeholder="New Category"
                v-model="form.category"
              ></b-form-input>
            </b-dropdown-form>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="category in categories"
              @click.prevent="categoryClicked(category.name)"
              :key="category.id"
            >
              {{ category.name }}</b-dropdown-item-button
            >
          </b-dropdown>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-group label="Price">
            <b-form-input
              placeholder="Price"
              type="number"
              v-model="form.price"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group label="Stock">
            <b-form-input
              placeholder="Stock"
              type="number"
              v-model="form.stock"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <div class="my-3">
        <b-form-input
          type="text"
          placeholder="Image URL"
          v-model="form.image_url"
        ></b-form-input>
      </div>
      <b-row>
        <b-col v-if="showDelete" cols="4">
          <b-button @click.prevent="onDeleteClicked" block variant="danger">
            Delete
          </b-button>
        </b-col>
        <b-col>
          <b-button type="submit" block variant="primary">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    form: Object,
    categories: Array,
    showDelete: Boolean,
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    categoryClicked(name) {
      this.$emit('category-clicked', name)
    },
    onDeleteClicked() {
      this.$emit('on-delete-clicked')
    },
  },
}
</script>

<style></style>
