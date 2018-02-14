<template>
  <div id="app">
    <header id="header">
      <div class="container">
        <h1><a href="/">Gourmet</a></h1>

        <nav id="nav">
          <ul>
            <!-- <router-link tag="li" to="/" exact><a>home</a></router-link> -->
            <router-link tag="li" to="/posts">
              <a class="post-btn" href="#">投稿する</a>
            </router-link>
            <router-link v-if="loggedIn()" tag="li" to="/mypage"><a>mypage</a></router-link>
            <router-link v-else tag="li" to="/login"><a>login</a></router-link>
          </ul>
        </nav>
      </div>
    </header>

    <nuxt></nuxt>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    loggedIn: function () {
      // return localStorage.getItem('access_token')
    }
  }
}
</script>

<style lang="scss">
@charset "utf-8";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  // margin-top: 60px;
}

html, body {
  width: 100%;
  height: 100%;
  font-size: 100%;
  background: #f7f9f9;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-overflow-scrolling: touch;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: #111;
}

.container {
  width: 1100px;
  position: relative;
  margin: 0 auto;
}

.thumb {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    /*overflow: hidden;*/
    position: relative;
    top: 0;
    left: 0;
    display: block;
    min-width: 100%;
    min-height: 100%;
    max-width: inherit;
  }
}

.black {
  a {
    color: #111;
  }
}

.active {
  background: #8dccdc;
  color: #fff;
}

#header {
  position: relative;
  background: #e6713f;
  color: #fff;
  padding: 0.5rem 0.5rem 0.5rem 0;
  text-align: left;
  box-shadow: 0 0 1px 0 #777;
  h1 {
    // position: relative;
    margin: 0 auto;
    vertical-align: middle;
    height: 100%;
    a {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      text-decoration: none;
      font-size: 1.5rem;
      color: #fff;
    }
  }
  #nav {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    // padding: 2px 0 0;
    vertical-align: middle;
    ul {
      margin: 0.45rem 0 0 0;
      li {
        display: inline-block;
        margin: 0 0.7rem;
        font-size: 0.9rem;
        .post-btn {
          padding: .5rem .75rem;
          background: #f3A054;
          border-radius: 3px;
          font-size: 0.75rem;
          font-weight: 900;
        }
        a {
          color: #fff;
        }
      }
    }
  }
}

</style>
