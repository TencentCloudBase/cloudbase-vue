export default {
    props: {
        mutation: Function
    },
    methods: {
        mutate() {
            this.mutation(this.$cloudbase.database())
        },
    },
    render(h) {
        let result = this.$scopedSlots.default({
            mutate: this.mutate
        });
        if (Array.isArray(result)) {
            return h(this.tag || 'div', result)
        } else {
            return result
        }
    },
};