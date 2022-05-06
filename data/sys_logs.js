const sysLogsModel = require('../db/sys_logs')

/**
* @function sys_logs_insert
* @params logInfo: Object
* @return success => 2200 error => 4400
*/
function sys_logs_insert(logInfo){
    return new Promise((resolve, reject) => {
        sysLogsModel.insertMany(logInfo, (err, docs) => {
            if(!err){
                resolve(2200)
            }else{
                reject(4400) // log写入出错 返回错误码 并重新写入出错日志
                sys_logs_insert({
                    operation: logInfo.operation,
                    operator: logInfo.operator,
                    // createTime: logInfo.createTime,
                    operateRes: 'ERROR => ' + err
                })
            }
        })
    })
}

module.exports = {
    sys_logs_insert
}