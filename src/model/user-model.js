const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    data: Object
});



exports.User = mongoose.model('User', UserSchema)