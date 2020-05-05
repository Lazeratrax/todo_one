const {model, Schema, Types} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    nicName: {type: String, required: true, unique: true},
    links: [{type: Types.Object, ref: 'Link' }]
})

module.exports = model(User, userSchema)