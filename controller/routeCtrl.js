const res = require('express/lib/response')
const {
    routeAuthUpdate
} = require('../data/route')
const {
    sys_logs_insert
} = require('../data/sys_logs')

/**
 * @function updateRoutes
 * @params request body
 * @return code、msg
 */
async function updateRoutes(reqBody) {
    const {
        routeList,
        operator,
    } = reqBody
    if (Array.isArray(routeList)) {
        const res = await routeAuthUpdate(routeList).catch((error) => {
            sys_logs_insert({
                operation: '更新路由信息',
                operator,
                operateRes: '发生了错误'
            })
            return {
                code: 4000,
                msg: '发生了错误 => ' + error
            }
        })
        sys_logs_insert({
            operation: '更新路由信息',
            operator,
            operateRes: '更新成功'
        })
        return {
            code: 2000,
            msg: '路由信息更新成功'
        }
    } else {
        return {
            code: res.code ?? 4000,
            msg: res.msg ?? '路由信息需是一个数组'
        }
    }
}

module.exports = {
    updateRoutes
}