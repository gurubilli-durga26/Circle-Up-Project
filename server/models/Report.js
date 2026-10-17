import mongoose from "mongoose";
const schema=new mongoose.Schema({reporter:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},targetType:{type:String,required:true},targetId:{type:mongoose.Schema.Types.ObjectId,required:true},reason:{type:String,required:true},status:{type:String,enum:["open","reviewed","resolved"],default:"open"}},{timestamps:true});
export default mongoose.model("Report",schema);
