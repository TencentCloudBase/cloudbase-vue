<template>
    <div id="app">
        <cb-login-state v-slot="{ loginState }">
            <h1>{{ loginState ? '已登录' : '没登录' }}</h1>
            <cb-database-watch
                v-if="loginState"
                v-slot="{ docs }"
                collection="messages"
            >{{ docs.length }}</cb-database-watch>
        </cb-login-state>
        <cb-cloud-file
            id="cloud://starkwang-e850e3.7374-starkwang-e850e3-1257776809/file-cloud-path"
            v-slot="{ url, loading }"
        >{{ url ? url : 'loading...' }}</cb-cloud-file>
        <cb-mutation :mutation="addMessage" v-slot="{ mutate }">
            <button @click="mutate()">mutate</button>
        </cb-mutation>
    </div>
</template>

<script>
import Vue from "vue"
import axios from "axios"
import Cloudbase from "@cloudbase/vue-provider"

Vue.use(Cloudbase, {
    env: "starkwang-e850e3"
})

export default {
    name: "app",
    data() {
        return {
            documents: []
        }
    },
    methods: {
        addMessage: db =>
            db.collection("messages").add({
                timestamp: new Date().getTime(),
                text: "send from vue",
                uid: "1234567890"
            })
    },
    created() {
        const init = async () => {
            const {
                data: { ticket }
            } = await axios.get(
                "http://service-m1w79cyz-1257776809.ap-shanghai.apigateway.myqcloud.com/release/"
            )
            this.$cloudbase.auth({ persistence: "local" }).signInWithTicket(ticket)
        }
        init()
    }
}
</script>
