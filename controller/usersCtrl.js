const {
    sys_logs_insert
} = require('../data/sys_logs')
const {
    user_find,
    userInfo_find,
    webmaster_find
} = require('../data/users')
const {
    create_token
} = require('../jwt/index')
const {
    encrypter,
    decrypter
} = require('../cypto/index')

// user login
async function user_login(userAccount, userPassword) {
    try {
        const queryRes = await user_find(userAccount)
        if (queryRes.userPassword === userPassword) {
            const accessToken = create_token(userAccount, 60 * 60 * 5)
            const refreshToken = create_token(userAccount, 60 * 60 * 5)
            return {
                code: 2000,
                msg: '欢迎回来',
                data: {
                    userInfo: Object.assign(queryRes, {
                        userAccount: encrypter(queryRes.userAccount),
                        userPassword: encrypter(queryRes.userPassword)
                    }),
                    accessToken,
                    refreshToken
                }
            }
        } else {
            return {
                code: 4000,
                msg: '用户名和密码不匹配',
            }
        }
    } catch (e) {
        // console.log(e);
        return {
            code: 4000,
            msg: '用户不存在，请确认输入信息是否正确',
        }
    }
}

// refresh 
async function user_refresh(req) {
    const {
        userAccount,
        userPassword
    } = req.body
    return await user_login(decrypter(userAccount),
        decrypter(userPassword))
}

// get writerInfo
async function get_userInfo(req) {
    const {
        writerId: _id
    } = req
    const queryRes = await userInfo_find({ _id })
        .catch((err) => {
            return {
                code: 4000,
                msg: '作者不存在，信息有误',
            }
        })
    return {
        code: queryRes.code ?? 2000,
        msg: queryRes.msg ?? '查询作者信息成功',
        data: queryRes.code ? {} : {
            writerInfo: queryRes
        }
    }

}

// webmaster 
async function get_webmasterInfo() {
    const queryRes = await webmaster_find().catch((err) => {
        return {
            code: 4000,
            msg: '查询站长信息出错了'
        }
    })
    return {
        code: queryRes.code ?? 2000,
        msg: queryRes.msg ?? '查询站长信息成功',
        data: queryRes.code ? {} : {
            webmasterInfo: queryRes
        }
    }
}

module.exports = {
    user_login,
    user_refresh,
    get_userInfo,
    get_webmasterInfo
}