import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [{
        path: '/',
        component: load('About')
      }, {
        path: '/livelog',
        component: load('LiveLog')
      }, {
        path: '/account',
        component: load('Account')
      }, {
        path: '/login',
        component: load('Login')
      }, {
        path: '/logout',
        component: load('Logout')
      }, {
        path: '/glues',
        component: load('ListGlues')
      }, {
        path: '/edit',
        component: load('EditGlue')
      }, {
        path: '/*',
        component: load('Error404')
      }]
    },
    {
      path: '*',
      component: load('Error404')
    }
  ]
})
