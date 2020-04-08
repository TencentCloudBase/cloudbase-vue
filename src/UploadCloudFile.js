export default {
  props: {
    tag: {
      type: String
    }
  },
  data() {
    return {
      progress: 0,
      success: false,
      error: null
    }
  },
  async created() {
  },
  methods: {
    async uploadFile(path, file) {
      this.$cloudbase.uploadFile({
        cloudPath: path,
        filePath: file,
        onUploadProgress(progressEvent) {
          console.log(progressEvent);
          const percentCompleted = Math.round(
            progressEvent.loaded / progressEvent.total * 100
          );
          this.progress = percentCompleted
        }
      })
    }
  },
  render(h) {
    const tag = this.tag || 'div'
    let result = this.$scopedSlots.default ? this.$scopedSlots.default({
      upload: this.uploadFile,
      progress: this.progress,
      success: this.success
    }) : h(tag);
    if (Array.isArray(result)) {
      return h(tag, result)
    } else {
      return result
    }
  },
};