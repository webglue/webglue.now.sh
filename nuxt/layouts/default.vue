<template>
  <div>
    <nuxt/>
    <Virebase></Virebase>
    <script src="/material-design-lite/material.min.js"></script>
  </div>
</template>

<style src="~static/material-design-lite/material.min.css"></style>

<script>
import Virebase from '~components/Virebase.vue'
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  components: {
    Virebase
  }
}
</script>
