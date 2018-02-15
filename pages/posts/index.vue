<template>
  <section class="post">
    <div class="container">
      <h1>Recipe作成</h1>
      <form v-if="!$store.state.authUser">


        <p>レシピ名: <input type="text" v-model="recipe.title"></p>
        <p>分量(人前): <input type="text" v-model="recipe.servings"></p>
        <!-- <p>Image: <input type="file"  @change="onFileChange"></p> -->
        <p>説明: <textarea row="5" v-model="recipe.introduction"></textarea></p>

        <div class="instructions">
          <p class="instruction-head">レシピ手順</p>
          <div class="instruction-list">
            <p class="instruction" v-for="(instruction, key, index) in instructions">
              <span class="sort_order">{{key+1}}.</span>
              {{instruction.body}}
              <span class="delete" @click="removeInstrucion(instruction)">x</span>
            </p>
          </div>
          <div class="instruction-form">
            <input type="text" class="input-area" placeholder="レシピの手順を説明してください" contenteditable=true v-model="newInstruction" v-on:keydown.enter="inputPushInstruction(newInstruction)">
          </div>
        </div>

        <div class="ingredients">
          <p class="instruction-head">材料</p>
          <div class="ingredient-list">
            <p class="ingredient" v-for="(ingredient, key, index) in ingredients">
              <span class="sort_order">{{key+1}}.</span>
              {{ ingredient.name }} /
              {{ ingredient.quantity }}
              <span class="delete" @click="removeIngredient(ingredient)">x</span>
            </p>
          </div>
          <div class="ingredient-form">
            <div class="name">
              <label for="ingredient-name">品名</label>
              <input id="ingredient-name" type="text" class="input-area" placeholder="ex) とんかつ" contenteditable=true v-model="newIngredientName">
            </div>

            <div class="quantity">
              <label for="ingredient-quantity">分量</label>
              <input id="ingredient-quantity" type="text" class="input-area" placeholder="ex) 1パック,100g,大さじ1/2 ..." contenteditable=true v-model="newIngredientQuantity">
            </div>

            <a class="create-btn" @click="inputPushIngredient(newIngredientName, newIngredientQuantity)">材料追加</a>
          </div>
        </div>


        <a class="create-btn" @click="create">レシピ作成</a>
      </form>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'post',
  layout: 'default',
  computed: {
    ...mapGetters(['getRecipeList'])
  },
  data () {
    return {
      recipe: {
        video_url: 'https://',
        thumbnail_url: 'https://'
      },
      instructions: [],
      newInstruction: '',
      ingredients: [],
      newIngredientName: '',
      newIngredientQuantity: ''
    }
  },
  mounted () {
    this.instructions = JSON.parse(localStorage.getItem('instructions')) || []
    this.ingredients = JSON.parse(localStorage.getItem('ingredients')) || []
    this.recipe = JSON.parse(localStorage.getItem('recipe')) || []
    this.newInstruction = JSON.parse(localStorage.getItem('newInstruction')) || []
    this.newIngredientName = JSON.parse(localStorage.getItem('newIngredientName')) || []
    this.newIngredientQuantity = JSON.parse(localStorage.getItem('newIngredientQuantity')) || []
  },
  methods: {
    ...mapActions(['createRecipe']),
    async create () {
      let vm = this
      // vm.body.thumbnail_url = 'http://~'
      // vm.body.video_url = 'http://~'
      localStorage.setItem('recipe', JSON.stringify(this.recipe))
      localStorage.setItem('newInstruction', JSON.stringify(this.newInstruction))
      localStorage.setItem('newIngredientName', JSON.stringify(this.newIngredientName))
      localStorage.setItem('newIngredientQuantity', JSON.stringify(this.newIngredientQuantity))

      try {
        await this.createRecipe({recipe: vm.recipe, instructions: vm.instructions, ingredients: vm.ingredients})
          .then(function (result) {
            localStorage.removeItem('instructions')
            localStorage.removeItem('ingredients')
            localStorage.removeItem('recipe')
            localStorage.removeItem('newInstruction')
            localStorage.removeItem('newIngredientName')
            localStorage.removeItem('newIngredientQuantity')
            vm.$nuxt.$router.replace({ path: '/' })
          })
      } catch (e) {
        this.formError = e.message
        console.log('Error')
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },
    async inputPushInstruction (instruction) {
      this.instructions.push({
        body: instruction
      })
      localStorage.setItem('instructions', JSON.stringify(this.instructions))
      // e.target.textContent = ''
      this.newInstruction = ''
    },
    async inputPushIngredient (name, quantity) {
      this.ingredients.push({
        name: name,
        quantity: quantity
      })
      localStorage.setItem('ingredients', JSON.stringify(this.ingredients))

      this.newIngredientName = ''
      this.newIngredientQuantity = ''
    },
    async removeInstrucion (instruction) {
      let index = this.instructions.indexOf(instruction)
      this.instructions.splice(index, 1)
      localStorage.setItem('instructions', JSON.stringify(this.instructions))
    },
    async removeIngredient (ingredient) {
      let index = this.ingredients.indexOf(ingredient)
      this.ingredients.splice(index, 1)
      localStorage.setItem('ingredients', JSON.stringify(this.ingredients))
    }
  }
}
</script>

