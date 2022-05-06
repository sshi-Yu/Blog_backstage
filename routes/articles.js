const router = require('express').Router()
const {
    uploadArt,
    editArticle,
    queryArticles,
    queryArticleDetail,
    upload_ImageInArticle,
    delete_surfacePlot
} = require('../controller/articleCtrl')
const {
    queryTags,
    addNewTags
} = require('../controller/tagsCtrl')

// 上传
router.post('/upload', async (req, res) => {
    res.json(await uploadArt(req.body))
})

// 修改
router.post('/edit', async (req, res) => {
    res.json(await editArticle(req.body))
})

// 查询 public
router.get('/query', async (req, res) => {
    res.json(await queryArticles(req.query))
})

// 查询 private
router.get('/queryPrivate', async (req, res) => {
    res.json(await queryArticles(req.query))
})

// 查询文章内容 public
router.get('/detail', async (req, res) => {
    res.json(await queryArticleDetail(req.query))
})

// 查询文章内容 private
router.get('/detailPrivate', async (req, res) => {
    res.json(queryArticleDetail(req.query))
})

// 上传文章中的图片
router.post('/uploadImage', async (req, res, next) => {
    const uploadFileFlowName = 'wangeditor-uploaded-image' // 用于获取 wangeditor 传递的 files 中的数据
    const {
        data,
    } = await upload_ImageInArticle(uploadFileFlowName, req).catch((err) => { // 捕获错误 返回错误信息
        res.json({
            "errno": 1,
            message: '出错了 ==> ' + err
        })
    })
    res.json({
        "errno": 0,
        "data": {
            "url": data ?.path,
            "alt": data.originalFilename
        }
    })
})

// 上传封面图
router.post('/uploadSurfacePlot', async (req, res) => {
    const uploadFileFlowName = 'surfacePlot' // 用于获取 wangeditor 传递的 files 中的数据
    const {
        data,
    } = await upload_ImageInArticle(uploadFileFlowName, req).catch((err) => { // 捕获错误 返回错误信息
        res.json({
            code: 4000,
            msg: '出错了 ==> ' + err
        })
    })
    res.json({
        code: 2000,
        msg: '封面图上传成功',
        data: {
            url: data ?.path,
            alt: data.originalFilename,
            currentFilename: data.currentFilename
        }
    })
})

// 删除封面图
router.post('/deleteSurfacePlot',async (req, res) => {
    res.json(await delete_surfacePlot(req.body))
})

// 查询标签
router.get('/tags', async (req, res) => {
    res.json(await queryTags())
})
// 添加标签
router.post('/newTag', async (req, res) => {
    res.json(await addNewTags(req.body))
})
module.exports = router