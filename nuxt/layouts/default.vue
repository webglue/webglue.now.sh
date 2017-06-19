<template>
  <div>
    <nuxt/>
    <script src="/material-design-lite/material.min.js"></script>
  </div>
</template>

<style src="~static/material-design-lite/material.min.css"></style>

<script>
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  components: {
  }
}
</script>
