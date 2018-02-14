import axios from 'axios'
// import config from '../config'

axios.defaults.headers.common = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-Requested-With': 'XMLHttpRequest',
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  'Access-Control-Allow-Credentials': 'true'
}

// ここを../apiでもっとモジュール化

export default {
  // signIn ({ commit, state }, { username, password, grantType }) {
  //   return new Promise((resolve, reject) => {
  //     if (!state.user.loggedIn) {
  //       axios.post('http://localhost:3000/api/v1/auth/token', {
  //         client_id: config.CLIENT_ID,
  //         client_secret: config.CLIENT_SECRET,
  //         username: username,
  //         password: password,
  //         grant_type: grantType
  //       }).then(function (response) {
  //         let token = response.data.access_token
  //         commit('setToken', { token })
  //         resolve(response)
  //       }).catch(reject)
  //     } else {
  //       reject(new Error('something bad happened'))
  //     }
  //   })
  // },

  loadRecipeList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/v1/recipes'
        // withCredentials: true
        // headers: {
        //   'Authorization': `Bearer ${state.user.token}`
        // }
      }).then(function (response) {
        let recipes = response.data
        commit('setRecipes', { recipes })
        resolve(recipes)
      }).catch(reject)
    })
  },

  createRecipe ({ commit, state }, { recipe, instructions, ingredients }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/v1/recipes',
        // withCredentials: true,
        data: {
          title: recipe.title,
          servings: recipe.servings,
          salt: recipe.salt,
          introduction: recipe.introduction,
          thumbnail_url: recipe.thumbnail_url,
          video_url: recipe.video_url,
          instructions: instructions,
          ingredients: ingredients
        }
      }).then(function (response) {
        resolve(response)
      }).catch(reject)
    })
  },

  loadRecipe ({ commit, state }, recipeId) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://localhost:3000/api/v1/recipes/${recipeId}`
        // withCredentials: true
      }).then(function (response) {
        let recipe = response.data
        commit('setRecipe', { recipe })
        resolve(recipe)
      }).catch(reject)
    })
  }
}
