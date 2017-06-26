<template>
  <main>
    <div class="layout-padding">
      <div v-if="user" class="card">
        <div class="card-content">
          <div class="caption">Glue Properties</div>
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <input required v-model="eventName" placeholder="Name" style="flex-grow: 1">
            <label style="padding-left: 3em; padding-right: 3em">
              <q-toggle v-model="glueActive"></q-toggle>
              Active
            </label>
            <button type="button" class="raised primary" @click="save()">
              Save
            </button>
          </div>
          <br>
          <div class="caption">Input</div>
          <div style="display: flex; align-items: baseline;">
            <q-select type="list" v-model="eventType" :options="eventTypes" placeholder="Protocol" style="margin-right: 1.5em;"></q-select>
            <span style="font-family: monospace">{{targetProtocol}}webglue.now.sh/{{shortHash}}/</span>
            <input required v-model="eventLabel" placeholder="Choose Name Here">
          </div>
          <br>
          <div class="caption">Transform</div>
          <div class="floating-label">
            <textarea required v-model="glueTemplate" style="font-family: monospace; width: 100%" rows="5"></textarea>
            <label>Template</label>
          </div>
          <br>
          <br>
          <div class="caption">Output</div>
          <q-select type="list" v-model="signalType" :options="signalTypes" style="margin-right: 3em;" placeholder="Protocol"></q-select>
          <q-select type="list" v-model="targetDevice" :options="devices" style="margin-right: 3em;"></q-select>
          <div class="floating-label">
            <input required v-model="eventRename" class="auto">
            <label>Name</label>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Hashids from 'hashids'
import hashstring from 'hash-string'
const hashids = new Hashids()
const hash = (uid, name) => hashids.encode(hashstring(uid + name))

export default {
  data () {
    return {
      eventType: null,
      eventLabel: '',
      glueTemplate: '',
      glueActive: false,
      eventName: '',
      eventRename: '',
      signalType: null,
      targetDevice: '',
      devices: []
    }
  },
  methods: {
    ...mapActions(['deleteAccount'])
  },
  computed: {
    ...mapGetters([
      'user',
      'isAuthenticated',
      'eventTypes',
      'signalTypes'
    ]),
    targetProtocol () {
      if (this.eventType === 'Webhook') {
        return 'https://'
      }
      else if (this.eventType === 'Socket.io') {
        return 'wss://'
      }
      else {
        return ''
      }
    },
    shortHash () {
      return hash(this.user.uid + this.eventLabel)
    },
    fullTarget () {
      return `${this.targetProtocol}webglue.now.sh/${this.user && this.user.uid}/${this.eventLabel}`
    }
  }
}
</script>

<style>
.layout-padding {
  position: relative;
  height: 100%;
}
.layout-padding button.circular.primary {
  position: absolute;
  right: 1.5rem;
  bottom: 2rem;
}
</style>
