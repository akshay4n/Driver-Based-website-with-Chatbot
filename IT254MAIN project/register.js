// STRUCTURE OF THE OBJECT WHICH WE ARE GETTING AS REGISTRATION INPUT

const mongoose=require("mongoose");
// const bcryptjs=require("bcryptjs")
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");



const registrationSchema=new mongoose.Schema({
    customerFirstName:{
        type:String,
        // required:true,
        
    },
    customerLastName:{
        type:String,
        // required:true,
    },
    customerEmail:{
        type:String,
        // required:true,
    },

    customerPhone:{
        type:Number,
        // required:true,
    },

    customerUserName:{
        type:String,
        // required:true,
    },
    customerPassowrd:{
        type:String,
        // required:true,
    },
    customerConfirmPassword:{
        type:String,
        // required:true, 
    },
    tokens:[{
        token:String
    }]

})
// employeeSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         console.log(this.password);
//         this.password=await bcryptjs.hash(this.password,10);
//         console.log(this.password);
//         this.confirmPassword=undefined;
//     }
//     next();
// }) 


// FUNCTION TO GENERATE JSON WEB TOKEN 
registrationSchema.methods.generateAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
        console.log(token);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
        
    } catch (error) {
        console.log("the error is " +error);
        res.send("the error of the programme is ="+error);
        
    }
}


// CODE TO DECRYPT THE PASSWORD FOR THE SAFTY REASON
registrationSchema.pre("save",async function(next){
    if(this.isModified("customerPassowrd")){
        console.log(this. customerPassowrd);
        this.customerPassowrd=await bcryptjs.hash(this.customerPassowrd,10);
        console.log(this.customerPassowrd);
        this.customerConfirmPassword=undefined;
    }
    next();
    
})
const Register=new mongoose.model("Register",registrationSchema)
module.exports=Register;