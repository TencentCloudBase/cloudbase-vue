export default {
  props: {
    collection: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      docs: [],
      loading: true,
      error: false
    }
  },
  async created() {
    this.$cloudbase.database().collection(this.collection).where({}).watch({
      onChange: (snapshot) => {
        this.loading = false
        this.docs = snapshot.docs
      }
    })
  },
  render() {
    return this.$scopedSlots.default({
      docs: this.docs,
      loading: this.loading,
    });
  },
};