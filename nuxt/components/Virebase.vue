<template>
  <span></span>
</template>

<script>
import Vue from 'vue'
// import firebase from 'firebase'
// import firebaseui from 'firebaseui'
// import config from '~/config.json'
export default {
  data () {
    return {
      messaging: null,
      deviceToken: null,
      signedIn: false,
      user: null
    }
  },
  mounted () {
    // Initialize Firebase
    const firebase = require('firebase')
    const firebaseui = require('firebaseui')
    const config = require('~/config.json')
    firebase.initializeApp(config)
    // Retrieve Firebase Messaging object.
    this.messaging = firebase.messaging()
    // Callback fired if Instance ID token is updated.
    this.messaging.onTokenRefresh(() => this.getToken())
    // Initialize the FirebaseUI Widget
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())
    this.ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: 'https://webglue.now.sh',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: 'https://webglue.now.sh'
    })
    // Handle auth callback
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Vue.set(this, 'user', user)
      } else {
        this.user = null
      }
    }, console.log)
  },
  methods: {
    requestPermission () {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        this.getToken()
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    },
    getToken () {
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      this.messaging.getToken()
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
    }
  }
}
</script>
