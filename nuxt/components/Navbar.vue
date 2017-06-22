<template>
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">
        {{title}}
      </span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation">
        <nuxt-link to="/account" class="mdl-navigation__link">
          Edit Account
        </nuxt-link>
        <nuxt-link to="/glues" class="mdl-navigation__link">
          Edit Glues
        </nuxt-link>
        <nuxt-link to="/livelog" class="mdl-navigation__link">
          Live Event Log
        </nuxt-link>
        <nuxt-link style="color: white" to="/login" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Log In
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
import routeName from '~/utils/routeName'
export default {
  computed: {
    title () {
      return routeName[this.$route.name]
    }
  }
}
</script>
