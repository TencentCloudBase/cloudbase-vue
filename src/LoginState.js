export default {
  props: {
    tag: String
  },
  data() {
    return {
      loginState: null,
      loading: true
    }
  },
  async created() {
    const loginState = await this.$cloudbase.auth().getLoginState()
    this.loginState = loginState || null
    this.loading = false
    this.$cloudbase.auth().onLoginStateChanged((loginState) => {
      this.loginState = loginState || null
    })
  },
  render(h) {
    let result = this.$scopedSlots.default({
      loginState: this.loginState,
      loading: this.loading,
    });
    if (Array.isArray(result)) {
      return h(this.tag || 'div', result)
    } else {
      return result
    }
  },
};