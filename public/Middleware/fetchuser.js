var jwt = require('jsonwebtoken');
const fetchuser= (req, res, next)=>{
const JWT_SECRET = "Ankitisasmart@$oy"; 
    // Get the user from the jwt token and add ID to req object

    const token = req.header('auth-token'); // header se requst karege or header ka naam humne auth-token rakha hai yaha par

    if (!token) { // agat token nahi milta hai to ye bad error de deni hai 
        res.status(401).send({error:"Please authenticate with the valid Token"}) 
    }

    try {
        const data =jwt.verify(token, JWT_SECRET);
        
        req.user= data.user // user hamko mil jayega 
            next();
        
    } catch (error) {
        res.status(401).send({error:"Please authenticate with the valid Token"}) 
    }
}

module.exports  =fetchuser;