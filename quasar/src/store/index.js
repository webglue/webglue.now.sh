import Vue from 'vue'
import Vuex from 'vuex'
import firebaseAdaptor from './plugins/firebase'
import firebase from 'firebase'
import alert from '../utils/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    firebaseAdaptor
  ],
  state: {
    user: null,
    events: []
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user || null
    },
    SET_DEVICE_TOKEN (state, token) {
      state.deviceToken = token || null
    },
    RECEIVED_PUSH_MESSAGE (state, payload) {
      state.events.unshift({
        arrived: Date.now(),
        sentVia: '?',
        origin: payload.from,
        receivedVia: 'Push',
        summary: payload.notification.title,
        payload
      })
    },
    RECEIVED_WEBSOCKET_MESSAGE (state, msg) {
      state.events.unshift({
        arrived: Date.now(),
        sentVia: msg.method,
        origin: msg.origin,
        receivedVia: 'WebSocket',
        summary: msg.event,
        payload: msg.payload
      })
    }
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user
    },
    user (state) {
      return state.user
    },
    deviceToken (state) {
      return state.deviceToken
    },
    events (state) {
      return state.events
    }
  },
  actions: {
    requestNotificationPermission (context) {
      firebase.messaging().requestPermission()
      .then(() => {
        console.log('Notification permission granted.')
        firebase.messaging().getToken()
        .then((currentToken) => {
          if (currentToken) {
            context.commit('SET_DEVICE_TOKEN', currentToken)
          }
        })
        .catch((err) => {
          console.log('You just lost a bet with yourself that this error never happens.', err)
        })
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err)
      })
    },
    signOut (context) {
      return firebase.auth().signOut().then(() => {
        context.commit('SET_USER', null)
      })
    },
    deleteAccount (context) {
      let providerId = firebase.auth().currentUser.providerData[0].providerId
      console.log('providerId =', providerId)
      firebase.auth().currentUser.unlink(providerId)
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          firebase.auth().signOut().then(() => {
            alert('Please sign in again to verify you are authorized to delete this account.')
          })
        }
        else {
          console.log(error.code)
        }
      })
      .then(() => firebase.auth().currentUser.delete())
      .catch((error) => {
        if (error.code === 'auth/requires-recent-login') {
          firebase.auth().signOut().then(() => {
            alert('Please sign in again to verify you are authorized to delete this account.')
          })
        }
        else {
          console.log(error.code)
        }
      })
    }
  }
})
