<template>
  <main>
    <div class="layout-padding">
      <button class="circular primary" @click="sendMeAPush">
        <i>backup</i>
        <q-tooltip>Send me a Push</q-tooltip>
      </button>

      <table class="q-table bordered horizontal-delimiter striped-odd light-paragraph" style="width: 100%">
        <thead>
          <tr>
            <th class="text-left">Arrived At</th>
            <th class="text-left">Sent Via</th>
            <th class="text-left">Origin</th>
            <th class="text-left">Received Via</th>
            <th class="text-left">Payload</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event of events">
            <td class="text-left">{{(new Date(event.arrived)).toLocaleString()}}</td>
            <td class="text-left">{{event.sentVia}}</td>
            <td class="text-left">{{event.origin}}</td>
            <td class="text-left">{{event.receivedVia}}</td>
            <td class="text-left">
              <details>
                <summary>{{event.summary}}</summary>
                <code>
                  <pre>{{JSON.stringify(event.payload, null, 2)}}</pre>
                </code>
              </details>
            </td>
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
