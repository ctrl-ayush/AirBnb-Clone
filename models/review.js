const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ReviewSchema=newSchema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    Date:{
        type:Date,
        default:Date.now();
    }
    });
    model.exports=mongoose.model("Review",ReviewSchema);
