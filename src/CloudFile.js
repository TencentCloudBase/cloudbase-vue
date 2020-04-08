export default {
  props: {
    tag: {
      type: String
    },
    id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      url: null,
      loading: true,
      error: false
    }
  },
  async created() {
    const result = await this.$cloudbase.getTempFileURL({
      fileList: [this.id]
    })

    this.loading = false
    this.url = result.fileList[0].tempFileURL
  },
  render(h) {
    const tag = this.tag || 'div'
    let result = this.$scopedSlots.default ? this.$scopedSlots.default({
      url: this.url,
      loading: this.loading
    }) : h(tag);
    if (Array.isArray(result)) {
      return h(tag, result)
    } else {
      return result
    }
  },
};