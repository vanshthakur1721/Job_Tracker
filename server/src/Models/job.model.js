import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
 company :{
    type:String,
    required:true },

    role:{
    type:String,
    required:true
    },

    salary:{
    type:Number,
    required:true,
    default:0,
    },

    location:{
    type:String,
    required:true,
    default:"my city"
    },

    status:{
    enum:["applied","interview","offer","rejected"],
    type:String,
    required:true,
    default:"applied"
    },

    jobtype:{
     enum:["full-time","part-time","remote","internship"],
     default:"full-time",
     type:String,
    },

    applicationDate:{
    type:Date,
    default:Date.now() },

    createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
    }

},{timestamps:true})

export const Job = mongoose.model("Job",jobSchema);
