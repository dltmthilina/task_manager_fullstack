const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{type: String, require: true},
    description:{type: String, require: false},
    due_data:{type: String, require: false},
    status:{type: String, require: false},
    creator:{type: String, require: false, ref: 'User'},
})

module.exports = mongoose.model('Task', taskSchema);