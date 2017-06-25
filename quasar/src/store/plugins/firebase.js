import firebase from 'firebase'
import config from 'assets/config.json'
firebase.initializeApp(config.firebase)

export default function (store) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user) // Vue.set(this, 'user', user)
      store.commit('SET_USER', user)
    }
    else {
      store.commit('SET_USER', null)
    }
  })

  firebase.messaging().onTokenRefresh(() => {
    firebase.messaging().getToken()
    .then((currentToken) => {
      if (currentToken) {
        //  sendTokenToServer(currentToken)
        //  updateUIForPushEnabled(currentToken)
        console.log('currentToken =', currentToken)
        store.commit('SET_DEVICE_TOKEN', currentToken)
      }
      else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.')
        // TODO: set deviceTokenExpired or something?
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
  })

  // How to listen to Push Message events on live page
  firebase.messaging().onMessage((payload) => {
    store.commit('RECEIVED_PUSH_MESSAGE', payload)
  })
}
