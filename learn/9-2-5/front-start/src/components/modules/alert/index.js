// https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6
import AlertComponent from './Alert.vue'
const Alert = {}
Alert.install = function (Vue) {
    const AlertConstructor = Vue.extend(AlertComponent)
    const instance = new AlertConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    Vue.prototype.$alert = function (msg) {
        // 逻辑...
        instance.type = 'alert'
        instance.msg = msg
        instance.isShow = true
    }

    // 4. 添加实例方法
    Vue.prototype.$confirm = function (msg, success, cancel) {
        // 逻辑...
        instance.type = 'confirm'
        instance.msg = msg
        instance.isShow = true
        if (typeof success !== "undefined") {
            instance.success = success
        }
        if (typeof cancel !== "undefined") {
            instance.cancel = cancel
        }
    }
}
export default Alert