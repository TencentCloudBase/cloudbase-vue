// import Query from "./Query"
import LoginState from './LoginState'
import DatabaseWatch from './DatabaseWatch'
import CloudFile from './CloudFile'
import DatabaseQuery from './DatabaseQuery'
// import UploadCloudFile from './UploadCloudFile'
import tcb from 'tcb-js-sdk'

const plugin = {
  install(Vue, options) {
    // Vue.component("databaseQuery", Query)
    Vue.component("LoginState", LoginState)
    Vue.component("DatabaseWatch", DatabaseWatch)
    Vue.component("CloudFile", CloudFile)
    Vue.component("DatabaseQuery", DatabaseQuery)
    // Vue.component("UploadCloudFile", UploadCloudFile)
    Vue.prototype.$cloudbase = tcb.init({
      env: options.env
    })
  }
}

export default plugin
