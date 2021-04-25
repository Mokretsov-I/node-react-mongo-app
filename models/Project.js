const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, require: true},
    description: {type: String},
    date: {type: Date, default: Date.now},
    finelDate: {type: Date},
    repository: {type: String},
    ended: {type: Boolean, default: false},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Project', schema)