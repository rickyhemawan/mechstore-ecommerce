<template>
  <div>
    <v-app-bar fixed app color="black" dark>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        <h3>Mech Store ID</h3>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isAuthenticated" icon to="/wishlist">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn v-if="isAuthenticated" icon to="/products">
        <v-icon>mdi-shopping-search</v-icon>
      </v-btn>

      <v-btn v-if="isAuthenticated" icon to="/checkout">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn v-if="isAuthenticated" icon @click="confirmLogout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    confirmLogout() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You will need to login again',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout!',
        cancelButtonText: 'No, I want to stay!',
      }).then(result => {
        if (result.value) {
          this.logout()
        }
      })
    },
  },
  props: {
    isAuthenticated: Boolean,
  },
}
</script>

<style></style>
