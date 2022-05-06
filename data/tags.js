const tagsModel = require('../db/tags')

// 增加
function tagsInsert(tagInfo) {
    return new Promise((resolve, reject) => {
        tagsModel.insertMany(tagInfo, (err, doc) => {
            if (!err) {
                resolve()
            } else {
                reject()
            }
        })
    })
}

// 查询
function tagsFind() {
    return new Promise((resolve, reject) => {
        tagsModel.find({}, (err, docs) => {
            if (!err) {
                resolve(docs)
            } else {
                reject()
            }
        })
    })
}

module.exports = {
    tagsInsert,
    tagsFind
}