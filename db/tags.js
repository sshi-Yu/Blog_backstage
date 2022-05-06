const m = require('mongoose')

const tagsSchema = m.Schema({
    tagName: String,
    bgColor: String
})

const tagsModel = m.model('tags', tagsSchema)

module.exports = tagsModel