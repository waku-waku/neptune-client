<template>
  <section class="login">
    <div class="container">
      <h1>Login</h1>
      <form v-if="!$store.state.authUser" @submit.prevent="login">
        <p class="error" v-if="formError">{{ formError }}</p>
        <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
        <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
        <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
        <button type="submit">Login</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  layout: 'default',
  computed: {
    ...mapGetters(['getFoodList'])
  },
  data () {
    return {
      foods: []
    }
  },
  created () {
    // this.loadFoodList()
  },
  methods: {
    ...mapActions(['loadFoodList']),
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.$nuxt.$router.replace({ path: '/' })
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped lang="scss">
.post {

}
</style>
