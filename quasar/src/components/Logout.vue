<template>
  <div>
    <div class="layout-padding">
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('signOut')
    .then(() => {
      this.$router.push('/')
    })
  }
}
</script>
