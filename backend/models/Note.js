const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
     

   user:{ // To link particular user with thier notes 

         type: mongoose.Schema.Types.ObjectId, // models -- ke ander jo user.js hai usme jobhi user aayega to uski kon si waali ID isme aaye uskeliye ise lagaya hai
         ref:'user' // isme user model daalna padega models--> Users--line No. 35 me hai jo
   },
   title:{
       type: String,
       required:true //  required true matlb yr field required hai 
   },
   description:{
       type: String,
   
       required:true
   },
   tag:{
       type: String,
 
       default: "General"
    },
   date:{
       type:Date,
    
        default: Date.now
   }
    

  });


//   ab hum is schema ko use karege to isko export krna padega or phir is schema se hum ek module banayege 

// mongoose me humko kya krna hoga jo aap model ka naam rkhana chah rhe ho Worker(user), or is schema ka naam  dono cheeze passs krni hai apko 
module.exports=mongoose.model('notes',NotesSchema)



// notes :   ------------->   yaha par humne schema se model banaya hai 






