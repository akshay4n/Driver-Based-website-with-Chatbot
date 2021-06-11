
// CONNECTION OF MONGODB DATABASE CODE 

const mongoose=require('mongoose');
// const playlist= mongoose("mongodb://")
mongoose.connect("mongodb://localhost:27017/IT254PROJECT",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection got established party hard");
}).catch((err)=>{
    console.log(err);
})

