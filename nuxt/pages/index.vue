<template>
  <section class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Navbar></Navbar>
    <SideDrawer></SideDrawer>
    <main class="mdl-layout__content">
      <p>Click a link above.</p>
    </main>
  </section>
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
