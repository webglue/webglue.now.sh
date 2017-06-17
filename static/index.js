var Virebase = Vue.extend({
  data () {
    return {
      messaging: null,
      deviceToken: null,
      signedIn: false,
      user: null
    }
  },
  template: '<span></span>',
  props: [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId'
  ],
  mounted () {
    // Initialize Firebase
    firebase.initializeApp(this.$props)
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
      .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err)
        //  showToken('Error retrieving Instance ID token. ', err)
        //  setTokenSentToServer(false)
      })
    }
  }
})

var app = new Vue({
  el: '#app',
  components: {
    'virebase': Virebase
  },
  data: {
    events: [],
    deviceToken: '',
    active_page: 'login',
  },
  created () {
    this.socket = io()
    // How to listen to all events
    this.socket.on('*', (msg) => {
      this.events.unshift({method: msg.method, origin: msg.origin, summary: msg.event, payload: msg.payload, arrived: Date.now()})
    })
    // How to listen to a specific event
    this.socket.on('alert', function (msg) {
      alert(JSON.stringify(msg))
    })
  },
  mounted () {
    this.$refs.virebase.messaging.onMessage((payload) => {
      console.log('payload =', payload)
      this.events.unshift({method: 'Push Message', origin: payload.from, summary: payload.notification.title, payload, arrived: Date.now()})
    })
  },
  methods: {
    sendMeAPush () {
      this.$refs.virebase.messaging.getToken()
      .then((token) => {
        if (token) {
          this.socket.emit('send-me-a-push', {deviceToken: token})
        } else {
          this.$refs.virebase.messaging.requestPermission()
        }
      })
      .catch((err) => {
        console.log('err =', err)
      })
    }
  }
})
