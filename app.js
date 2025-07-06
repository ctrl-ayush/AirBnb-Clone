const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path =require ("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


app.set("view engine ", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

 
main()
    .then(()=>{
      console.log("Connected to DB");
        console.log("Connected to DB");
    })

    .catch((err)=>{
        console.log(err);

    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


 



  app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
  })

  //Show Details 
  app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listingS/show.ejs",{listing});
  }))
  //Show saara ka saara details
app.get("/listings",wrapAsync(async(req,res)=>{
  const allListings=await Listing.find({})
  res.render("listings/index.ejs",{allListings});
}))

app.post("/listings",wrapAsync(async(req,res)=>{
  let listing=req.body.listing;
  const newListing=new Listing(listing);
  await newListing.save();
  console.log(listing);
  res.redirect("/listings");
}))

app.get("/listings/:id/new",wrapAsync(async(req,res)=>{
  try{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
  } 
  catch(err){
    next(err);
  }
}))

app.put("/listings/:id",wrapAsync(async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
}))

app.delete("/listings/:id",wrapAsync(async(req,res)=>{
  let{id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}))

app.get("/",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
})

app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "Page not found"));
})

app.use((err,req,res,next)=>{
  let{statusCode=500, message="Something Went wrong"}=err;
  res.status(statusCode).render("listings/error.ejs",{statusCode,message});
  // res.status(statusCode).send(message);

})

app.listen(3000,()=>{
    console.log("App is listening on port")
});
