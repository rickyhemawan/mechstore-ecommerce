<template>
  <div class="bg-premium-dark">
    <div class="container centerize">
      <b-card no-body>
        <b-row class="align-items-center">
          <b-col md="6">
            <b-card-img
              src="https://picsum.photos/800/800/?image=999"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Login" class="mr-5">
              <b-card-text>
                Welcome to MechStoreID CMS (Content Management system), please
                enter the required fields to proceed
              </b-card-text>
              <b-form
                @submit.prevent="login({ email, password, toast: $toast })"
              >
                <b-overlay :show="isLoading">
                  <b-form-input
                    type="email"
                    placeholder="Enter email"
                    v-model="email"
                    class="mb-3"
                  />
                  <b-form-input
                    type="password"
                    placeholder="Enter password"
                    v-model="password"
                    class="mb-3"
                  />
                  <b-button type="submit" block variant="primary">
                    Confirm
                  </b-button>
                </b-overlay>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: 'SET_LOADING',
    }),
    ...mapActions({
      login: 'user/login',
    }),
  },
}
</script>

<style scoped>
.card {
  border: none;
}
.centerize {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
.bg-premium-dark {
  background-image: linear-gradient(120deg, #434343 0%, black 100%);
  height: 100vh;
}
</style>
