const jwt = require("jsonwebtoken")
const{ sign, verify } = require('jsonwebtoken')


const validateToken = (req, res, next)=>{
    try{
        
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log(req.headers.authorization.split(' '))
        console.log(jwt.decode(accessToken));

        const decodedToken = jwt.verify(accessToken, "jwtSecret");
        const iduser = decodedToken.iduser; 

        req.auth = {
            iduser: iduser
        };
        console.log("auth.js: " + req.auth.iduser + " sent a request")
        
        next();
    } catch (err){
        console.error("Error verifying token:", err);
        return res.status(401).json({error: err});
    }
}


module.exports={ validateToken }