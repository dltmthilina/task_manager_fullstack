const mongoos = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = mongoos.Schema;

const userSchema = new schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:6},
    image:{type:String, required:true},
});


userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoos.model('User', userSchema)