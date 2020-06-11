// https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6
import AlertComponent from './Alert.vue'
const Alert = {}
Alert.install = function (Vue) {
    const AlertConstructor = Vue.extend(AlertComponent)
    const instance = new AlertConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 4. 添加实例方法
    Vue.prototype.$alert = function (msg) {
        // 逻辑...
        instance.msg = msg
        instance.isShow = true
    }
}
export default Alert