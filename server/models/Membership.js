import mongoose from "mongoose";
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},group:{type:mongoose.Schema.Types.ObjectId,ref:"Group",required:true},role:{type:String,enum:["owner","member"],default:"member"}},{timestamps:true});
schema.index({user:1,group:1},{unique:true});
export default mongoose.model("Membership",schema);
