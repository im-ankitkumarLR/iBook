// phle express ko import krlo 
// Isme jitne bhi authenticated END POINTS likhne hai wo sb yaha likege is folder me

const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // imported bcrypt js
var jwt = require('jsonwebtoken'); // import it 
var fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET = "Ankitisasmart@$oy";   // ye hamari string hai or isse hum apne web token ko sign karege , isko secure rakhna hai
// ab router ko use kr skte ho 


const router = express.Router();

// ab hum yaha par API ka response dege ki user ko response me kya de 


// // *********************************************************__ROUTE-1____*******************************************************************


// ROUTE-1 Create a user using: POST request "/api/auth/createuser" ....  NO log in required 

router.post('/createuser', [

  // inko checks bolte hai
  body('name', 'Enter a valid name').isLength({ min: 3 }),  // custom msg bhi daal skte hai yaha par hum 
  body('email', 'Enter a valid email').isEmail(), // custom msg bhi daal skte hai yaha par hum 
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }), // custom msg bhi daal skte hai yaha par hum 


], async (req, res) => {

  let success =false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ success, errors: errors.array() }); // we will get this error while user will input wrong details 
  }
  try { //check wheather the user with email already present ?


    let user = await User.findOne({ email: req.body.email });
    if (user) {

      return res.status(400).json({success, error: "Sorry User with this Email already present" })
    }

    const salt = await bcrypt.genSalt(10); // to genrete salt  
    const secPass = await bcrypt.hash(req.body.password, salt); //  to generate pass



    user = await User.create({       // ye ek promise return karega or ye database ke ander chala jayega phir mujhe user send kr dia jayega 
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = { //jab user humko token waapis dega to hum us token ko convert kr paayege is data me 
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET) // data jo varible banaya hai humne use direct bhi yaha object daaal skste hai 
    // console.log(jwtData); // isse se terminal pr aayega 
    success= true;
    res.json({success, authtoken }); // iss se user ko reponse me milega 


  } catch (error) {
    console.error(error.message); // iski jagah par hum kabhi kabhi Logger / SQS use krte hai conslole me sms deme ki jagah
    res.status(500).send(" Internal  Server Error  Occured"); 
  }
})
 
// *********************************************************__ROUTE-2____*******************************************************************

// Create  new End point 

//   ROUTE-2  Authenticate  a user using: POST request "/api/auth/login" ....  NO log in required 



router.post('/login', [

  // inko checks bolte hai
  body('email', 'Enter the valid Email').isEmail(), // custom msg bhi daal skte hai yaha par hum 
  body('password','Password can not not be blank').exists(), // exists function hota hai ki password wala column khali na ho 
], async (req, res) => {
 let success =false;

  const errors = validationResult(req);  // check errors ---Start
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() }); // we will get this error while user will input wrong details 
  }

  const {email, password}= req.body;   // jo user password daalega chahe wo glt ho phir bhiwo request me to ayega na to hum use
 // bahar nikalege by destructuring from the reqesst body se or ek error bhi dege

                                     
 try {
        
  let user = await User.findOne({email}); // pull the user from the database
  

  if (!user) { // agar user hai hi nahi database me 
    return res.status(400).json({error: "Please try to login with correct credentials"});  //to ye errror return kr deni hai
    success =false;

  }

  const passwordCompare = await bcrypt.compare(password,user.password) // compare with jo usser ne password dala hai us se or actual password se line 97
  if (!passwordCompare) {
    success =false;
    return res.status(400).json({ success,error:"Wrong Password"})
  }
  const data ={    // agar password sahi hota hai to  ye object bhej dege hum database ko
   user:{
    
    id: user.id

   }
  }
  const authtoken = jwt.sign(data, JWT_SECRET)
  success =true;
  res.json({ success,authtoken});
}catch (error) {
    console.error(error.message); // iski jagah par hum kabhi kabhi Logger / SQS use krte hai conslole me sms deme ki jagah
    res.status(500).send(" Internal  Server Error  Occured");
  }

});

// *********************************************************__ROUTE-3____*******************************************************************

//   ROUTE-3   Get loggedin user detailes using: POST request "/api/auth/getuser" .... logedin required 
router.post('/getuser',fetchuser, async (req, res) => {

try {
 userID  =req.user.id; 

 const user = await User.findById(userID).select("-password")
  res.send(user)

}catch (error) {
  console.error(error.message);
res.status(500).send("Internal Server Error");


}

})













module.exports = router