const mo = require('mongoose')

const articleSchema = mo.Schema({
    title: String,
    subTitle: String,
    preContent: String,
    content: JSON,
    surfacePlot: Object,
    tags: Array,
    visitedNum: {
        type: Number,
        default: 0
    },
    likesNum: {
        type: Number,
        default: 0
    },
    leaveWordsNum: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Number,
        default: +new Date()
    },
    lastModifyTime: {
        type: Number,
        default: +new Date()
    },
    creator: String,
    modifier: String,
    isPublic: {
        type: Number,
        default: 0
    }  // 0 --> private 1-->public
})

const articleModel = mo.model('article', articleSchema)

module.exports = articleModel