<template>
  <div>
    <b-card
      no-body
      :header="`${banner.title} - ${activeTitle}`"
      :header-class="activeClass"
      class="mb-3 shadow"
    >
      <b-card-img
        :src="banner.image_url"
        height="260px"
        alt="Image"
        bottom
      ></b-card-img>
      <b-card-body>
        <b-row>
          <b-col cols="auto">
            <b-button
              block
              href="#"
              @click.prevent="updateStatus"
              :variant="activeColor"
              >{{ activeText }}</b-button
            >
          </b-col>
          <b-col></b-col>
          <b-col cols="auto">
            <b-button
              @click.prevent="onEdit"
              block
              href="#"
              variant="outline-info"
              >Edit</b-button
            >
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    color: 'red',
  }),
  props: {
    banner: Object,
  },
  computed: {
    activeTitle() {
      return this.banner.status ? 'Active' : 'Disabled'
    },
    activeText() {
      return this.banner.status ? 'Deactivate' : 'Activate'
    },
    activeColor() {
      return this.banner.status ? 'outline-danger' : 'outline-success'
    },
    activeClass() {
      return this.banner.status ? 'status-active' : 'status-disabled'
    },
  },
  methods: {
    updateStatus() {
      this.$emit('update-status', {
        id: this.banner.id,
        status: !this.banner.status,
      })
    },
    onEdit() {
      this.$emit('on-edit', { id: this.banner.id })
    },
  },
}
</script>
<style>
.status-active {
  background-color: #ccff90 !important;
  color: #1b5e20;
  font-weight: bold;
}
.status-disabled {
  background-color: #f8bbd0 !important;
  font-weight: bold;
  color: #f50057;
}
</style>
