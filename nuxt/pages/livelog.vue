<template>
  <main class="mdl-layout__content">
    <div id="live-event-log">
      <!-- Your content goes here -->
      <!-- Accent-colored raised button with ripple -->
      <button id="send-me-a-push" type="button" @click="sendMeAPush" style="position: absolute; right: 50px; bottom: 50px;" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
        <i class="material-icons" style="color: white">backup</i>
      </button>
      <div class="mdl-tooltip mdl-tooltip--top" data-mdl-for="send-me-a-push">
        Send Me a Push
      </div>
      <table style="margin: 2vw; width: 96vw" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Arrived At</th>
            <th class="mdl-data-table__cell--non-numeric">Method</th>
            <th class="mdl-data-table__cell--non-numeric">Origin</th>
            <th class="mdl-data-table__cell--non-numeric">Payload</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event of events">
            <td class="mdl-data-table__cell--non-numeric">{{(new Date(event.arrived)).toLocaleString()}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{event.method}}</td>
            <td class="mdl-data-table__cell--non-numeric">{{event.origin}}</td>
            <td class="mdl-data-table__cell--non-numeric">
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
import io from 'socket.io-client'
import firebase from '~/utils/firebaseapp'

export default {
  components: {
  },
  data () {
    return {
      events: []
    }
  },
  mounted () {
    this.socket = io('https://webglue.now.sh')
    // How to listen to all events
    this.socket.on('*', (msg) => {
      this.events.unshift({method: msg.method, origin: msg.origin, summary: msg.event, payload: msg.payload, arrived: Date.now()})
    })
    // How to listen to a specific event
    this.socket.on('alert', function (msg) {
      alert(JSON.stringify(msg))
    })
    // How to listen to Push Message events on live page
    firebase.messaging().onMessage((payload) => {
      console.log('payload =', payload)
      this.events.unshift({method: 'Push Message', origin: payload.from, summary: payload.notification.title, payload, arrived: Date.now()})
    })
  },
  methods: {
    sendMeAPush () {
      firebase.messaging().getToken()
      .then((token) => {
        if (token) {
          this.socket.emit('send-me-a-push', {deviceToken: token})
        } else {
          firebase.messaging().requestPermission()
        }
      })
      .catch((err) => {
        console.log('err =', err)
      })
    }
  }
}
</script>
