import mongoose from "mongoose";
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true},category:{type:String,required:true},location:{type:String,required:true},startDate:{type:Date,required:true},endDate:{type:Date,required:true},description:{type:String,required:true},imageUrl:{type:String,default:""},capacity:{type:Number,default:50,min:1},creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},group:{type:mongoose.Schema.Types.ObjectId,ref:"Group",default:null}},{timestamps:true});
schema.pre("validate",function(next){if(this.endDate<=this.startDate)return next(new Error("End time must be after start time"));next()});
export default mongoose.model("Event",schema);
