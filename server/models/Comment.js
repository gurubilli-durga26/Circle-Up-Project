import mongoose from "mongoose";
const schema=new mongoose.Schema({post:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true},author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},content:{type:String,required:true,trim:true,maxlength:1000}},{timestamps:true});
export default mongoose.model("Comment",schema);
