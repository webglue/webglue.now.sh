import { Dialog } from 'quasar'

export default function alert (msg) {
  Dialog.create({
    message: msg
  })
}
