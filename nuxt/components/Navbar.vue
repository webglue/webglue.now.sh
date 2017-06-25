<template>
  <div>
    <ui-toolbar :brand="title" remove-brand-divider text-color="white" type="colored" :raised="false">
      <div slot="actions">
        <ui-icon-button color="white" icon="search" size="large" type="secondary"></ui-icon-button>
        <ui-icon-button color="white" has-dropdown icon="more_vert" ref="dropdownButton8" size="large" type="secondary">
          <ui-menu contain-focus has-icons slot="dropdown" @select="menuSelect" :options="menuOptions" @close="$refs.dropdownButton8.closeDropdown()"></ui-menu>
        </ui-icon-button>
      </div>
    </ui-toolbar>
    <!-- <ui-tabs background-color="primary" fullwidth indicator-color="white" text-color-active="white" text-color="white" type="text">
      <ui-tab title="Edit Account" icon="book" @click="$router.push('account')"></ui-tab>

      <ui-tab title="Edit Glues" icon="collections_bookmark" @click="$router.push('glues')">
      </ui-tab>

      <ui-tab title="Live Event Log" icon="favorite" @click="$router.push('livelog')">
      </ui-tab>

      <ui-tab title="Log In" icon="favorite" @click="$router.push('login')">
      </ui-tab>
    </ui-tabs> -->
  </div>
</template>

<script>
// import { UiToolbar, UiIconButton, UiMenu } from 'keen-ui'
import routeName from '~/utils/routeName'
export default {
  data () {
    return {
      menuOptions: [
        { label: 'Edit Account', page: '/account' },
        { label: 'Edit Glues', page: '/glues' },
        { label: 'Live Event Log', page: '/livelog' },
        { label: 'Log In', page: '/login' }
      ]
    }
  },
  // components: {
  //   UiToolbar,
  //   UiIconButton,
  //   UiMenu
  // },
  computed: {
    title () {
      return routeName[this.$route.name]
    }
  },
  methods: {
    menuSelect (option) {
      console.log('option =', option.page)
      this.$router.push(option.page)
    }
  }
}
</script>
