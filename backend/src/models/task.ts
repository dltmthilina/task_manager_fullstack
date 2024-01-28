const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{type: String, require: true},
    description:{type: String, require: true},
    dueData:{type: Date, require: true},
    status:{type: Boolean, require: true},
    creator:{type: mongoose.Types.ObjectId, require: true, ref: 'User'},
})

module.exports = mongoose.model('Task', taskSchema);