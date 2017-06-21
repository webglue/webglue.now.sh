<template>
  <main class="mdl-layout__content">
    <div id="firebaseui-auth-container"></div>
  </main>
</template>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>

<script>
import firebase from 'firebase'
import firebaseapp from '~/utils/firebaseapp.js'
// import firebaseui from 'firebaseui'
let authui

export default {
  head: {
    title: 'Log in or Sign up'
  },
  components: {
  },
  mounted () {
    if (authui) {
      authui.reset()
    } else {
      let firebaseui = require('firebaseui')
      authui = new firebaseui.auth.AuthUI(firebaseapp.auth())
    }
    // Initialize the Auth Firebase UI
    authui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/account',
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
  },
  beforeDestroy () {
    if (authui) {
      authui.reset()
    }
  }
}
</script>
