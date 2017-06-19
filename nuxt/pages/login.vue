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

export default {
  head: {
    title: 'Log in or Sign up'
  },
  components: {
  },
  mounted () {
    if (this.$root.ui) {
      this.$root.ui.reset()
    } else {
      let firebaseui = require('firebaseui')
      this.$root.ui = new firebaseui.auth.AuthUI(firebaseapp.auth())
    }
    // Initialize the Auth Firebase UI
    this.$root.ui.start('#firebaseui-auth-container', {
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
  },
  beforeDestroy () {
    if (this.$root.ui) {
      this.$root.ui.reset()
    }
  }
}
</script>
