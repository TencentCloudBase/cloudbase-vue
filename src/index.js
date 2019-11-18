import Query from "./Query.vue"

const plugin = {
    install(Vue) {
        Vue.component("Query", Query)
    }
}

export default plugin
