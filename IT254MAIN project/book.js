const mongoose=require("mongoose");
// const bcryptjs=require("bcryptjs")
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");


const bookingSchema=new mongoose.Schema({
    customerName:{
        type:String,
        // required:true,
        
    },
    customerId:{
      type:String,
    },
    // customerLastName:{
    //     type:String,
    //     // required:true,
    // },
    customerEmail:{
        type:String,
        // required:true,
    },

    customerPhone:{
        type:Number,
        // required:true,
    },

    customerHouseNo:{
        type:Number,
        // required:true,
    },
    customerStreet:{
        type:String,
        // required:true,
    },
    customerCity:{
        type:String,
        // required:true, 
    },
    customerLandmark:{
        type:String,
    },
    customerPincode:{
        type:Number,
    },
    totalBookingTime:{
        type:Number,
    },
    bookingDate:{
        type:Date,
    },
    bookingTime:{
        type:String,
    },
    tokens:[{
        token:String
    }]

})


const orderDetail=new mongoose.model("orderDetail",bookingSchema)
module.exports=orderDetail;
