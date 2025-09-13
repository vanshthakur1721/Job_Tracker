import moongoose from 'mongoose';
const userSchema = new moongoose.Schema({
    name:{
        type:String,
        required:true,
    },email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,   
    }},{timestamps:true});

    export const User = moongoose.model('User',userSchema)