const mongoose = require('mongoose')

const sysLogsSchema = mongoose.Schema({
    createTime: {
        type: Number,
        default: +new Date()
    },
    operation: String,
    operator: {
        type: String,
        default: 'root'
    },
    operateRes: String
})

const sysLogsModel = mongoose.model('sys_logs', sysLogsSchema)

module.exports = sysLogsModel