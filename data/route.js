const {
    routeAuthSchema,
    routeAuthModel
} = require('../db/routeAuth')

/**
 * @function routeAuthInsert
 * @params routeInfo: Array | Object
 * @return 2000 | 4000
 */
function routeAuthInsert(routeInfo) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(routeInfo)) {
            routeAuthModel.insertMany(...routeInfo, (err, docs) => {
                if (!err) {
                    resolve(2000)
                } else {
                    reject(4000)
                }
            })
        } else if (Object.prototype.toString.call(routeInfo) === '[object Object]') {
            routeAuthModel.insertMany(routeInfo, (err, docs) => {
                if (!err) {
                    resolve(2000)
                } else {
                    reject(4000)
                }
            })
        }
    })
}

/**
 * @function routeAuthUpdate
 * @params routeList: Array
 * @return 
 */
function routeAuthUpdate(routeList) {
    return new Promise((resolve, reject) => {
        if (Array.isArray(routeList)) {
            routeList.forEach((i) => {
                // routeAuthModel.updateOne({routeNo: i.routeNo}, {$set: i}.exec())
                routeAuthModel.findOne({
                    routeNo: i.routeNo
                }, (err, doc) => {
                    if (!err) {
                        if (Object.prototype.toString.call(doc) === '[object Object]') {
                            Object.assign(doc, i)
                            doc.save()
                        } else {
                            routeAuthInsert(i)
                        }
                    }
                })
            })
        }
        resolve()
    })
}

module.exports = {
    routeAuthUpdate
}