const mongoose = require('mongoose')

const routeAuthSchema = mongoose.Schema({
    routerNo: Number,
    routeName: String,
    componentPath: String,
    authType: Number,
    isVerify: Boolean,
    isVisible: Boolean,
    Icon: String,
    children: Array,
    createTime: {
        type: Number,
        default: +new Date()
    },
    creator: String,
    modifyTime: Number,
    modifier: String    
})

const routeAuthModel = mongoose.model('routeAuth', routeAuthSchema)

module.exports = {
    routeAuthModel,
    routeAuthSchema
}