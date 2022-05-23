// to connect with mongo db server 

const mongoose = require('mongoose');

// put mongodb string here 
const mongURI="mongodb://localhost:27017/LoopCloudBook";
   
// agar kahi or deploye krna hoga to apko ye string change krni hogi upper waali  (This is called connection string)


// connect with Database

const connectToMongo =()=>{
    mongoose.connect(mongURI,()=>{
 
        console.log("Connected to mongo Successfully");
   
    })

}

module.exports =connectToMongo;

// yaha tak ka ye ek function hai jo DataBase se connect krta hai 
// _______________________________________________________________________