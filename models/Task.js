const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, require: true},
    isComplite: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
    commit: {type: String},
    finelDate: {type: Date},
    task: {type: Types.ObjectId, ref: 'Task'}
})

module.exports = model('Task', schema)