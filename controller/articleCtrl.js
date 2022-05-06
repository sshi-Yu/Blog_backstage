const {
    artInert,
    artUpdate,
    artFind,
    artFindDetail
} = require('../data/article')
const {
    sys_logs_insert
} = require('../data/sys_logs')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs')
const res = require('express/lib/response')

// 上传article
async function uploadArt(req) {
    const res = await artInert({
        title,
        subTitle,
        preContent,
        surfacePlot,
        creator,
        content,
        isPublic
    } = req).catch((err) => {
        return {
            code: 4000,
            msg: '保存失败，出错了 ==> ' + err,
        }
    })
    sys_logs_insert({
        operation: '上传文章',
        // operator,
        operateRes: res ? res.msg : '上传成功'
    })
    return {
        code: res ? res.code : 2000,
        msg: res ? res.msg : '上传成功'
    }
}

// 修改文章
async function editArticle(req) {
    const art = {
        title,
        subTitle,
        preContent,
        surfacePlot,
        tags,
        visitedNum,
        likesNum,
        leaveWordsNum,
        modifier,
        isPublic,
    } = req
    art.lastModifyTime = +new Date()
    const res = await artUpdate({
        articleId
    } = req, art).catch((err) => {
        return {
            code: 4000,
            msg: '修改失败，出错了 ==> ' + err,
        }
    })
    sys_logs_insert({
        operation: '修改文章',
        // operator,
        operateRes: res ? res.msg : '修改成功'
    })
    return {
        code: res ? res.code : 2000,
        msg: res ? res.msg : '修改成功'
    }
}

// 查询文章列表
async function queryArticles(req) {
    const current = req.current ?? 1
    const size = req.size ?? 10
    const res = await artFind({
        isPublic
    } = req, { current, size }).catch((err) => {
        return {
            code: 4000,
            msg: '查询失败，出错了 ==> ' + err,
        }
    })
    return {
        code: res.code ?? 2000,
        msg: res.msg ?? '查询成功',
        data: res.code ? {} : {
            articlesList: res.articlesList
        }
    }
}

// 查询文章内容
async function queryArticleDetail(req) {
    const res = await artFindDetail({
            articleId
        } = req)
        .catch((err) => {
            return {
                code: 4000,
                msg: '查询失败，出错了 ==> ' + err,
            }
        })
    return {
        code: res.code ?? 2000,
        msg: res.msg ?? '查询成功',
        data: res.code ? {} : {
            articleInfo: res.articleInfo
        }
    }
}

// 上传文章中的图片
const uploadImgAdd = path.join(path.dirname(__dirname), '/public/images') // 保存图片的images目录
function upload_ImageInArticle(uploadFileFlowName, req) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form()
        form.uploadDir = uploadImgAdd
        form.parse(req /* 传入req 解析请求中的文件 */ , async (err, fields, files) => {
            if (!err) {
                const originalFilename = files[uploadFileFlowName][0].originalFilename // 上传的图片原始名称
                const savePath = files[uploadFileFlowName][0].path // 图片保存的路径
                resolve({
                    data: {
                        path: 'http://localhost:3000/images/' + path.basename(savePath), // 重新拼接图片访问地址 部署后地址需变更,
                        originalFilename,
                        currentFilename: path.basename(savePath)
                    }
                })
            } else {
                reject()
            }
        })
    })
}

// 删除封面图
function delete_surfacePlot(req) {
    const {
        currentFilename
    } = req
    return new Promise((resolve, reject) => {
        try {
            fs.unlinkSync(uploadImgAdd + '\\' + currentFilename)
            sys_logs_insert({
                operation: '删除封面图' + currentFilename,
                // operator,
                operateRes: '删除成功'
            })
            resolve({
                code: 2000,
                msg: '删除成功'
            })
        } catch (error) {
            console.log(error)
            sys_logs_insert({
                operation: '删除封面图' + currentFilename,
                // operator,
                operateRes: '删除失败' + '==>' + error
            })
            reject({
                code: 4000,
                msg: '删除出错了 ==> ' + error
            })
        }
    })
}


module.exports = {
    uploadArt,
    editArticle,
    queryArticles,
    queryArticleDetail,
    upload_ImageInArticle,
    delete_surfacePlot
}