const mo = require('mongoose')

const s = mo.Schema({
    leaveWordBy: String,  // 游客id
    articleId: String,
    createTime: {
        type: Number,
        default: +new Date()
    },
    childrenId: {
        type: Array,
        default: null
    },
    parentId: {
        type: Array,
        default: null
    }
})

const leaveWordModel = mo.model('leaveWord', s)

module.exports = leaveWordModel