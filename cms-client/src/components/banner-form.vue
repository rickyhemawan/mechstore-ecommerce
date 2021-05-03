<template>
  <div>
    <h1>{{ title }}</h1>
    <b-form @submit.prevent="submit">
      <b-row class="my-3">
        <b-col>
          <b-form-input
            type="text"
            placeholder="Banner Name"
            required
            v-model="form.title"
          ></b-form-input>
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
    banner: Object,
    form: Object,
    showDelete: Boolean,
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    onDeleteClicked() {
      this.$emit('on-delete-clicked')
    },
  },
}
</script>

<style></style>