<style scoped lang="scss">
.post {
  word-wrap: break-word;
  .container {
    margin-top: 1rem;
  }
  h1 {
    font-size: 2.1rem;
  }

  form {
    font-size: 1.0rem;
    letter-spacing: 2px;
    font-weight: 900;
    margin: 1rem 0 0 0;
    background: #fff;
    padding: 1rem 2rem;
    p {
      margin: 2rem 0 0 0.1rem;
    }
    input[type="text"],
    input[type="number"],
    textarea {
      width: 61%;
      float: right;
      margin: 0 0 0 .5rem;
      padding: .5rem .3rem;
      border-radius: 5px;
      appearance: none;
      -webkit-appearance: none;
    }
    textarea {

    }

    .instructions {
      // background: #efefef;
      margin: 4rem 0;
      border-top: 1px solid #111;
      .instruction-list {
        margin: 0 5rem;
        .instruction {
          background: #efefef;
          padding: 0.5rem 0.7rem;
          .sort_order {
            font-weight: 900;
          }
          .delete {
            cursor: pointer;
            float: right;
          }
        }
      }
      .instruction-form {
        width: 60%;
        margin: 2rem auto 0 !important;
        .input-area {
          display: block;
          padding: 0.5rem;
          border: 1px solid #111;
          border-radius: 3px;
          width: 100%;
          float: none;
          margin: 0 auto;
        }
      }
    }

    .ingredients {
      margin: 4rem 0;
      border-top: 1px solid #111;
      .ingredient-list {
        margin: 0 5rem;
        .ingredient {
          background: #efefef;
          padding: 0.5rem 0.7rem;
          .sort_order {
            font-weight: 900;
          }
          .delete {
            cursor: pointer;
            float: right;
          }
        }
      }
      .ingredient-form {
        width: 60%;
        margin: 2rem auto 0 !important;
        .name {
          margin: 1rem 0;
        }
        .quantity {
          margin: 1rem 0;
        }
        label {
          font-size: 1.2rem
        }
        .input-area {
          display: inline-block;
          padding: 0.5rem;
          border: 1px solid #111;
          border-radius: 3px;
          width: 60%;
          float: right;
          margin: 0 !important;
        }
      }
    }

    .create-btn {
      display: block;
      width: 200px;
      background: #fff;
      color: #33dd81;
      margin: 4rem auto 0;
      text-align: center;
      padding: .5rem;
      border: 1px solid #33dd81;
      border-radius: 3px;
    }
  }
}
</style>
