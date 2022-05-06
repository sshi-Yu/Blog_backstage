const {
    usersModel,
    usersSchema
} = require('../db/users')

function initUser() {
    usersModel.insertMany()
}

/* find userINfo to login */
function user_find(userAccount) {
    return new Promise((resolve, reject) => {
        usersModel.findOne({
                userAccount
            })
            .exec((err, doc) => {
                if (!err) {
                    if (doc) {
                        resolve(doc)
                    } else {
                        reject()
                    }
                } else {
                    reject()
                }
            })
    })
}

/* find userInfo to show by userId */
function userInfo_find(condition) {
    return new Promise((resolve, reject) => {
        usersModel.findById(condition).select('nickName signature qq weChat avatar')
            .exec((err, doc) => {
                if (!err) {
                    if (doc) {
                        resolve(doc)
                    } else {
                        reject()
                    }
                } else {
                    reject()
                }
            })
    })
}

module.exports = {
    user_find,
    userInfo_find
}