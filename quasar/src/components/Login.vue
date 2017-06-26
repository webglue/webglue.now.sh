<template>
  <main>
    <div class="layout-padding">
      <div id="firebaseui-auth-container"></div>
    </div>
  </main>
</template>

<style src="firebaseui/dist/firebaseui.css"></style>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { mapGetters } from 'vuex'
let authui
export default {
  data () {
    return {
      events: []
    }
  },
  mounted () {
    if (authui) {
      authui.reset()
    }
    else {
      authui = new firebaseui.auth.AuthUI(firebase.auth())
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
  },
  methods: {
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated'])
  }
}
</script>

<style>
.layout-padding {
  position: relative;
  height: 100%;
}
.layout-padding button.circular.primary {
  position: absolute;
  right: 1.5rem;
  bottom: 2rem;
}
</style>
