<template>
  <main>
    <div class="layout-padding">
    </div>
  </main>
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
