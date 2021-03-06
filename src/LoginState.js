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
    this.$cloudbase.on('loginStateChanged', this.onLoginStateChanged)
  },
  beforeDestroy() {
    this.$cloudbase.off('loginStateChanged', this.onLoginStateChanged)
  },
  methods: {
    async onLoginStateChanged() {
      const loginState = await this.$cloudbase.auth().getLoginState()
      this.loginState = loginState || null
    }
  },
  render(h) {
    const tag = this.tag || 'div'
    let result = this.$scopedSlots.default ? this.$scopedSlots.default({
      loginState: this.loginState,
      loading: this.loading,
    }) : h(tag);
    if (Array.isArray(result)) {
      return h(tag, result)
    } else {
      return result
    }
  },
};