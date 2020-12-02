import cloudbase from '@cloudbase/js-sdk'
import LoginState from './LoginState'
import DatabaseWatch from './DatabaseWatch'
import CloudFile from './CloudFile'
import DatabaseQuery from './DatabaseQuery'
// import UploadCloudFile from './UploadCloudFile'

const plugin = {
  install(Vue, options) {
    // Vue.component("databaseQuery", Query)
    Vue.component("LoginState", LoginState)
    Vue.component("DatabaseWatch", DatabaseWatch)
    Vue.component("CloudFile", CloudFile)
    Vue.component("DatabaseQuery", DatabaseQuery)
    // Vue.component("UploadCloudFile", UploadCloudFile)
    Vue.prototype.$cloudbase = cloudbase.init({
      env: options.env
    })
  }
}

export default plugin
