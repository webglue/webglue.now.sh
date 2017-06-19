<template>
  <div>
    <nuxt/>
    <script src="/material-design-lite/material.min.js"></script>
  </div>
</template>

<style src="~static/material-design-lite/material.min.css"></style>

<script>
import firebase from 'firebase'
import config from '~/config.json'
export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  components: {
  },
  mounted () {
    firebase.initializeApp(config.firebase)
    firebase.messaging().onTokenRefresh(() => this.getToken())
  },
  methods: {
    getToken () {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      firebase.messaging().getToken()
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
      firebase.messaging().requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        this.getToken()
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    }
  }
}
</script>
