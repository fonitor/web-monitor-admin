import { time } from './index'

const FormDate = time

const pickerDateMenu = {
    shortcuts: [
        {
            text: '今天',
            onClick(picker) {
                const date = new Date()
                const start = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00'
                const end = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 23:59:59'
                picker.$emit('pick', [FormDate(start), FormDate(end)])
            }
        }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              let start = date.setTime(date.getTime() - 3600 * 1000 * 24 * 1)
              start = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00'
              const end = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 23:59:59'
              picker.$emit('pick', [FormDate(start), FormDate(end)])
            }
          }
    ]
}

export default pickerDateMenu