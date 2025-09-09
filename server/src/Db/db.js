import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDb");}
        catch(eror){
            console.log("Error connecting to MongoDb",eror)
            process.exit(1);
        }
    }
export default connectDb
