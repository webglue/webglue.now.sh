<template>
  <section class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Navbar></Navbar>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Log In</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div id="firebaseui-auth-container"></div>
    </main>
  </section>
</template>

<script>
import Navbar from '~components/Navbar.vue'

export default {
  head: {
    title: 'Log in or Sign up'
  },
  components: {
    Navbar
  }
}
</script>
