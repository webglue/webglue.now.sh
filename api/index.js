const micro = require('micro')
const socketio = require('socket.io')

// Set up templates (experimental - eventually this will be configured per person, per event, saved in Firebase)
const st = require('./stupid-template')
var templates = {
  'build-status': st(`{{commit_status.repository.name}} {{commit_status.name}} {{commit_status.type}} {{commit_status.state}}`)
}

// Forward POST requests to websocket listeners
let server = micro(async (req, res) => {
  const body = await micro.json(req)
  // TODO: Be selective about which listeners
  if (req.path in templates) {
    io.emit(req.path, templates[req.path](body))
  } else {
    io.emit(req.path, body) // for subscribers
  }
  io.emit('*', [req.path, body]) // for general logging everything
  return {success: true, message: 'Sent', clientsCount: io.engine.clientsCount}
})

var io = socketio(server)

// Feedback to send test web push notification
const admin = require('firebase-admin')
// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": process.env.TYPE,
//     "project_id": process.env.PROJECT_ID,
//     "private_key_id": process.env.PRIVATE_KEY_ID,
//     "private_key": process.env.PRIVATE_KEY,
//     "client_email": process.env.CLIENT_EMAIL,
//     "client_id": process.env.CLIENT_ID,
//     "auth_uri": process.env.AUTH_URI,
//     "token_uri": process.env.TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
//     "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
//   }),
//   databaseURL: 'https://web-glue.firebaseio.com'
// })
admin.initializeApp({
  credential: admin.credential.cert(require('./.serviceAccount.json')),
  databaseURL: 'https://web-glue.firebaseio.com'
})
io.on('connection', (socket) => {
  socket.on('send-me-a-push', (data) => {
    setTimeout(() => {
      let payload = {
        notification: {
          title: 'send-me-a-push',
          icon: 'https://swordfish-bitbucket-webhooks.now.sh/webglue.png',
          body: `You asked for a push notification at ${(new Date).toLocaleString()}`,
          clickAction: 'https://swordfish-bitbucket-webhooks.now.sh',
          tag: 'send-me-a-push'
        }
      }
      admin.messaging().sendToDevice(data.deviceToken, payload)
      .then((response) => {
        socket.emit('MessagingDevicesResponse', response)
      })
      .catch((err) => {
        socket.emit('error', err)
      })
    }, 5000)
  })
})

server.listen(8080)

