<template>
    <div id="app">
        <LoginState v-slot="{ loginState }">
            <h1>{{ loginState ? '已登录' : '没登录' }}</h1>
            <div v-if="loginState">
                <CloudFile
                    id="cloud://starkwang-e850e3.7374-starkwang-e850e3-1257776809/realtime-images/178418-1573638462270"
                ></CloudFile>
                <button @click="change()"></button>
                <DatabaseQuery
                    :collection="collection"
                    :query="_ => ({ timestamp: _.gt(1573635456709) })"
                    v-slot="{ docs }"
                >
                    <p v-for="({ text }, i) in docs" :key="i">{{ text }}</p>
                </DatabaseQuery>
                <!-- <DatabaseWatch
                    collection="messages"
                    v-slot="{ docs }"
                    :query="_ => ({ timestamp: _.gt(1573635456709) })"
                >
                    <p v-for="({ text }, i) in docs" :key="i">{{ text }}</p>
                </DatabaseWatch>-->
            </div>
        </LoginState>
    </div>
</template>

<script>
import Vue from "vue"
import Cloudbase from "@cloudbase/vue-provider"

Vue.use(Cloudbase, {
    env: "starkwang-e850e3"
})

export default {
    name: "app",
    data() {
        return {
            collection: "test",
            documents: [],
            show: false
        }
    },
    methods: {
        addMessage: db =>
            db.collection("messages").add({
                timestamp: new Date().getTime(),
                text: "send from vue",
                uid: "1234567890"
            }),
        change() {
            this.collection = "messages"
        },
        upload(path, file) {
            console.log(path, file)
        }
    },
    async created() {
        await this.$cloudbase
            .auth()
            .anonymousAuthProvider()
            .signIn()
    }
}
</script>
