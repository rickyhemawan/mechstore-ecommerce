<template>
  <v-footer class="ma-0 pa-0" v-bind="localAttrs">
    <v-card flat tile width="100%" class="black lighten-1 text-center">
      <v-card-text>
        <v-btn @click="toGithub" class="mx-4" icon>
          <v-icon size="24px"> mdi-github </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>Made with Vuetify, by Putu Ricky Hemawan </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    variant: 'dark',
  }),
  computed: {
    localAttrs() {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
  },
  methods: {
    toGithub() {
      window.open('https://github.com/rickyhemawan', '_blank')
    },
  },
}
</script>

<style></style>
