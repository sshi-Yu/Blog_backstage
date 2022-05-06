const {
    tagsInsert,
    tagsFind
} = require('../data/tags')
const {
    sys_logs_insert
} = require('../data/sys_logs')

// 查询
async function queryTags() {
    const tagsList = await tagsFind().catch((err) => {
        return {
            code: 4000,
            msg: '查询失败，出错了',
        }
    })
    return {
        code: tagsList.code ?? 2000,
        msg: tagsList.msg ?? '查询成功',
        data: tagsList.code ? {} : {
            tagsList
        }
    }
}

// 添加
async function addNewTags(req) {
    
    const res = await tagsInsert({
        tagName,
        bgColor,
    } = req).catch((err) => {
        sys_logs_insert({
            operation: '添加新标签',
            operateRes: '添加失败，发生了错误 ===>' + err
        })
        return {
            code: 4000,
            msg: '添加失败，出错了',
        }
    })
    return {
        code: res ? res.code : 2000,
        msg: res ? res.msg : '添加成功'
    }
}

module.exports = {
    queryTags,
    addNewTags
}