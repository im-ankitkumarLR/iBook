const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

   name:{
       type: String,
    //    required true matlb yr field required hai 
       required:true
   },
   email:{
       type: String,
    //    required true matlb yr field required hai 
      //  required:true,

    //    for unique  email
       unique:true
   },
   password:{
       type: String,
    //    required true matlb yr field required hai 
       required:true
   },
   date:{
       type:Date,
    //    required true matlb yr field required hai 
        default: Date.now
   }
    

  });



  const User =mongoose.model('user',UserSchema);

 
//   ab hum is schema ko use karege to isko export krna padega or phir is schema se hum ek module banayege 

// mongoose me humko kya krna hoga jo aap model ka naam rkhana chah rhe ho Worker(user), or is schema ka naam  dono cheeze passs krni hai apko 
module.exports= User;


// user:   ------------->   yaha par humne schema se model banaya hai............................







