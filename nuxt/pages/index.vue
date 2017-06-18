<template>
  <section class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Navbar></Navbar>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Log In</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div v-show="active_page == 'login'" id="login">
        <div id="firebaseui-auth-container"></div>
      </div>
      <div v-show="active_page == 'live-event-log'" id="live-event-log">
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
        <virebase ref="virebase"
        api-key="AIzaSyBZVuEpoZJJhaE9xfHSs6hgCUs3FVXx03E"
        auth-domain="web-glue.firebaseapp.com"
        database-url="https://web-glue.firebaseio.com"
        project-id="web-glue"
        storage-bucket="web-glue.appspot.com"
        messaging-sender-id="555685705898"
        ></virebase>
      </div>
    </main>
  </section>
</template>

<script>
import Logo from '~components/Logo.vue'
import Navbar from '~components/Navbar.vue'

export default {
  head: {
    title: 'Live Event Log'
  },
  components: {
    Logo,
    Navbar
  }
}
</script>
