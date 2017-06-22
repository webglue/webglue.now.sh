<template>
  <main class="mdl-layout__content">
    <form action="#" class="mdl-grid">
      <div class="mdl-cell mdl-cell--4-col">
        <div id="glueSelectType" style="position:relative">
          <div class="mdl-textfield mdl-textfield--floating-label is-dirty">
            <input class="mdl-textfield__input" type="text" id="glueSelectTextType" readonly :value="type">
            <label class="mdl-textfield__label" for="glueSelectTextType">Event Type</label>
          </div>
          <div class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="glueSelectType">
            <li @click="type = 'Webhook'" class="mdl-menu__item">Webhook</li>
            <li @click="type = 'Socket.io'" class="mdl-menu__item">Socket.io</li>
          </ul>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="glueInputText" pattern="[A-Z,a-z,0-9]{1,1024}" v-model="target">
          <label class="mdl-textfield__label" for="glueInputText">Label</label>
          <span class="mdl-textfield__error">Only 1-1024 alphanumeric characters</span>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="glueTransformText">
          <label class="mdl-textfield__label" for="glueTransformText">Transform Template</label>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="glueOutputText">
          <label class="mdl-textfield__label" for="glueOutputText">Output Event</label>
        </div>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="glueActiveSwitch">
          <input type="checkbox" id="glueActiveSwitch" class="mdl-switch__input" checked>
          <span class="mdl-switch__label">active?</span>
        </label>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <button type="button" @click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Save
        </button>
      </div>

      <div class="mdl-cell mdl-cell--4-col">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" id="glueResult" readonly :value="fullTarget">
          <label class="mdl-textfield__label" for="glueResult">Target Path</label>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Manage Account'
  },
  middleware: [
    'must-auth'
  ],
  data () {
    return {
      type: 'Webhook',
      target: ''
    }
  },
  mounted () {
    window.componentHandler.upgradeDom() // For MDL
  },
  components: {
  },
  methods: {
    editGlue () {
      console.log('edit glue?')
    },
    setTarget (event) {
      console.log(event.target.value)
    }
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
    targetProtocol () {
      if (this.type === 'Webhook') {
        return 'https://'
      } else if (this.type === 'Socket.io') {
        return 'wss://'
      }
    },
    fullTarget () {
      return `${this.targetProtocol}webglue.now.sh/${this.user && this.user.uid}/${this.target}`
    }
  }
}
</script>
