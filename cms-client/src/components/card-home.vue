<template>
  <div class="mt-3">
    <b-card
      :title="title"
      :img-src="imgSrc"
      img-alt="Image"
      img-height="360px"
      img-top
      tag="article"
      class="mb-2 shadow"
    >
      <b-card-text>{{ description }} </b-card-text>
      <b-row no-gutters>
        <b-col></b-col>
        <b-col cols="auto" class="mr-2">
          <b-button variant="primary" :to="toShow">
            {{ btnShow }}
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button variant="success" :to="toAdd">
            {{ btnAdd }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    title: String,
    description: String,
    btnShow: String,
    toShow: String,
    btnAdd: String,
    toAdd: String,
  },
}
</script>

<style></style>
