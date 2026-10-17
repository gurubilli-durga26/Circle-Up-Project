import mongoose from "mongoose";
const membershipSchema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},role:{type:String,enum:["owner","member"],default:"member"},joinedAt:{type:Date,default:Date.now}},{_id:false});
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,required:true},location:{type:String,required:true},category:{type:String,required:true},privacy:{type:String,enum:["public","private"],default:"public"},type:{type:String,enum:["lobby","community"],default:"community"},imageUrl:{type:String,default:""},owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},members:[membershipSchema]},{timestamps:true});
export default mongoose.model("Group",schema);
