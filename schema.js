var mongoose= require('mongoose');
var schema= mongoose.Schema

var userschema = new schema({
   email:{type: String,unique: true,required: true},
   name:{type: String, required:true},
   country: {type: String, required:true}
})
mongoose.model('user', userschema)