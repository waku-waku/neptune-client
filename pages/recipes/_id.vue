<template>
  <section class="recipe">
    <div class="container">
      <!-- <logo/> -->
      <h1 class="title">
        {{ recipe.title }}
      </h1>
      <p>
        {{ recipe.servings }}
      </p>
      <p>
        {{ recipe.salt }}
      </p>
      <p>
        {{ recipe.introduction }}
      </p>
      <div class="instructions">
        <p class="" v-for="instruction in recipe.instructions">
          {{ instruction }}
        </p>
      </div>
      <div class="ingredients">
        <p class="" v-for="ingredient in recipe.ingredients">
          {{ ingredient.name }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'recipe',
  layout: 'default',
  components: {
    Logo
  },
  computed: {
    ...mapGetters(['getRecipeList', 'getRecipe'])
  },
  data () {
    return {
      recipe: {}
    }
  },
  mounted () {
    // this.loadRecipe()
    // this.recipe = this.getRecipe
    let vm = this
    let recipeId = this.$route.params.id
    axios({
      method: 'get',
      url: `http://localhost:3000/api/v1/recipes/${recipeId}`
      // withCredentials: true
    }).then(function (response) {
      let recipe = response.data
      // commit('setRecipe', { recipe })
      vm.recipe = recipe
    }).catch()
  },
  beforeCreate () {
  },
  methods: {
    ...mapActions(['loadRecipe']),
    loadRecipe: function () {
      let vm = this
      // if (localStorage.getItem('_food')) {
      //   // localstorageにあるとそれを格納.
      // } else {
      this.$store.dispatch('loadRecipe', vm.$route.params.id)
        .then(function (result) {
          vm.recipe = vm.getRecipe
        })
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.recipe {
  margin: 7rem 0 0;
  .container {
    text-align: center;
  }
  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
}
</style>
