export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  user (state) {
    return state.user
  }
}
