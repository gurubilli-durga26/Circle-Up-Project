import mongoose from "mongoose";
const schema=new mongoose.Schema({author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},content:{type:String,required:true,trim:true,maxlength:2000}},{timestamps:true});
export default mongoose.model("Post",schema);
