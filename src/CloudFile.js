export default {
  props: {
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
  render() {
    return this.$scopedSlots.default({
      url: this.url,
      loading: this.loading
    });
  },
};