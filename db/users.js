const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    userAccount: {
        type: String,
        default: '_Yu962669816'
    },
    userPassword: {
        type: String,
        default: '_Yu120498'
    },
    nickName: {
        type: String,
        default: '有耳'
    },
    signature: {
        type: String,
        default: '答非所问，便已是答了，毋需再问'
    },
    qq: {
        type: String,
        default: '962669816'
    },
    weChat: {
        type: String,
        default: 'y982669816'
    },
    avatar: {
        type: String,
        default: 'http://localhost:3000/avatar/avatar.gif'
    },
    role: String,
    bg_images: Array
})

const usersModel = mongoose.model('user', usersSchema)

module.exports = {
    usersModel,
    usersSchema
}