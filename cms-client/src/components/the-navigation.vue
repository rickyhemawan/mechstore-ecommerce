<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      class="shadow-md mb-3 bg-premium-dark"
      variant="dark"
    >
      <b-container>
        <b-navbar-brand to="/">MechStoreID</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" title="test">
            <b-nav-item-dropdown text="Products" right>
              <b-dropdown-item to="/products"
                >Show All Products
              </b-dropdown-item>
              <b-dropdown-item to="/products/add">
                Add Product
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Banners" right>
              <b-dropdown-item to="/banners">Show All Banners</b-dropdown-item>
              <b-dropdown-item to="/banners/add">Add Banners</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#" @click.prevent="logout">Sign Out</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
  },
}
</script>

<style>
.main-heading {
  font-weight: 600;
}
.bg-premium-dark {
  background-image: linear-gradient(120deg, #434343 0%, black 100%);
}
</style>
