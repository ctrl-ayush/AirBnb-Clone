const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main()
    .then(()=>{
        console.log("Connected to DB");
    })

    .catch((err)=>{
        console.log(err);
    })

    const initDB=async()=>{
        //await Listing.deleteMany({});
        await Listing.insertMany(initdata.data);
        console.log("Data was Saved");
    }

    initDB();