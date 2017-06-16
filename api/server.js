var http = require('http')
var express = require('express')
var bodyparser = require('body-parser')
var socketio = require('socket.io')

// Set up templates (experimental - eventually this will be configured per person, per event, saved in Firebase)
const st = require('./stupid-template')
var templates = {
  'build-status': st(`{{commit_status.repository.name}} {{commit_status.name}} {{commit_status.type}} {{commit_status.state}}`)
}

var app = express()
var server = http.createServer(app)
var io = socketio(server)

// For simplicity, we only bother to support JSON payloads
app.use(bodyparser.json())
app.use(function (req, res, next) {
  if (req.method === 'POST') {
    if (req.header('content-type') && req.header('content-type') !== 'application/json') {
      return res.status(400).json({error: true, message: 'Only the application/json content-type is supported'})
    }
  }
  next()
})

// Host a small webpage (for demonstration / debugging / testing)
// TODO: disable this in production
if (process.env.NOW === undefined) {
  app.use(express.static(__dirname + '/../static'))
}

// Forward POST requests to websocket listeners
app.post('/:event(*)', function (req, res) {
  // TODO: Be selective about which listeners
  let event = {
    event: req.params.event,
    method: 'POST',
    origin: req.headers.origin || req.headers.referer,
    payload: (req.params.event in templates) ? templates[req.params.event](req.body) : req.body
  }
  io.emit(req.params.event, event) // for subscribers
  io.emit('*', event) // for general logging everything
  res.status(200).json({success: true, message: 'Sent', clientsCount: io.engine.clientsCount})
})

// Catchall
app.use('*', function (req, res) {
  return res.status(400).json({error: true, message: "What on earth are you doing?", url: req.originalUrl, method: req.method})
})

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
          icon: 'https://webglue.now.sh/webglue.png',
          body: `You asked for a push notification at ${(new Date).toLocaleString()}`,
          clickAction: 'https://webglue.now.sh',
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


// Listen on PORT environment variable
server.listen(process.env.PORT || 80, function () {
  console.log('server started')
})
