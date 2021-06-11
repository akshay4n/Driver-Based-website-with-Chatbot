const express=require("express")
const path=require("path")
const app=express();
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
require("./auth");

const Register = require("./register");
// const orderDetail=require("./book")
const auth = require("./auth");
const Book = require("./book");
port=80;

//REQUIRING FUNCTION WHICH CONNECT THE MONGODB WITH PROJECT
require("./connection");

//REQUIRING THE REGISTER FUNCTION WHERE THE STRUCTURE OG=F INPUT HAS BEEN DEFINED 
require("./register");
require("./book");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.post("/register", async(req,res)=>{
    try {
        const pass=req.body.password;
        const cpass=req.body.confirmPassword;
        const firstName=req.body.Name;
        if(pass==cpass){
            registerCustomer=new Register({
                customerFirstName:req.body.Name,
                customerLastName:req.body.lastName,
                customerEmail:req.body.mail2,
                customerPhone:req.body.phoneNo,
                customerUserName:req.body.usrName,
                customerPassowrd:req.body.password,
                customerConfirmPassword:req.body.confirmPassword,

            })
            const token=await registerCustomer.generateAuthToken();
            console.log("the generated token =" +token);
            
            const registered=await registerCustomer.save();
            // req.send()    
            //COOKIE PART FOR REGISTRATION IT WILL GENERATE THE COOKIE AND SAVE ON THE COOKIE FOLDER INIDE THE CHROME BROWSER
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+60000000),
                httpOnly:true
                });
            res.status(200).render('Signed',{name:firstName});
            console.log(registered);
        }
        else{
            res.status(200).send("password are not matching");
            // document.write("invalid login credentials");
            // document.getElementById('error-name').innerHTML = " Please Enter Your Name *"
            // const pword=req.body.confirmPassword;
            // document.getElementById('').innerHTML="please enter correct id password"
        }
      
    } catch (error) {
        res.status(400).send(error);
        
    }

})

app.post("/login", async(req,res)=>{
    try {
         const password=req.body.password;
         const mail=req.body.usrName;
         const result=await Register.findOne({customerUserName:mail})
         const firstName=result.customerFirstName;
        //  console.log("the name is "+ result);
         const ismatch=await bcryptjs.compare(password,result.customerPassowrd);
         const token=await result.generateAuthToken();

         //cookie part for login 
         res.cookie("jwt",token,{
           expires:new Date(Date.now()+60000000),
           httpOnly:true
           });
          if(ismatch)
           {
            // console.log("suceessfully logged in")
            res.status(200).render('Signed',{name:firstName});
            }
            else{
                res.send("invalid login credential")
            }
        
        } catch (error) {
        res.send("error" + error);
        
       }

})

app.post("/booked",auth,async(req,res)=>{

    // res.send("bookking page");
    try {
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
        const user=await Register.findOne({_id:verifyUser._id});
        // console.log(user);
    
    registerBook=new Book({
        bookingDate:req.body.date,
        bookingTime:req.body.time,
        customerId:user._id,
        otalBookingTime:req.body.hr,
        customerName:req.body.Name,
        customerPhone:req.body.phoneNo2,
        customerHouse:req.body.house,
        customerStreet:req.body.street,
        customerCity:req.body.city,
        customerLandmark:req.body.lmark,
        customerPincode:req.body.pc,

    })
    const orderDetail=await registerBook.save();
    console.log(orderDetail);
    res.render('Signed',{name:user.customerFirstName});
    } catch (error) 
    {
        console.log(error);
    }
        
    
    
    // res.send(time);
    // console.log(time);
    // res.send(date);
    // console.log(date);
})

app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

app.get("/special",auth,(req,res)=>{
   res.status(200).render('cars');
})

app.get("/logout",auth,async(req,res)=>{
    try {
        res.clearCookie("jwt")
        console.log("logout successfully");
        await req.user.save();
        res.render('IT254');
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/aboutUs",(req,res)=>{
    res.render('About')
})
app.get("/yourOrder",async(req,res)=>{
    // res.render('Orders');
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
        const user=await Register.findOne({_id:verifyUser._id});
        const firstName=user.customerFirstName;
        const order=await Book.findOne({customerId:verifyUser._id});
        console.log(order._id);
        // console.log(user);
        res.render('Orders',{name:user.customerFirstName,date:order.bookingDate,time:order.bookingTime,orderId:order._id,})
            // ,orderId:order._id,date:order.bookingDate,time:bookingTime})
    
    }catch(error)
    {
        res.send(error);
    }
})
app.get("/Signed",async(req,res)=>{
    // console.log(firstName);

    // res.render('Signed',{name:firstName});
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
        const user=await Register.findOne({_id:verifyUser._id});
        const firstName=user.customerFirstName;
        // console.log(user);
        res.render('Signed',{name:user.customerFirstName})
    
    }catch(error)
    {
        res.send(error);
    }
    
})

app.get("/",(req,res)=>{
    res.status(200).render('IT254.ejs')
});
app.get("/IT254-Signup.html",(req,res)=>{
    res.status(200).render('IT254-Signup.ejs')
})

app.get("/Login.html",(req,res)=>{
    res.status(200).render('Login.ejs')
})
 
app.get("/Cars.html", (req,res)=>{
//   res.send("this is my first website by using express")
 res.status(200).render('Cars.ejs')
});
app.get("/Drivers.html", (req,res)=>{
//  res.send("this is my first about website by using express")
res.status(200).render('Drivers.ejs')
});
app.get("/Cars",(req,res)=>{
    res.status(200).render('Cars')
})

app.get("/Drivers",(req,res)=>{
    res.status(200).render('Drivers')
})

app.get("/Booking",(req,res)=>{
    res.status(200).render('Booking')
})
// app.get("/Signed.ejs",(req,res)=>{
//     res.status(200).render('Signed')
// })
app.get("/profile",async(req,res)=>{
    try {
        const token=req.cookies.jwt;
    const verifyUser=jwt.verify(token,"mynameisshashiakntkumarakshayshivkarthiknageshpauskar");
    const user=await Register.findOne({_id:verifyUser._id});
    
    // ,{email:user.customerEmail},{phone:user.customerPhone}
    res.status(200).render('Profile.ejs',{name:user.customerFirstName,email:user.customerEmail,phone:user.customerPhone,user:user. customerUserName});
    } catch (error) {
        res.send(error);
        
    }
    
})

app.listen(port, ()=>{
    console.log('the application started successfully on port')
})