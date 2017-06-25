<template>
  <q-layout>
    <div slot="header" class="toolbar">

      <q-toolbar-title :padding="0">
        Webglue
      </q-toolbar-title>

      <button
        class="hide-on-drawer-visible"
        @click="$refs.drawer.open()"
      >
        <i>menu</i>
      </button>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <router-view class="layout-view">
    </router-view>

    <q-drawer ref="drawer" right-side>

      <div class="toolbar light">
        <q-toolbar-title :padding="1">
            Drawer
        </q-toolbar-title>
      </div>
      <div class="list no-border platform-delimiter">
        <q-drawer-link v-if="!isAuthenticated" icon="account_circle" to="/login">Sign In</q-drawer-link>
        <q-drawer-link v-if="isAuthenticated" icon="account_circle" to="/account">Edit Account</q-drawer-link>
        <q-drawer-link v-if="isAuthenticated" icon="edit" to="/glues">Edit Glues</q-drawer-link>
        <q-drawer-link icon="speaker_notes" to="/livelog">Live Event Log</q-drawer-link>
        <q-drawer-link v-if="isAuthenticated" icon="exit_to_app" to="/logout">Sign Out</q-drawer-link>
      </div>
   </q-drawer>
  </q-layout>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>
