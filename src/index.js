import Query from "./Query.vue"
import LoginState from './LoginState'
import DatabaseWatch from './DatabaseWatch'
import CloudFile from './CloudFile'
import Mutation from './Mutation'
import tcb from 'tcb-js-sdk'

const plugin = {
  install(Vue, options) {
    Vue.component("Query", Query)
    Vue.component("cbLoginState", LoginState)
    Vue.component("cbDatabaseWatch", DatabaseWatch)
    Vue.component("cbCloudFile", CloudFile)
    Vue.component("cbMutation", Mutation)
    // 4. 添加实例方法
    Vue.prototype.$cloudbase = tcb.init({
      env: options.env
    })
  }
}

export default plugin
