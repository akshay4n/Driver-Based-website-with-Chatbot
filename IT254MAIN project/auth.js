const jwt=require("jsonwebtoken");
const Register=require("./register");


const auth= async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
        const user=await Register.findOne({_id:verifyUser._id});
        // const firstName=user.customerFirstName;
        // console.log("veryfyvuser"+ verifyUser);
        // console.log("tge customer information is "+ user);
        // console.log("tge customer name is "+ user.customerFirstName);
        req.token=token;
        req.user=user;
        next(); 
    } catch (error) {
        res.status(401).send(error);
    }
}
// console.log("the shashikant is="+ firstName)
module.exports=auth;