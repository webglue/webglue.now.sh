<template>
  <main>
    <div class="layout-padding">
      <table v-if="user" class="q-table bordered horizontal-delimiter striped-odd light-paragraph">
        <thead>
          <tr>
            <th class="text-left">Profile Pic</th>
            <th class="text-left">Display Name</th>
            <th class="text-left">Unique ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">
              <img :src="user.photoURL" height="25"></img>
            </td>
            <td class="text-left">{{user.displayName}}</td>
            <td class="text-left">{{user.uid}}</td>
          </tr>
          <tr>
            <td class="text-right" colspan="3">
              <button @click="deleteAccount()" class="raised negative">
                Delete Account <i>delete_forever</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      events: []
    }
  },
  methods: {
    ...mapActions(['deleteAccount'])
  },
  computed: {
    ...mapGetters(['user', 'isAuthenticated'])
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
