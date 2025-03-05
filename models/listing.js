const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true

    },
    description:String,
    image:{
        filename: String,
        url: {
            type:String,
            default:"https://media.istockphoto.com/id/1449829864/photo/modern-house-with-solar-panel.jpg?s=1024x1024&w=is&k=20&c=MGmU9epmM8qunQnVlyiZ4GW33WK1usJc9PGayg6TNpg=",

            set:(v)=> v==="" ? "https://media.istockphoto.com/id/1449829864/photo/modern-house-with-solar-panel.jpg?s=1024x1024&w=is&k=20&c=MGmU9epmM8qunQnVlyiZ4GW33WK1usJc9PGayg6TNpg=" : v,
        }
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;