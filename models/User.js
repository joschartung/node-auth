const { model, Schema } = require('mongoose');
module.exports = model("User", Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
}))