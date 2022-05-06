const mongoose = require('mongoose')

const visitLogsSchema = mongoose.Schema({
    createTime: {
        type: Number,
        default: +new Date()
    },
    operation: {
        type: String,
        default: '访问了本网站'
    },
    visitorIP: String,
    operateRes: {
        type: String,
        default: '正常'
    }
})

const visitLogsModel = mongoose.model('visit_logs', visitLogsSchema)

module.exports = visitLogsModel