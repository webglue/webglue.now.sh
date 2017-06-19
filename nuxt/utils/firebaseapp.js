import firebase from 'firebase'
import config from '~/config.json'
let firebaseapp
try {
  firebaseapp = firebase.app()
} catch (e) {
  firebaseapp = firebase.initializeApp(config.firebase)
}
export default firebaseapp
