const articleModel = require('../db/article')

// 保存article
function artInert(artInfo) {
    return new Promise((resolve, reject) => {
        articleModel.insertMany(artInfo, (err, docs) => {
            if (!err) {
                resolve()
            } else {
                reject()
            }
        })
    })
}

// 修改article
function artUpdate(articleId, artInfo) {
    return new Promise((resolve, reject) => {
        articleModel.updateOne({
            _id: articleId
        }, artInfo, (err, doc) => {
            if (!err) {
                resolve()
            } else {
                reject()
            }
        })
    })
}

// 查询文章
function artFind(condition, {
    size,
    current
}) {
    return new Promise((resolve, reject) => {
        articleModel.find(condition).sort('-createTime').limit(size).skip((current - 1) * size).select('-content').exec((err, docs) => {
            if (!err) {
                resolve({
                    articlesList: docs
                })
            } else {
                reject()
            }
        })
    })
}

// 查询文章内容
function artFindDetail({
    articleId
}) {
    return new Promise((resolve, reject) => {
        articleModel.findById(articleId, (err, doc) => {
            if (!err) {
                resolve({
                    articleInfo: doc
                })
            } else {
                reject()
            }
        })
    })
}

module.exports = {
    artInert,
    artUpdate,
    artFind,
    artFindDetail
}