const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    imageData: {
        type:Array,
        required:true
    },
    owner: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    createdDate: {
        type:Date,
        required:true
    },
    delkey: {
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('imagemodel',imageSchema);