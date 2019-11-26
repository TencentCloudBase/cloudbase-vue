// import Query from "./Query"
import LoginState from './LoginState'
import DatabaseWatch from './DatabaseWatch'
import CloudFile from './CloudFile'
import DatabaseMutation from './DatabaseMutation'
import tcb from 'tcb-js-sdk'

const plugin = {
  install(Vue, options) {
    // Vue.component("databaseQuery", Query)
    Vue.component("LoginState", LoginState)
    Vue.component("DatabaseWatch", DatabaseWatch)
    Vue.component("CloudFile", CloudFile)
    Vue.component("DatabaseMutation", DatabaseMutation)
    Vue.prototype.$cloudbase = tcb.init({
      env: options.env
    })
  }
}

export default plugin
