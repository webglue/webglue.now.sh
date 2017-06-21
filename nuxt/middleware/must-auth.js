import firebase from 'firebase'
export default function ({ isServer, store, req, redirect }) {
  // Don't run this middleware on the server
  if (isServer) {
    // TODO: check cookie
    return
  } else {
    console.log('firebase.auth().currentUser =', firebase.auth().currentUser)
    if (firebase.auth().currentUser === null) return redirect('/login')
  }
}
