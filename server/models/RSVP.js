import mongoose from "mongoose";
const schema=new mongoose.Schema({event:{type:mongoose.Schema.Types.ObjectId,ref:"Event",required:true},user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},status:{type:String,enum:["going","cancelled"],default:"going"}},{timestamps:true});
schema.index({event:1,user:1},{unique:true});
export default mongoose.model("RSVP",schema);
