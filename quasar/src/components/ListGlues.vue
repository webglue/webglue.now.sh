<template>
  <main>
    <div class="layout-padding">
      <button class="circular primary" @click="newGlue">
        <i>add</i>
      </button>

      <table class="q-table bordered horizontal-delimiter striped-odd light-paragraph">
        <thead>
          <tr>
            <th class="text-left">Input</th>
            <th class="text-left">Output</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="glue of glues">
            <td class="text-left">{{event.sentVia}}</td>
            <td class="text-left">{{event.origin}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'
import firebase from 'firebase'
export default {
  mounted () {
    this.socket = io('https://webglue.now.sh')
    // How to listen to all events
    this.socket.on('*', (msg) => {
      this.$store.commit('RECEIVED_WEBSOCKET_MESSAGE', msg)
    })
    // How to listen to a specific event
    this.socket.on('alert', function (msg) {
      alert(JSON.stringify(msg))
    })
  },
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    sendMeAPush () {
      firebase.messaging().getToken()
      .then((token) => {
        if (token) {
          this.socket.emit('send-me-a-push', {deviceToken: token})
        }
        else {
          this.$store.dispatch('requestNotificationPermission')
        }
      })
      .catch((err) => {
        console.log('err =', err)
      })
    }
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
