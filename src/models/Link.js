const {model, Schema, Types} = require('mongoose')

const linkShema = new Schema({
    from: {type: String, require:true},
    to: {type: String, require:true, unique: true},
    date: {type: Date, default: Date.now()},
    code: {type: String, require:true, unique: true},
    click: {type: Number, require:true,},
    owner: [{type: Types.Object, ref: 'User'}]
})

module.exports = model('Link', linkShema)