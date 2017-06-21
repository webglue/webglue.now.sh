<template>
  <main class="mdl-layout__content">
    <p>Click a link above.</p>
  </main>
</template>

<script>
import Navbar from '~components/Navbar.vue'
import SideDrawer from '~components/SideDrawer.vue'

export default {
  head: {
    title: 'Live Event Log'
  },
  components: {
    Navbar,
    SideDrawer
  }
}
</script>
