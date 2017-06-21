<template>
  <main class="mdl-layout__content">
    <table v-if="isAuthenticated" style="margin: 2vw; max-width: 96vw" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Profile Pic</th>
          <th class="mdl-data-table__cell--non-numeric">Display Name</th>
          <th class="mdl-data-table__cell--non-numeric">Unique ID</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="mdl-data-table__cell--non-numeric">
            <img :src="user.photoURL" height="25"></img>
          </td>
          <td class="mdl-data-table__cell--non-numeric">{{user.displayName}}</td>
          <td class="mdl-data-table__cell--non-numeric">{{user.uid}}</td>
        </tr>
        <tr>
          <td colspan="2" class="mdl-data-table__cell--non-numeric">
            <button @click="signOut()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              Sign Out
            </button>
          </td>
          <td>
            <button @click="deleteAccount()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Delete Account <i class="material-icons">delete_forever</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  head: {
    title: 'Manage Account'
  },
  middleware: [
    'must-auth'
  ],
  components: {
  },
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('SET_USER', null)
        this.$router.push('/')
      })
    },
    deleteAccount () {
      // Reauthenticate in case we need so for the delete() step, but can't
      // because we already unlinked the account.
      let providerId = firebase.auth().currentUser.providerData[0].providerId
      console.log('providerId =', providerId)
      // firebase.auth().currentUser.reauthenticateWithRedirect(firebase.auth().currentUser.providerData[0])
      // .then(() => firebase.auth().currentUser.unlink(providerId))
      firebase.auth().currentUser.unlink(providerId)
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          firebase.auth().signOut().then(() => {
            alert('Please sign in again to verify you are authorized to delete this account.')
          })
        } else {
          console.log(error.code)
        }
      })
      .then(() => firebase.auth().currentUser.delete())
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          firebase.auth().signOut().then(() => {
            alert('Please sign in again to verify you are authorized to delete this account.')
          })
        } else {
          console.log(error.code)
        }
      })
      .then(() => {
        this.$store.commit('SET_USER', null)
        this.$router.push('/')
      })
    }
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated'])
  }
}
</script>
