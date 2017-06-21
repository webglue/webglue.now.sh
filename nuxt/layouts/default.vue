<template>
  <section class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Navbar></Navbar>
    <SideDrawer></SideDrawer>
    <nuxt/>
    <script src="/material-design-lite/material.min.js"></script>
  </section>
</template>

<!-- <style src="~static/material-design-lite/material.min.css"></style> -->

<script>
import Navbar from '~components/Navbar.vue'
import SideDrawer from '~components/SideDrawer.vue'
import firebaseapp from '~/utils/firebaseapp'
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: '/material-design-lite/material.min.css' }
    ]
  },
  components: {
    Navbar,
    SideDrawer
  },
  mounted () {
    firebaseapp.messaging().onTokenRefresh(() => this.getToken())
    firebaseapp.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this), console.log)
  },
  methods: {
    pageTitle () {
      return global.title
    },
    getToken () {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      firebaseapp.messaging().getToken()
      .then((currentToken) => {
        if (currentToken) {
          //  sendTokenToServer(currentToken)
          //  updateUIForPushEnabled(currentToken)
          console.log('currentToken =', currentToken)
          this.deviceToken = currentToken
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.')
          // Show permission UI.
          //  updateUIForPushPermissionRequired()
          //  setTokenSentToServer(false)
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        //  showToken('Error retrieving Instance ID token. ', err)
        //  setTokenSentToServer(false)
      })
    },
    requestPermission () {
      firebaseapp.messaging().requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        this.getToken()
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    },
    onAuthStateChanged (user) {
      if (user) {
        console.log(user) // Vue.set(this, 'user', user)
        this.$store.commit('SET_USER', user)
      } else {
        this.$store.commit('SET_USER', null)
      }
    }
  }
}
</script>
