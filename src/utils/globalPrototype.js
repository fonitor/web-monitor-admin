
import { time } from './index'

export default {
    install(Vue, options) {
        // 日期格式化 2018-08-08 08:08:08
        Vue.prototype.dateTImeReset = time
    }
}